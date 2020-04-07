// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load All Event Listeners

loadEventListeners();

// Load all event listeners
function loadEventListeners(){
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task Event
  form.addEventListener('submit', addTask);
  // Remove Task
  taskList.addEventListener('click', removeTask);
  // Clear Tasks
  clearBtn.addEventListener('click', deleteTask);
  //Filter Tasks
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks
function getTasks(){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create TextNode and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }else{
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create TextNode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);

    //Store to local storage
    storeTaskToLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = '';
  }

  e.preventDefault();
}


//Store Tasks
function storeTaskToLocalStorage(task){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  // e.preventDefault();
}

// Remove Task
function removeTask(e){

  // if(e.target.classList.value === 'fa fa-remove'){
  //   e.target.parentElement.parentElement.remove();
  // }

  //Course Edition
  if(e.target.parentElement.classList.contains('delete-item')){
    console.log();
    if(confirm('Remove task item?')){
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    
  }

}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Delete Task
function deleteTask(){
  if(confirm('Clear task list?')){
    
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
  }

  //Clear Tasks from Local Storage
  clearTasksfromLocalStorage();
  
}

// Clear Tasks from Local Storage
function clearTasksfromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) =>{
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) !== -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  }); 
}