document.addEventListener("DOMContentLoaded", (event) => {
  // Получаем модальное окно
  const modal = document.getElementById("myModal");

  // Получаем все кнопки, которые открывают модальное окно
  const btns = document.querySelectorAll(".apply-button");

  // Получаем элемент <span>, который закрывает модальное окно
  const span = document.getElementsByClassName("close-button")[0];

  // Добавляем обработчик событий для каждой кнопки
  btns.forEach(function (btn) {
    btn.onclick = function () {
      modal.style.display = "block";
    };
  });

  // Когда пользователь кликает на <span> (x), закрыть модальное окно
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Когда пользователь кликает вне модального окна, закрыть его
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Получаем все кастомные селекты
  var customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach(function (customSelect) {
    var selectedValue = customSelect.querySelector(".selected-value");
    var valueList = customSelect.querySelector(".value-list");
    var hiddenInput = customSelect.querySelector("input[type=hidden]"); // Предполагается, что у каждого селекта есть свой скрытый input

    // Обработчик клика по выбранному значению
    selectedValue.addEventListener("click", function () {
      valueList.classList.toggle("hidden");
    });

    // Обработчик клика по элементу списка
    valueList.addEventListener("click", function (e) {
      if (e.target.tagName.toLowerCase() === "li") {
        selectedValue.textContent = e.target.textContent;
        selectedValue.dataset.value = e.target.dataset.value;
        hiddenInput.value = e.target.dataset.value; // Обновляем значение скрытого input
        valueList.classList.add("hidden");
      }
    });
  });

  // Закрытие всех открытых списков при клике вне селектов
  document.addEventListener("click", function (e) {
    customSelects.forEach(function (customSelect) {
      var valueList = customSelect.querySelector(".value-list");
      if (!customSelect.contains(e.target)) {
        valueList.classList.add("hidden");
      }
    });
  });
});
