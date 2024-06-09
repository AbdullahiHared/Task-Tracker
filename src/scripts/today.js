export const todayTasks = []; // Array to store today's tasks

class Task {
    constructor(title, time, description, starred) {
        this.title = title;
        this.time = time;
        this.description = description;
        this.starred = starred;
    }
}

function addTaskToToday(arr, userTask) {
    arr.push(userTask);
}

function removeTaskFromToday(arr, index) {
    arr.splice(index, 1);
}

export function taskBtnAdder() {
    const taskTypes = document.querySelector('.taskTypes');

    taskTypes.textContent = "";
    const taskHeader = document.createElement('h2');
    taskHeader.textContent = "Today";
    taskTypes.appendChild(taskHeader);

    const taskAddBtn = document.createElement('button');
    taskAddBtn.textContent = "Add Task";
    taskAddBtn.classList.add('taskAddBtn');
    taskTypes.appendChild(taskAddBtn);

    // Add an event listener to the button
    taskAddBtn.addEventListener('click', formPopup);
}

export function formPopup() {
    let formPopup = document.querySelector('.form-popup');
    if (!formPopup) {
        formPopup = document.createElement('form');
        formPopup.classList.add('form-popup');
        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');
        formPopup.appendChild(formContainer);

        const inputTitle = document.createElement('input');
        inputTitle.setAttribute('type', 'text');
        inputTitle.setAttribute('placeholder', 'Task Name');
        inputTitle.setAttribute('id', 'taskTitle');
        formContainer.appendChild(inputTitle);
        inputTitle.setAttribute('required', true);

        const descriptionInput = document.createElement('input');
        descriptionInput.setAttribute('placeholder', 'Description');
        descriptionInput.setAttribute('id', 'taskDescription');
        formContainer.appendChild(descriptionInput);

        const inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'time');
        inputDate.setAttribute('value', '13:58');
        inputDate.setAttribute('id', 'taskDate');
        formContainer.appendChild(inputDate);
        inputDate.setAttribute('required', true);

        const submitBtn = document.createElement('button');
        submitBtn.textContent = "Add task";
        submitBtn.classList.add('submitBtn');
        formContainer.appendChild(submitBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = "Cancel";
        cancelBtn.classList.add('cancelBtn');
        formContainer.appendChild(cancelBtn);

        cancelBtn.addEventListener('click', () => {
            formPopup.classList.toggle('show');
            inputTitle.value = "";
            descriptionInput.value = "";
            inputDate.value = "";
        });

        formPopup.addEventListener('submit', (event) => {
            event.preventDefault();
            addUserTask();
        });

        const taskTypes = document.querySelector('.taskTypes');
        taskTypes.appendChild(formPopup);
    }

    formPopup.classList.toggle('show');
}

function createTaskElement(task, index) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem');

    const title = document.createElement('h3');
    const taskDescription = document.createElement('h5');
    const taskTime = document.createElement('p');

    title.textContent = task.title;
    taskDescription.textContent = task.description;

    if (taskTime < 12 && taskTime > 0) {
        taskTime.textContent = task.time + " AM";
    } else {
        taskTime.textContent = task.time + " PM";
    }

    taskItem.appendChild(title);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskTime);

    const taskModifiers = createTaskModifiers(task, index);
    taskItem.appendChild(taskModifiers);

    return taskItem;
}

function createTaskModifiers(task, index) {
    const taskModifiers = document.createElement('div');
    taskModifiers.classList.add('taskModifiers');

    const modifyTask = document.createElement('img');
    modifyTask.src = "./images/editTask.svg";
    modifyTask.classList.add('modifyTask');
    modifyTask.addEventListener('click', () => {
        formPopup();
        removeTaskFromToday(todayTasks, index);
        displayTasks(todayTasks);
    });

    const starTask = document.createElement('img');
    starTask.src = "./images/taskStar.svg";
    starTask.classList.add('starTask');
    starTask.addEventListener('click', () => {
        todayTasks[index].starred = !todayTasks[index].starred;
        displayTasks(todayTasks);
    });

    const completeTask = document.createElement('img');
    completeTask.src = "./images/completeTask.svg";
    completeTask.classList.add('completeTask');
    completeTask.addEventListener('click', () => {
        removeTaskFromToday(todayTasks, index);
        displayTasks(todayTasks);
    });

    taskModifiers.appendChild(starTask);
    taskModifiers.appendChild(completeTask);
    taskModifiers.appendChild(modifyTask);

    return taskModifiers;
}

function displayTasks(arr) {
    const todayTasksContainer = document.querySelector('.taskTypes');
    todayTasksContainer.textContent = "";

    const taskHeader = document.createElement('h2');
    taskHeader.textContent = "Today";
    todayTasksContainer.appendChild(taskHeader);

    const todayTasksDiv = document.createElement('div');
    todayTasksDiv.classList.add('tasksContainer');
    todayTasksContainer.appendChild(todayTasksDiv);

    const taskAddBtn = document.createElement('button');
    taskAddBtn.textContent = "Add Task";
    taskAddBtn.classList.add('taskAddBtn');
    taskAddBtn.addEventListener('click', formPopup);
    todayTasksContainer.appendChild(taskAddBtn);

    arr.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        todayTasksDiv.appendChild(taskElement);
    });
}

export function addUserTask() {
    const taskTitle = document.querySelector('#taskTitle').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskDate = document.querySelector('#taskDate').value;

    const userTask = new Task(taskTitle, taskDate, taskDescription, false);
    addTaskToToday(todayTasks, userTask);
    displayTasks(todayTasks); // Display the tasks after adding a new one
    console.log(todayTasks);
}


