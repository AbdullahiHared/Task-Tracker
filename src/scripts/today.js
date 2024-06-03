const todayTasks = [];

class Task {
    constructor(title, time, description, starred) {
        this.title = title;
        this.time = time;
        this.description = description;
        this.starred = starred;
    }
}

function addTaskToToday(userTask) {
    todayTasks.push(userTask);
}

function removeTaskFromToday(index) {
    todayTasks.splice(index, 1);
}
