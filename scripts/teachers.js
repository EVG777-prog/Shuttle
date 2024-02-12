document.addEventListener("DOMContentLoaded", (event) => {
  // заполнение учителей
  const showMoreButton = document.querySelector(".show-more");
  const teachersContainer = document.querySelector(".teachers-container");
  const teachersSection = document.querySelector(".teachers");

  // Если учителей нет, скрываем секцию
  if (teachers.length === 0) {
    teachersSection.style.display = "none";
  } else {
    showTeachers(teachers); // Иначе добавляем учителей в DOM

    window.onload = function () {
      // Начальное обновление видимых карточек
      updateTotalHeight();
      updateButtonVisibility();
    };

    showMoreButton.addEventListener("click", () => {
      // Проверяем, раскрыт ли контейнер
      if (teachersContainer.classList.contains("expanded")) {
        updateTotalHeight();
        teachersContainer.classList.remove("expanded");
        showMoreButton.textContent = "Всі викладачі";
      } else {
        // Раскрываем контейнер
        teachersContainer.style.maxHeight = `${teachersContainer.scrollHeight}px`;
        teachersContainer.classList.add("expanded");
        showMoreButton.textContent = "Приховати";
      }
    });
  }

  // updateButtonVisibility();

  // Обновляем видимость кнопки при изменении размера окна
  window.addEventListener("resize", function () {
    updateTotalHeight();
    updateButtonVisibility();
  });

  const teachersCards = teachersContainer.querySelectorAll(".teacher");

  function showTeachers(teachers) {
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

      teachersContainer.appendChild(teacherElement);
    });
  }

  function updateButtonVisibility() {
    const totalHeight = teachersContainer.scrollHeight;
    const visibleHeight = teachersContainer.clientHeight;

    showMoreButton.style.display =
      totalHeight > visibleHeight ? "block" : "none";
  }

  function updateTotalHeight() {
    let visibleCount;
    const screenWidth = window.innerWidth;

    if (screenWidth <= 480) {
      visibleCount = 5;
    } else if (screenWidth > 480 && screenWidth <= 1100) {
      visibleCount = 4;
    } else {
      visibleCount = 6;
    }

    const maxHeight = calculateTotalHeightForVisibleCards(
      teachersCards,
      visibleCount
    );
    teachersContainer.style.maxHeight = `${maxHeight}px`;
  }

  function calculateTotalHeightForVisibleCards(cards, visibleCount) {
    let totalHeight = 0;
    const gapBetweenCards = 30; // Замените на фактическое значение отступа между карточками

    if (visibleCount == 5) {
      for (let i = 0; i < visibleCount && i < cards.length; i++) {
        totalHeight +=
          cards[i].offsetHeight + (i < visibleCount - 1 ? gapBetweenCards : 0);
      }
    } else {
      let heightFirstRow = 0;
      let heightSecondRow = 0;
      const cardsFirstRow = [...cards].slice(0, visibleCount / 2);
      const cardsSecondRow = [...cards].slice(visibleCount / 2, visibleCount);

      cardsFirstRow.forEach((card) => {
        const cardHeight = card.offsetHeight;
        if (cardHeight > heightFirstRow) {
          heightFirstRow = cardHeight;
        }
      });

      cardsSecondRow.forEach((card) => {
        const cardHeight = card.offsetHeight;
        if (cardHeight > heightSecondRow) {
          heightSecondRow = cardHeight;
        }
      });

      totalHeight = heightFirstRow + gapBetweenCards + heightSecondRow;
    }

    return totalHeight;
  }
});
