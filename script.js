/* ===== NOVA BIOLOGY ADDITIONS ===== */

const novaNotes = {
  cells: {
    title: "Cells",
    text: "Cell theory says that all living things are made of cells, cells are the basic unit of life, and new cells come from existing cells. The nucleus stores DNA in eukaryotic cells. Mitochondria help release usable energy from food. Ribosomes make proteins."
  },

  homeostasis: {
    title: "Homeostasis",
    text: "Homeostasis is maintaining stable internal conditions. For example, when your body gets too hot, you sweat to help cool down. A stimulus is a change, and a response is how an organism reacts."
  },

  energy: {
    title: "Energy",
    text: "Autotrophs make their own food, often through photosynthesis. Heterotrophs get energy by consuming other organisms. Photosynthesis uses light energy to make glucose. Cellular respiration releases usable energy from glucose."
  },

  classification: {
    title: "Classification",
    text: "Scientists classify organisms using shared characteristics and evidence. The three domains are Bacteria, Archaea, and Eukarya. A dichotomous key uses pairs of choices to identify an organism."
  },

  genetics: {
    title: "Genetics",
    text: "DNA carries genetic information. A gene is a section of DNA. Chromosomes are structures made of DNA and proteins that contain genes. Inherited traits can be passed from parents to offspring."
  },

  body: {
    title: "Human Body Systems",
    text: "Body systems work together. The respiratory system brings oxygen into the body. The circulatory system transports oxygen and nutrients. The digestive system processes food. The nervous system helps coordinate responses."
  },

  ecology: {
    title: "Ecology",
    text: "Ecology is the study of how organisms interact with each other and their environment. A population is members of the same species in an area. A community contains different populations. An ecosystem includes living and nonliving parts."
  },

  adaptation: {
    title: "Adaptation",
    text: "An adaptation is an inherited characteristic that can help an organism survive and reproduce in its environment. Natural selection can cause helpful inherited traits to become more common over generations."
  }
};


/* SHOW BIOLOGY NOTES */

function showNovaNote(topic) {

  const note = novaNotes[topic];

  if (!note) return;

  document.getElementById("novaNotesTitle").textContent = note.title;

  document.getElementById("novaNotesText").textContent = note.text;

  document.getElementById("novaNotesBox").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


/* ===== NOVA BIOLOGY CHAT ===== */

const novaChatFab = document.getElementById("novaChatFab");
const novaChatBox = document.getElementById("novaChatBox");
const novaChatClose = document.getElementById("novaChatClose");
const novaChatInput = document.getElementById("novaChatInput");
const novaChatSend = document.getElementById("novaChatSend");
const novaChatMessages = document.getElementById("novaChatMessages");


/* OPEN CHAT */

novaChatFab?.addEventListener("click", () => {
  novaChatBox.classList.toggle("open");
});


/* CLOSE CHAT */

novaChatClose?.addEventListener("click", () => {
  novaChatBox.classList.remove("open");
});


/* BIOLOGY ANSWERS */

function novaChatAnswer(question) {

  const q = question.toLowerCase();

  if (q.includes("homeostasis")) {
    return novaNotes.homeostasis.text;
  }

  if (q.includes("photosynthesis")) {
    return "Photosynthesis is how plants use light energy, water, and carbon dioxide to make glucose and oxygen.";
  }

  if (q.includes("cellular respiration")) {
    return "Cellular respiration is how cells release usable energy from glucose.";
  }

  if (q.includes("autotroph")) {
    return "An autotroph makes its own food, often using photosynthesis.";
  }

  if (q.includes("heterotroph")) {
    return "A heterotroph gets energy by consuming other organisms.";
  }

  if (q.includes("nucleus")) {
    return "The nucleus stores DNA and helps control activities in a eukaryotic cell.";
  }

  if (q.includes("mitochondria") || q.includes("mitochondrion")) {
    return "Mitochondria help cells release usable energy from food.";
  }

  if (q.includes("cell")) {
    return novaNotes.cells.text;
  }

  if (
    q.includes("domain") ||
    q.includes("kingdom") ||
    q.includes("classification")
  ) {
    return novaNotes.classification.text;
  }

  if (
    q.includes("dna") ||
    q.includes("gene") ||
    q.includes("chromosome")
  ) {
    return novaNotes.genetics.text;
  }

  if (
    q.includes("ecosystem") ||
    q.includes("producer") ||
    q.includes("consumer") ||
    q.includes("decomposer")
  ) {
    return novaNotes.ecology.text;
  }

  if (
    q.includes("adaptation") ||
    q.includes("natural selection")
  ) {
    return novaNotes.adaptation.text;
  }

  if (
    q.includes("stimulus") ||
    q.includes("response")
  ) {
    return "A stimulus is a change in the environment. A response is how an organism reacts to that change.";
  }

  return "I can help with 7th-grade biology topics such as cells, homeostasis, energy, classification, genetics, body systems, ecology, and adaptation.";
}


/* SEND CHAT MESSAGE */

function sendNovaChat() {

  const question = novaChatInput.value.trim();

  if (!question) return;


  /* USER MESSAGE */

  const userBubble = document.createElement("div");

  userBubble.className = "nova-bubble nova-user";

  userBubble.textContent = question;

  novaChatMessages.appendChild(userBubble);


  /* NOVA ANSWER */

  const botBubble = document.createElement("div");

  botBubble.className = "nova-bubble nova-bot";

  botBubble.textContent = novaChatAnswer(question);

  novaChatMessages.appendChild(botBubble);


  /* CLEAR INPUT */

  novaChatInput.value = "";


  /* SCROLL DOWN */

  novaChatMessages.scrollTop =
    novaChatMessages.scrollHeight;
}


/* SEND BUTTON */

novaChatSend?.addEventListener("click", sendNovaChat);


/* ENTER KEY */

novaChatInput?.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    sendNovaChat();
  }

});
