const todo = document.querySelector("#todo");
const Progress = document.querySelector("#Progress");
const done = document.querySelector("#done");

let dragElement = null;

// ==========================
// Update Counts
// ==========================

function updateCounts() {
    [todo, Progress, done].forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        if (count) {
            count.innerText = tasks.length;
        }
    });
}

// ==========================
// Save To Local Storage
// ==========================

function saveTasks() {
    const data = {
        todo: [],
        progress: [],
        done: []
    };

    todo.querySelectorAll(".task").forEach(task => {
        data.todo.push({
            title: task.querySelector("h2").innerText,
            description: task.querySelector("p").innerText
        });
    });

    Progress.querySelectorAll(".task").forEach(task => {
        data.progress.push({
            title: task.querySelector("h2").innerText,
            description: task.querySelector("p").innerText
        });
    });

    done.querySelectorAll(".task").forEach(task => {
        data.done.push({
            title: task.querySelector("h2").innerText,
            description: task.querySelector("p").innerText
        });
    });

    localStorage.setItem("kanbanTasks", JSON.stringify(data));
}

// ==========================
// Drag Events
// ==========================

function addDragEvents(task) {
    task.addEventListener("dragstart", () => {
        dragElement = task;
    });
}

// ==========================
// Create Task
// ==========================

function createTask(title, description) {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <button class="delete-btn">Delete</button>
    `;

    addDragEvents(div);

    const deleteBtn = div.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
        div.remove();
        updateCounts();
        saveTasks();
    });

    return div;
}

// ==========================
// Load Tasks From Storage
// ==========================

function loadTasks() {
    const savedData = JSON.parse(
        localStorage.getItem("kanbanTasks")
    );

    if (!savedData) return;

    savedData.todo.forEach(task => {
        todo.appendChild(
            createTask(task.title, task.description)
        );
    });

    savedData.progress.forEach(task => {
        Progress.appendChild(
            createTask(task.title, task.description)
        );
    });

    savedData.done.forEach(task => {
        done.appendChild(
            createTask(task.title, task.description)
        );
    });

    updateCounts();
}

// ==========================
// Existing Tasks Drag Support
// ==========================

document.querySelectorAll(".task").forEach(task => {

    addDragEvents(task);

    const deleteBtn = task.querySelector("button");

    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            task.remove();
            updateCounts();
            saveTasks();
        });
    }
});

// ==========================
// Column Drag Logic
// ==========================

function addDragEventsOnColumn(column) {

    column.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.classList.add("hover-over");
    });

    column.addEventListener("dragleave", function () {
        this.classList.remove("hover-over");
    });

    column.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    column.addEventListener("drop", function (e) {
        e.preventDefault();

        if (dragElement) {
            column.appendChild(dragElement);
            dragElement = null;
        }

        this.classList.remove("hover-over");

        updateCounts();
        saveTasks();
    });
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(Progress);
addDragEventsOnColumn(done);

// ==========================
// Modal Logic
// ==========================

const toggleBtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const addTaskBtn = document.querySelector("#add-new-task");

toggleBtn.addEventListener("click", () => {
    modal.classList.add("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

// ==========================
// Add New Task
// ==========================

addTaskBtn.addEventListener("click", () => {

    const title = document
        .querySelector("#title")
        .value
        .trim();

    const description = document
        .querySelector("#Description")
        .value
        .trim();

    if (!title) {
        alert("Please enter task title");
        return;
    }

    const task = createTask(title, description);

    todo.appendChild(task);

    document.querySelector("#title").value = "";
    document.querySelector("#Description").value = "";

    modal.classList.remove("active");

    updateCounts();
    saveTasks();
});

// ==========================
// Initial Load
// ==========================

loadTasks();
updateCounts();




