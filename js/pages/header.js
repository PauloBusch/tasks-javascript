window.addEventListener('load', headerEvents, false);

function headerEvents() {
  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', logout, false);
}

function logout() {
  localStorage.removeItem('token');
  location.href = 'login.html';
}
