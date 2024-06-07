export const todayTasks = [];

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

        const descriptionInput = document.createElement('textarea');
        descriptionInput.setAttribute('placeholder', 'Description');
        descriptionInput.setAttribute('id', 'taskDescription');
        formContainer.appendChild(descriptionInput);

        const inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'date');
        inputDate.setAttribute('placeholder', 'Task Date');
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

    title.textContent = "Title : " + task.title;
    taskDescription.textContent = "Description: " + task.description;
    taskTime.textContent = "Due Time: " + task.time;

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

    const modifyTaskBtn = document.createElement('button');
    modifyTaskBtn.textContent = "Modify";
    modifyTaskBtn.classList.add('modifyTaskBtn');
    modifyTaskBtn.addEventListener('click', () => {
        removeTaskFromToday(todayTasks, index);
        displayTasks(todayTasks);
        formPopup();
    });

    const starTaskBtn = document.createElement('button');
    starTaskBtn.textContent = "Star";
    starTaskBtn.classList.add('starTaskBtn');
    starTaskBtn.addEventListener('click', () => {
        task.starred = !task.starred;
        displayTasks(todayTasks);
    });

    const completeTaskBtn = document.createElement('button');
    completeTaskBtn.textContent = "Complete";
    completeTaskBtn.classList.add('completeTaskBtn');
    completeTaskBtn.addEventListener('click', () => {
        removeTaskFromToday(todayTasks, index);
        displayTasks(todayTasks);
    });

    taskModifiers.appendChild(starTaskBtn);
    taskModifiers.appendChild(completeTaskBtn);

    return taskModifiers;
}

function displayTasks(arr) {
    const todayTasksContainer = document.querySelector('.taskTypes');
    todayTasksContainer.textContent = "";

    const taskHeader = document.createElement('h2');
    taskHeader.textContent = "Today";
    todayTasksContainer.appendChild(taskHeader);

    const todayTasksDiv = document.createElement('div');
    todayTasksDiv.classList.add('todayTasks');
    todayTasksContainer.appendChild(todayTasksDiv);

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
