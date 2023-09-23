let tasks = [];
let taskIdCounter = 0;

function createTask(name) {
    taskIdCounter++;
    return {
        id: taskIdCounter,
        name: name,
        status: false,
    };
}

function addTask() {
    const taskInputElement = document.getElementById("task-input");
    const taskName = taskInputElement.value.trim();

    taskInputElement.value = "";

    if (taskName !== "") {
        const newTask = createTask(taskName);
        tasks.push(newTask);
        displayTasks(); 
    }
}

function createTaskListItem(task) {
    const listItem = document.createElement("li");

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.name = task.name;
    checkboxElement.id = `task-${task.id}`;
    checkboxElement.checked = task.status;

    const taskNameTextNode = document.createTextNode(task.name);

    checkboxElement.addEventListener("change", () => {
        task.status = checkboxElement.checked;
        displayTasks(); 
    });

    listItem.appendChild(checkboxElement);
    listItem.appendChild(taskNameTextNode);

    return listItem;
}

function displayTasks() {
    const ptasksListElement = document.getElementById("ptasks");
    const ctasksListElement = document.getElementById("ctasks");
    
    ptasksListElement.innerHTML = "";
    ctasksListElement.innerHTML = "";

    tasks.forEach(task => {
        const listItem = createTaskListItem(task);
        (task.status ? ctasksListElement : ptasksListElement).appendChild(listItem);
    });
}
