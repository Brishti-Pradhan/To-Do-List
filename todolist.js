/*
const input=document.getElementById("input");
const list= document.getElementById("list");
const add= document.getElementById("add");

function addTask(){
    let li = document.createElement("li");
    const list=document.getElementById("list");
    let n=list.getElementsByTagName("li").length;
    li.id=n.toString();
    li.innerHTML=input.value + `<button id="edit" onclick='edit(this.parentNode.id)'>Edit</button>` + `<button id="delete" onclick='dlt(this.parentNode.id)'>Dlt</button>`;
    list.appendChild(li);
    input.value="";
}

function dlt(x){
    document.getElementById(x).remove();
}
function edit(x){
    let text = document.getElementById(x);
    console.log("text-", text);
    /*input.value= text.substring(0, text.length-8);
    console.log("inputvalue-", input.value);
    add.innerText = "Edit task";
    add.setAttribute("onclick", `editTask(${x})`);*/
/*}
function editTask(x){
    let editElement = document.getElementById(x);
    editElement.innerHTML=input.value + `<button id="edit" onclick='edit(this.parentNode.id)'>Edit</button>` + `<button id="delete" onclick='dlt(this.parentNode.id)'>Dlt</button>`;
    add.setAttribute("onclick", "addTask()");
    add.innerText = "Add";
    input.value="";
}
*/

/*

list.addEventListener("click",function(e){
    if(e.target.tagName === "li"){
        e.target.classList.toggle("checked");
    }
}, false);
*/

localStorage.setItem('tasks', JSON.stringify(tasks));
const value = localStorage.getItem('tasks');
console.log(value);


document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks= JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task));
        updateTaskList();
        updateStats();
    }
});
let tasks = [];

const saveTasks = ()=> {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTaskList();
    updateStats();
    saveTasks();
  }
}

const toggleTastComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) =>{
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();

};

const editTask = (index) =>{
    const taskInput= document.getElementById("taskInput");
    taskInput.value= tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const updateStats = ()=>{
    const completeTasks= tasks.filter(task=> task.completed).length;
    const totalTasks= tasks.length;
    const progress= (completeTasks/totalTasks)*100;
    const progressBar= document.getElementById('progress');

    progressBar.style.width= `${progress}%`;
    document.getElementById('nos').innerText= `${completeTasks}/${totalTasks}`;

    if(tasks.length && completeTasks === totalTasks){
        blastConfetti();
    }
}

const updateTaskList = ()=> {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
        <p>${task.text}</p>
        </div>
        <div class="icons">
        <img src="image/edit.png" onclick="editTask(${index})" />
        <img src="image/dlt.png" onclick="deleteTask(${index})"/>
        </div>
        </div>`;
        listItem.addEventListener('change', () => toggleTastComplete(index));
        taskList.append(listItem);
    });
};
document.getElementById("newTask").addEventListener("click", function(e){
    e.preventDefault();
    addTask();
});

const blastConfetti= ()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}