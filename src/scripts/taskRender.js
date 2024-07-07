import { displayTaskAdder } from "./taskDisplay.js";

// Function to render all task buttons by displaying their corresponding task lists
export function renderAllTaskButtons(categories) {
    categories.forEach((category) => {
        category.task.addEventListener('click', () => {
            displayTaskAdder(category.name, category.name);
        });
    });
}
