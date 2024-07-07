import {displayTaskAdder} from "./taskDisplay.js";
import {formPopup} from "./taskForm.js";

let modifyingTaskIndex = null;
// Task class
class Task {
    constructor(title, time, description, starred) {
        this.title = title;
        this.time = time;
        this.description = description;
        this.starred = starred;
    }
}

// Set up the task data arrays
export const allTasksData = [];
export const todayTasksData = [];
export const importantTasksData = [];
export const weeklyTasksData = [];

const taskData = [
    {name: "All Tasks", data: allTasksData},
    {name: "Today", data: todayTasksData},
    {name: "Important", data: importantTasksData},
    {name: "Weekly", data: weeklyTasksData}
];

// Function to add a task to an array and allTasks
export function addTaskToArray(categoryName, task) {
    const category = taskData.find((taskCategory) => taskCategory.name === categoryName);
    if (category) {
        category.data.push(task);
    }
    allTasksData.push(task); // Add to allTasks as well
}

// Function to remove a task from an array
export function removeTaskFromArray(categoryName, index) {
    const category = taskData.find((taskCategory) => taskCategory.name === categoryName);
    if (category) {
        category.data.splice(index, 1);
    }
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

    const modifyTaskButton = createModifierButton("./images/editTask.svg", 'modifyTask', () => {
        handleModifyTask(category.name, task, index);
    });

    const starTaskButton = createModifierButton("./images/taskStar.svg", 'starTask', () => {
        handleStarTask(category.name, task);
    });

    const completeTaskButton = createModifierButton("./images/completeTask.svg", 'completeTask', () => {
        handleCompleteTask(category.name, index);
    });

    taskModifiers.appendChild(modifyTaskButton);
    taskModifiers.appendChild(starTaskButton);
    taskModifiers.appendChild(completeTaskButton);

    return taskModifiers;
}

// Helper function to create a modifier button
function createModifierButton(src, className, onClick) {
    const button = document.createElement('img');
    button.src = src;
    button.classList.add(className);
    button.addEventListener('click', onClick);
    return button;
}

// Function to handle modifying a task
function handleModifyTask(categoryName, task, index) {
    formPopup(categoryName);
    const taskTitle = document.querySelector('#taskTitle');
    const taskDescription = document.querySelector('#taskDescription');
    const taskDate = document.querySelector('#taskDate');
    if (taskTitle && taskDescription && taskDate) {
        taskTitle.value = task.title;
        taskDescription.value = task.description;
        taskDate.value = task.time;
    }
    modifyingTaskIndex = index; // Assuming modifyingTaskIndex is handled globally
}

// Function to handle starring a task
function handleStarTask(categoryName, task) {
    addTaskToArray("Important", task); // Add to importantTasksData
    task.starred = !task.starred;
    displayTaskAdder(categoryName);
}

// Function to handle completing a task
function handleCompleteTask(categoryName, index) {
    removeTaskFromArray(categoryName, index);
    displayTaskAdder(categoryName);
}

// Function to add a user task
export function addUserTask(categoryName) {
    const taskTitle = document.querySelector('#taskTitle').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskDate = document.querySelector('#taskDate').value;

    const userTask = new Task(taskTitle, taskDate, taskDescription, false);
    addTaskToArray(categoryName, userTask);
    displayTaskAdder(categoryName); // Display the tasks after adding a new one
}

// Function to get tasks by category
export function getTasksByCategory(name) {
    switch (name) {
        case "All Tasks":
            return allTasksData;
        case "Today":
            return todayTasksData;
        case "Important":
            return importantTasksData;
        case "Weekly":
            return weeklyTasksData;
        default:
            return [];
    }
}
