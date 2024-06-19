document.addEventListener('DOMContentLoaded', () => {
    const taskTypes = document.querySelector('.taskTypes');
    const todayTasks = document.querySelector('.todayTasks');
    const weekTasks = document.querySelector('.weekTasks');
    const allTasks = document.querySelector('.allTasks');
    const starredTasks = document.querySelector('.starredTasks');

    const taskFilters = [{
        task: todayTasks,
        name: "Today",
        data: "todayTasksData",
    }, {
        task: weekTasks,
        name: "The next 7 days",
        data: "weeklyTasksData",
    }, {
        task: allTasks,
        name: "All Tasks",
        data: "allTasksData",
    }, {
        task: starredTasks,
        name: "Important Tasks",
        data: "importantTasksData",
    }];

    taskFilters.forEach((taskFilter) => {
        taskFilter.task.addEventListener('click', () => {
            taskFilters.forEach((taskFilter) => {
                taskFilter.task.classList.remove('activeTask');
            });
            taskFilter.task.classList.add('activeTask');
            taskTypes.textContent = taskFilter.name;
        });
    });

    const formPopup = document.querySelector('form');
    if (formPopup) {
        formPopup.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }

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