const todo = document.querySelector("#todo");
const Progress = document.querySelector("#Progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task");



// console.log(todo);

tasks.forEach(task => {
    task.addEventListener("drag",(e) => {

    })
})

function addDragEventsOnColoumn(){

}
addDragEventsOnColoumn(todo);
addDragEventsOnColoumn(Progress);
addDragEventsOnColoumn(done);
