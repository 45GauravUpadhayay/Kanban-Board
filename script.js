const todo = document.querySelector("#todo");
const Progress = document.querySelector("#Progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task");
let dragElement = null;

// console.log(todo);

tasks.forEach(task => {
    task.addEventListener("drag",(e) => {
        // console.log("draging",e)
        dragElement = task;
    })
})

function addDragEventsOnColoumn(coloumn){
    coloumn.addEventListener("dragenter",function(e){
        this.classList.add("hover-over")
    })

    coloumn.addEventListener("dragleave",function(e){
        this.classList.remove("hover-over")
    })

    coloumn.addEventListener("dragover", function(e){
        e.preventDefault();
    })

    coloumn.addEventListener("drop",function(e){
        e.preventDefault();
        console.log("Droped", dragElement, coloumn)

        coloumn.appendChild(dragElement);
        coloumn.classList.remove("hover-over");

        [todo,Progress,done].forEach(col => {
            const task = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            count.innerText = task.length;
        })
    })
}

addDragEventsOnColoumn(done);
addDragEventsOnColoumn(todo);
addDragEventsOnColoumn(Progress)

// Modal Related Logic

const togglebtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const addTaskBtn = document.querySelector("#add-new-task");


togglebtn.addEventListener("click",(e) => {
    modal.classList.toggle("active")
    console.log("clicked", e)
})

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
})

addTaskBtn.addEventListener("click",() => {
    const taskTitle = document.querySelector("#title").value;
    const textArea = document.querySelector("#Description").value;

    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${textArea}</p>
        <button>Delete</button>
    `;

    const coloumn = [todo,Progress,done];

    coloumn.forEach(col => {
        const tasks = col.querySelectorAll(".task")
        const count = col.querySelector(".right")

        count.innerText = tasks.length;
    })

    div.addEventListener("drag", (e) => {
        dragElement = div;
    })

    todo.appendChild(div)

    modal.classList.remove("active")

})

// modal related logic