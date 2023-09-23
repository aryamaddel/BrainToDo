let tasks = [];
let taskIdCounter = 0;

const updateProgressBar = () => {
    const progressBar = document.querySelector("#task-progress-bar");
    const completedTasks = tasks.filter(task => task.status).length;
    progressBar.max = tasks.length;
    progressBar.value = completedTasks;
};

const createTask = name => ({
    id: ++taskIdCounter,
    name,
    status: false
});

const addTask = () => {
    const taskInputElement = document.querySelector("#task-input");
    const taskName = taskInputElement.value.trim();
    taskInputElement.value = "";

    if (taskName !== "") {
        tasks.push(createTask(taskName));
        displayTasks();
    }
};

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
            updateProgressBar()
        })

        listItem.append(deleteTaskButton);
    }

    return listItem;
};


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
const clearCompletedTasks = () => {
    tasks = tasks.filter(task => !task.status);
    displayTasks();
};


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


window.onload = updateTime;

const startTimer = () => {
    const timeInputField = document.querySelector('#time-input-field');
    const remainingTimeLabel = document.querySelector('#remaining-time');
    const timerProgressBar = document.querySelector('#timer-progress-bar');

    const inputTimeInSeconds = timeInputField.valueAsNumber / 1000;
    let remainingTimeInSeconds = inputTimeInSeconds;

    timerProgressBar.max = inputTimeInSeconds;
    timerProgressBar.value = inputTimeInSeconds;

    let countdownIntervalId;

    countdownIntervalId && clearInterval(countdownIntervalId);

    countdownIntervalId = setInterval(() => {
        remainingTimeInSeconds--;
        remainingTimeLabel.textContent = `Remaining Time: ${remainingTimeInSeconds} seconds`;
        timerProgressBar.value = remainingTimeInSeconds;
        if (remainingTimeInSeconds <= 0) {
            clearInterval(countdownIntervalId);
            alert('Timer expired!');
        }
    }, 1000);
};
