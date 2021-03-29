window.addEventListener('load', sidenavEvents, false);

function sidenavEvents() {
  const menus = document.querySelectorAll('#menu .nav-link');
  for (const menu of menus)
    menu.addEventListener('click', toggleMenu, false);
}

function toggleMenu(event) {
  const menus = document.querySelectorAll('#menu .nav-link');
  for (const menu of menus)
    menu.classList.remove('active');
  event.currentTarget.classList.add('active');
}
