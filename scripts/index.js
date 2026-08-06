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
        <button class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open" style="color: #422ad5"></i>
            Lesson-${lesson.level_no}
        </button>
        `;
    lessonContainer.appendChild(btnDiv);
  }
}
lessonLoad();
