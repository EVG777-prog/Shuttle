document.addEventListener("DOMContentLoaded", (event) => {
  // заполнение тарифов
  const ratesList = document.querySelector(".rates-container");

  rates.forEach((rate) => {
    const rateElement = document.createElement("div");
    rateElement.classList.add("rate-card");

    rateElement.innerHTML = `
          <div class="rate-header">
            <h3 class="rate-title">${rate.name}</h3>
            <p class="rate-price">${rate.price} грн.</p>
            <p class="rate-duration">${rate.duration}</p>
          </div>
          <ul class="rate-details">
            <li>${rate.details[0]}</li>
            <li>${rate.details[1]}</li>
            <li>${rate.details[2]}</li>
            <li>${rate.details[3]}</li>
          </ul>
        <button class="rate-signup apply-button">Записатися</button>
        `;

    ratesList.appendChild(rateElement);
  });

  // заполнение учителей
  const teachersList = document.querySelector(".teachers-container");
  const showMoreButton = document.querySelector(".show-more");
  const teachersContainer = document.querySelector(".teachers-container");
  const teachersSection = document.querySelector(".teachers");

  function addTeachers(teachers) {
    showMoreButton.addEventListener("click", () => {
      if (teachersContainer.style.maxHeight) {
        teachersContainer.style.maxHeight = null; // Сброс max-height
        showMoreButton.textContent = "Всі викладачі";
      } else {
        const scrollHeight = teachersContainer.scrollHeight; // Высота содержимого
        teachersContainer.style.maxHeight = scrollHeight + "px"; // Установка max-height
        showMoreButton.textContent = "Приховати";
      }
    });

    teachers.forEach((teacher) => {
      const teacherElement = document.createElement("div");
      teacherElement.classList.add("teacher");

      teacherElement.innerHTML = `
           <img
              src="${teacher.photo}"
              alt="Photo of ${teacher.name}"
              class="teacher-photo"
            />
            <h3>${teacher.name}</h3>
            <p>${teacher.description}</p>
          `;

      teachersList.appendChild(teacherElement);
    });

    function updateButtonVisibility() {
      const totalHeight = teachersContainer.scrollHeight;
      const visibleHeight = teachersContainer.clientHeight;
      showMoreButton.style.display =
        totalHeight > visibleHeight ? "block" : "none";
    }

    updateButtonVisibility();

    // Обновляем видимость кнопки при изменении размера окна
    window.addEventListener("resize", updateButtonVisibility);
  }

  // Если учителей нет, скрываем секцию
  if (teachers.length === 0) {
    teachersSection.style.display = "none";
  } else {
    addTeachers(teachers); // Иначе добавляем учителей в DOM
  }
});
