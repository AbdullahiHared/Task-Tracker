// Purpose: Render all tasks buttons on the page.
import {displayTaskAdder} from "./taskDisplay.js";

export function renderAllTasksBtns(categories) {
    categories.forEach((category) => {
        category.btn.addEventListener('click', () => {
            displayTaskAdder(category.name, category.categoryName);
        });
    });
}