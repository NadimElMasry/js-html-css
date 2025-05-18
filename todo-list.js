const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

const inputElement = document.querySelector('.js-name-input');
inputElement.addEventListener('keydown', (event) => {
  handleKeydown(event);
});

const dateInputELement = document.querySelector('.js-due-date-input');
dateInputELement.addEventListener('keydown', (event) => {
  handleKeydown(event);
});

function addTodo() {  
  const name = inputElement.value;  
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

  todoList.forEach((todoObject, index) => {
    if (!todoObject || typeof todoObject !== 'object' || !todoObject.name) {
      return;
    } /* In case broken data was accidentally saved in localStorage (if the item is not a valid object or has no name), the return statement in this code exits the function. */
    
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject;

    const html = `
    <div>${name}</div>
    <div>${dueDate}</div> 
    <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `;
    todoElementHTML += html;
  });
    
  document.querySelector('.js-todo-list').innerHTML = todoElementHTML;
  
  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {  
        todoList.splice(index, 1);
        renderTodoList();
        saveToStorage();
      })
    });
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function handleKeydown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}
