document.addEventListener("DOMContentLoaded", function () {
  // Прикрепление события клик к каждому вопросу
  document.querySelectorAll(".faq-question").forEach(function (question) {
    question.addEventListener("click", function () {
      // Переключение активного класса для родительского элемента
      const item = this.parentNode;
      item.classList.toggle("active");

      // Переключение иконки и анимация раскрытия/закрытия ответа
      const icon = this.querySelector(".faq-icon");
      const answer = this.nextElementSibling;

      if (item.classList.contains("active")) {
        icon.src = "../assets/icons/icon_minus.png"; // путь к изображению для активного состояния
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        icon.src = "../assets/icons/icon_plus.png"; // путь к изображению для неактивного состояния
        answer.style.maxHeight = "0";
      }
    });
  });
});
