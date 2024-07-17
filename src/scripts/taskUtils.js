import { displayTaskAdder } from "./taskDisplay.js";
import { formPopup } from "./taskForm.js";
import { currentCategory } from "./taskDisplay.js";

class Task {
    constructor(title, date, description, starred = false) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.starred = starred;
    }
}

// Set up the task data arrays
export const allTasksData = [];
export const urgentTasksData = [];
export const importantTasksData = [];
export const upComingTasksData = [];

const taskData = [
    { name: "All Tasks", data: allTasksData },
    { name: "Urgent", data: urgentTasksData },
    { name: "Important", data: importantTasksData },
    { name: "Up coming", data: upComingTasksData }
];

// Function to add a task to an array and allTasks
export function addTaskToArray(dataName, userTask) {
    taskData.forEach((taskCategory) => {
        if (taskCategory.name === dataName) {
            const existingIndex = taskCategory.data.findIndex(task => task.title === userTask.title && task.date === userTask.date && task.description === userTask.description);
            if (existingIndex === -1) {
                taskCategory.data.push(userTask); // Add the task if it doesn't already exist
            } else {
                taskCategory.data[existingIndex] = userTask; // Update the existing task
            }
        }
    });

    const allTasksIndex = allTasksData.findIndex(task => task.title === userTask.title && task.date === userTask.date && task.description === userTask.description);
    if (allTasksIndex === -1) {
        allTasksData.push(userTask); // Add to allTasks if it's a new task
    } else {
        allTasksData[allTasksIndex] = userTask; // Update the existing task in allTasks
    }
}

// Function to remove a task from an array
export function removeTaskFromArray(dataName, taskToRemove) {
    taskData.forEach((taskCategory) => {
        if (taskCategory.name === dataName) {
            const index = taskCategory.data.findIndex(task => task.title === taskToRemove.title && task.date === taskToRemove.date && task.description === taskToRemove.description);
            if (index > -1) {
                console.log(`Removing task at index ${index} from ${dataName}`);
                taskCategory.data.splice(index, 1);
            }
        }
    });
}

// Function to get tasks by category name
export function getTasksByCategory(categoryName) {
    return taskData.find(category => category.name === categoryName)?.data || [];
}

// Function to create a task element
export function createTaskElement(task, index, category) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem');

    const title = document.createElement('h3');
    title.classList.add('taskTitle');
    const taskDescription = document.createElement('h5');
    taskDescription.classList.add('taskDescription');
    const taskDate = document.createElement('p');
    taskDate.classList.add('taskDate');

    title.textContent = task.title;
    taskDescription.textContent = task.description;
    taskDate.textContent = task.date;
    taskItem.appendChild(title);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(taskDate);

    const taskModifiers = createTaskModifiers(task, index, category);
    taskItem.appendChild(taskModifiers);

    return taskItem;
}

let modifyingTask = null; // Track the task being modified
let modifyingCategory = null; // Track the category of the task being modified

export function createTaskModifiers(task, index, category) {
    const taskModifiers = document.createElement('div');
    taskModifiers.classList.add('taskModifiers');
    const currentCategory = document.querySelector('.taskHeader').textContent;

    // Modify Task Button
    const modifyTask = document.createElement('img');
    modifyTask.src = "./images/editTask.svg";
    modifyTask.classList.add('modifyTask');
    modifyTask.addEventListener('click', () => {
        console.log("Modify task");
        console.log("Current Category:", currentCategory);
        formPopup(currentCategory);
        document.querySelector('#taskTitle').value = task.title;
        document.querySelector('#taskDescription').value = task.description;
        document.querySelector('#taskDate').value = task.date;
        modifyingTask = task;
        modifyingCategory = currentCategory;
        removeTaskFromArray(currentCategory, task);
        removeTaskFromArray("All Tasks", task);
    });

    // Star Task Button
    const starTask = document.createElement('img');
    starTask.src = "./images/taskStar.svg";
    starTask.classList.add('starTask');
    starTask.addEventListener('click', () => {
        console.log("Star task", task);
        task.starred = !task.starred;
        if (task.starred) {
            addTaskToArray("Important", task);
        } else {
            removeTaskFromArray("Important", task);
        }
        displayTaskAdder(category.name);
    });

    // Complete Task Button
    const completeTask = document.createElement('img');
    completeTask.src = "./images/completeTask.svg";
    completeTask.classList.add('completeTask');
    completeTask.addEventListener('click', () => {
        console.log("Complete task", task);
        removeTaskFromArray(currentCategory, task);
        removeTaskFromArray("All Tasks", task);
        displayTaskAdder(category.name);
    });

    taskModifiers.appendChild(modifyTask);
    taskModifiers.appendChild(starTask);
    taskModifiers.appendChild(completeTask);

    return taskModifiers;
}

// Function to add a user task
export function addUserTask(categoryName) {
    const taskTitle = document.querySelector('#taskTitle').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskDate = document.querySelector('#taskDate').value;

    const userTask = new Task(taskTitle, taskDate, taskDescription, false);

    if (modifyingTask) {
        console.log("Modifying task:", modifyingTask);
        removeTaskFromArray(modifyingCategory, modifyingTask);
        removeTaskFromArray("All Tasks", modifyingTask);
        modifyingTask = null;
        modifyingCategory = null;
    }

    addTaskToArray(categoryName, userTask);
    displayTaskAdder(categoryName); // Display the tasks after adding a new one
}

//  function to check current category
function checkCurrentCategory(categoryName) {
    switch (categoryName) {
        case "Urgent":
            console.log("Current Category:", + "Urgent");
        case "Important":
            console.log("Current Category:", + "Important");    
        case "Upcoming":
            console.log("Current Category:", + "Upcoming");
        default:
          console.warn("Current category could not be found");
    }
}
