import { formPopup } from './taskForm.js';

function createTaskHeader(name) {
    const taskHeader = document.createElement('h2');
    taskHeader.textContent = name;
    return taskHeader;
}

function createTaskAddButton() {
    const addTaskButton = document.createElement('button');
    addTaskButton.classList.add('addTaskBtn');
    addTaskButton.textContent = 'Add Task';
    addTaskButton.addEventListener('click', formPopup);
    return addTaskButton;
}

export function displayTaskAdder(name) {
    console.log("Displaying task : ", name);
    const taskTypes = document.querySelector('.taskTypes');
    if (!taskTypes) {
        console.error('Required elements not found');
        return;
    }

    taskTypes.innerHTML = '';
    taskTypes.appendChild(createTaskHeader(name));
    taskTypes.appendChild(createTaskAddButton());
    taskTypes.classList.add('activeTask');
    createTaskAddButton();
}
