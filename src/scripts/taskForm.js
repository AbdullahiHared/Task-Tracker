import { addTaskToArray, removeTaskFromArray } from './taskUtils.js';
import { addUserTask } from './taskUtils.js';

let modifyingTaskIndex = null;

export function formPopup(categoryName) {
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
            if (modifyingTaskIndex !== null) {
                removeTaskFromArray(categoryName, modifyingTaskIndex);
                modifyingTaskIndex = null; // Reset the modifyingTaskIndex
            }
            addUserTask(categoryName);
        });

        const taskTypes = document.querySelector('.taskTypes');
        taskTypes.appendChild(formPopup);
    }

    formPopup.classList.toggle('show');
}
