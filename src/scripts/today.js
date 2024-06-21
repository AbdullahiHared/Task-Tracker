import {todayTasks} from "./main.js";
import {createTaskElement} from "./taskUtils.js";
import {todayTasksData} from "./taskUtils.js";
import {formPopup} from "./taskForm.js";
import {displayTaskAdder} from "./taskDisplay.js";
import {taskTypes} from "./main.js";

export function renderTodayTasksBtn() {
    todayTasks.addEventListener('click', () => {
        console.log("Today tasks clicked");
        displayTaskAdder("Today's Tasks");
    });
}