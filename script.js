// Tabs
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

// Contact button (simple status)
const contactButton = document.getElementById("contact-button");
const contactNote = document.getElementById("contact-note");

if (contactButton && contactNote) {
  contactButton.addEventListener("click", () => {
    contactNote.textContent = "Imagine this as your starting point: explore each topic, ask questions, and build your own BME journey.";
  });
}

// AI Tutor
const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

if (chatBtn && chatBox) {
  chatBtn.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
    chatBox.style.display === "flex" && chatInput && chatInput.focus();
  });
}

function aiAnswer(text) {
  const q = text.toLowerCase();

  if (q.includes("cell")) return "Cells are the basic unit of life. Try opening the Cells tab for more details.";
  if (q.includes("dna")) return "DNA carries genetic information. Check the DNA & Genetics tab for key terms.";
  if (q.includes("system")) return "Body systems work together to keep you alive. The Human Body Systems tab breaks them down.";
  if (q.includes("homeostasis")) return "Homeostasis keeps internal conditions stable. Think temperature, water, and glucose.";
  if (q.includes("biomech")) return "Biomechanics applies physics to movement, bones, and muscles.";
  if (q.includes("design")) return "Engineering design is a cycle: identify, research, brainstorm, design, build, test, improve.";
  if (q.includes("device")) return "Medical devices include prosthetics, pacemakers, and monitors.";
  if (q.includes("material")) return "Biomaterials are metals, polymers, ceramics, and hydrogels used in the body.";
  if (q.includes("image")) return "Medical imaging includes X-ray, CT, MRI, and ultrasound.";
  if (q.includes("micro")) return "Microbiology studies bacteria, viruses, fungi, and pathogens.";
  if (q.includes("neuro")) return "Neuroscience focuses on the brain, spinal cord, nerves, and neurons.";
  if (q.includes("code") || q.includes("python")) return "Coding (like Python) helps analyze biomedical data, model systems, and process images.";

  return "Try asking about cells, DNA, body systems, homeostasis, biomechanics, biomaterials, imaging, microbiology, neuroscience, or coding.";
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
