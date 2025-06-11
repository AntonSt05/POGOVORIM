const questions = [
  { text: "Люди должны соблюдать правила независимо от обстоятельств.", ego: "Parent" },
  { text: "Дети безусловно должны следовать указаниям родителей.", ego: "Parent" },
  { text: "Бывает, что мне хочется подурачиться, как маленькому.", ego: "Child" },
  { text: "Я иногда преувеличиваю свою роль в каких-либо событиях.", ego: "Adult" },
  { text: "Каждый должен выполнять свой долг.", ego: "Parent" },
  { text: "Как и многие люди, я бываю обидчив.", ego: "Child" },
  { text: "Мне удается видеть в людях больше, чем они говорят о себе.", ego: "Adult" },
  { text: "Младшее поколение должно учиться у старших, как ему следует жить.", ego: "Parent" },
  { text: "Если мои желания мешают мне, то я умею их подавлять.", ego: "Adult" },
  { text: "Правила оправданы лишь до тех пор, пока они полезны.", ego: "Adult" },
  { text: "Мне порой не хватает выдержки.", ego: "Child" },
  { text: "Мои взгляды непоколебимы.", ego: "Parent" },
  { text: "Думаю, что я правильно понимаю все происходящие события.", ego: "Adult" },
  { text: "Принимая решение, я стараюсь продумать его последствия.", ego: "Adult" },
  { text: "Я увлекающийся человек.", ego: "Child" },
  { text: "Меня провести нелегко.", ego: "Adult" },
  { text: "Бывает, что я не уступаю в споре лишь потому, что не хочу уступать.", ego: "Child" },
  { text: "Мне бы понравилось быть воспитателем.", ego: "Parent" },
  { text: "Мой основной критерий оценки человека – объективность.", ego: "Adult" },
  { text: "Нередко я поступаю не как надо, а как хочется.", ego: "Child" },
  { text: "Родители, как более зрелые люди, должны устраивать семейную жизнь своих детей.", ego: "Parent" }
];

const egoDescriptions = {
  Parent: {
    name: "Родитель",
    description: "В этом состоянии сосредоточены нормы, правила и установки, усвоенные с детства. Родитель может быть заботливым или критикующим."
  },
  Adult: {
    name: "Взрослый",
    description: "Рациональное, логическое и объективное состояние, которое анализирует ситуацию и принимает решения без эмоциональной окраски."
  },
  Child: {
    name: "Ребёнок",
    description: "Эмоциональное, спонтанное и творческое состояние, связанное с чувствами, желаниями и импульсами."
  }
};

let current = 0;
let scores = { Parent: 0, Adult: 0, Child: 0 };

function updateUI() {
  document.getElementById("question-number").innerText = `Вопрос ${current + 1} из ${questions.length}`;
  document.getElementById("question-text").innerText = questions[current].text;
  document.getElementById("progress-bar-fill").style.width = Math.round((current / questions.length) * 100) + "%";
  document.getElementById("buttons").innerHTML = `
    <button onclick="handleAnswer('yes')">Да</button>
    <button onclick="handleAnswer('no')">Нет</button>
  `;
}

function handleAnswer(answer) {
  if (answer === "yes") {
    const ego = questions[current].ego;
    scores[ego]++;
  }
  current++;
  if (current < questions.length) {
    updateUI();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("question-number").style.display = "none";
  document.getElementById("question-text").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("progress-bar-fill").style.width = "100%";

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const resultsEl = document.getElementById("results");
  resultsEl.style.display = "block";
  resultsEl.innerHTML = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([ego, count]) => {
      const percent = total === 0 ? 0 : ((count / total) * 100).toFixed(1);
      return `
        <div class="result-block">
          <h2>${egoDescriptions[ego].name} — ${percent}%</h2>
          <p>${egoDescriptions[ego].description}</p>
        </div>
      `;
    }).join("");

  document.getElementById("restart-btn").style.display = "block";
}

document.getElementById("restart-btn").addEventListener("click", () => {
  current = 0;
  scores = { Parent: 0, Adult: 0, Child: 0 };
  document.getElementById("question-number").style.display = "";
  document.getElementById("question-text").style.display = "";
  document.getElementById("buttons").style.display = "";
  document.getElementById("results").style.display = "none";
  document.getElementById("restart-btn").style.display = "none";
  updateUI();
});

updateUI();