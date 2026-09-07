document.addEventListener("DOMContentLoaded", () => {

  // TABS
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const panel = document.getElementById(btn.dataset.tab);
      if (panel) panel.classList.add("active");
    });
  });

  // CHAT BUTTON
  const chatBtn = document.getElementById("chatBtn");
  const chatBox = document.getElementById("chatBox");
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");

  if (chatBtn && chatBox) {
    chatBtn.addEventListener("click", () => {
      chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
    });
  }

  function aiAnswer(text) {
    const q = text.toLowerCase();

    if (q.includes("cell")) return "Cells are the basic unit of life.";
    if (q.includes("dna")) return "DNA carries genetic information.";
    if (q.includes("system")) return "Body systems work together.";
    if (q.includes("homeostasis")) return "Homeostasis keeps internal conditions stable.";
    if (q.includes("biomech")) return "Biomechanics applies physics to living organisms.";
    if (q.includes("design")) return "Engineering design is a cycle: identify → research → brainstorm → design → build → test → improve.";
    if (q.includes("device")) return "Medical devices include prosthetics, pacemakers, and monitors.";
    if (q.includes("material")) return "Biomaterials include metals, polymers, ceramics, and hydrogels.";
    if (q.includes("image")) return "Medical imaging includes X-ray, CT, MRI, and ultrasound.";
    if (q.includes("micro")) return "Microbiology studies bacteria, viruses, fungi, and pathogens.";
    if (q.includes("neuro")) return "Neuroscience studies the brain, spinal cord, and nerves.";
    if (q.includes("code")) return "Coding helps analyze biomedical data.";

    return "Try asking about cells, DNA, body systems, biomechanics, biomaterials, imaging, microbiology, neuroscience, or coding.";
  }

  if (sendBtn && chatInput && chatBody) {
    sendBtn.addEventListener("click", () => {
      const text = chatInput.value.trim();
      if (!text) return;

      chatBody.innerHTML += `<p><strong>You:</strong> ${text}</p>`;
      chatBody.innerHTML += `<p><strong>AI:</strong> ${aiAnswer(text)}</p>`;

      chatInput.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;
    });

    chatInput.addEventListener("keydown", e => {
      if (e.key === "Enter") sendBtn.click();
    });
  }

});
