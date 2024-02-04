document.addEventListener("DOMContentLoaded", function () {
  // Закрытие модального окна и сброс формы
  function closeModalAndResetForm() {
    // Закрытие модального окна
    const modal = document.getElementById("myModal");
    modal.style.display = "none";

    // Сброс формы
    document.querySelector(".modal-form").reset();

    // Сброс полей выбора на значения по умолчанию
    const defaultLanguage = "Французька"; // Измените на ваше значение по умолчанию, если необходимо
    document.querySelector("#selectedLanguage").value = defaultLanguage;
    document.querySelector(
      ".selected-value[data-default='french']"
    ).textContent = defaultLanguage;

    const defaultExperience = "Ні, потрібно з нуля"; // Измените на ваше значение по умолчанию, если необходимо
    document.querySelector("#experience").value = "no";
    document.querySelector(".selected-value[data-default='no']").textContent =
      defaultExperience;
  }

  // Добавление обработчика события закрытия модального окна
  document
    .querySelector(".modal .close-button")
    .addEventListener("click", function () {
      closeModalAndResetForm();
    });

  document
    .querySelector(".modal-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Предотвращаем стандартную отправку формы

      // Собираем данные формы
      const formData = {
        name: document.getElementById("name").value,
        telegram: document.getElementById("telegram").value,
        phone: document.getElementById("phone").value,
        language: document.querySelector(
          ".selected-value[data-default='french']"
        ).textContent, // Использование текста выбранного элемента
        experience: document.querySelector(".selected-value[data-default='no']")
          .textContent, // Использование текста выбранного элемента
      };

      // Отправляем письмо с помощью EmailJS
      emailjs.send("service_yv1i8y2", "template_455bdyt", formData).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("Заявку успішно надіслано!");
          closeModalAndResetForm(); // Закрытие модального окна и сброс формы после успешной отправки
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Помилка надсилання заявки. Спробуйте ще раз.");
        }
      );
    });
});
