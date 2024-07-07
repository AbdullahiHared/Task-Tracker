import {taskFilterBtns} from "./main.js";
import {displayTaskAdder} from "./taskDisplay.js";
import {taskTypes} from "./main.js";

const allCategories = [
    {
        btn: taskFilterBtns[0],
        name: "Today's Tasks",
        categoryName: "Today"
    },
    {
        btn: taskFilterBtns[1],
        name: "The Next 7 days",
        categoryName: "Weekly"
    },
    {
        btn: taskFilterBtns[2],
        name: "All Tasks",
        categoryName: "All Tasks"
    },
    {
        btn: taskFilterBtns[3],
        name: "Starred Tasks",
        categoryName: "Important"
    }
];

export function renderAllTasksBtns() {
    allCategories.forEach((category) => {
        category.btn.addEventListener('click', () => {
            taskTypes.innerHTML = '';
            displayTaskAdder(category.name, category.categoryName);
        });
    });
}