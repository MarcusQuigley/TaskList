const form = document.getElementById("task-form");
 const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks')
const filterTask = document.getElementById("filter");
const taskToAdd = document.getElementById("task") ;

 
 loadEventListeners();

 function loadEventListeners() {

  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', clearTasks);
  filterTask.addEventListener('keyup', filterTasks);

}

function filterTasks(e){
  const value = e.target.value.toLowerCase();
  //console.log(value);
  const taskItems = document.querySelectorAll('.collection-item').forEach(
    function(task){
      var text = task.firstChild.textContent;
      if(text.toLowerCase().indexOf(value)!=-1){
        console.log(text);
        task.style.display='block';      
      }
      else{
        task.style.display='none';      
      }
    });

}

function clearTasks(e){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

}

 function deleteTask(e){
 
   if (e.target.parentElement!=null && e.target.parentElement.classList.contains('delete-item')){
     var parent = e.target.parentElement;
     if (parent.parentElement!=null){
       parent.parentElement.remove();
     }
   }
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
 
  