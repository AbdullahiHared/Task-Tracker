import {addTaskToArray, addUserTask} from "./taskUtils.js";
import { displayTaskAdder } from "./taskDisplay.js";

let modifyingTaskIndex = null;

export function createInputElement(type, id, placeholder, value = '', required = false) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('placeholder', placeholder);
    if (value) input.value = value; // Set value directly
    if (required) input.setAttribute('required', true);
    return input;
}

export function createButtonElement(text, className) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    return button;
}

export function formPopup(categoryName) {
    let formPopup = document.querySelector('.form-popup');
    if (!formPopup) {
        formPopup = document.createElement('form');
        formPopup.classList.add('form-popup');
        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');
        formPopup.appendChild(formContainer);

        const inputTitle = createInputElement('text', 'taskTitle', 'Task Name', '', true);
        formContainer.appendChild(inputTitle);

        const descriptionInput = createInputElement('text', 'taskDescription', 'Description');
        formContainer.appendChild(descriptionInput);

        const inputDate = createInputElement('date', 'taskDate', '', '', true);
        formContainer.appendChild(inputDate);

        const submitBtn = createButtonElement('Add task', 'submitBtn');
        formContainer.appendChild(submitBtn);

        const cancelBtn = createButtonElement('Cancel', 'cancelBtn');
        formContainer.appendChild(cancelBtn);

        cancelBtn.addEventListener('click', (event) => {
            event.preventDefault();
            formPopup.classList.toggle('show');
            inputTitle.value = "";
            descriptionInput.value = "";
            inputDate.value = ""; // Reset to default
        });

        formPopup.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!inputTitle.value || !inputDate.value) {
                alert("Please fill in all required fields.");
                return;
            }
            if (modifyingTaskIndex !== null) {
                addTaskToArray(categoryName, modifyingTaskIndex, true);
                modifyingTaskIndex = null;
            } else {
                addUserTask(categoryName);
                displayTaskAdder(categoryName, categoryName);
            }
            formPopup.classList.remove('show'); // Hide form after submission
            inputTitle.value = "";
            descriptionInput.value = "";
            inputDate.value = ""; // Reset to default
        });

        const taskTypes = document.querySelector('.taskTypes');
        taskTypes.appendChild(formPopup);
    } else {
        // If formPopup already exists, reset the date input
        const inputDate = formPopup.querySelector('#taskDate');
        inputDate.value = ''; // Clear any previous value
    }

    // Set today's date as default if category is 'Today'
    defaultCategory(categoryName);

    formPopup.classList.toggle('show');
}

function defaultCategory (categoryName) {
    const inputDate = document.querySelector('#taskDate');
    if (categoryName === 'Urgent') {
        inputDate.value = new Date().toISOString().split('T')[0];
    }

}