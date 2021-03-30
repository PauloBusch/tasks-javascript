function setStateList(className, state) {
  const formContainer = document.querySelector(`.${className}`);
  resetListState(formContainer);
  formContainer.classList.add(state);
}

function resetListState(formContainer) {
  for (const className of formContainer.classList)
    if (className.search(/form-state-/) !== -1)
      formContainer.classList.remove(className);
}

