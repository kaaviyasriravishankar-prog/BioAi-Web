// ai-tutor.js
// Lightweight in-page "NovaBioAI Tutor" that reads the page units and answers queries.
// Include this file after the HTML (before closing </body>) or with <script defer>.

(function () {
  // Utility: wait for DOM ready if script included in <head> without defer
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Query page elements (these IDs/classes are used in the HTML template)
    const aiToggle = document.getElementById('aiToggle');
    const aiPanel = document.getElementById('aiPanel');
    const aiClose = document.getElementById('aiClose');
    const aiLog = document.getElementById('aiLog');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');
    const aiChips = document.querySelectorAll('.ai-chip');
    const aiSpeakToggle = document.getElementById('aiSpeakToggle');

    // If required elements are missing, log and abort to avoid runtime errors.
    if (!aiToggle || !aiPanel || !aiClose || !aiLog || !aiInput || !aiSend) {
      console.warn('NovaBioAI Tutor: required UI elements not found. Please include the tutor HTML or adjust IDs.');
      return;
    }

    // Build simple knowledge base from page units (.unit elements)
    const units = Array.from(document.querySelectorAll('.unit')).map(unit => {
      const id = unit.id || '';
      const titleEl = unit.querySelector('h3, h4, h2');
      const title = titleEl ? titleEl.textContent.trim() : id;
      // innerText is used intentionally (reads visible text only)
      const text = (unit.innerText || '').replace(/\s+/g, ' ').trim();
      return { id, title, text, node: unit };
    });

    // Speech toggle state
    let speechEnabled = false;
    if (aiSpeakToggle) {
      aiSpeakToggle.addEventListener('click', () => {
        speechEnabled = !speechEnabled;
        aiSpeakToggle.style.opacity = speechEnabled ? '1' : '0.55';
      });
    }

    // Panel open/close helpers
    function openPanel() {
      aiPanel.hidden = false;
      aiPanel.setAttribute('aria-hidden', 'false');
      aiToggle.setAttribute('aria-expanded', 'true');
      aiToggle.setAttribute('aria-pressed', 'true');
      if (aiInput) aiInput.focus();
      appendBotMessage("Hello! I'm your NovaBioAI Tutor — ask me about units, topics, or say 'teach me unit 3'.");
    }
    function closePanel() {
      aiPanel.hidden = true;
      aiPanel.setAttribute('aria-hidden', 'true');
      aiToggle.setAttribute('aria-expanded', 'false');
      aiToggle.setAttribute('aria-pressed', 'false');
      aiToggle.focus();
    }

    // Wire UI interactions
    aiToggle.addEventListener('click', () => {
      if (aiPanel.hidden) openPanel(); else closePanel();
    });
    aiClose.addEventListener('click', closePanel);

    aiChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.dataset.q || chip.textContent.trim();
        appendUserMessage(q);
        handleQuery(q);
      });
    });

    aiSend.addEventListener('click', () => {
      const q = (aiInput.value || '').trim();
      if (!q) return;
      appendUserMessage(q);
      aiInput.value = '';
      handleQuery(q);
    });

    aiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        aiSend.click();
      }
    });

    // Append messages to log
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

    // Core query handling: match by "unit N" or keyword similarity
    function handleQuery(q) {
      const qLower = (q || '').toLowerCase();

      // Detect "teach me unit N" or "unit N"
      const unitMatch = qLower.match(/unit\s*(\d+)/);
      if (unitMatch) {
        const n = parseInt(unitMatch[1], 10);
        const target = units[n - 1] || units.find(u => u.title.toLowerCase().includes('unit ' + n));
        if (target) {
          const excerpt = summarizeText(target.text, 250);
          appendBotMessage(excerpt);
          highlightUnit(target.node);
          return;
        }
      }

      // Keyword-based best-match
      let best = { score: 0, unit: null };
      const tokens = qLower.split(/[^a-z0-9]+/).filter(Boolean);
      if (tokens.length) {
        units.forEach(u => {
          let score = 0;
          const hay = (u.title + ' ' + u.text).toLowerCase();
          tokens.forEach(t => {
            if (!t) return;
            // Count occurrences and give extra weight for title matches
            const matches = hay.match(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || [];
            score += matches.length;
            if (u.title.toLowerCase().includes(t)) score += 2;
          });
          if (score > best.score) best = { score, unit: u };
        });
      }

      if (best.score > 0 && best.unit) {
        const excerpt = summarizeText(best.unit.text, 300);
        appendBotMessage(excerpt);
        highlightUnit(best.unit.node);
        return;
      }

      // Fallback suggestion
      appendBotMessage("I couldn't find a direct match. Try: 'Teach me unit 1', 'Explain cells', or ask about 'prosthetics' or 'medical imaging'.");
    }

    // Simple summarizer to return a readable excerpt (complete sentence where possible)
    function summarizeText(text, maxChars = 250) {
      if (!text) return "Sorry — I don't have content for that topic.";
      if (text.length <= maxChars) return text;
      const cut = text.slice(0, maxChars);
      const lastDot = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf('!'), cut.lastIndexOf('?'));
      if (lastDot > Math.floor(maxChars * 0.4)) return cut.slice(0, lastDot + 1) + " ...";
      return cut.trim() + " ...";
    }

    // Optional: highlight a unit briefly when the tutor cites it
    let highlightTimer = null;
    function highlightUnit(node) {
      if (!node) return;
      node.style.transition = 'box-shadow 220ms ease, transform 220ms ease';
      const originalZ = node.style.zIndex;
      node.style.zIndex = 1100;
      node.style.boxShadow = '0 8px 26px rgba(0,0,0,0.18)';
      node.style.transform = 'translateY(-4px)';
      window.setTimeout(() => {
        if (highlightTimer) clearTimeout(highlightTimer);
        highlightTimer = window.setTimeout(() => {
          node.style.boxShadow = '';
          node.style.transform = '';
          node.style.zIndex = originalZ || '';
        }, 900);
      }, 80);
      // Scroll it into view (smooth)
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Keyboard shortcut: 't' toggles tutor (unless typing)
    document.addEventListener('keydown', (e) => {
      if (e.key === 't' && !/input|textarea/i.test(document.activeElement.tagName)) {
        if (aiPanel.hidden) openPanel(); else closePanel();
      }
    });

    // Escape closes panel when focused inside
    aiPanel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel();
    });

    // Clicking a unit on the page will offer to teach that unit (progressive enhancement)
    document.querySelectorAll('.unit').forEach(u => {
      u.addEventListener('click', (ev) => {
        // Avoid firing on text selection or complex interactions
        if (ev.detail === 0) return;
        const titleEl = u.querySelector('h3, h4, h2');
        const title = titleEl ? titleEl.textContent.trim() : '';
        const query = title ? `Teach me ${title}` : 'Teach me unit';
        appendUserMessage(query);
        handleQuery(query);
        openPanel();
      });
    });

    // Ensure panel starts closed
    closePanel();
  } // end init
})(); // end IIFE
