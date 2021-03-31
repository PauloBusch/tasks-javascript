window.addEventListener('load', sidenavEvents, false);

function sidenavEvents() {
  const menus = document.querySelectorAll('#menu .nav-link');
  for (const menu of menus)
    menu.addEventListener('click', toggleMenu, false);
    
  document.querySelector('#menu .nav-link[href="#types"]').addEventListener('click', loadTypes);
  document.querySelector('#menu .nav-link[href="#tasks"]').addEventListener('click', loadTasks);
  
  const hash = location.hash || '#dashboard';
  document.querySelector(`a[href="${hash}"]`).click();
}

function toggleMenu(event) {
  const menus = document.querySelectorAll('#menu .nav-link');
  for (const menu of menus)
    menu.classList.remove('active');
  event.currentTarget.classList.add('active');
  toggleContent(event.currentTarget.getAttribute('href'));
}

function toggleContent(hash) {
  const contents = document.querySelectorAll('#pages li');
  for (const content of contents)
    content.classList.remove('active');
  const contentToActive = document.querySelector(`#pages li${hash}`);
  contentToActive.classList.add('active');  
}
