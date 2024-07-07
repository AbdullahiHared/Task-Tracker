import { addTaskToArray, addUserTask } from './taskUtils.js';

let modifyingTaskIndex = null;

function createInputElement(type, id, placeholder, value = '', required = false) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('placeholder', placeholder);
    if (value) input.setAttribute('value', value);
    if (required) input.setAttribute('required', true);
    return input;
}

function createButtonElement(text, className) {
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

        const inputDate = createInputElement('time', 'taskDate', '', '13:58', true);
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
            inputDate.value = "";
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
            }
            formPopup.classList.remove('show'); // Hide form after submission
            inputTitle.value = "";
            descriptionInput.value = "";
            inputDate.value = "13:58"; // Reset to default or use a function to set current time
        });

        const taskTypes = document.querySelector('.taskTypes');
        taskTypes.appendChild(formPopup);
    }
    formPopup.classList.toggle('show');
}