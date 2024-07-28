import { displayTaskAdder } from "./taskDisplay.js";

// Function to render all task buttons for different categories
export function renderAllTaskButtons(allCategories) {
  allCategories.forEach((category) => {
    category.task.addEventListener("click", () => {
      displayTaskAdder(category.name, category.name);
    });
  });
}

// Function to render task types (All, Today, Important, Weekly)
export function renderTaskTypes(taskTypes) {
  const taskTypesContainer = document.querySelector(".taskTypes");
  if (!taskTypesContainer) {
    console.error("Task types container not found");
    return;
  }

  taskTypesContainer.innerHTML = ""; // Clear previous content

  taskTypes.forEach((type) => {
    const taskTypeButton = createTaskTypeButton(type.name);
    taskTypesContainer.appendChild(taskTypeButton);
  });
}

// Helper function to create a task type button
function createTaskTypeButton(name) {
  const taskTypeButton = document.createElement("button");
  taskTypeButton.textContent = name;
  taskTypeButton.classList.add("taskTypeBtn");

  taskTypeButton.addEventListener("click", () => {
    displayTaskAdder(name, name);
  });

  return taskTypeButton;
}
