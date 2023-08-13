const taskInput= document.querySelector(".task-input input");
clearAll=document.querySelector(".clear-btn");
taskBox=document.querySelector(".task-box");


// getting localstorage todo-list
let todos=JSON.parse(localStorage.getItem("todo-list"));

function showTodo(){
  let li="";
  if(todos){
    todos.forEach((todo, id) => {
      //if todo status is completed,set the iscompleted value to checked
      let isCompleted=todo.status=="completed"? "checked": "";
        li+=`<li class="task">
        <label for="${id}">
            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
            <span class="${isCompleted}">${todo.name}</span>
        </label>
        <div class="ellipse" >
          <img onclick="showMenu(this)" src="more-fill.png" alt="">
          <ul class="ellipse-option" >
            <li class="option">
              <p onclick="editTask(${id}, '${todo.name}')"><img src="pencil-line.png" alt=""> Edit</p>
              <p onclick="deleteTask(${id})"><img src="delete-bin-line.png" alt="">Delete</p>
            </li>
          </ul>
        </div>
      </li>`;
    });
  }
  //if isn't empty,insert this value inside taskbox else insert span
  taskBox.innerHTML=li || `<span>You don't have any task here</span>`;
}
showTodo();

function showMenu(selectedTask){
  //getting ellipse-option div
  let ellipseOption=selectedTask.parentElement.lastElementChild;
  ellipseOption.classList.add("show");
  document.addEventListener("click",e=>{
    //removing show class from the ellipse option on the document click
    if(e.target.tagName!="I" || e.target!=selectedTask ){
      ellipseOption,classList.remove("show");
    }
  })
}

function editTask(taskId,taskName){
  taskInput.value= taskName;
}

function deleteTask(deleteId){
  //removing selected task from array/todos
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

clearAll.addEventListener("click", ()=>{
  //removing all item of array/todos
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
})


function updateStatus(selectedTask){
  // getting paragraph that contains task name
  let taskName=selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked){
    taskName.classList.add("checked");
    //updating the status of selected task to completed
    todos[selectedTask.id].status="completed";
  }
  else{
    taskName.classList.remove("checked");
    //updating the status of selected task to pending
    todos[selectedTask.id].status="pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup",e=>{
   let userTask=taskInput.value.trim();
   if(e.key == "Enter" && userTask){
    if(!todos){//if todos isn't exist,pass an empty array to todos
      todos=[];
    }
    taskInput.value ="";
    let taskInfo={ name: userTask,status: "pending"};
    todos.push(taskInfo);//adding new task to todos
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
   }
})
