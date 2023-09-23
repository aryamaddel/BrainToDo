let tasks = [];
let taskIdCounter = 0;

const createTask = name => ({
    id: ++taskIdCounter,
    name,
    status: false
});

const addTask = () => {
    const taskInputElement = document.getElementById("task-input");
    const taskName = taskInputElement.value.trim();
    taskInputElement.value = "";

    if (taskName !== "") {
        tasks.push(createTask(taskName));
        displayTasks();
    }
}

const createTaskListItem = ({ id, name, status }) => {
    const listItem = document.createElement("li");

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.name = name;
    checkboxElement.id = `task-${id}`;
    checkboxElement.checked = status;

    checkboxElement.addEventListener("change", () => {
        tasks.find(task => task.id === id).status = checkboxElement.checked;
        displayTasks();
    });

    listItem.append(checkboxElement, `${name} `);

    if (!status) {
        const deleteTaskButton = document.createElement("input");
        deleteTaskButton.type = "button";
        deleteTaskButton.value = "Delete";
        deleteTaskButton.id = `delete-${id}`;

        deleteTaskButton.addEventListener("click", () => {
            tasks = tasks.filter(task => task.id !== id);
            displayTasks();
        })

        listItem.append(deleteTaskButton);
    }

    return listItem;
}


const displayTasks = () => {
    const ptasksListElement = document.getElementById("ptasks");
    const ctasksListElement = document.getElementById("ctasks");
    
    ptasksListElement.innerHTML = "";
    ctasksListElement.innerHTML = "";

    tasks.forEach(task => {
        (task.status ? ctasksListElement : ptasksListElement).appendChild(createTaskListItem(task));
    });
}

const clearCompletedTasks = () => {
    tasks = tasks.filter(task => !task.status);
    displayTasks();
}
