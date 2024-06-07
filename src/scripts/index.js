import {addUserTask} from './today.js';
import {taskBtnAdder} from './today.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskTypes = document.querySelector('.taskTypes');
    const todayTasks = document.querySelector('.todayTasks');
    const weekTasks = document.querySelector('.weekTasks');
    const allTasks = document.querySelector('.allTasks');
    const starredTasks = document.querySelector('.starredTasks');

    const taskFilters = [todayTasks, weekTasks, allTasks, starredTasks];

    taskFilters.forEach((task) => {
        task.addEventListener('click', () => {
            taskFilters.forEach((task) => {
                task.classList.remove('active');
            })
            task.classList.add('active');
            taskTypes.innerHTML = task.textContent + " Tasks";
            taskTypes.classList.add('activeTask');
        })

        if (task === todayTasks) {
            task.classList.add('active');
        }
    })

    // Move this block of code outside the forEach loop
    const formPopup = document.querySelector('form');
    if (formPopup) {
        formPopup.addEventListener('submit', (event) => {
            event.preventDefault();
            addUserTask();
        });
    }

    // active icon
    const todayIcon = document.querySelector('.todayTasks img');
    const allIcon = document.querySelector('.allTasks img');
    const starredIcon = document.querySelector('.starredTasks img');
    const weekIcon = document.querySelector('.weekTasks img');

    const icons = [todayIcon, allIcon, starredIcon, weekIcon];

    icons.forEach((icon) => {
        icon.addEventListener('click', () => {
            icons.forEach((icon) => {
                icon.classList.remove('activeIcon');
            })
            icon.classList.add('activeIcon');
        })
    })

    taskBtnAdder();
});
