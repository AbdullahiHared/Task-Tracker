import { createTaskElement } from './taskUtils.js';

export function displayTasks(category) {
    const todayTasksContainer = document.querySelector('.taskTypes');
    todayTasksContainer.textContent = "";

    const taskHeader = document.createElement('h2');
    taskHeader.textContent = category === todayTasks ? "Today" : "Tasks";
    todayTasksContainer.appendChild(taskHeader);

    const todayTasksDiv = document.createElement('div');
    todayTasksDiv.classList.add('tasksContainer');
    todayTasksContainer.appendChild(todayTasksDiv);

    const taskAddBtn = document.createElement('button');
    taskAddBtn.textContent = "Add Task";
    taskAddBtn.classList.add('taskAddBtn');
    taskAddBtn.addEventListener('click', () => formPopup(category));
    todayTasksContainer.appendChild(taskAddBtn);

    category.forEach((task, index) => {
        const taskElement = createTaskElement(task, index, category, displayTasks);
        todayTasksDiv.appendChild(taskElement);
    });
}
