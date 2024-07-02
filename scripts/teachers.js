// заполнение учителей
const showMoreButton = document.querySelector(".show-more");
const teachersContainer = document.querySelector(".teachers-container");
const teachersSection = document.querySelector(".teachers");
const modalVideoContainer = document.querySelector("#video-modal");
const iframe = modalVideoContainer.querySelector("#videoIframe");
const closeModalButton = modalVideoContainer.querySelector(".close");

document.addEventListener("DOMContentLoaded", async (event) => {
  showTeachers(teachers);

  const pageTitle = document.title;

  teachers = await getTeachers(pageTitle);

  // Если учителей нет, скрываем секцию
  if (teachers.length === 0) {
    teachersSection.style.display = "none";
  } else {
    showTeachers(teachers);

    showMoreButton.addEventListener("click", () => {
      // Проверяем, раскрыт ли контейнер
      if (teachersContainer.classList.contains("expanded")) {
        teachersContainer.classList.remove("expanded");
        showMoreButton.textContent = "Всі викладачі";
        updateTotalHeight();
      } else {
        // Раскрываем контейнер
        teachersContainer.style.maxHeight = `${teachersContainer.scrollHeight}px`;
        teachersContainer.classList.add("expanded");
        showMoreButton.textContent = "Приховати";
      }
    });
  }

  // Обработчик для закрытия модального окна
  closeModalButton.addEventListener("click", () => closeVideoModal());

  // Закрытие модального окна при клике вне его содержимого
  document.querySelector("#video-modal").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeVideoModal();
    }
  });
});

function closeVideoModal() {
  modalVideoContainer.style.display = "none";
  iframe.src = ""; // Останавливаем видео
  document.body.style.overflow = "auto"; // Включаем прокрутку основного контента
}

function showTeachers(teachers) {
  teachersContainer.innerHTML = "";

  teachers.forEach((teacher) => {
    const teacherElement = document.createElement("div");
    teacherElement.classList.add("teacher");

    const link = teacher.link
      ? ` <button class="youtube-button" onclick="showTeacherVideo('${teacher.link}')">
                <img src="../assets/icons/icon_play.svg" alt="Icon" class="icon-play"/>
           </button>`
      : "";

    teacherElement.innerHTML = `
         <img
            src="../assets/teachers/${teacher.photo}.webp"
            alt="Photo of ${teacher.name}"
            class="teacher-photo"
            onload="handleImageLoad()"
          />
          <h3>${teacher.name}</h3>
          <p>“${teacher.description}”${link}</p>
        `;

    teachersContainer.appendChild(teacherElement);
  });
}

function showTeacherVideo(link) {
  console.log("Show YouTube Video", link);
  const modalVideoContainer = document.querySelector("#video-modal");
  var iframe = document.getElementById("videoIframe");

  iframe.src = link.includes("?") ? `${link}&autoplay=1` : `${link}?autoplay=1`;

  modalVideoContainer.style.display = "block";
}

function updateButtonVisibility() {
  const totalHeight = teachersContainer.scrollHeight;
  const visibleHeight = teachersContainer.clientHeight;

  showMoreButton.style.display = totalHeight > visibleHeight ? "block" : "none";
}

function updateTotalHeight() {
  const teachersCards = teachersContainer.querySelectorAll(".teacher");

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

function handleImageLoad() {
  updateTotalHeight();
  updateButtonVisibility();
}
