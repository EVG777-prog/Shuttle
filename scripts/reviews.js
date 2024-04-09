document.addEventListener("DOMContentLoaded", async function () {
  const link = document.querySelector(".google-button");
  const reviewsCount = document.querySelector(".reviews-count");

  const countGoogleReviews = await getCountGoogleReviews();

  reviewsCount.textContent = `${countGoogleReviews} відгуків`;

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
        "https://www.google.com/search?sca_esv=eff03c613f9494ac&hl=uk&authuser=0&tbm=lcl&sxsrf=ACQVn0_ROyG1brA8oHWroGa5ouUdKxMduA:1707416807289&q=Shuttle+school+%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD+%D1%88%D0%BA%D0%BE%D0%BB%D0%B0+%D1%96%D0%BD%D0%BE%D0%B7%D0%B5%D0%BC%D0%BD%D0%B8%D1%85+%D0%BC%D0%BE%D0%B2+%D0%92%D1%96%D0%B4%D0%B3%D1%83%D0%BA%D0%B8&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDA1NTazMDE3tzQzszAzNDAyMdrAyPiK0T84o7SkJCdVoTg5Iz8_R-HCvgt7L-y-sOHCzgt7FS52XNgFFAByFS5OA4rvu7D9wtYLe4CsHRdbFYCMfRc2KVyYBJTbcmHzxWag4h2LWKltIgBb0UGavwAAAA&rldimm=10553684779668610242&sa=X&ved=2ahUKEwi0m5-ir5yEAxX-UqQEHZDwCDMQ9fQKegQIPRAF#lkt=LocalPoiReviews"
      );
    }
  }

  // Проверить при загрузке страницы
  updateLink();

  // Проверить при изменении размера окна
  window.addEventListener("resize", updateLink);
});
