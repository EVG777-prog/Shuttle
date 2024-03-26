document.addEventListener("DOMContentLoaded", (event) => {
  // заполнение тарифов
  const scheduleSection = document.querySelector(".schedule-section");
  const scheduleContainer = scheduleSection.querySelector(
    ".schedule-container"
  );
  const showMoreLessonsButton =
    scheduleSection.querySelector(".show-more-lessons");
  const selectedTimeInput = scheduleSection.querySelector("#selectedTime");
  const selectLevelInput = scheduleSection.querySelector("#selectedLevel");

  // Если расписания нет, скрываем секцию
  if (!schedule.length) {
    scheduleSection.style.display = "none";
  } else {
    // Получаем все кастомные селекты
    const customSelects = document.querySelectorAll(
      ".schedule-section .custom-select"
    );

    customSelects.forEach(function (customSelect) {
      const selectedValue = customSelect.querySelector(".selected-value");
      const valueList = customSelect.querySelector(".value-list");
      const hiddenInput = customSelect.querySelector("input[type=hidden]"); // Предполагается, что у каждого селекта есть свой скрытый input

      // Обработчик клика по выбранному значению
      selectedValue.addEventListener("click", function () {
        customSelect.classList.toggle("open");
        valueList.classList.toggle("hidden");
      });

      // Обработчик клика по элементу списка
      valueList.addEventListener("click", function (e) {
        if (e.target.tagName.toLowerCase() === "li") {
          selectedValue.textContent = e.target.textContent;
          selectedValue.dataset.value = e.target.dataset.value;
          hiddenInput.value = e.target.dataset.value; // Обновляем значение скрытого input
          showLessons(schedule);
          customSelect.classList.remove("open");
          valueList.classList.add("hidden");
        }
      });
    });

    // Закрытие всех открытых списков при клике вне селектов
    document.addEventListener("click", function (e) {
      customSelects.forEach(function (customSelect) {
        var valueList = customSelect.querySelector(".value-list");
        if (!customSelect.contains(e.target)) {
          customSelect.classList.remove("open");
          valueList.classList.add("hidden");
        }
      });
    });

    showLessons(schedule); // Иначе добавляем лекции в DOM

    showMoreLessonsButton.addEventListener("click", () => {
      // Проверяем, раскрыт ли контейнер
      if (scheduleContainer.classList.contains("expanded")) {
        showLessons(schedule, false);
        scheduleContainer.classList.remove("expanded");
        showMoreLessonsButton.textContent = "Більше";
      } else {
        // Раскрываем контейнер
        showLessons(schedule, true);
        scheduleContainer.classList.add("expanded");
        showMoreLessonsButton.textContent = "Приховати";
      }
    });
  }

  function showLessons(schedule, all = false) {
    const time = selectedTimeInput.value;
    const level = selectLevelInput.value;
    let lessons = [...schedule];

    if (level !== "any")
      lessons = lessons.filter((lesson) => lesson.level.includes(level));

    if (time !== "any") {
      lessons = lessons.filter((lesson) => lesson.time.includes(time));
    }

    const screenWidth = window.innerWidth;

    if (screenWidth <= 480) {
      showMoreLessonsButton.style.display =
        lessons.length > 10 ? "block" : "none";
      lessons = all ? lessons : lessons.slice(0, 10);
    }

    scheduleContainer.innerHTML = "";

    lessons.forEach((lesson) => {
      const lessonElement = document.createElement("div");
      lessonElement.classList.add("schedule-card");
      lessonElement.classList.add(
        `${lesson.level === "з нуля" ? "zero" : lesson.level}`
      );

      lessonElement.innerHTML = `
            <span class="schedule-card_start">${
              lesson.timeStart ? `Старт: ${lesson.timeStart}` : ""
            }</span>
            <span class="schedule-card_level">${lesson.level}</span>
            <div class="schedule-card_info-container flex-row">
              <div class="schedule-card_info-headers">
                <p class="schedule-card_schedule">Розклад:</p>
                <p class="schedule-card_teacher">Викладач:</p>
                <p class="schedule-card_rate">Вартість:</p>
              </div>
              <div class="schedule-card_info-data">
                <p class="schedule-card_schedule">${lesson.schedule}</p>
                <p class="schedule-card_teacher">${lesson.teacher}</p>
                <p class="schedule-card_rate">${lesson.rate}</p></div>
              </div>
            </div>
            <button class="order">Записатися</button>
            <button class="show-more"></button>
            `;

      scheduleContainer.appendChild(lessonElement);
    });

    const showButtons = scheduleContainer.querySelectorAll(".show-more");

    showButtons.forEach((showButton) =>
      showButton.addEventListener("click", function () {
        const scheduleCard = this.closest(".schedule-card");
        console.log(scheduleCard);
        scheduleCard.classList.toggle("additional-info");
      })
    );
  }
});
