import {displayTodayTasks, displayTaskToWeekly, displayTaskToImportant, displayTaskToAll} from "./task";

document.addEventListener('DOMContentLoaded', () => {
    const taskTypes = document.querySelector('.taskTypes');
    const todayTasks = document.querySelector('.todayTasks');
    const weekTasks = document.querySelector('.weekTasks');
    const allTasks = document.querySelector('.allTasks');
    const starredTasks = document.querySelector('.starredTasks');

    const taskFilters = [{
        task: todayTasks,
        name: "Today",
        displayFunc: displayTodayTasks
    }, {
        task: weekTasks,
        name: "The next 7 days",
        displayFunc: displayTaskToWeekly
    }, {
        task: allTasks,
        name: "All Tasks",
        displayFunc: displayTaskToAll
    }, {
        task: starredTasks,
        name: "Important Tasks",
        displayFunc: displayTaskToImportant
    }];

    taskFilters.forEach((taskFilter) => {
        taskFilter.task.addEventListener('click', () => {
            taskFilters.forEach(tf => tf.task.classList.remove('active'));
            taskFilter.task.classList.add('active');
            taskTypes.classList.add('activeTask');
        });

        if (taskFilter.task === todayTasks) {
            taskFilter.task.classList.add('active');
            taskTypes.classList.add('activeTask');
        }
    });

    const formPopup = document.querySelector('form');
    if (formPopup) {
        formPopup.addEventListener('submit', (event) => {
            event.preventDefault();
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
            });
            icon.classList.add('activeIcon');
        });
    });

    displayTodayTasks();
});
