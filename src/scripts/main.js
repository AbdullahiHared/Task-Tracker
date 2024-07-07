import { renderAllTaskButtons } from "./taskRender.js";

document.addEventListener('DOMContentLoaded', () => {
    const taskFilters = setupTaskFilters();
    setupTaskFilterListeners(taskFilters);
    setupIconListeners();
});

// Function to set up task filters
function setupTaskFilters() {
    return [
        {
            task: document.querySelector('.todayTasks'),
            name: "Today"
        },
        {
            task: document.querySelector('.weekTasks'),
            name: "The next 7 days"
        },
        {
            task: document.querySelector('.allTasks'),
            name: "All Tasks"
        },
        {
            task: document.querySelector('.starredTasks'),
            name: "Important"
        }
    ];
}

// Function to set up task filter listeners
function setupTaskFilterListeners(taskFilters) {
    taskFilters.forEach((taskFilter) => {
        taskFilter.task.addEventListener('click', () => {
            handleTaskFilterClick(taskFilter, taskFilters);
        });
    });
}

// Function to handle task filter click events
function handleTaskFilterClick(clickedFilter, taskFilters) {
    taskFilters.forEach((taskFilter) => {
        taskFilter.task.classList.remove('activeTask');
    });
    clickedFilter.task.classList.add('activeTask');
    console.log("Task clicked:", clickedFilter.name);
    renderAllTaskButtons(taskFilters);
}

// Function to set up icon listeners
function setupIconListeners() {
    const todayIcon = document.querySelector('.todayTasks img');
    const allIcon = document.querySelector('.allTasks img');
    const starredIcon = document.querySelector('.starredTasks img');
    const weekIcon = document.querySelector('.weekTasks img');

    const icons = [todayIcon, allIcon, starredIcon, weekIcon];
    icons.forEach((icon) => {
        icon.addEventListener('click', () => {
            handleIconClick(icon, icons);
        });
    });
}

// Function to handle icon click events
function handleIconClick(clickedIcon, icons) {
    icons.forEach((icon) => {
        icon.classList.remove('activeIcon');
    });
    clickedIcon.classList.add('activeIcon');
}
