document.addEventListener("DOMContentLoaded", (event) => {
  // заполнение тарифов
  const ratesList = document.querySelector(".rates-container");

  rates.forEach((rate) => {
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
  });
});
