function setStateList(className, state) {
  const listContainer = document.querySelector(`.${className}`);
  resetListState(listContainer);
  listContainer.classList.add(state);
}

function resetListState(listContainer) {
  for (const className of listContainer.classList)
    if (className.search(/list-state-/) !== -1)
      listContainer.classList.remove(className);
}

