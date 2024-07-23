import { createButtonElement, createInputElement } from './taskForm.js';
import { addTaskToArray, removeTaskFromArray, allTasksData } from './taskUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    addProjectElements();    // Attaches click listeners to add new projects
    displayProjects();       // Initially display existing projects
});

class Projects {
    constructor() {
        this.projects = [];
    }
}

export const allProjectsData = new Projects();

function addProjectToArray(project) {
    const existingIndex = allProjectsData.projects.findIndex(existingProject => existingProject.name === project.name);
    if (existingIndex === -1) {
        allProjectsData.projects.push({ ...project, tasks: [] });
    } else {
        allProjectsData.projects[existingIndex] = project;
    }
}

export function addTaskToProject(newTask, projectName) {
    const projectIndex = allProjectsData.projects.findIndex(existingProject => existingProject.name === projectName);
    if (projectIndex !== -1) {
        if (!allProjectsData.projects[projectIndex].tasks) {
            allProjectsData.projects[projectIndex].tasks = [];
        }
        allProjectsData.projects[projectIndex].tasks.push(newTask);
        allTasksData.push(newTask);
        console.log(`Task added to project: ${projectName}`, allProjectsData.projects[projectIndex].tasks);
    } else {
        console.error(`Project not found: ${projectName}`);
    }
}

export function addProjectElements() {
    const projectAddBtn = document.querySelector('.addProject');
    projectAddBtn.addEventListener('click', () => {
        if (!document.querySelector('.projectForm')) {
            const projectForm = addProjectForm();
            const taskTypes = document.querySelector('.taskTypes');
            taskTypes.appendChild(projectForm);
        }
    });
}

function addProjectForm() {
    console.log('Add project form');
    const taskTypes = document.querySelector('.taskTypes');
    taskTypes.innerHTML = ''; // Clear existing project elements
    const projectForm = document.createElement('form');
    projectForm.classList.add('projectForm');

    const projectTitle = document.createElement('input');
    projectTitle.classList.add('projectTitle');
    projectTitle.setAttribute('placeholder', 'Enter project name');
    projectTitle.required = true;

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Add';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('cancelBtn');
    cancelBtn.addEventListener('click', () => projectForm.remove());

    projectForm.appendChild(projectTitle);
    projectForm.appendChild(submitBtn);
    projectForm.appendChild(cancelBtn);

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectContainer = document.querySelector('.projectsContainer');
        projectContainer.style.display = 'flex';
        const project = {
            name: projectTitle.value,
            tasks: []
        };
        addProjectToArray(project);
        projectForm.remove();
        displayProjects(); // Function to update the UI with the new project
    });

    return projectForm;
}

function displayProjects() {
    const projectsContainer = document.querySelector('.projectsContainer');
    projectsContainer.innerHTML = ''; // Clear existing project elements in the container

    allProjectsData.projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('projectElement');
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = project.name;
        const projectIcon = document.createElement('img');
        projectIcon.src = './images/projectFolder.svg';

        projectElement.appendChild(projectIcon);
        projectElement.appendChild(projectTitle);
        projectsContainer.appendChild(projectElement);
    });

    // Add listeners immediately after adding projects
    addProjectListeners();
}

function addProjectListeners() {
    const projectElements = document.querySelectorAll('.projectElement');
    projectElements.forEach(projectElement => {
        projectElement.addEventListener('click', (event) => handleProjectClick.call(projectElement, event));
    });
}

function handleProjectClick(event) {
    const taskTypes = document.querySelector('.taskTypes');
    if (!taskTypes) {
        console.error('The .taskTypes element does not exist in the DOM.');
        return; // Exit the function if .taskTypes doesn't exist
    }

    const projectName = event.currentTarget.querySelector('h2').textContent;
    const projectData = allProjectsData.projects.find(project => project.name === projectName);

    console.log(`Project Data Retrieved:`, projectData);

    // Clear only existing task items, not the entire container
    const existingTasks = taskTypes.querySelectorAll('.taskItem');
    existingTasks.forEach(task => task.remove());

    // Check if the 'Add Task' button already exists, only add if not present
    let existingAddTaskBtn = taskTypes.querySelector('.projectTaskBtn');
    let anotherTaskBtn = taskTypes.querySelector('.addTaskBtn');
    if (!existingAddTaskBtn) {
        taskTypes.appendChild(addTaskBtn(projectName));
        if (anotherTaskBtn) {
            anotherTaskBtn.remove();
        }
    } 
        

    // Update the project title in the taskTypes section
    let projectTitle = taskTypes.querySelector('h2');
    if (!projectTitle) {
        projectTitle = document.createElement('h2');
        taskTypes.insertBefore(projectTitle, taskTypes.firstChild);
    }
    projectTitle.textContent = projectName;

    // Call the function to display tasks
    displayProjectTasks(projectName);
}

function addTaskBtn(category) {
    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('projectTaskBtn');
    addTaskBtn.textContent = 'Add Task';
    addTaskBtn.addEventListener('click', () => {
        projectTasksForm(category);
    });
    return addTaskBtn;
}

function setPriority() {
    const red = document.createElement('div');
    const green = document.createElement('div');
    const yellow = document.createElement('div');

    red.classList.add('redPriority');
    green.classList.add('greenPriority');
    yellow.classList.add('yellowPriority');

    const priorities = document.createElement('div');
    priorities.classList.add('priorities');

    priorities.appendChild(red);
    priorities.appendChild(green);
    priorities.appendChild(yellow);

    return priorities;
}

let modifyingTaskIndex = null; // Track the index of the task being modified

export function projectTasksForm(project) {
    let formPopup = document.querySelector('.form-popup');
    if (!formPopup) {
        formPopup = document.createElement('form');
        formPopup.classList.add('form-popup');

        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');
        formPopup.appendChild(formContainer);

        const inputTitle = createInputElement('text', 'taskTitle', 'Task Name', '', true);
        formContainer.appendChild(inputTitle);

        const descriptionInput = createInputElement('text', 'taskDescription', 'Description');
        formContainer.appendChild(descriptionInput);

        const inputDate = createInputElement('date', 'taskDate', '', '', true);
        formContainer.appendChild(inputDate);

        const submitBtn = createButtonElement('Add task', 'submitBtn');
        formContainer.appendChild(submitBtn);

        const cancelBtn = createButtonElement('Cancel', 'cancelBtn');
        formContainer.appendChild(cancelBtn);

        cancelBtn.addEventListener('click', (event) => {
            event.preventDefault();
            formPopup.classList.toggle('show');
            inputTitle.value = "";
            descriptionInput.value = "";
            inputDate.value = ""; // Reset to default
        });

        formPopup.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!inputTitle.value || !inputDate.value) {
                alert("Please fill in all required fields.");
                return;
            }
            const newTask = {
                title: inputTitle.value,
                description: descriptionInput.value,
                date: inputDate.value
            };

            const projectName = document.querySelector('.taskTypes > h2').textContent;
            console.log("Updating project: ", projectName);
            addTaskToProject(newTask, projectName);

            // Call displayProjectTasks to refresh the task list
            displayProjectTasks(projectName);

            console.log(allProjectsData.projects.find(project => project.name === projectName).tasks);
            formPopup.classList.remove('show'); // Hide form after submission
            inputTitle.value = "";
            descriptionInput.value = "";
            inputDate.value = ""; // Reset to default
        });

        const taskTypes = document.querySelector('.taskTypes');
        taskTypes.appendChild(formPopup);
    } else {
        formPopup.classList.toggle('show');
    }
}

function displayProjectTasks(projectName) {
    const projectData = allProjectsData.projects.find(project => project.name === projectName);
    const taskTypes = document.querySelector('.taskTypes');

    if (!projectData || !projectData.tasks) {
        console.error(`No tasks found for project: ${projectName}`);
        return;
    }

    // Clear only existing task items, not the entire container
    const existingTasks = taskTypes.querySelectorAll('.taskItem');
    existingTasks.forEach(task => task.remove());

    projectData.tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('taskItem');

        const taskTitle = document.createElement('h3');
        taskTitle.classList.add('taskTitle');
        taskTitle.textContent = task.title;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        taskDescription.classList.add('taskDescription');

        const taskDate = document.createElement('p');
        taskDate.textContent = task.date;
        taskDate.classList.add('taskDate');


        taskItem.appendChild(taskTitle);
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(taskDate);
      

        // Create task modifiers and attach them to the task item
        const taskModifiers = createTaskModifiers(task, projectName);
        taskItem.appendChild(taskModifiers);

        taskTypes.appendChild(taskItem);
    });
}

export function createTaskModifiers(task, projectName) {
    const taskModifiers = document.createElement('div');
    taskModifiers.classList.add('taskModifiers');
    const currentProjectName = document.querySelector('.taskTypes > h2').textContent;

    // Modify Task Button
    const modifyTask = document.createElement('img');
    modifyTask.src = "./images/editTask.svg";
    modifyTask.classList.add('modifyTask');
    modifyTask.addEventListener('click', () => {
        projectTasksForm(projectName);
        document.querySelector('#taskTitle').value = task.title;
        document.querySelector('#taskDescription').value = task.description;
        document.querySelector('#taskDate').value = task.date;
        const project = allProjectsData.projects.find(project => project.name === currentProjectName);
        modifyingTaskIndex = project.tasks.indexOf(task);
    });

    // Star Task Button
    const starTask = document.createElement('img');
    starTask.src = "./images/taskStar.svg";
    starTask.classList.add('starTask');
    starTask.addEventListener('click', () => {
        task.starred = !task.starred;
        if (task.starred) {
            addTaskToArray(task, "Important");
        } else {
            removeTaskFromArray(task, "Important");
        }
        displayProjectTasks(projectName); // Re-display tasks in the current project
    });

    // Complete Task Button
    const completeTask = document.createElement('img');
    completeTask.src = "./images/completeTask.svg";
    completeTask.classList.add('completeTask');
    completeTask.addEventListener('click', () => {
        removeTaskFromArray(task, projectName);
        removeTaskFromArray(task, "All Tasks");
        displayProjectTasks(projectName); // Re-display tasks in the current project
    });

    taskModifiers.appendChild(modifyTask);
    taskModifiers.appendChild(starTask);
    taskModifiers.appendChild(completeTask);

    return taskModifiers;
}