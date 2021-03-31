window.addEventListener('load', formEvents, false);

function formEvents() {
  const buttonAdd = document.getElementById('add-task');
  buttonAdd.addEventListener('click', newTaskForm);
}

async function newTaskForm() {
  setStateForm('modal-task', FORM_CREATE);
  const modal = $('#modal-task');
  const taskForm = document.getElementById('task-form');
  const submitButton = document.getElementById('submit-save-task');
  modal.on('hidden.bs.modal', function (e) {
    submitButton.replaceWith(submitButton.cloneNode(true));
  })

  await resetTaskForm(taskForm);
  modal.modal('show');

  submitButton.addEventListener('click', async () => {
    taskForm.classList.add('was-validated');
    if (!taskForm.checkValidity()) return;

    const data = getTaskData();
    modal.modal('hide');

    const rowHTML = fillRowTask(data);
    const tableBody = document.querySelector('#task-list tbody');
    tableBody.innerHTML = rowHTML + tableBody.innerHTML;
    tableEventsTaskFromData(data);

    const count = document.querySelectorAll(`.task-list-container tbody tr`).length;
    if (count > 0) setStateList('task-list-container', LIST_LOADED);
  });
}

async function editTaskForm(data) {
  setStateForm('modal-task', FORM_LOADING);
  const modal = $('#modal-task');
  const taskForm = document.getElementById('task-form');
  const submitButton = document.getElementById('submit-save-task');
  modal.on('hidden.bs.modal', function (e) {
    submitButton.replaceWith(submitButton.cloneNode(true));
  })

  await resetTaskForm(taskForm);
  modal.modal('show');
  
  setTaskData(data);
  setStateForm('modal-task', FORM_UPDATE);

  submitButton.addEventListener('click', async () => {
    taskForm.classList.add('was-validated');
    if (!taskForm.checkValidity()) return;

    const data = getTaskData();

    modal.modal('hide');
    const row = document.querySelector(`.task-list-container tr[data-id="${data.id}"]`);
    row.innerHTML = fillRowTask(data);
    tableEventsTaskFromData(data);
  });
}

async function resetTaskForm() {
  const taskForm = document.getElementById('task-form');
  const typesField = document.getElementById('type');
  await fillTypes();
  resetForm(taskForm);
  typesField.value = null;
}

function getTaskData() {
  return {
    id: document.querySelector('#task-form [name=id]').value || NewId(),
    type_id: document.querySelector('#task-form [name=type]').value,
    type_name: getTypeName(),
    time: document.querySelector('#task-form [name=time_start]').value,
    time_start: document.querySelector('#task-form [name=time_start]').value,
    time_end: document.querySelector('#task-form [name=time_end]').value
  }
}

function getTypeName() {
  const type = document.querySelector('#task-form [name=type]');
  if (type.tagName === 'SELECT') {
    return type.selectedIndex !== -1
      ? type.options[type.selectedIndex].text
      : '';
  }

  if (type.tagName === 'INPUT') return type.value;

  return '';
}

function getTypeIndex(id) {
  const type = document.querySelector('#task-form [name=type]');
  for (const option of type.options) {
    if (option.value === id) return option.index;
  }
  return -1;
}

function setTaskData(data) {
  document.querySelector('#task-form [name=id]').value = data.id;
  document.querySelector('#task-form [name=time_start]').value = '09:00';
  document.querySelector('#task-form [name=time_end]').value = '10:30';
  const index = getTypeIndex(data.type_id);
  const type = document.querySelector('#task-form [name=type]');
  setTimeout(() => {
    type.selectedIndex = index;
    if (index === -1) type.value = 0; 
  }, 0);
}

async function fillTypes() {
  const { rows } = await getTypesSelect();
  const typesContainer = document.querySelector('.type-group');
  typesContainer.innerHTML = templateTypesField(rows, false);
  const typesField = document.getElementById('type');
  setTimeout(() => typesField.value = 0, 0);
  typesField.addEventListener('change', onChangeType);
}

function templateTypesField(types, insertNew) {
  return `
    <label class="control-label" for="type">Tipo:</label>
    ${insertNew
      ? `<div class="inside-icon">
          <i title="fechar" onclick="fillTypes()" class="fa fa-times" aria-hidden="true"></i>
          <input class="form-control" name="type" id="type" placeholder="Nome do tipo" type="text" required/>
        </div>`
      : `    
        <select class="form-control" name="type" id="type" type="text" required>
          <option value="new">[Criar Novo]</option>
          ${types.map(t => `<option value="${t.id}">${t.name}</option>`)}
        </select>`
    }
    <div class="invalid-feedback">Informe o tipo</div>
  `;
}

function onChangeType(event) {
  if (event.currentTarget.value === 'new')
    crateNewType();
}

function crateNewType() {
  const typesContainer = document.querySelector('.type-group');
  typesContainer.innerHTML = templateTypesField(undefined, true);
  document.getElementById('type').focus();
}

function cancelNewType() {

}

async function getTypesSelect() {
  const token = localStorage.getItem('token');
  if (!token) logout();
  const request = new XMLHttpRequest();
  request.open('GET', `${API_HOST}/types`, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', `Bearer ${token}`);
  return await new Promise((resolve, reject) => {
    request.onload = function(result) {
      const response = JSON.parse(result.currentTarget.response);
      if (result.currentTarget.status === 200) {
        resolve(response.data);
        return;
      }
  
      alert('Falha ao obter lista de Tipos!');
      reject();
    };
    request.send();
  });
}
