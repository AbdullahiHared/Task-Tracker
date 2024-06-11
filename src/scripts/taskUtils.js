import { allTasks } from './taskData.js';

export function addTaskToArray(arr, userTask) {
    arr.push(userTask);
    allTasks.push(userTask);
}

export function removeTaskFromArray(arr, index) {
    arr.splice(index, 1);
}

export function createTaskElement(task, index, category, displayTasks) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem');

    const title = document.createElement('h3');
    const taskDescription = document.createElement('h5');
    const taskTime = document.createElement('p');

    title.textContent = task.title;
    taskDescription.textContent = task.description;
    taskTime.textContent = task.time < 12 ? task.time + " AM" : task.time + " PM";

    taskItem.appendChild(title);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskTime);

    const taskModifiers = createTaskModifiers(task, index, category, displayTasks);
    taskItem.appendChild(taskModifiers);

    return taskItem;
}

function createTaskModifiers(task, index, category, displayTasks) {
    const taskModifiers = document.createElement('div');
    taskModifiers.classList.add('taskModifiers');

    const modifyTask = document.createElement('img');
    modifyTask.src = "./images/editTask.svg";
    modifyTask.classList.add('modifyTask');
    modifyTask.addEventListener('click', () => {
        formPopup(category);
        document.querySelector('#taskTitle').value = task.title;
        document.querySelector('#taskDescription').value = task.description;
        document.querySelector('#taskDate').value = task.time;
        modifyingTaskIndex = index; // Store the index of the task being modified
    });

    const starTask = document.createElement('img');
    starTask.src = "./images/taskStar.svg";
    starTask.classList.add('starTask');
    starTask.addEventListener('click', () => {
        category[index].starred = !category[index].starred;
        displayTasks(category);
    });

    const completeTask = document.createElement('img');
    completeTask.src = "./images/completeTask.svg";
    completeTask.classList.add('completeTask');
    completeTask.addEventListener('click', () => {
        removeTaskFromArray(category, index);
        displayTasks(category);
    });

    taskModifiers.appendChild(starTask);
    taskModifiers.appendChild(completeTask);
    taskModifiers.appendChild(modifyTask);

    return taskModifiers;
}
