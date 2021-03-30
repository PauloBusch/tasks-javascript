window.addEventListener('load', loadTasks, false);

function loadTasks() {
  const request = new XMLHttpRequest();
  const token = localStorage.getItem('token');
  if (!token) logout();
  setStateList('task-list-container', LIST_LOADING);
  request.open('GET', `${API_HOST}/tasks`, true);
  request.onload = function(result) {
    const response = JSON.parse(result.currentTarget.response);
    if (result.currentTarget.status === 200) {
      fillTableTask(response.data);
      return;
    }

    alert('Falha ao carregar Tarefas!');
  };
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', `Bearer ${token}`);
  request.send();
}

function fillTableTask(data) {
  if (data.count === 0) {
    setStateList('task-list-container', LIST_NOT_FOUND);
    return;
  }

  const tableBody = document.querySelector('#task-list tbody');
  tableBody.innerHTML = '';
  for (const row of data.rows)
    tableBody.innerHTML += fillRowTask(row);

  tableEventsTask();
  setStateList('task-list-container', LIST_LOADED);
}

function fillRowTask(row) {
  return `
    <tr data-id=${row.id}>
      <th scope="row">${row.id}</th>
      <td>${row.type_name}</td>
      <td>${row.time || '-'}</td>
      <td>${fillActionsTask(row)}</td>
    </tr>
  `;
}

function fillActionsTask(row) {
  return `
    <i data-id=${row.id} title="Remover" class="list-action-remove far fa-trash-alt"></i>
    ${row.done
      ? `<i data-id=${row.id} title="Restaurar" class="list-action-restore fas fa-undo"></i>`
      : `<i data-id=${row.id} title="Finalizar" class="list-action-finish fas fa-check"></i>`
    }
    <i data-id=${row.id} title="Editar" class="list-action-edit fas fa-edit"></i>
  `;
}

function tableEventsTask() {
  const rows = document.querySelectorAll('.task-list-container tbody tr');
  for (const row of rows)
    tableEventsTaskFromId(row.getAttribute('data-id'));
}

function tableEventsTaskFromId(id) {
  const getId = event => event.currentTarget.getAttribute('data-id');
  const actionRemove = document.querySelector(`.task-list-container tr[data-id="${id}"] .list-action-remove`);
  const actionFinish = document.querySelector(`.task-list-container tr[data-id="${id}"] .list-action-finish`);
  const actionRestore = document.querySelector(`.task-list-container tr[data-id="${id}"] .list-action-restore`);
  const actionEdit = document.querySelector(`.task-list-container tr[data-id="${id}"] .list-action-edit`);
  actionRemove.addEventListener('click', event => confirmRemove(getId(event)));
  actionEdit.addEventListener('click', event => editTaskForm(getId(event)));
  if (actionFinish) actionFinish.addEventListener('click', event => finishTask(getId(event)));
  if (actionRestore) actionRestore.addEventListener('click', event => restoreTask(getId(event)));
}

function finishTask(id) {

}

function restoreTask(id) {

}

function confirmRemoveTask(id) {
  const modal = $('#confirm-remove');
  const submitButton = document.getElementById('submit-remove');
  modal.on('hidden.bs.modal', function (e) {
    submitButton.replaceWith(submitButton.cloneNode(true));
  })
  modal.modal('show');

  submitButton.addEventListener('click', async () => {
    modal.modal('hide');
    const row = document.querySelector(`.task-list-container tr[data-id="${id}"]`);
    row.remove();
    const count = document.querySelectorAll(`.task-list-container tbody tr`).length;
    if (count === 0) setStateList('task-list-container', LIST_NOT_FOUND);
  });
}
