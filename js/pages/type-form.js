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
    const rowHTML = fillRow(data);
    const tableBody = document.querySelector('#type-list tbody');
    tableBody.innerHTML = rowHTML + tableBody.innerHTML;
    const count = document.querySelectorAll(`.type-list-container tbody tr`).length;
    if (count > 0) setStateList('type-list-container', LIST_LOADED);
  });
}

function editTypeForm(id) {
  setStateForm('modal-type', FORM_LOADING);
}

function getTypeData() {
  return {
    id: document.querySelector('#type-form [name=id]').value || NewId(),
    name: document.querySelector('#type-form [name=name]').value
  }
}

async function createType(data) {
  const token = localStorage.getItem('token');
  if (!token) logout();
  const request = new XMLHttpRequest();
  request.open('POST', `${API_HOST}/types`, true);
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

async function updateType(data) {
  
}
