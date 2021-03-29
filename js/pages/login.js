window.addEventListener('load', loginEvents, false);

function loginEvents() {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', loginSubmit, false);
}

function loginSubmit(event) {
  event.preventDefault();
  event.stopPropagation();
  const loginForm = document.getElementById('login-form');
  loginForm.classList.add('was-validated');
  if (loginForm.checkValidity()) postLogin(loginForm);
}

function postLogin(loginForm) {
  const formData = new FormData(loginForm);
}
