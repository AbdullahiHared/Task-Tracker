// imports
import {renderAllTasksBtns} from './taskRender.js';

// Define task filters
document.addEventListener('DOMContentLoaded', () => {
    // Define DOM elements
    let taskTypes = document.querySelector('.taskTypes');
    let todayTasks = document.querySelector('.todayTasks');
    let weekTasks = document.querySelector('.weekTasks');
    let allTasks = document.querySelector('.allTasks');
    let starredTasks = document.querySelector('.starredTasks');

    // Define task filters
    let taskFilterBtns = [todayTasks, weekTasks, allTasks, starredTasks];

    const allCategories = [
        {
            btn: todayTasks,
            name: "Today's Tasks",
            categoryName: "Today"
        },
        {
            btn: weekTasks,
            name: "The Next 7 days",
            categoryName: "Weekly"
        },
        {
            btn: allTasks,
            name: "All Tasks",
            categoryName: "All Tasks"
        },
        {
            btn: starredTasks,
            name: "Starred Tasks",
            categoryName: "Important"
        }
    ];

    // Add event listeners to task filters
    taskFilterBtns.forEach((taskFilter) => {
        taskFilter.addEventListener('click', () => {
            taskFilterBtns.forEach((tf) => {
                tf.classList.remove('activeTask');
            });
            taskFilter.classList.add('activeTask');
            console.log("Task clicked:", taskFilter.className);
        });
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
    renderAllTasksBtns(allCategories);
});
