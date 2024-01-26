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
        icon.textContent = "-";
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        icon.textContent = "+";
        answer.style.maxHeight = "0";
      }
    });
  });
});
