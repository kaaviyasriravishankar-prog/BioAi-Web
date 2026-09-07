// ai-tutor.js
// Lightweight in-page NovaBioAI Tutor. Uses local page content for simple "teach unit N" answers,
// and calls a server endpoint (/api/ask) for free-form questions. Do NOT put API keys in client JS.

(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // UI elements
    const aiToggle = document.getElementById('aiToggle');
    const aiPanel = document.getElementById('aiPanel');
    const aiClose = document.getElementById('aiClose');
    const aiLog = document.getElementById('aiLog');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');
    const aiChips = document.querySelectorAll('.ai-chip');
    const aiSpeakToggle = document.getElementById('aiSpeakToggle');

    if (!aiToggle || !aiPanel || !aiLog || !aiInput || !aiSend) {
      console.warn('NovaBioAI Tutor: required UI elements not found.');
      return;
    }

    // Build knowledge base from unit panels (visible content)
    const units = Array.from(document.querySelectorAll('.unit-panel, .unit')).map(unit => {
      const id = unit.id || '';
      const titleEl = unit.querySelector('h2, h3, h4') || { textContent: id };
      const title = (titleEl.textContent || '').trim();
      const text = (unit.innerText || '').replace(/\s+/g, ' ').trim();
      return { id, title, text, node: unit };
    });

    let speechEnabled = false;
    if (aiSpeakToggle) {
      aiSpeakToggle.addEventListener('click', () => {
        speechEnabled = !speechEnabled;
        aiSpeakToggle.setAttribute('aria-pressed', String(speechEnabled));
        aiSpeakToggle.style.opacity = speechEnabled ? '1' : '0.6';
      });
    }

    function openPanel() {
      aiPanel.hidden = false;
      aiPanel.setAttribute('aria-hidden', 'false');
      aiToggle.setAttribute('aria-expanded', 'true');
      aiInput.focus();
      appendBotMessage("Hello! I'm NovaBioAI Tutor. Ask me about units or any biomedical engineering topic. For medical questions I will provide educational information, not personal medical advice.");
    }
    function closePanel() {
      aiPanel.hidden = true;
      aiPanel.setAttribute('aria-hidden', 'true');
      aiToggle.setAttribute('aria-expanded', 'false');
      aiToggle.focus();
    }

    aiToggle.addEventListener('click', () => {
      if (aiPanel.hidden) openPanel(); else closePanel();
    });
    if (aiClose) aiClose.addEventListener('click', closePanel);

    aiChips.forEach(chip => chip.addEventListener('click', () => {
      const q = chip.dataset.q || chip.textContent.trim();
      appendUserMessage(q);
      handleQuery(q);
    }));

    aiSend.addEventListener('click', () => {
      const q = aiInput.value.trim();
      if (!q) return;
      appendUserMessage(q);
      aiInput.value = '';
      handleQuery(q);
    });
    aiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); aiSend.click(); }
    });

    function appendUserMessage(text) {
      const el = document.createElement('div');
      el.className = 'ai-message user';
      el.textContent = text;
      aiLog.appendChild(el);
      aiLog.scrollTop = aiLog.scrollHeight;
    }
    function appendBotMessage(text) {
      const el = document.createElement('div');
      el.className = 'ai-message bot';
      el.textContent = text;
      aiLog.appendChild(el);
      aiLog.scrollTop = aiLog.scrollHeight;
      if (speechEnabled && 'speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
    }

    // Query handler: local quick answers then server fallback
    async function handleQuery(q) {
      const qLower = (q || '').toLowerCase();

      // Quick local match for "teach me unit N" or "unit N"
      const unitMatch = qLower.match(/unit\s*(\d+)/);
      if (unitMatch) {
        const n = parseInt(unitMatch[1], 10);
        const target = units[n - 1] || units.find(u => u.title.toLowerCase().includes('unit ' + n));
        if (target) {
          const excerpt = summarizeText(target.text, 400);
          appendBotMessage(excerpt + `\n\n(Source: ${target.title || 'site content'})`);
          highlightUnit(target.node);
          return;
        }
      }

      // Local keyword best-match (fast)
      let best = { score: 0, unit: null };
      const tokens = qLower.split(/[^a-z0-9]+/).filter(Boolean);
      if (tokens.length) {
        units.forEach(u => {
          let score = 0;
          const hay = (u.title + ' ' + u.text).toLowerCase();
          tokens.forEach(t => {
            if (!t) return;
            const re = new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            const matches = hay.match(re) || [];
            score += matches.length;
            if (u.title.toLowerCase().includes(t)) score += 2;
          });
          if (score > best.score) best = { score, unit: u };
        });
      }
      if (best.score > 0 && best.unit && best.score >= 2) {
        const excerpt = summarizeText(best.unit.text, 350);
        appendBotMessage(excerpt + `\n\n(Source: ${best.unit.title || 'site content'})`);
        highlightUnit(best.unit.node);
        return;
      }

      // Otherwise: call server LLM
      const thinking = document.createElement('div');
      thinking.className = 'ai-message bot';
      thinking.textContent = 'Thinking...';
      aiLog.appendChild(thinking);
      aiLog.scrollTop = aiLog.scrollHeight;

      // Build a short context from units (avoid huge payloads)
      const pageContext = units.map(u => `${u.title}: ${u.text.slice(0, 800)}`).join('\n\n').slice(0, 4000);

      try {
        // Adjust the URL to your worker route if needed
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: q, context: pageContext, max_tokens: 700 })
        });
        if (!res.ok) {
          const errText = await res.text().catch(() => '');
          thinking.remove();
          appendBotMessage('Sorry — the tutor is temporarily unavailable. ' + (errText || 'Please try again later.'));
          return;
        }
        const data = await res.json();
        thinking.remove();
        if (data && data.reply) {
          appendBotMessage(data.reply);
        } else {
          appendBotMessage("Sorry — I couldn't get a response. Try rephrasing your question.");
        }
      } catch (err) {
        thinking.remove();
        appendBotMessage("Network error: could not reach the tutor backend. The local tutor can still answer requests like 'Teach me unit 1'.");
        console.error(err);
      }
    }

    // Summarizer: return first complete sentence(s) up to maxChars
    function summarizeText(text, maxChars = 250) {
      if (!text) return "Sorry — no content available.";
      if (text.length <= maxChars) return text;
      const cut = text.slice(0, maxChars);
      const lastDot = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf('!'), cut.lastIndexOf('?'));
      if (lastDot > Math.floor(maxChars * 0.4)) return cut.slice(0, lastDot + 1) + " ...";
      return cut.trim() + " ...";
    }

    // Highlight referenced unit briefly and scroll into view
    let highlightTimer = null;
    function highlightUnit(node) {
      if (!node) return;
      node.style.transition = 'box-shadow 200ms ease, transform 200ms ease';
      const originalZ = node.style.zIndex;
      node.style.zIndex = 1100;
      node.style.boxShadow = '0 8px 32px rgba(123,97,255,0.18)';
      node.style.transform = 'translateY(-6px)';
      if (highlightTimer) clearTimeout(highlightTimer);
      highlightTimer = setTimeout(() => {
        node.style.boxShadow = '';
        node.style.transform = '';
        node.style.zIndex = originalZ || '';
      }, 1100);
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Keyboard shortcut: t toggles the tutor (unless typing)
    document.addEventListener('keydown', (e) => {
      if (e.key === 't' && !/input|textarea/i.test(document.activeElement.tagName)) {
        if (aiPanel.hidden) openPanel(); else closePanel();
      }
    });

    aiPanel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel();
    });

    // Clicking a unit panel triggers teach about it
    document.querySelectorAll('.unit-panel').forEach(u => {
      u.addEventListener('click', (ev) => {
        if (ev.detail === 0) return;
        const titleEl = u.querySelector('h2, h3, h4');
        const title = titleEl ? titleEl.textContent.trim() : '';
        const q = title ? `Teach me ${title}` : 'Teach me this unit';
        appendUserMessage(q);
        handleQuery(q);
        openPanel();
      });
    });

    // Start closed
    closePanel();
  } // init
})();
