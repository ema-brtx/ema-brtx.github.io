// 1. Définition des questions pour chaque sujet
const subjects = {
  PHP: [
    {
      question: "Quelle fonction permet d'afficher du texte en PHP ?",
      answers: [
        { text: "echo", correct: true },
        { text: "print", correct: false },
        { text: "printf", correct: false },
        { text: "write", correct: false }
      ]
    },
    // Ajoute d’autres questions si tu veux
  ],
  Python: [
    {
      question: "Comment écris-tu une fonction en Python ?",
      answers: [
        { text: "def ma_fonction():", correct: true },
        { text: "function ma_fonction()", correct: false },
        { text: "func ma_fonction()", correct: false },
        { text: "define ma_fonction()", correct: false }
      ]
    },
    // etc.
  ]
  // Complète avec JavaScript, Powershell, Java…
};

// 2. Sélection des éléments dans la page
const questionElement   = document.getElementById("question");
const answerButtons     = document.getElementById("answer-buttons");
const progressBar       = document.getElementById("progress-bar");
const nextButton        = document.getElementById("next-btn");
const menuButton        = document.getElementById("menu-btn");
const feedbackContainer = document.getElementById("feedback");
const successMessage    = document.getElementById("success-message");
const failureMessage    = document.getElementById("failure-message");

// 3. Variables pour garder la trace de l’état du jeu
let currentSubject       = null;
let currentQuestions     = [];
let currentQuestionIndex = 0;
let score                = 0;

// 4. Démarrer le quiz quand on choisit un sujet
function selectSubject(subject) {
  currentSubject       = subject;
  currentQuestions     = [...subjects[subject]];  // on clone pour ne pas modifier l’original
  currentQuestionIndex = 0;
  score                = 0;

  // On cache le menu, on montre le quiz
  window.print("Av menu");
  document.querySelector(".menu").style.display = "none";
  window.print("Ap menu");
  document.querySelector(".quiz").style.display = "block";
  window.print("Ap quiz");

  showQuestion();  // On affiche la première question
}

// 5. Afficher la question actuelle
function showQuestion() {
  resetState();  // on vide l’ancien affichage

  // On récupère l’objet question
  const questionObj = currentQuestions[currentQuestionIndex];
  questionElement.innerText = questionObj.question;

  // Pour chaque réponse possible, on crée un bouton
  questionObj.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");
    btn.dataset.correct = answer.correct; // on garde l’info si c’est juste
    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });
}

// 6. Réinitialiser l’affichage pour la question suivante
function resetState() {
  feedbackContainer.style.display = "none";
  nextButton.style.display      = "none";
  answerButtons.innerHTML       = "";  // on efface les anciens boutons
  const percent = (currentQuestionIndex / currentQuestions.length) * 100;
  progressBar.style.width = percent + "%";
}

// 7. Gérer la sélection d’une réponse
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect   = selectedBtn.dataset.correct === "true";

  // On affiche la zone de feedback
  feedbackContainer.style.display = "block";

  // On colore chaque bouton
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  // On affiche le message adapté
  if (isCorrect) {
    score++;
    successMessage.style.display = "block";
  } else {
    failureMessage.style.display = "block";
  }

  nextButton.style.display = "block";  // on peut passer à la suite
}

// 8. Passer à la question suivante ou afficher le score
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

// 9. Afficher le score final
function showScore() {
  resetState();
  questionElement.innerText = `Tu as obtenu ${score} / ${currentQuestions.length}.`;
  nextButton.innerText = "Rejouer";
  nextButton.style.display = "block";
  menuButton.style.display = "block";
}

// 10. Retour au menu principal
menuButton.addEventListener("click", returnToMenu);
function returnToMenu() {
  document.querySelector(".quiz").style.display = "none";
  document.querySelector(".menu").style.display = "block";
}

// 11. Au chargement de la page, on attend que tu cliques sur un sujet
