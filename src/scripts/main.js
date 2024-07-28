import { renderAllTaskButtons } from "./taskRender.js";
import { addProjectElements } from "./projectUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  addProjectElements();
  const taskFilters = setupTaskFilters();
  setupTaskFilterListeners(taskFilters);
  setupIconListeners();
  renderAllTaskButtons(taskFilters); // Initial render to ensure buttons are set up
});

// Function to set up task filters
function setupTaskFilters() {
  return [
    {
      task: document.querySelector(".todayTasks"),
      name: "Urgent",
    },
    {
      task: document.querySelector(".weekTasks"),
      name: "Up coming",
    },
    {
      task: document.querySelector(".allTasks"),
      name: "All Tasks",
    },
    {
      task: document.querySelector(".starredTasks"),
      name: "Important",
    },
  ];
}

// Function to set up task filter listeners
function setupTaskFilterListeners(taskFilters) {
  taskFilters.forEach((taskFilter) => {
    taskFilter.task.addEventListener("click", () => {
      handleTaskFilterClick(taskFilter, taskFilters);
    });
  });
}

// Function to handle task filter click events
function handleTaskFilterClick(clickedFilter, taskFilters) {
  renderAllTaskButtons(taskFilters); // Update the task buttons based on the clicked filter
  taskFilters.forEach((taskFilter) => {
    taskFilter.task.classList.remove("activeTask");
  });
  clickedFilter.task.classList.add("activeTask");
}

// Function to set up icon listeners
function setupIconListeners() {
  const icons = document.querySelectorAll(
    ".todayTasks img, .allTasks img, .starredTasks img, .weekTasks img",
  );
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      handleIconClick(icon, icons);
    });
  });
}

// Function to handle icon click events
function handleIconClick(clickedIcon, icons) {
  icons.forEach((icon) => {
    icon.classList.remove("activeIcon");
  });
  clickedIcon.classList.add("activeIcon");
}
