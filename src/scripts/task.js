import { formPopup } from "./taskForm";
import { todayTasks, importantTasks, weeklyTasks, allTasks } from "./taskData.js";
import { displayTaskAdder } from "./taskDisplay.js";
import { addUserTask, createTaskElement } from "./taskUtils.js";
import { removeTaskFromArray } from "./taskUtils.js";

let modifyingTaskIndex = null;

function createTaskModifiers(task, index, category, name) {
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
        modifyingTaskIndex = index; // Store the index of the task being modified
    });

    const starTask = document.createElement('img');
    starTask.src = "./images/taskStar.svg";
    starTask.classList.add('starTask');
    starTask.addEventListener('click', () => {
        category[index].starred = !category[index].starred;
        displayTaskAdder(category, name);
    });

    const completeTask = document.createElement('img');
    completeTask.src = "./images/completeTask.svg";
    completeTask.classList.add('completeTask');
    completeTask.addEventListener('click', () => {
        removeTaskFromArray(category, index);
        displayTaskAdder(category, name);
    });

    taskModifiers.appendChild(starTask);
    taskModifiers.appendChild(completeTask);
    taskModifiers.appendChild(modifyTask);

    return taskModifiers;
}

// Call addUserTask for today's tasks
export const addTaskToToday = () => {
    return addUserTask(todayTasks);
}

// Call addUserTask for important tasks
export const addTaskToImportant = () => {
    return addUserTask(importantTasks);
}

// Call addUserTask for weekly tasks
export const addTaskToWeekly = () => {
    return addUserTask(weeklyTasks);
}

// Display  tasks
export const displayTodayTasks = () => {
    return displayTaskAdder(todayTasks, 'Today');
}

export const displayTaskToAll = () => {
    return displayTaskAdder(allTasks, 'All Tasks');
}

export const displayTaskToImportant = () => {
    return displayTaskAdder(importantTasks, 'Important Tasks');
}

export const displayTaskToWeekly = () => {
    return displayTaskAdder(weeklyTasks, 'The next 7 days');
}
