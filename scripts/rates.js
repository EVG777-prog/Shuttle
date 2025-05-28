document.addEventListener("DOMContentLoaded", async (event) => {
  // заполнение тарифов
  const ratesList = document.querySelector(".rates-container");

  showRates();

  rates = await getRates();

  showRates();

  function showRates() {
    ratesList.innerHTML = "";

    rates.forEach((rate) => {
      if (rate.details.length > 0) {
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
      }
    });

    // Получаем модальное окно
    const modal = document.getElementById("myModal");

    // Получаем все кнопки, которые открывают модальное окно
    const btns = ratesList.querySelectorAll(".apply-button");

    // Добавляем обработчик событий для каждой кнопки
    btns.forEach(function (btn) {
      btn.onclick = function () {
        modal.style.display = "block";
        document.body.classList.add("no-scroll");
      };
    });
  }
});
