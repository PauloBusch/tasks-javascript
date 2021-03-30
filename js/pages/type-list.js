window.addEventListener('load', loadTypes, false);

function loadTypes() {
  const request = new XMLHttpRequest();
  const token = localStorage.getItem('token');
  toggleLoadingList('type-list-container', LIST_LOADING);
  request.open('GET', `${API_HOST}/types`, true);
  request.onload = function(result) {
    const response = JSON.parse(result.currentTarget.response);
    if (result.currentTarget.status === 200) {
      fillTable(response.data);
      return;
    }

    alert('Falha ao carregar Tipos!');
  };
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', `Bearer ${token}`);
  request.send();
}

function fillTable(data) {
  if (data.count === 0) {
    toggleLoadingList('type-list-container', LIST_NOT_FOUND);
    return;
  }

  const tableBody = document.querySelector('#type-list tbody');
  tableBody.innerHTML = '';
  const parse = Range.prototype.createContextualFragment.bind(document.createRange());
  for (const row of data.rows)
    tableBody.innerHTML += fillRow(row);

  toggleLoadingList('type-list-container', LIST_LOADED);
}

function fillRow(row) {
  return `
    <tr data-id=${row.id}>
      <th scope="row">${row.id}</th>
      <td>${row.name}</td>
      <td>${fillActions()}</td>
    </tr>
  `;
}

function fillActions() {
  return `
    <i title="Remover" class="list-action-remove far fa-trash-alt"></i>
    <i title="Editar" class="list-action-edit fas fa-edit"></i>
  `;
}
