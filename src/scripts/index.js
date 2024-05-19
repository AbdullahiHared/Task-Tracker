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
})