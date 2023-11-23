document.addEventListener("DOMContentLoaded", function () {
    // Check local storage for existing tasks
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render existing tasks
    renderTasks();

    // Add task function
    window.addTask = function () {
        const taskInput = document.getElementById("task-input");
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
            taskInput.value = "";
        }
    };

    // Toggle task completion function
    window.toggleTask = function (index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    // Delete task function
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    // Render tasks function
    function renderTasks() {
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");

            const taskText = document.createElement("span");
            taskText.textContent = task.text;

            const taskButtons = document.createElement("div");

            const completeButton = document.createElement("button");
            completeButton.textContent = task.completed ? "Mark Incomplete" : "Mark Complete";
            completeButton.onclick = function () {
                toggleTask(index);
            };

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function () {
                deleteTask(index);
            };

            taskButtons.appendChild(completeButton);
            taskButtons.appendChild(deleteButton);

            taskElement.appendChild(taskText);
            taskElement.appendChild(taskButtons);

            if (task.completed) {
                taskElement.classList.add("completed");
            }

            taskList.appendChild(taskElement);
        });
    }
});
