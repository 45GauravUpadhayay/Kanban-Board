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
        coloumn.classList.remove("hover-over")
    })
}

addDragEventsOnColoumn(done);
addDragEventsOnColoumn(todo);
addDragEventsOnColoumn(Progress)

// Modal Related Logic

const togglebtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");


togglebtn.addEventListener("click",(e) => {
    modal.classList.toggle("active")
    console.log("clicked", e)
})

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
})