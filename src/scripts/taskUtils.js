// Task class
import {displayTaskAdder} from "./taskDisplay.js";
import {formPopup} from "./taskForm.js";

class Task {
    constructor(title, date, description, starred = false) {
        this.title = title;
        this.date = date;
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
            const existingIndex = taskCategory.data.findIndex(task => task.title === userTask.title && task.date === userTask.date && task.description === userTask.description);
            if (existingIndex === -1) {
                taskCategory.data.push(userTask); // Add the task if it doesn't already exist
            } else {
                taskCategory.data[existingIndex] = userTask; // Update the existing task
            }
        }
    });
    const allTasksIndex = allTasksData.findIndex(task => task.title === userTask.title && task.date === userTask.date && task.description === userTask.description);
    if (allTasksIndex === -1) {
        allTasksData.push(userTask); // Add to allTasks if it's a new task
    } else {
        allTasksData[allTasksIndex] = userTask; // Update the existing task in allTasks
    }
}


// Function to remove a task from an array
export function removeTaskFromArray(dataName, index) {
    taskData.forEach((taskCategory) => {
        if (taskCategory.name === dataName) {
            taskCategory.data.splice(index, 1);
        }
    });
}

// Function to get tasks by category name
export function getTasksByCategory(categoryName) {
    return taskData.find(category => category.name === categoryName)?.data || [];
}


// Function to create a task element
export function createTaskElement(task, index, category) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem');

    const title = document.createElement('h3');
    title.classList.add('taskTitle');
    const taskDescription = document.createElement('h5');
    taskDescription.classList.add('taskDescription');
    const taskDate = document.createElement('p');
    taskDate.classList.add('taskDate');

    title.textContent = task.title;
    taskDescription.textContent = task.description;
    taskDate.textContent = task.date;
    taskItem.appendChild(title);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskDate);

    const taskModifiers = createTaskModifiers(task, index, category);
    taskItem.appendChild(taskModifiers);

    return taskItem;
}

// Function to create task modifiers (buttons for modify, star, complete)
export function createTaskModifiers(task, index, category) {
    const taskModifiers = document.createElement('div');
    taskModifiers.classList.add('taskModifiers');

    const modifyTask = document.createElement('img');
    modifyTask.src = "./images/editTask.svg";
    modifyTask.classList.add('modifyTask');
    modifyTask.addEventListener('click', () => {
        formPopup(category.name); // Open form popup for editing
        // Populate form fields with task details
        const taskTitle = document.querySelector('#taskTitle');
        const taskDescription = document.querySelector('#taskDescription');
        const taskDate = document.querySelector('#taskDate');
        if (taskTitle && taskDescription && taskDate) {
            taskTitle.value = task.title;
            taskDescription.value = task.description;
            taskDate.value = task.date;
        }
        // You might need to manage modifyingTaskIndex here if it's not handled globally
    });

    const starTask = document.createElement('img');
    starTask.src = "./images/taskStar.svg";
    starTask.classList.add('starTask');
    starTask.addEventListener('click', () => {
        console.log("Star task");
        addTaskToArray("Important", task); // Add to importantTasksData
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

    taskModifiers.appendChild(modifyTask);
    taskModifiers.appendChild(starTask);
    taskModifiers.appendChild(completeTask);

    return taskModifiers;
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

