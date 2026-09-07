/* =========================================================
   NOVA BIOAI — SCRIPT.JS
   ========================================================= */


/* =========================================================
   ORIGINAL MOBILE MENU
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuToggle?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});


/* Close mobile menu when a navigation link is clicked */

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
  });
});


/* =========================================================
   ORIGINAL SCROLL REVEAL
   ========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }

      });

    },
    {
      threshold: 0.1
    }
  );


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================================
   BIOLOGY NOTES
   ========================================================= */

const novaNotes = {

  cells: {
    title: "Cells",
    text:
      "Cell theory says that all living things are made of cells, cells are the basic unit of life, and new cells come from existing cells. The nucleus stores DNA in eukaryotic cells. Mitochondria help release usable energy from food. Ribosomes make proteins."
  },

  homeostasis: {
    title: "Homeostasis",
    text:
      "Homeostasis is maintaining stable internal conditions. For example, when your body gets too hot, you sweat to help cool down. A stimulus is a change, and a response is how an organism reacts."
  },

  energy: {
    title: "Energy",
    text:
      "Autotrophs make their own food, often through photosynthesis. Heterotrophs get energy by consuming other organisms. Photosynthesis uses light energy to make glucose. Cellular respiration releases usable energy from glucose."
  },

  classification: {
    title: "Classification",
    text:
      "Scientists classify organisms using shared characteristics and evidence. The three domains are Bacteria, Archaea, and Eukarya. A dichotomous key uses pairs of choices to identify an organism."
  },

  genetics: {
    title: "Genetics",
    text:
      "DNA carries genetic information. A gene is a section of DNA. Chromosomes are structures made of DNA and proteins that contain genes. Inherited traits can be passed from parents to offspring."
  },

  body: {
    title: "Human Body Systems",
    text:
      "Body systems work together. The respiratory system brings oxygen into the body. The circulatory system transports oxygen and nutrients. The digestive system processes food. The nervous system helps coordinate responses."
  },

  ecology: {
    title: "Ecology",
    text:
      "Ecology is the study of how organisms interact with each other and their environment. A population is members of the same species in an area. A community contains different populations. An ecosystem includes living and nonliving parts."
  },

  adaptation: {
    title: "Adaptations",
    text:
      "An adaptation is an inherited characteristic that can help an organism survive and reproduce in its environment. Natural selection can cause helpful inherited traits to become more common over generations."
  }

};


/* =========================================================
   SHOW BIOLOGY NOTES
   ========================================================= */

function showNovaNote(topic) {

  const note = novaNotes[topic];

  if (!note) return;


  const title =
    document.getElementById("novaNotesTitle");

  const text =
    document.getElementById("novaNotesText");

  const box =
    document.getElementById("novaNotesBox");


  if (title) {
    title.textContent = note.title;
  }

  if (text) {
    text.textContent = note.text;
  }

  if (box) {

    box.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }

}


/* =========================================================
   NOVA AI CHAT
   ========================================================= */


/*
   YOUR CLOUDFLARE WORKER

   Do NOT put your OpenAI API key here.

   The API key stays safely inside
   your Cloudflare Worker.
*/

const NOVA_AI_URL =
  "https://novabioai.kaaviyasriravishankar.workers.dev";


/* Chat elements */

const novaChatFab =
  document.getElementById("novaChatFab");

const novaChatBox =
  document.getElementById("novaChatBox");

const novaChatClose =
  document.getElementById("novaChatClose");

const novaChatInput =
  document.getElementById("novaChatInput");

const novaChatSend =
  document.getElementById("novaChatSend");

const novaChatMessages =
  document.getElementById("novaChatMessages");


/* =========================================================
   OPEN NOVA
   ========================================================= */

novaChatFab?.addEventListener("click", () => {

  novaChatBox?.classList.toggle("open");

  if (
    novaChatBox?.classList.contains("open")
  ) {

    novaChatInput?.focus();

  }

});


/* =========================================================
   CLOSE NOVA
   ========================================================= */

novaChatClose?.addEventListener("click", () => {

  novaChatBox?.classList.remove("open");

});


/* =========================================================
   ADD CHAT MESSAGE
   ========================================================= */

function addNovaMessage(text, type) {

  if (!novaChatMessages) {
    return null;
  }


  const bubble =
    document.createElement("div");


  bubble.className =
    `nova-bubble nova-${type}`;


  bubble.textContent = text;


  novaChatMessages.appendChild(
    bubble
  );


  novaChatMessages.scrollTop =
    novaChatMessages.scrollHeight;


  return bubble;

}


/* =========================================================
   ASK NOVA AI
   ========================================================= */

async function askNovaAI(question) {

  try {

    const response =
      await fetch(
        NOVA_AI_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            question: question
          })
        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.error ||
        "NOVA could not answer."
      );

    }


    return (
      data.answer ||
      "I couldn't generate an answer right now."
    );

  }

  catch (error) {

    console.error(
      "NOVA AI error:",
      error
    );


    return (
      "Sorry! NOVA couldn't connect right now. " +
      "Please try again in a moment."
    );

  }

}


/* =========================================================
   SEND CHAT MESSAGE
   ========================================================= */

async function sendNovaChat() {

  if (
    !novaChatInput ||
    !novaChatSend ||
    !novaChatMessages
  ) {
    return;
  }


  const question =
    novaChatInput.value.trim();


  /* Don't send empty messages */

  if (!question) {
    return;
  }


  /* Show student's question */

  addNovaMessage(
    question,
    "user"
  );


  /* Clear input */

  novaChatInput.value = "";


  /* Disable controls */

  novaChatSend.disabled = true;

  novaChatInput.disabled = true;


  /* Show thinking message */

  const thinkingBubble =
    addNovaMessage(
      "NOVA is thinking...",
      "bot"
    );


  /* Ask the AI */

  const answer =
    await askNovaAI(question);


  /* Replace thinking message */

  if (thinkingBubble) {

    thinkingBubble.textContent =
      answer;

  }


  /* Enable controls again */

  novaChatSend.disabled = false;

  novaChatInput.disabled = false;


  /* Put cursor back in input */

  novaChatInput.focus();


  /* Scroll to newest message */

  novaChatMessages.scrollTop =
    novaChatMessages.scrollHeight;

}


/* =========================================================
   SEND BUTTON
   ========================================================= */

novaChatSend?.addEventListener(
  "click",
  sendNovaChat
);


/* =========================================================
   ENTER KEY
   ========================================================= */

novaChatInput?.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      event.preventDefault();

      sendNovaChat();

    }

  }
);
