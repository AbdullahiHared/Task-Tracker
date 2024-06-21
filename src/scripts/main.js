export const taskTypes = document.querySelector('.taskTypes');
export const todayTasks = document.querySelector('.todayTasks');
export const weekTasks = document.querySelector('.weekTasks');
export const allTasks = document.querySelector('.allTasks');
export const starredTasks = document.querySelector('.starredTasks');
import {renderTodayTasksBtn} from "./today.js";

document.addEventListener('DOMContentLoaded', () => {
    const taskFilters = [{
        task: todayTasks,
        name : "Today's Tasks",
        func : renderTodayTasksBtn,
    }, {
        task: weekTasks,
        name : "This Week's Tasks",
    }, {
        task: allTasks,
        name : "All Tasks",
    }, {
        task: starredTasks,
        name : "Starred Tasks",
    }];

    taskFilters.forEach((taskFilter) => {
        taskFilter.task.addEventListener('click', () => {
            taskFilters.forEach((taskFilter) => {
                taskFilter.task.classList.remove('activeTask');
            });
            if (taskFilter.func) {
                taskFilter.func();
            }
            taskFilter.task.classList.add('activeTask');
            console.log("Task clicked : ", taskFilter.name);
        });
    });

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