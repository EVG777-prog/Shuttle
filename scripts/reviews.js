document.addEventListener("DOMContentLoaded", function () {
  var link = document.querySelector(".google-button");

  function updateLink() {
    if (window.innerWidth <= 768) {
      // Установить ссылку для мобильных устройств
      link.setAttribute(
        "href",
        "https://search.google.com/local/reviews?placeid=ChIJnzEo1yXP1EARwhyYK2Q4dpI"
      );
    } else {
      // Установить ссылку для десктопов
      link.setAttribute(
        "href",
        "https://www.google.com/search?sca_esv=601771759&tbm=lcl&q=Shuttle+school+%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD+%D1%88%D0%BA%D0%BE%D0%BB%D0%B0+%D1%96%D0%BD%D0%BE%D0%B7%D0%B5%D0%BC%D0%BD%D0%B8%D1%85+%D0%BC%D0%BE%D0%B2+%D0%9E%D1%82%D0%B7%D1%8B%D0%B2%D1%8B&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDA1NTazMDE3tzQzszAzNDAyMdrAyPiK0Tc4o7SkJCdVoTg5Iz8_R-HCvgt7L-y-sOHCzgt7FS52XNgFFAByFS5OA4rvu7D9wtYLe4CsHRdbFYCMfRc2KVyYd7HpwvaL3Rc2XexexEpd8wCjn7H_uwAAAA&rldimm=10553684779668610242&hl=ru-FR&sa=X&ved=2ahUKEwjUisHOy_uDAxW7TKQEHSKiB2gQ9fQKegQIOxAF&biw=1440&bih=760&dpr=2#lkt=LocalPoiReviews"
      );
    }
  }

  // Проверить при загрузке страницы
  updateLink();

  // Проверить при изменении размера окна
  window.addEventListener("resize", updateLink);
});
