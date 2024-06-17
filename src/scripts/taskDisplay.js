import { createTaskElement } from './taskUtils.js';
import { formPopup } from './taskForm.js';

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

    createTaskAddButton();
}