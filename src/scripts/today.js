const taskTypes = document.querySelector('.taskTypes');

// allow the user to add a new task
const addTask = document.createElement('button');
addTask.classList.add('addTask');
addTask.textContent = 'Add Task';

function addTaskForm() {
    const taskForm = document.createElement('form');
    taskForm.classList.add('taskForm');
    taskForm.innerHTML = `
        <label for="taskInput">Title:</label>
        <input type="text" class="taskInput" placeholder="Add a task...">
        <label for="taskDescription">Descriptions:</label>
        <button type="submit" class="submitTask">Submit</button>
        
    `;

    taskTypes.appendChild(taskForm);
}

// Append the addTask button to the taskTypes element
taskTypes.appendChild(addTask);

export function addTaskBtn(taskType) {
    taskType.addEventListener('click', () => {
        // Add the click event listener to the addTask button
        addTask.addEventListener('click', addTaskForm);
    });
}