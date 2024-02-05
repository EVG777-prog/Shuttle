document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger-menu");
  const menu = document.querySelector(".fullscreen-menu");
  const body = document.body;

  // Функция для переключения меню
  function toggleMenu() {
    burger.classList.toggle("open");
    menu.classList.toggle("show");

    // Проверяем, есть ли у body класс 'no-scroll'
    if (burger.classList.contains("open")) {
      // Добавляем класс 'no-scroll', убирая прокрутку
      body.classList.add("no-scroll");
    } else {
      // Удаляем класс 'no-scroll', возвращая прокрутку
      body.classList.remove("no-scroll");
    }
  }

  // Переключение меню при клике на бургер
  burger.addEventListener("click", toggleMenu);

  // Закрытие меню при клике на любой пункт меню
  menu.querySelectorAll("a").forEach(function (menuItem) {
    menuItem.addEventListener("click", toggleMenu);
  });
});
