document.addEventListener('DOMContentLoaded', ()=>{
    const todoInput=document.getElementById("todo-input");
const addtaskbtn=document.getElementById("add-task-btn")
const todolist=document.getElementById("todo-list");

let tasks=JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => renderTasks(task)); 
    

addtaskbtn.addEventListener("click",() => {
    const taskText=todoInput.value.trim();
    if(taskText=="") return;
    const newTask={
        id: Date.now(),
        text: taskText,
        iscompleted: false
    }
    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);
    todoInput.value=""; //clears the input field
    
});

// render is used to display tasks on the DOM
function renderTasks(task) {
    const li=document.createElement("li");
    li.setAttribute("data-id", task.id);
    if(task.iscompleted) {
        li.classList.add("completed");
    }
    li.innerHTML=`<span>${task.text}</span>
    <button >Delete</button>`; 
    li.addEventListener("click", (e) => {
        if(e.target.tagName=== "BUTTON") {
            return;
        }
        task.completed = !task.iscompleted;
        li.classList.toggle("completed");
        saveTasks();
    })

    li.querySelector("button").
    addEventListener("click", (e) => {
        e.stopPropagation(); // Prevents the click event from bubbling up to the li
        tasks=tasks.filter(t => t.id !== task.id);
        li.remove()
        saveTasks(); 
    })
    todolist.appendChild(li);   
    
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
})