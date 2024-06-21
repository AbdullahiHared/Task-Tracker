import { formPopup } from './taskForm.js';
import { allTasksData, todayTasksData, importantTasksData, weeklyTasksData, createTaskElement } from './taskUtils.js';

export function createTaskHeader(name) {
    const taskHeader = document.createElement('h2');
    taskHeader.textContent = name;
    return taskHeader;
}

export function createTaskAddButton(categoryName) {
    const addTaskButton = document.createElement('button');
    addTaskButton.classList.add('addTaskBtn');
    addTaskButton.textContent = 'Add Task';
    addTaskButton.addEventListener('click', () => formPopup(categoryName));
    return addTaskButton;
}

export function displayTaskAdder(name) {
    console.log("Displaying task:", name);
    const taskTypes = document.querySelector('.taskTypes');
    if (!taskTypes) {
        console.error('Required elements not found');
        return;
    }

    taskTypes.innerHTML = '';
    taskTypes.appendChild(createTaskHeader(name));
    taskTypes.appendChild(createTaskAddButton(name));

    // Find the correct task data array
    let tasks;
    switch (name) {
        case "All Tasks":
            tasks = allTasksData;
            break;
        case "Today":
            tasks = todayTasksData;
            break;
        case "Important":
            tasks = importantTasksData;
            break;
        case "Weekly":
            tasks = weeklyTasksData;
            break;
        default:
            tasks = [];
    }

    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index, tasks);
        taskTypes.appendChild(taskElement);
    });

    taskTypes.classList.add('activeTask');
}
