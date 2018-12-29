//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event
    form.addEventListener('submit',addTask);
    //Remove task event 
    taskList.addEventListener('click',removeTask)
    //Clear task Event
    clearBtn.addEventListener('click',clearTasks);
    //Filter tasks Event
    filter.addEventListener('keyup',filterTasks);
};

//Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
       tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
    });
}


//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="far fa-trash-alt"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);


    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear Input
    taskInput.value = '';
    

 //Store Task
 function storeTaskInLocalStorage(task){
     let tasks;
     if(localStorage.getItem('tasks') === null){
        tasks = [];
     }else{
         tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
     localStorage.setItem('tasks',JSON.stringify(tasks));
 }
    


    e.preventDefault();
};

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
    //The parent is of the icon is the a tag, the parent of the a tag is the li
    if(confirm('Are You Sure?')){
    e.target.parentElement.parentElement.remove();

    //Remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}


//Remove from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
       tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Clear Tasks
function clearTasks(){
    //taskList.innerHTML = '';

    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from Local Storage
    clearTasksFromLocalStorage();
}

//Clear tasks from Local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){ //If does not match
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    );
}