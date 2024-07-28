import { allProjectsData } from './projectUtils.js';
import { allTasksData } from './taskUtils.js';

// Save projects data to localStorage
export function saveProjectsToLocalStorage() {
    // Ensure consistency in the localStorage key used for saving projects
    const projectsData = JSON.stringify(allProjectsData.projects);
    localStorage.setItem('projects', projectsData); //
}

export function loadProjectsFromLocalStorage() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        allProjectsData.projects = JSON.parse(storedProjects);
    }
}

export function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        allTasksData.tasks.splice(0, allTasksData.length, ...JSON.parse(storedTasks));
    }
}

export function saveProjectTasksToLocalStorage(project) {
    // Save tasks of a specific project to localStorage
    localStorage.setItem(project.id, JSON.stringify(project.tasks));
}

export function removeProjectTaskFromStorage(project) {
    // Remove a specific project's tasks from localStorage
    // The second argument to removeItem is unnecessary and has been removed
    localStorage.removeItem(project.id);
}