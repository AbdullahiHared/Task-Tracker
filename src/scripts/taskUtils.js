import { allTasks } from './taskData.js';
import { displayTasks } from "./taskDisplay";
import { formPopup } from "./taskForm";

const Task = class {
    constructor(title, time, description, starred) {
        this.title = title;
        this.time = time;
        this.description = description;
        this.starred = starred;
    }
}

// Function to add a task to an array and allTasks
export function addTaskToArray(arr, userTask) {
    arr.push(userTask);
    allTasks.push(userTask);
}

// Function to remove a task from an array
export function removeTaskFromArray(arr, index) {
    arr.splice(index, 1);
}

// Function to create a task element
export function createTaskElement(task, index, category) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem');

    const title = document.createElement('h3');
    const taskDescription = document.createElement('h5');
    const taskTime = document.createElement('p');

    title.textContent = task.title;
    taskDescription.textContent = task.description;
    taskTime.textContent = formatTime(task.time);

    taskItem.appendChild(title);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskTime);

    const taskModifiers = createTaskModifiers(task, index, category);
    taskItem.appendChild(taskModifiers);

    return taskItem;
}

// Helper function to format time from 24-hour to 12-hour format
function formatTime(time) {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
}

// Function to create task modifiers (buttons for modify, star, complete)
function createTaskModifiers(task, index, category) {
    const taskModifiers = document.createElement('div');
    taskModifiers.classList.add('taskModifiers');

    const modifyTask = document.createElement('img');
    modifyTask.src = "./images/editTask.svg";
    modifyTask.classList.add('modifyTask');
    modifyTask.addEventListener('click', () => {
        formPopup(category);
        const taskTitle = document.querySelector('#taskTitle');
        const taskDescription = document.querySelector('#taskDescription');
        const taskDate = document.querySelector('#taskDate');
        if (taskTitle && taskDescription && taskDate) {
            taskTitle.value = task.title;
            taskDescription.value = task.description;
            taskDate.value = task.time;
        }
        // assuming modifyingTaskIndex is handled in formPopup or globally
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

// Function to add a user task
export function addUserTask(arr) {
    const taskTitle = document.querySelector('#taskTitle').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskDate = document.querySelector('#taskDate').value;

    const userTask = new Task(taskTitle, taskDate, taskDescription, false);
    addTaskToArray(arr, userTask);
    displayTasks(arr); // Display the tasks after adding a new one
}
