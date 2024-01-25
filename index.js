document.addEventListener("DOMContentLoaded", function () {
  var burger = document.querySelector(".burger-menu");
  var menu = document.querySelector(".fullscreen-menu");

  burger.addEventListener("click", function () {
    burger.classList.toggle("open");
    menu.classList.toggle("show");

    const body = document.body;

    // Проверяем, есть ли у body класс 'no-scroll'
    if (body.classList.contains("no-scroll")) {
      // Удаляем класс 'no-scroll', возвращая прокрутку
      body.classList.remove("no-scroll");
    } else {
      // Добавляем класс 'no-scroll', убирая прокрутку
      body.classList.add("no-scroll");
    }
  });
});
