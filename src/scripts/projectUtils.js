class Projects {
    constructor() {
        this.projects = [];
    }
}

export const allProjectsData = new Projects();

function addProjectToArray(project) {
    const existingIndex = allProjectsData.projects.findIndex(existingProject => existingProject.name === project.name);
    if (existingIndex === -1) {
        allProjectsData.projects.push(project);
    } else {
        allProjectsData.projects[existingIndex] = project;
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
        addProjectListeners(); // Function to add click listeners to the project elements
    }); 

    return projectForm;
}

function displayProjects() {
    const taskTypes = document.querySelector('.taskTypes');
    taskTypes.innerHTML = ''; // Clear existing project elements

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
}

function addProjectListeners() {
    const projectElements = document.querySelectorAll('.projectElement');
    projectElements.forEach(projectElement => {
        projectElement.addEventListener('click', handleProjectClick);
    });
}

function handleProjectClick() {
    const taskTypes = document.querySelector('.taskTypes');
    taskTypes.innerHTML = '';
    const projectTitle = document.createElement('h2');
    projectTitle.textContent = this.textContent;
    taskTypes.appendChild(projectTitle);
    taskTypes.appendChild(addTaskBtn());
}

function addTaskBtn() {
    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('projectTaskBtn');
    addTaskBtn.textContent = 'Add Task';
    // Add any additional logic needed for addTaskBtn
    return addTaskBtn;
}
