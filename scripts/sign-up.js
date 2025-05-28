document.addEventListener("DOMContentLoaded", (event) => {
  emailjs.init("-sRJivwCLAK6_wDTd");

  // Получаем модальное окно
  const modal = document.getElementById("myModal");

  // Получаем все кнопки, которые открывают модальное окно
  const btns = document.querySelectorAll(".apply-button");
  // Добавляем обработчик событий для каждой кнопки
  btns.forEach(function (btn) {
    btn.onclick = function () {
      modal.style.display = "block";
      document.body.classList.add("no-scroll");
    };
  });

  // Когда пользователь кликает вне модального окна, закрыть его
  window.onclick = function (event) {
    if (event.target == modal) {
      closeModalAndResetForm();
    }
  };

  // Добавление обработчика события закрытия модального окна
  document
    .querySelector(".modal .close-button")
    .addEventListener("click", function () {
      closeModalAndResetForm();
    });

  // Закрытие модального окна и сброс формы
  function closeModalAndResetForm() {
    // Закрытие модального окна
    // const modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
    modal.classList.remove("schedule");

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

        utm_source: localStorage.getItem("utm_source"),
        utm_medium: localStorage.getItem("utm_medium"),
        utm_campaign: localStorage.getItem("utm_campaign"),
        utm_term: localStorage.getItem("utm_term"),
        utm_content: localStorage.getItem("utm_content"),
        utm_referrer: localStorage.getItem("utm_referrer"),
      };

      if (modal.classList.contains("schedule")) {
        formData.lesson = modal.dataset.lesson;
        formData.language = document.title;
      }

      // Отправляем письмо с помощью EmailJS
      emailjs.send("service_cxrlixg", "template_nwvu1pd", formData).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          closeModalAndResetForm(); // Закрытие модального окна и сброс формы после успешной отправки
          setTimeout(() => {
            alert("Заявку успішно надіслано! Незабаром ми з вами зв'яжемось.");
          }, 100); // Задержка в 100 миллисекунд (можете настроить по необходимости)
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Помилка надсилання заявки. Спробуйте ще раз.");
        }
      );
    });

  // Получаем все кастомные селекты
  const customSelects = document.querySelectorAll(".modal .custom-select");

  customSelects.forEach(function (customSelect) {
    const selectedValue = customSelect.querySelector(".selected-value");
    const valueList = customSelect.querySelector(".value-list");
    const hiddenInput = customSelect.querySelector("input[type=hidden]"); // Предполагается, что у каждого селекта есть свой скрытый input

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
