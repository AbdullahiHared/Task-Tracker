export const allTasks = []; // Array to store all tasks
import {formPopup} from './today.js'

class Task {
    constructor(title, time, description, starred) {
        this.title = title;
        this.time = time;
        this.description = description;
        this.starred = starred;
    }
}

export function displayTaskAdderBtn () {
    const allTasks = document.querySelector('.allTasks');
    allTasks.addEventListener('click', () => {
       displayTaskAdder(allTasks, "All")
    },);
}

export function displayTaskAdder (task, name) {
    const taskTypes = document.querySelector('.taskTypes');
    taskTypes.textContent = "";
    const taskHeader = document.createElement('h2');
    taskHeader.textContent = name;
    taskTypes.appendChild(taskHeader);
    task.classList.add('active');
    taskTypes.classList.add('activeTask');


    const taskAddBtn = document.createElement('button');
    taskAddBtn.textContent = "Add Task";
    taskAddBtn.classList.add('taskAddBtn');
    taskTypes.appendChild(taskAddBtn);

    // Add an event listener to the button
    taskAddBtn.addEventListener('click', formPopup);
}
