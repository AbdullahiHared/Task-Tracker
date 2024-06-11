// Array to store all tasks
export const allTasks = [];
export const todayTasks = [];
export const importantTasks = [];
export const weeklyTasks = [];

class Task {
    constructor(title, time, description, starred) {
        this.title = title;
        this.time = time;
        this.description = description;
        this.starred = starred;
    }
}

// Generic function to add a task to a specific array
function addTaskToArray(arr, userTask) {
    arr.push(userTask);
}

// Generic function to remove a task from a specific array
function removeTaskFromArray(arr, index) {
    arr.splice(index, 1);
}

function createTaskHeader(name) {
    const taskHeader = document.createElement('h2');
    taskHeader.textContent = name;
    return taskHeader;
}

function createTaskAddButton() {
    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';
    addTaskButton.addEventListener('click', formPopup);
    return addTaskButton;
}

export function displayTaskAdder(task, name) {
    const taskTypes = document.querySelector('.taskTypes');
    if (!taskTypes || !task) {
        console.error('Required elements not found');
        return;
    }

    if (!(task instanceof HTMLElement)) {
        console.error('Task is not a valid DOM element');
        return;
    }

    taskTypes.innerHTML = '';
    taskTypes.appendChild(createTaskHeader(name));
    taskTypes.appendChild(createTaskAddButton());

    task.classList.add('active');
    taskTypes.classList.add('activeTask');
}

// Function to display the task adder interface
displayTaskAdder(todayTasks, "Today");

let modifyingTaskIndex = null;

export function formPopup(category) {
    let formPopup = document.querySelector('.form-popup');
    if (!formPopup) {
        formPopup = document.createElement('form');
        formPopup.classList.add('form-popup');
        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');
        formPopup.appendChild(formContainer);

        const inputTitle = document.createElement('input');
        inputTitle.setAttribute('type', 'text');
        inputTitle.setAttribute('placeholder', 'Task Name');
        inputTitle.setAttribute('id', 'taskTitle');
        formContainer.appendChild(inputTitle);
        inputTitle.setAttribute('required', true);

        const descriptionInput = document.createElement('input');
        descriptionInput.setAttribute('placeholder', 'Description');
        descriptionInput.setAttribute('id', 'taskDescription');
        formContainer.appendChild(descriptionInput);

        const inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'time');
        inputDate.setAttribute('value', '13:58');
        inputDate.setAttribute('id', 'taskDate');
        formContainer.appendChild(inputDate);
        inputDate.setAttribute('required', true);

        const submitBtn = document.createElement('button');
        submitBtn.textContent = "Add task";
        submitBtn.classList.add('submitBtn');
        formContainer.appendChild(submitBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = "Cancel";
        cancelBtn.classList.add('cancelBtn');
        formContainer.appendChild(cancelBtn);

        cancelBtn.addEventListener('click', () => {
            formPopup.classList.toggle('show');
            inputTitle.value = "";
            descriptionInput.value = "";
            inputDate.value = "";
        });

        formPopup.addEventListener('submit', (event) => {
            event.preventDefault();
            if (modifyingTaskIndex !== null) {
                removeTaskFromArray(category, modifyingTaskIndex);
                modifyingTaskIndex = null; // Reset the modifyingTaskIndex
            }
            addUserTask(category);
        });

        const taskTypes = document.querySelector('.taskTypes');
        taskTypes.appendChild(formPopup);
    }

    formPopup.classList.toggle('show');
}

function createTaskElement(task, index, category) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem');

    const title = document.createElement('h3');
    const taskDescription = document.createElement('h5');
    const taskTime = document.createElement('p');

    title.textContent = task.title;
    taskDescription.textContent = task.description;

    if (task.time < 12 && task.time > 0) {
        taskTime.textContent = task.time + " AM";
    } else {
        taskTime.textContent = task.time + " PM";
    }

    taskItem.appendChild(title);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskTime);

    const taskModifiers = createTaskModifiers(task, index, category);
    taskItem.appendChild(taskModifiers);

    return taskItem;
}

function createTaskModifiers(task, index, category) {
    const taskModifiers = document.createElement('div');
    taskModifiers.classList.add('taskModifiers');

    const modifyTask = document.createElement('img');
    modifyTask.src = "./images/editTask.svg";
    modifyTask.classList.add('modifyTask');
    modifyTask.addEventListener('click', () => {
        formPopup(category);
        document.querySelector('#taskTitle').value = task.title;
        document.querySelector('#taskDescription').value = task.description;
        document.querySelector('#taskDate').value = task.time;
        modifyingTaskIndex = index; // Store the index of the task being modified
    });

    const starTask = document.createElement('img');
    starTask.src = "./images/taskStar.svg";
    starTask.classList.add('starTask');
    starTask.addEventListener('click', () => {
        category[index].starred = !category[index].starred;
        displayTasks(category);
    });

    const completeTask = document.createElement('img');
    completeTask.src = "./images/completeTask.svg";
    completeTask.classList.add('completeTask');
    completeTask.addEventListener('click', () => {
        removeTaskFromArray(category, index);
        displayTasks(category);
    });

    taskModifiers.appendChild(starTask);
    taskModifiers.appendChild(completeTask);
    taskModifiers.appendChild(modifyTask);

    return taskModifiers;
}

export function displayTasks(arr) {
    const todayTasksContainer = document.querySelector('.taskTypes');
    todayTasksContainer.textContent = "";

    const taskHeader = document.createElement('h2');
    taskHeader.textContent = "Today";
    todayTasksContainer.appendChild(taskHeader);

    const todayTasksDiv = document.createElement('div');
    todayTasksDiv.classList.add('tasksContainer');
    todayTasksContainer.appendChild(todayTasksDiv);

    const taskAddBtn = document.createElement('button');
    taskAddBtn.textContent = "Add Task";
    taskAddBtn.classList.add('taskAddBtn');
    taskAddBtn.addEventListener('click', () => formPopup(arr));
    todayTasksContainer.appendChild(taskAddBtn);

    arr.forEach((task, index) => {
        const taskElement = createTaskElement(task, index, arr);
        todayTasksDiv.appendChild(taskElement);
    });
}

function addUserTask(arr) {
    const taskTitle = document.querySelector('#taskTitle').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskDate = document.querySelector('#taskDate').value;

    const userTask = new Task(taskTitle, taskDate, taskDescription, false);
    addTaskToArray(arr, userTask);
    addTaskToArray(allTasks, userTask);
    displayTasks(arr); // Display the tasks after adding a new one
}

// call addUserTask for today's tasks
export const addTaskToToday = () => {
    return addUserTask(todayTasks);
}

//  call addUserTask for important tasks
export const addTaskToImportant = () => {
    return addUserTask(importantTasks);
}

// call addUserTask for weekly tasks
export const addTaskToWeekly = () => {
    return addUserTask(weeklyTasks);
}

