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
});
