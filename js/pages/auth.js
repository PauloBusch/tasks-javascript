window.addEventListener('load', checkAuthentication, false);

function checkAuthentication() {
  const request = new XMLHttpRequest();
  const token = localStorage.getItem('token');
  if (!token) logout();
  request.open('POST', `${OAPI_HOST}/validate-token`, true);
  request.onload = function(result) {
    const response = JSON.parse(result.currentTarget.response);
    if (result.currentTarget.status === 200) {
      if (response.data.isValid) {
        window.currentUser = response.data.token.user;
        return;
      }
    }

    logout();
  };
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({ token: token }));
}
