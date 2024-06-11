import {} from './today.js';
import {} from "./task.js";

document.addEventListener('DOMContentLoaded', () => {
    const taskTypes = document.querySelector('.taskTypes');
    const todayTasks = document.querySelector('.todayTasks');
    const weekTasks = document.querySelector('.weekTasks');
    const allTasks = document.querySelector('.allTasks');
    const starredTasks = document.querySelector('.starredTasks');

    const taskFilters = [{
        task: todayTasks,
        name: "Today"
    }, {
        task: weekTasks,
        name: "The next 7 days"
    }, {
        task: allTasks,
        name: "All Tasks"
    }, {
        task: starredTasks,
        name: "Important Tasks"
    }];

    taskFilters.forEach((taskFilter) => {
        taskFilter.task.addEventListener('click', () => {
            displayTaskAdder(taskFilter.task, taskFilter.name);
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
            addTaskToToday();
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
});
