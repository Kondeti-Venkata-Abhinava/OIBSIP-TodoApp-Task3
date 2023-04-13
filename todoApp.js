const form = document.querySelector('form');
const input = form.querySelector('input');
const list = document.querySelector('#list');

let tasks = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = input.value.trim();
    if (!taskText) return;
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(task);
    addTask(task);
    form.reset();
});

function addTask(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.innerHTML = `
		<input type="checkbox">
		<span class="task">${task.text}</span>
		<button class="delete">Delete</button>
	`;
    const checkbox = li.querySelector('input');
    const taskText = li.querySelector('.task');
    const deleteButton = li.querySelector('.delete');

    checkbox.addEventListener('change', function() {
        task.completed = !task.completed;
        if (task.completed) {
            taskText.classList.add('completed');
        } else {
            taskText.classList.remove('completed');
        }
    });

    deleteButton.addEventListener('click', function() {
        tasks = tasks.filter(function(t) {
            return t.id !== task.id;
        });
        li.remove();
    });

    list.appendChild(li);
}

function loadTasks() {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson) {
        tasks = JSON.parse(tasksJson);
        tasks.forEach(function(task) {
            addTask(task);
        });
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

loadTasks();
window.addEventListener('beforeunload', saveTasks);