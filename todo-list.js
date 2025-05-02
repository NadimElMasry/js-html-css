const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputELement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputELement.value;

  todoList.push({
    // name: name,
    // dueDate: dueDate
    name,
    dueDate
  });

  inputElement.value = '';

  renderTodoList();

  saveToStorage();
}

function renderTodoList() {
  let todoElementHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];

    if (!todoObject || typeof todoObject !== 'object' || !todoObject.name) {
      continue;
    } /* In case broken data was accidentally saved in localStorage (if the item is not a valid object or has no name), this code skips the loop. */
    
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject;

    const html = `
    <div>${name}</div>
    <div>${dueDate}</div> 
    <button onclick="
      todoList.splice(${i}, 1);
      renderTodoList();
      saveToStorage();
    " class="delete-todo-button">Delete</button>
    `;
    todoElementHTML += html;
  }  
  document.querySelector('.js-todo-list').innerHTML = todoElementHTML;
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function handleKeydown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}
