// imports
import {renderAllTasksBtns} from './taskRender.js';
// Define DOM elements
let taskTypes;
let todayTasks;
let weekTasks;
let allTasks;
let starredTasks;

// Define task filters
export let taskFilterBtns =  [todayTasks, weekTasks, allTasks, starredTasks];

document.addEventListener('DOMContentLoaded', () => {
    taskTypes = document.querySelector('.taskTypes');
    todayTasks = document.querySelector('.todayTasks');
    weekTasks = document.querySelector('.weekTasks');
    allTasks = document.querySelector('.allTasks');
    starredTasks = document.querySelector('.starredTasks');

    // Add event listeners to task filters
    taskFilters.forEach((taskFilter) => {
        taskFilter.task.addEventListener('click', () => {
            taskFilters.forEach((tf) => {
                tf.task.classList.remove('activeTask');
            });
            taskFilter.task.classList.add('activeTask');
            console.log("Task clicked : ", taskFilter.name);
        });

        if (taskFilter.func) {
            taskFilter.func();
        };
    });

    // Add event listeners to icons (assuming they toggle active state)
    const todayIcon = document.querySelector('.todayTasks img');
    const allIcon = document.querySelector('.allTasks img');
    const starredIcon = document.querySelector('.starredTasks img');
    const weekIcon = document.querySelector('.weekTasks img');

    const icons = [todayIcon, allIcon, starredIcon, weekIcon];
    icons.forEach((icon) => {
        icon.addEventListener('click', () => {
            icons.forEach((i) => {
                i.classList.remove('activeIcon');
            });
            icon.classList.add('activeIcon');
        });
    });

    todayTasks.classList.add('activeTask');
    renderAllTasksBtns();
});

export { taskTypes, todayTasks, weekTasks, allTasks, starredTasks };