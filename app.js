const form = document.getElementById("task-form");
 const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks')
const filterTask = document.getElementById("filter");
const taskToAdd = document.getElementById("task") ;

 
 loadEventListeners();

 function loadEventListeners() {

  form.addEventListener('submit', addTask);
}

 function addTask(e){
   if(taskToAdd.value != ''){
     const li = document.createElement('li');
     li.className = 'collection-item';

     li.appendChild(document.createTextNode(taskToAdd.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

     taskList.appendChild(li);
     taskToAdd.value = '';
     e.preventDefault();
   }
 }
 
  