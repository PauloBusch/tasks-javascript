window.addEventListener('load', formEvents, false);

function formEvents() {
  const buttonAdd = document.getElementById('add-type');
  buttonAdd.addEventListener('click', newTypeForm);
}

function newTypeForm() {
  setStateForm('modal-type', FORM_CREATE);
  const modal = $('#modal-type');
  const typeForm = document.getElementById('type-form');
  const submitButton = document.getElementById('submit-save-type');
  modal.on('hidden.bs.modal', function (e) {
    submitButton.replaceWith(submitButton.cloneNode(true));
  })

  resetForm(typeForm);
  modal.modal('show');

  submitButton.addEventListener('click', async () => {
    typeForm.classList.add('was-validated');
    if (!typeForm.checkValidity()) return;

    const data = getTypeData();
    await createType(data);

    modal.modal('hide');

    const rowHTML = fillRowType(data);
    const tableBody = document.querySelector('#type-list tbody');
    tableBody.innerHTML = rowHTML + tableBody.innerHTML;
    tableEventsTypeFromId(data.id);

    const count = document.querySelectorAll(`.type-list-container tbody tr`).length;
    if (count > 0) setStateList('type-list-container', LIST_LOADED);
  });
}

async function editTypeForm(id) {
  setStateForm('modal-type', FORM_LOADING);
  const modal = $('#modal-type');
  const typeForm = document.getElementById('type-form');
  const submitButton = document.getElementById('submit-save-type');
  modal.on('hidden.bs.modal', function (e) {
    submitButton.replaceWith(submitButton.cloneNode(true));
  })

  resetForm(typeForm);
  modal.modal('show');
  
  const data = await getType(id);
  setTypeData(data);
  setStateForm('modal-type', FORM_UPDATE);

  submitButton.addEventListener('click', async () => {
    typeForm.classList.add('was-validated');
    if (!typeForm.checkValidity()) return;

    const data = getTypeData();
    await updateType(data);

    modal.modal('hide');
    const row = document.querySelector(`.type-list-container tr[data-id="${id}"]`);
    row.innerHTML = fillRowType(data);
    tableEventsTypeFromId(data.id);
  });
}

function getTypeData() {
  return {
    id: document.querySelector('#type-form [name=id]').value || NewId(),
    name: document.querySelector('#type-form [name=name]').value
  }
}

function setTypeData(data) {
  document.querySelector('#type-form [name=id]').value = data.id;
  document.querySelector('#type-form [name=name]').value = data.name;
}

async function getType(id) {
  const token = localStorage.getItem('token');
  if (!token) logout();
  const request = new XMLHttpRequest();
  request.open('GET', `${API_HOST}/types/${id}`, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', `Bearer ${token}`);
  return await new Promise((resolve, reject) => {
    request.onload = function(result) {
      const response = JSON.parse(result.currentTarget.response);
      if (result.currentTarget.status === 200) {
        resolve(response.data);
        return;
      }

      if (result.currentTarget.status === 404) {
        alert('Tipo não encontrado!');
        reject();
        return;
      }
  
      alert('Falha ao obter Tipo!');
      reject();
    };
    request.send();
  });
}

async function createType(data) {
  await requestType(data, 'POST');
}

async function updateType(data) {
  await requestType(data, 'PUT');
}

async function requestType(data, method) {
  const token = localStorage.getItem('token');
  if (!token) logout();
  const request = new XMLHttpRequest();
  request.open(method, getUrlFromMethod(data, method), true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', `Bearer ${token}`);
  await new Promise((resolve, reject) => {
    request.onload = function(result) {
      if (result.currentTarget.status === 200) {
        resolve();
        return;
      }

      if (result.currentTarget.status === 409) {
        alert('Já existe um Tipo com esse nome cadastrado!');
        reject();
        return;
      }
  
      alert('Falha ao salvar Tipo!');
      reject();
    };
    request.send(JSON.stringify(data));
  });
}

function getUrlFromMethod(data, method) {
  if (method === 'POST') return `${API_HOST}/types`;
  if (method === 'PUT') return `${API_HOST}/types/${data.id}`;
}
