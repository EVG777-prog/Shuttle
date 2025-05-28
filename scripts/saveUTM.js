document.addEventListener("DOMContentLoaded", () => {
  saveInitialParams();

  // Сохраняем UTM и реферер при первом визите
  function saveInitialParams() {
    const utmKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];
    const refKey = "utm_referrer";

    const params = new URLSearchParams(window.location.search);

    // Сохраняем только если ещё не сохранены ранее
    utmKeys.forEach((key) => {
      if (!localStorage.getItem(key)) {
        const value = params.get(key);
        if (value) {
          localStorage.setItem(key, value);
        }
      }
    });

    // Сохраняем referrer, если он внешний и ещё не сохранён
    const isReferrerExternal =
      document.referrer && !document.referrer.includes(location.hostname); // исключаем внутренние переходы

    if (!localStorage.getItem(refKey) && isReferrerExternal) {
      localStorage.setItem(refKey, document.referrer);
    }
  }
});
