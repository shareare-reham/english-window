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
        <button id="active-btn-${lesson.level_no}" onclick="wordsLoad(${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open" style="color: #422ad5"></i>
            Lesson-${lesson.level_no}
        </button>
        `;
    lessonContainer.appendChild(btnDiv);
  }
}
lessonLoad();

const removeActive = () => {
  const activeBtns = document.querySelectorAll(".lesson-btn");
  for (const btn of activeBtns) {
    btn.classList.remove("active");
  }
};

const wordsLoad = (lesson) => {
  const url = `https://openapi.programming-hero.com/api/level/${lesson}`;
  const activeBtn = document.getElementById(`active-btn-${lesson}`);
  removeActive();
  activeBtn.classList.add("active");

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
            <h2 class="font-bold text-3xl">${word.word ? word.word : "Word Not Found"}</h2>
            <p class="font-medium text-xl my-6">Meaning / Pronounciation</p>
            <h2 class="bangla text-[#18181B] font-semibold text-3xl mb-14">
              "${word.meaning ? word.meaning : "Meaning Not Found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Found"}"
            </h2>
          </div>
          <div class="flex justify-between items-center">
            <div class="bg-[#1A91FF]/10 p-3 rounded-sm hover:bg-[#1A91FF]/80">
              <button onclick="detailsLoad(${word.id})"><i class="fa-solid fa-circle-info" style="color: #374957"></i></button>
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

const detailsLoad = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  fetch(url)
  .then((response) => response.json())
  .then((json) => showDetails(json.data))
};

const showDetails =(datas)=>{
 
  const modal = document.getElementById("my_modal_5");
  modal.innerHTML = `
        <div class="modal-box rounded-2xl">
          <div class="m-3 p-4 border-2 border-[#EDF7FF] space-y-8 rounded-xl">
            <h1 class="font-semibold text-3xl">${datas.word} (<i class="fa-solid fa-microphone-lines"></i>: ${datas.pronunciation})</h1>
            <div>
              <h3 class="font-semibold text-xl mb-2">Meaning</h3>
              <p class="bangla font-medium text-xl">${datas.meaning}</p>
            </div>
            <div>
              <h3 class="font-semibold text-xl mb-2">Example</h3>
              <p class="text-xl">${datas.sentence}</p>
            </div>
            <div>
              <h3 class="bangla font-medium text-xl mb-2">সমার্থক শব্দ গুলো</h3>
              <div class="flex gap-4">
                <div class="bg-[#D7E4EF] p-2 rounded-lg">
                  <p>${datas.synonyms[0]}</p>
                </div>
                <div class="bg-[#D7E4EF] p-2 rounded-lg">
                  <p>${datas.synonyms[1]}</p>
                </div>
                <div class="bg-[#D7E4EF] p-2 rounded-lg">
                  <p>${datas.synonyms[2]}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-action justify-start">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-active btn-primary rounded-xl">Complete Learning</button>
            </form>
          </div>
        </div>
  `;
  my_modal_5.showModal()
}
