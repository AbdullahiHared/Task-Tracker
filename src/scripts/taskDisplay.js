import { formPopup } from "./taskForm.js";
import { getTasksByCategory, createTaskModifiers } from "./taskUtils.js";
import { createTaskElement } from "./taskUtils.js";

export function createTaskHeader(name) {
  const taskHeader = document.createElement("h2");
  taskHeader.classList.add("taskHeader");
  taskHeader.textContent = name;
  return taskHeader;
}

let currentTask; // Track the current task being displayed;
export function createTaskAddButton(categoryName) {
  const addTaskButton = document.createElement("button");
  addTaskButton.classList.add("addTaskBtn");
  addTaskButton.textContent = "Add Task";
  addTaskButton.addEventListener("click", () => formPopup(categoryName));
  return addTaskButton;
}

export function displayTaskAdder(categoryName, name) {
  currentTask = name;
  const taskTypes = document.querySelector(".taskTypes");
  if (!taskTypes) {
    console.error("Task types container not found");
    return;
  }
  taskTypes.innerHTML = "";
  taskTypes.appendChild(createTaskHeader(name));
  taskTypes.appendChild(createTaskAddButton(categoryName));
  // Get the correct task data array based on the category name
  const tasks = getTasksByCategory(name);
  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(task, index, tasks);
    taskTypes.appendChild(taskElement);
  });
}

export const currentCategory = currentTask; // Export the current task for use in other modules
