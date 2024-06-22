import { addTaskToArray, removeTaskFromArray } from './taskUtils.js';
import { addUserTask } from './taskUtils.js';

let modifyingTaskIndex = null;

export function formPopup(categoryName) {
    let formPopupElement = document.querySelector('.form-popup');
    if (!formPopupElement) {
        formPopupElement = document.createElement('form');
        formPopupElement.classList.add('form-popup');
        
        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');
        formPopupElement.appendChild(formContainer);

        const inputTitle = document.createElement('input');
        inputTitle.setAttribute('type', 'text');
        inputTitle.setAttribute('placeholder', 'Task Name');
        inputTitle.setAttribute('id', 'taskTitle');
        inputTitle.setAttribute('required', true);
        formContainer.appendChild(inputTitle);

        const descriptionInput = document.createElement('input');
        descriptionInput.setAttribute('type', 'text');
        descriptionInput.setAttribute('placeholder', 'Description');
        descriptionInput.setAttribute('id', 'taskDescription');
        formContainer.appendChild(descriptionInput);

        const inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'time');
        inputDate.setAttribute('value', '13:58');
        inputDate.setAttribute('id', 'taskDate');
        inputDate.setAttribute('required', true);
        formContainer.appendChild(inputDate);

        const submitBtn = document.createElement('button');
        submitBtn.textContent = "Add task";
        submitBtn.classList.add('submitBtn');
        formContainer.appendChild(submitBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = "Cancel";
        cancelBtn.classList.add('cancelBtn');
        formContainer.appendChild(cancelBtn);

        cancelBtn.addEventListener('click', () => {
            formPopupElement.classList.remove('show');
            clearFormInputs();
        });

        formPopupElement.addEventListener('submit', (event) => {
            event.preventDefault();
            if (modifyingTaskIndex !== null) {
                removeTaskFromArray(categoryName, modifyingTaskIndex);
                modifyingTaskIndex = null;
            }
            addUserTask(categoryName);
            formPopupElement.classList.remove('show');
            clearFormInputs();
        });

        const taskTypes = document.querySelector('.taskTypes');
        taskTypes.appendChild(formPopupElement);
    }

    formPopupElement.classList.toggle('show');
}

function clearFormInputs() {
    const inputTitle = document.querySelector('#taskTitle');
    const descriptionInput = document.querySelector('#taskDescription');
    const inputDate = document.querySelector('#taskDate');
    if (inputTitle && descriptionInput && inputDate) {
        inputTitle.value = "";
        descriptionInput.value = "";
        inputDate.value = "13:58"; // Reset to default time
    }
}
