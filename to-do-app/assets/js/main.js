// variables
let input   = document.querySelector(".input"),
    submit  = document.querySelector(".add"),
    tasks   = document.querySelector(".tasks"),
    filterTasks = document.querySelector(".filter-tasks");

let tasksArray = [];

if(localStorage.getItem("tasks")) {
    tasksArray = JSON.parse(localStorage.getItem("tasks"))
}

getTasksFromLocalStorage();

submit.onclick = function(e) {
    e.preventDefault();
    if(input.value !== "") {
        addTaskToTasksArray(input.value);
        input.value = "";
    }
}

filterTasks.addEventListener("click",dofilterTasks);

// remove task from tasks
tasks.addEventListener("click",(e) => {
    // handle the delete button
    if(e.target.classList.contains("btn-delete")) {
        e.target.parentElement.classList.add("fall");
        // remove task from the page
        e.target.parentElement.addEventListener("transitionend",function() {
            e.target.parentElement.remove();
        });
        // remove task from local storage
        removeTaskFromLocalStorge(e.target.parentElement.getAttribute("data-id"))
    }
    // handle the state of task
    if(e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
        updateTaskStateInLocalStorage(e.target.getAttribute("data-id"));
    }
});

// add task to tasks
function addTaskToTasksArray(taskTitle) {
    const task = {
        id: Date.now(),
        title: taskTitle,
        completed: false
    }
    tasksArray.push(task);
    addTasksToPage(tasksArray);
    addTasksToLocalStorage(tasksArray)
}
// add tasks to page
function addTasksToPage(tasksArray) {
    tasks.innerHTML = "";
    tasksArray.forEach((task) => {
        // create the task div
        let div = document.createElement("div");
        div.className = "task";
        if(task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        // create the delete button
        let btn = document.createElement("span");
        btn.className = "btn-delete";
        btn.appendChild(document.createTextNode("Delete"));
        // append the delete button to the task div
        div.appendChild(btn);
        // append the task div to page tasks
        tasks.appendChild(div);
    })
}
// add tasks to local storage
function addTasksToLocalStorage(tasksArray) {
    window.localStorage.setItem("tasks",JSON.stringify(tasksArray));
}
// retreive tasks from local storage
function getTasksFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if(data) {
        let items = JSON.parse(data);
        tasksArray = items;
        addTasksToPage(tasksArray)
    }
}

// remove task from local storage
function removeTaskFromLocalStorge(id) {
    tasksArray = tasksArray.filter((task) => task.id != id);
    addTasksToLocalStorage(tasksArray);
}
// update the state of task in local storage
function updateTaskStateInLocalStorage(id) {
    tasksArray.forEach((task) => {
        if(task.id == id) {   
            task.completed = task.completed ? false : true;
        }
    })
    addTasksToLocalStorage(tasksArray);
}
// filter tasks
function dofilterTasks(e) {
    const data = tasks.childNodes;
    data.forEach((task) => {
        switch (e.target.value) {
            case "completed":
                task.style.display = task.classList.contains("done") ? 'flex' : 'none';
                break;
            case "uncompleted":
                task.style.display = !task.classList.contains("done") ? 'flex' : 'none';
                break;
            default:
                task.style.display = 'flex';
                break;
        }
    })
}