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
    const todayTasksContainer = document.querySelector('.todayTasks');

    todayTasksContainer.addEventListener('click', () => {
        taskTypes.textContent = "";
        const taskHeader = document.createElement('h2');
        taskHeader.textContent = "Today Tasks";
        taskTypes.appendChild(taskHeader);

        const taskAddBtn = document.createElement('button');
        taskAddBtn.textContent = "Add Task";
        taskAddBtn.classList.add('taskAddBtn');
        taskTypes.appendChild(taskAddBtn);

        // Add an event listener to the button
        taskAddBtn.addEventListener('click', formPopup);
    });
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
        inputTitle.setAttribute('placeholder', 'Title');
        inputTitle.setAttribute('id', 'taskTitle');
        formContainer.appendChild(inputTitle);
        inputTitle.setAttribute('required', true);

        const titleLabel = document.createElement('label');
        titleLabel.setAttribute('for', 'taskTitle');
        titleLabel.textContent = "Title";
        formContainer.appendChild(titleLabel);

        const inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'date');
        inputDate.setAttribute('id', 'taskDate');
        formContainer.appendChild(inputDate);
        inputDate.setAttribute('required', true);

        const descriptionInput = document.createElement('textarea');
        descriptionInput.setAttribute('placeholder', 'Description');
        descriptionInput.setAttribute('id', 'taskDescription');
        formContainer.appendChild(descriptionInput);

        const descriptionLabel = document.createElement('label');
        descriptionLabel.setAttribute('for', 'taskDescription');
        descriptionLabel.textContent = "Description";
        formContainer.appendChild(descriptionLabel);

        const taskTypes = document.querySelector('.taskTypes');
        taskTypes.appendChild(formPopup);

        const submitBtn = document.createElement('button');
        submitBtn.textContent = "Submit";
        submitBtn.classList.add('submitBtn');
        formContainer.appendChild(submitBtn);
    }
    formPopup.classList.toggle('show');
}
