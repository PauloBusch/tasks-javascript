function setStateForm(id, state) {
  const formContainer = document.querySelector(`#${id}`);
  resetFormState(formContainer);
  formContainer.classList.add(state);
}

function resetFormState(formContainer) {
  for (const className of formContainer.classList)
    if (className.search(/form-state-/) !== -1)
      formContainer.classList.remove(className);
}

function resetForm(form) {
  form.classList.remove('was-validated');
  form.reset();
}
