document.addEventListener("DOMContentLoaded", (event) => {
  // заполнение тарифов
  const cardsList = document.querySelector(".payment-cards");

  rates.forEach((rate) => {
    const rateElement = document.createElement("div");
    rateElement.classList.add("payment-card");

    rateElement.innerHTML = `
            <p class="name">${rate.name}</p>
            <p class="price">${rate.price} грн.</p>
            <p class="duration">${rate.duration}</p>
            <p class="quantity">${rate.quantity} ${
      rate.quantity == 1 ? "урок" : "уроків"
    }</p>
          `;

    cardsList.appendChild(rateElement);
  });
});
