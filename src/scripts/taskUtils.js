import { displayTaskAdder } from "./taskDisplay.js";
import { formPopup } from "./taskForm.js";

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
    { name: "All Tasks", data: allTasksData },
    { name: "Today", data: todayTasksData },
    { name: "Important", data: importantTasksData },
    { name: "Weekly", data: weeklyTasksData }
];

// Function to add a task to an array and allTasks
export function addTaskToArray(dataName, userTask) {
    taskData.forEach((taskCategory) => {
        if (taskCategory.name === dataName) {
            taskCategory.data.push(userTask);
        }
    });
    allTasksData.push(userTask); // Add to allTasks as well
}

// Function to remove a task from an array
export function removeTaskFromArray(dataName, index) {
    taskData.forEach((taskCategory) => {
        if (taskCategory.name === dataName) {
            taskCategory.data.splice(index, 1);
        }
    });
}

// Function to update a task in an array
export function updateTaskInArray(dataName, index, updatedTask) {
    taskData.forEach((taskCategory) => {
        if (taskCategory.name === dataName) {
            taskCategory.data[index] = updatedTask;
        }
    });
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

let modifyingTaskIndex = null;

// Function to create task modifiers (buttons for modify, star, complete)
function createTaskModifiers(task, index, category) {
    const taskModifiers = document.createElement('div');
    taskModifiers.classList.add('taskModifiers');

    const modifyTask = document.createElement('img');
    modifyTask.src = "./images/editTask.svg";
    modifyTask.classList.add('modifyTask');
    modifyTask.addEventListener('click', () => {
        formPopup(category.name); // Pass the category name
        const taskTitle = document.querySelector('#taskTitle');
        const taskDescription = document.querySelector('#taskDescription');
        const taskDate = document.querySelector('#taskDate');
        if (taskTitle && taskDescription && taskDate) {
            taskTitle.value = task.title;
            taskDescription.value = task.description;
            taskDate.value = task.time;
            modifyingTaskIndex = index; // Set the global index for modification
        }
    });

    const starTask = document.createElement('img');
    starTask.src = "./images/taskStar.svg";
    starTask.classList.add('starTask');
    starTask.addEventListener('click', () => {
        task.starred = !task.starred;
        displayTaskAdder(category.name);
    });

    const completeTask = document.createElement('img');
    completeTask.src = "./images/completeTask.svg";
    completeTask.classList.add('completeTask');
    completeTask.addEventListener('click', () => {
        removeTaskFromArray(category.name, index);
        displayTaskAdder(category.name);
    });

    taskModifiers.appendChild(starTask);
    taskModifiers.appendChild(completeTask);
    taskModifiers.appendChild(modifyTask);

    return taskModifiers;
}

// Function to add a user task
export function addUserTask(categoryName) {
    const taskTitle = document.querySelector('#taskTitle').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskDate = document.querySelector('#taskDate').value;

    const userTask = new Task(taskTitle, taskDate, taskDescription, false);

    if (modifyingTaskIndex !== null) {
        updateTaskInArray(categoryName, modifyingTaskIndex, userTask);
        modifyingTaskIndex = null; // Reset modifyingTaskIndex after update
    } else {
        addTaskToArray(categoryName, userTask);
    }

    displayTaskAdder(categoryName); // Display the tasks after adding or modifying
}
