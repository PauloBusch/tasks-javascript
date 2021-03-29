window.addEventListener('load', sidenavEvents, false);

function sidenavEvents() {
  const menus = document.querySelectorAll('#menu .nav-link');
  for (const menu of menus)
    menu.addEventListener('click', toggleMenu, false);

  const menuActiveHash = document.querySelector(`a[href="${location.hash || '#dashboard'}"]`);
  menuActiveHash.classList.add('active');
}

function toggleMenu(event) {
  const menus = document.querySelectorAll('#menu .nav-link');
  for (const menu of menus)
    menu.classList.remove('active');
  event.currentTarget.classList.add('active');
}
