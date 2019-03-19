const form = document.getElementById("task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks')
const filterTask = document.getElementById("filter");
const taskToAdd = document.getElementById("task");


loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', loadTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', clearTasks);
  filterTask.addEventListener('keyup', filterTasks);
}

function loadTasks() {
  let tasks;
  if (localStorage.getItem('tasks') != null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  else {
    tasks = [];
  }
  if (tasks != null) {
    tasks.forEach(function (t) {
      addATask(t);
    })
  }
}

function filterTasks(e) {
  const value = e.target.value.toLowerCase();
  //console.log(value);
  const taskItems = document.querySelectorAll('.collection-item').forEach(
    function (task) {
      var text = task.firstChild.textContent;
      if (text.toLowerCase().indexOf(value) != -1) {
        task.style.display = 'block';
      }
      else {
        task.style.display = 'none';
      }
    });
}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.removeItem('tasks');
}

function deleteTask(e) {

  if (e.target.parentElement != null && e.target.parentElement.classList.contains('delete-item')) {
    var parent = e.target.parentElement;
    if (parent.parentElement != null) {
      parent.parentElement.remove();
      removeTaskFromStorage(parent.parentElement);
    }
  }
}
function removeTaskFromStorage(taskItem) {

  if (localStorage.getItem('tasks') != null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  else {
    tasks = [];
  }
  tasks.forEach(function (task, index) {
    if (task === taskItem.textContent) {
      tasks.splice(index, 1);
      return;
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function addTask(e) {
  if (taskToAdd.value != '') {
    addATask(taskToAdd.value);
    persistTask(taskToAdd.value);
    taskToAdd.value = '';
    e.preventDefault();
  }
}

function addATask(value) {
  const li = document.createElement('li');
  li.className = 'collection-item';

  li.appendChild(document.createTextNode(value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);
}

function persistTask(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

