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
  for (const row of data.rows)
    tableBody.innerHTML += fillRow(row);

  tableEvents();
  toggleLoadingList('type-list-container', LIST_LOADED);
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
  const actionsRemove = document.querySelectorAll('.type-list-container .list-action-remove');
  const actionsEdit = document.querySelectorAll('.type-list-container .list-action-edit');
  const getId = event => event.currentTarget.getAttribute('data-id');
  for (const action of actionsRemove)
    action.addEventListener('click', event => confirmRemove(getId(event)));
  for (const action of actionsEdit)
    action.addEventListener('click', event => editType(getId(event)));
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
    if (count === 0) toggleLoadingList('type-list-container', LIST_NOT_FOUND);
  });
}

async function removeType(id) {
  const request = new XMLHttpRequest();
  const token = localStorage.getItem('token');
  request.open('DELETE', `${API_HOST}/types/${id}`, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', `Bearer ${token}`);
  await new Promise((resolve, reject) => {
    request.onload = function(result) {
      if (result.currentTarget.status === 200) {
        resolve();
        return;
      }
  
      alert('Falha ao remover Tipo!');
      reject();
    };
    request.send();
  });
}

function editType(id) {

}
