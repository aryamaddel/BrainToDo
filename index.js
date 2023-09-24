// Initialize tasks and task ID counter
let tasks = [];
let taskIdCounter = 0;

// Function to update the progress bar based on completed tasks
const updateProgressBar = () => {
    const progressBar = document.querySelector("#task-progress-bar");
    const completedTasks = tasks.filter(task => task.status).length;
    progressBar.max = tasks.length;
    progressBar.value = completedTasks;
};

// Function to create a task object
const createTask = name => ({
    id: ++taskIdCounter,
    name,
    status: false
});

// Function to add a task
const addTask = () => {
    const taskInputElement = document.querySelector("#task-input");
    const taskName = taskInputElement.value.trim();
    taskInputElement.value = "";

    if (taskName !== "") {
        tasks.push(createTask(taskName));
        displayTasks();
    }
};

// Function to create a task list item
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
            listItem.remove();
            updateProgressBar();
        });

        listItem.append(deleteTaskButton);
    }

    return listItem;
};

// Function to display tasks in different lists
const displayTasks = () => {
    const ptasksListElement = document.querySelector("#ptasks");
    const ctasksListElement = document.querySelector("#ctasks");

    ptasksListElement.innerHTML = "";
    ctasksListElement.innerHTML = "";

    tasks.forEach(task => {
        const taskListItem = createTaskListItem(task);
        (task.status ? ctasksListElement : ptasksListElement).appendChild(taskListItem);
    });

    updateProgressBar();
};

// Function to clear completed tasks
const clearCompletedTasks = () => {
    tasks = tasks.filter(task => !task.status);
    displayTasks();
};

// Function to update the time display
function updateTime() {
    const date = new Date();

    let hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    let time;

    if (hours < 12) {
        time = `${hours}:${minutes}:${seconds} AM`;
    } else if (hours > 12) {
        hours -= 12;
        time = `${hours}:${minutes}:${seconds} PM`;
    } else if (hours == 12) {
        time = `${hours}:${minutes}:${seconds} PM`;
    }

    document.querySelector('#time-heading').textContent = time;

    setTimeout(updateTime, 1000);
}

// Call updateTime on window load to start the time display
window.onload = updateTime;

// Function to start a timer
const startTimer = () => {
    const timeInputField = document.querySelector('#time-input-field');
    const remainingTimeLabel = document.querySelector('#remaining-time');
    const timerProgressBar = document.querySelector('#timer-progress-bar');

    const inputTimeInSeconds = timeInputField.valueAsNumber / 1000;
    let remainingTimeInSeconds = inputTimeInSeconds;

    timerProgressBar.max = inputTimeInSeconds;
    timerProgressBar.value = remainingTimeInSeconds;

    let countdownIntervalId;

    countdownIntervalId && clearInterval(countdownIntervalId);

    countdownIntervalId = setInterval(() => {
        const hours = Math.floor(remainingTimeInSeconds / 3600);
        const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
        const seconds = remainingTimeInSeconds % 60;

        const formattedTime = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;

        remainingTimeLabel.textContent = `Remaining Time: ${formattedTime}`;
        timerProgressBar.value = remainingTimeInSeconds;

        if (remainingTimeInSeconds <= 0) {
            clearInterval(countdownIntervalId);
            alert('Timer expired!');
        }

        remainingTimeInSeconds--;
    }, 1000);
};
