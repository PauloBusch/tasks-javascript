window.addEventListener('load', loadTypes, false);

function loadTypes() {
  const request = new XMLHttpRequest();
  const token = localStorage.getItem('token');
  if (!token) logout();
  setStateList('type-list-container', LIST_LOADING);
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
    setStateList('type-list-container', LIST_NOT_FOUND);
    return;
  }

  const tableBody = document.querySelector('#type-list tbody');
  tableBody.innerHTML = '';
  for (const row of data.rows)
    tableBody.innerHTML += fillRow(row);

  tableEvents();
  setStateList('type-list-container', LIST_LOADED);
}

function fillRow(row) {
  return `
    <tr data-id=${row.id}>
      <th scope="row">${row.id}</th>
      <td>${row.name}</td>
      <td>${fillActions(row)}</td>
    </tr>
  `;
}

function fillActions(row) {
  return `
    <i data-id=${row.id} title="Remover" class="list-action-remove far fa-trash-alt"></i>
    <i data-id=${row.id} title="Editar" class="list-action-edit fas fa-edit"></i>
  `;
}

function tableEvents() {
  const rows = document.querySelectorAll('.type-list-container tbody tr');
  for (const row of rows)
    tableEventsFromId(row.getAttribute('data-id'));
}

function tableEventsFromId(id) {
  const getId = event => event.currentTarget.getAttribute('data-id');
  const actionRemove = document.querySelector(`.type-list-container tr[data-id="${id}"] .list-action-remove`);
  const actionEdit = document.querySelector(`.type-list-container tr[data-id="${id}"] .list-action-edit`);
  actionRemove.addEventListener('click', event => confirmRemove(getId(event)));
  actionEdit.addEventListener('click', event => editTypeForm(getId(event)));
}

function confirmRemove(id) {
  const modal = $('#confirm-remove');
  const submitButton = document.getElementById('submit-remove');
  modal.on('hidden.bs.modal', function (e) {
    submitButton.replaceWith(submitButton.cloneNode(true));
  })
  modal.modal('show');

  submitButton.addEventListener('click', async () => {
    await removeType(id);
    modal.modal('hide');
    const row = document.querySelector(`.type-list-container tr[data-id="${id}"]`);
    row.remove();
    const count = document.querySelectorAll(`.type-list-container tbody tr`).length;
    if (count === 0) setStateList('type-list-container', LIST_NOT_FOUND);
  });
}

async function removeType(id) {
  const token = localStorage.getItem('token');
  if (!token) logout();
  const request = new XMLHttpRequest();
  request.open('DELETE', `${API_HOST}/types/${id}`, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', `Bearer ${token}`);
  await new Promise((resolve, reject) => {
    request.onload = function(result) {
      if (result.currentTarget.status === 200) {
        resolve();
        return;
      }
  
      alert('Falha ao remover registro!');
      reject();
    };
    request.send();
  });
}
