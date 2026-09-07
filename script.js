// Tabs
const buttons = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// AI Knowledge
const aiKnowledge = {
  cells: "Cells are the basic unit of life.",
  dna: "DNA carries genetic instructions.",
  systems: "Body systems work together.",
  homeostasis: "Homeostasis keeps internal conditions stable.",
  biomechanics: "Biomechanics applies physics to living organisms.",
  design: "Engineering design: Identify → Research → Brainstorm → Design → Build → Test → Improve.",
  devices: "Medical devices include prosthetics, pacemakers, and monitors.",
  materials: "Biomaterials include metals, polymers, ceramics, and hydrogels.",
  imaging: "Medical imaging includes X-ray, CT, MRI, and ultrasound.",
  microbiology: "Microbiology studies bacteria, viruses, fungi, and pathogens.",
  neuroscience: "Neuroscience studies the brain, spinal cord, and nerves.",
  coding: "Coding helps analyze biomedical data."
};

// AI Answer
function aiAnswer(q) {
  q = q.toLowerCase();

  if (q.includes("cell")) return aiKnowledge.cells;
  if (q.includes("dna")) return aiKnowledge.dna;
  if (q.includes("system")) return aiKnowledge.systems;
  if (q.includes("homeostasis")) return aiKnowledge.homeostasis;
  if (q.includes("biomech")) return aiKnowledge.biomechanics;
  if (q.includes("engineer")) return aiKnowledge.design;
  if (q.includes("device")) return aiKnowledge.devices;
  if (q.includes("material")) return aiKnowledge.materials;
  if (q.includes("image") || q.includes("x-ray") || q.includes("mri")) return aiKnowledge.imaging;
  if (q.includes("micro")) return aiKnowledge.microbiology;
  if (q.includes("neuro")) return aiKnowledge.neuroscience;
  if (q.includes("code")) return aiKnowledge.coding;

  return "Try asking about cells, DNA, body systems, biomechanics, biomaterials, imaging, microbiology, neuroscience, or coding.";
}

// Chat button
const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");

chatBtn.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
});

// Chat send
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (!text) return;

  chatBody.innerHTML += `<p>You: ${text}</p>`;
  chatBody.innerHTML += `<p>AI: ${aiAnswer(text)}</p>`;

  chatInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;
});
