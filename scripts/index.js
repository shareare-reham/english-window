function lessonLoad() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      return displayLessons(json.data);
    });
}

function displayLessons(lessons) {
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";
  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick="wordsLoad(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open" style="color: #422ad5"></i>
            Lesson-${lesson.level_no}
        </button>
        `;
    lessonContainer.appendChild(btnDiv);
  }
}
lessonLoad();

const wordsLoad = (lesson) => {
  const url = `https://openapi.programming-hero.com/api/level/${lesson}`;
  fetch(url)
    .then((response) => response.json())
    .then(function (json) {
      if (json.data.length > 0) {
        return displayWords(json.data);
      } else {
        return displayNoVocub();
      }
    });
};

const displayWords = (words) => {
  const wordCards = document.getElementById("word-cards-container");
  wordCards.innerHTML = "";

  for (const word of words) {
    const card = document.createElement("div");

    card.innerHTML = `
        <div class="bg-white p-10 rounded-sm h-full flex flex-col justify-between mb-10">
          <div class="text-center items-center">
            <h2 class="font-bold text-3xl">${word.word}</h2>
            <p class="font-medium text-xl my-6">Meaning / Pronounciation</p>
            <h2 class="bangla text-[#18181B] font-semibold text-3xl mb-14">
              "${word.meaning} / ${word.pronunciation}"
            </h2>
          </div>
          <div class="flex justify-between items-center">
            <div class="bg-[#1A91FF]/10 p-3 rounded-sm hover:bg-[#1A91FF]/80">
              <i class="fa-solid fa-circle-info" style="color: #374957"></i>
            </div>
            <div class="bg-[#1A91FF]/10 p-3 rounded-sm hover:bg-[#1A91FF]/80">
              <i class="fa-solid fa-volume" style="color: #374957"></i>
            </div>
          </div>
        </div>
        `;

    wordCards.appendChild(card);
  }
};

const displayNoVocub = () => {
  const wordCards = document.getElementById("word-cards-container");
  wordCards.innerHTML = "";

  wordCards.innerHTML = `
      <div id="no-vocub-msg" class="col-span-full text-center" >
        <img class="mx-auto" src="./assets/alert-error.png" alt=""/>
        <p class="bangla text-[#79716B] text-lg my-4">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="bangla text-[#292524] font-medium text-3xl">
          নেক্সট Lesson এ যান
        </h2>
      </div>
  `;
};
