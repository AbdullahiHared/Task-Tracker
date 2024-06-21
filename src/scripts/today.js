import {todayTasks} from "./main.js";
import {createTaskElement} from "./taskUtils.js";
import {todayTasksData} from "./taskUtils.js";
import {formPopup} from "./taskForm.js";
import {displayTaskAdder} from "./taskDisplay.js";
import {taskTypes} from "./main.js";
import {createTaskHeader} from "./taskDisplay.js";
import {createTaskAddButton} from "./taskDisplay.js";

export function renderTodayTasksBtn() {
    todayTasks.addEventListener('click', () => {
        taskTypes.innerHTML = '';
        taskTypes.appendChild(createTaskHeader('Today'));
        taskTypes.appendChild(createTaskAddButton());
        taskTypes.classList.add('activeTask');
        displayTaskAdder('Today');
    });
}