/* ==============================
   MOBILE MENU
============================== */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });

}


/* ==============================
   SCROLL ANIMATIONS
============================== */

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(".reveal")
  .forEach((element) => {
    revealObserver.observe(element);
  });


/* ==============================
   BIOLOGY TOPICS
============================== */

const biologyTopics = {

  cells: {
    title: "Cells",
    text: `
      <p><strong>What is a cell?</strong></p>

      <p>
      A cell is the basic unit of life. All living organisms
      are made of one or more cells.
      </p>

      <p><strong>Important organelles:</strong></p>

      <p>
      🧠 Nucleus — controls many cell activities.<br>
      ⚡ Mitochondria — help release usable energy.<br>
      🧱 Cell membrane — controls what enters and leaves.<br>
      🌱 Chloroplasts — capture light energy in plant cells.<br>
      💧 Vacuole — stores materials.
      </p>
    `
  },


  genetics: {
    title: "DNA & Genetics",
    text: `
      <p><strong>DNA</strong> contains genetic information
      used by living organisms.</p>

      <p>
      A <strong>gene</strong> is a section of DNA that
      contains information related to a characteristic.
      </p>

      <p>
      <strong>Chromosomes</strong> are structures made of
      DNA and proteins.
      </p>

      <p>
      Traits can be passed from parents to offspring
      through genetic information.
      </p>
    `
  },


  photosynthesis: {
    title: "Photosynthesis",
    text: `
      <p>
      Photosynthesis is the process plants use to make
      glucose using light energy.
      </p>

      <p>
      Plants use:
      <br>☀️ Light energy
      <br>💧 Water
      <br>🌫️ Carbon dioxide
      </p>

      <p>
      The process produces <strong>glucose</strong> and
      <strong>oxygen</strong>.
      </p>
    `
  },


  respiration: {
    title: "Cellular Respiration",
    text: `
      <p>
      Cellular respiration is a process cells use to
      release usable energy from glucose.
      </p>

      <p>
      It mainly occurs in the mitochondria of
      eukaryotic cells.
      </p>

      <p>
      Cells need usable energy to perform their
      activities.
      </p>
    `
  },


  body: {
    title: "Human Body Systems",
    text: `
      <p>
      Your body contains many systems that work together.
      </p>

      <p>
      ❤️ Circulatory — transports materials through blood.<br>
      🫁 Respiratory — exchanges oxygen and carbon dioxide.<br>
      🍎 Digestive — breaks food into smaller substances.<br>
      🧠 Nervous — sends signals throughout the body.<br>
      🦴 Skeletal — supports and protects the body.
      </p>

      <p>
      These systems interact to help maintain
      homeostasis.
      </p>
    `
  },


  ecology: {
    title: "Ecology",
    text: `
      <p>
      Ecology is the study of interactions between
      organisms and their environment.
      </p>

      <p>
      Important terms include:
      </p>

      <p>
      🌱 Producer<br>
      🐇 Consumer<br>
      🍄 Decomposer<br>
      🌎 Ecosystem<br>
      🕸️ Food web
      </p>

      <p>
      Energy moves through ecosystems from producers
      to consumers and other organisms.
      </p>
    `
  },


  microbes: {
    title: "Microorganisms",
    text: `
      <p>
      Microorganisms are organisms or biological agents
      that are too small to see easily without
      magnification.
      </p>

      <p>
      Examples include bacteria, microscopic fungi,
      and protists.
      </p>

      <p>
      Some microorganisms are helpful, while others
      can cause disease.
      </p>
    `
  },


  biotech: {
    title: "Biotechnology",
    text: `
      <p>
      Biotechnology uses living organisms, cells,
      or biological processes to develop useful
      products and technologies.
      </p>

      <p>
      Examples include genetic engineering,
      medicines, agricultural biotechnology,
      and some medical technologies.
      </p>
    `
  }

};


function showTopic(topic) {

  const data = biologyTopics[topic];

  if (!data) return;

  const content =
    document.getElementById("topic-content");

  content.innerHTML = `
    <p class="eyebrow">
      Biology Topic
    </p>

    <h2>
      ${data.title}
    </h2>

    ${data.text}
  `;

  document
    .getElementById("topic-info")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* ==============================
   QUIZ
============================== */

function checkAnswer(answer) {

  const result =
    document.getElementById("quiz-result");

  if (answer === "B") {

    result.textContent =
      "✓ Correct! Mitochondria help cells release usable energy.";

  } else {

    result.textContent =
      "Not quite. Try again! 💡 Think about which organelle helps release energy.";

  }

}


/* ==============================
   ASK NOVA
============================== */

const chatButton =
  document.getElementById("nova-chat-button");

const chatWindow =
  document.getElementById("nova-chat");

const closeChat =
  document.getElementById("close-chat");

const sendButton =
  document.getElementById("send-message");

const chatInput =
  document.getElementById("chat-input");

const chatMessages =
  document.getElementById("chat-messages");


chatButton.addEventListener("click", () => {

  chatWindow.classList.toggle("open");

  if (chatWindow.classList.contains("open")) {
    chatInput.focus();
  }

});


closeChat.addEventListener("click", () => {

  chatWindow.classList.remove("open");

});


function addMessage(text, type) {

  const message =
    document.createElement("div");

  message.className =
    type === "user"
      ? "user-message"
      : "bot-message";

  message.textContent = text;

  chatMessages.appendChild(message);

  chatMessages.scrollTop =
    chatMessages.scrollHeight;

}


function novaAnswer(question) {

  const q =
    question.toLowerCase();

  if (
    q.includes("mitochondria") ||
    q.includes("powerhouse")
  ) {

    return "Mitochondria help cells release usable energy from food.";

  }


  if (
    q.includes("nucleus")
  ) {

    return "The nucleus contains genetic material and helps control many activities of a eukaryotic cell.";

  }


  if (
    q.includes("photosynthesis")
  ) {

    return "Photosynthesis allows plants to use light energy to make glucose from carbon dioxide and water. Oxygen is also produced.";

  }


  if (
    q.includes("dna") ||
    q.includes("gene")
  ) {

    return "DNA contains genetic information. A gene is a section of DNA associated with information for a particular characteristic.";

  }


  if (
    q.includes("homeostasis")
  ) {

    return "Homeostasis is maintaining stable internal conditions. For example, the body helps regulate its temperature.";

  }


  if (
    q.includes("ecosystem") ||
    q.includes("ecology")
  ) {

    return "An ecosystem includes living organisms and the nonliving parts of their environment, along with their interactions.";

  }


  if (
    q.includes("cell")
  ) {

    return "Cells are the basic units of life. Plant and animal cells have many structures in common, while some structures are specific to certain cell types.";

  }


  if (
    q.includes("respiration")
  )
  {

    return "Cellular respiration is a process cells use to release usable energy from glucose.";

  }


  return "I can help with 7th-grade biology topics such as cells, DNA, genetics, photosynthesis, cellular respiration, body systems, ecology, microorganisms, and biotechnology. Try asking me about one of those! 🧬";

}


function sendMessage() {

  const question =
    chatInput.value.trim();

  if (!question) return;

  addMessage(question, "user");

  chatInput.value = "";

  setTimeout(() => {

    const answer =
      novaAnswer(question);

    addMessage(answer, "bot");

  }, 350);

}


sendButton.addEventListener(
  "click",
  sendMessage
);


chatInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {
      sendMessage();
    }

  }
);
