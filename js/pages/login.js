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
  if (loginForm.checkValidity()) postLogin();
}

function postLogin() {
  const button = document.getElementById('submit-login');
  const request = new XMLHttpRequest();
  button.classList.add('disabled');
  request.open('POST', `${OAPI_HOST}/login`, true);
  request.onload = function(result) {
    button.classList.remove('disabled');
    const response = JSON.parse(result.currentTarget.response);
    if (result.currentTarget.status === 200) {
      localStorage.setItem('token', response.data.token);
      location.href = 'index.html';
      return;
    }

    if (response.errors && response.errors.length > 0) {
      const credentialsError = 'Invalid email or password';
      if (response.errors.some(e => e === credentialsError)) {
        alert('Usuário/Senha inválidos!');
        return;
      }
    }

    alert('Erro ao realizar login!');
  };
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(getLoginData()));
}

function getLoginData() {
  return {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
}
