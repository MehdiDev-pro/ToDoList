let submitBtn = document.getElementById('submit-btn')

let deleteBtn = document.getElementById('delete-btn')

let edditBtn = document.getElementById('edit-btn')

let doneBtn = document.getElementById('done-btn')

let innerList = document.getElementById('inner-list')

var tasks = [
    {
  "title": "read book",
  "date": getYourDate(),
  "isdone": false
}
]


function fillInnerList() {
  innerList.innerHTML = " "
  
  var index = 0
  for (i of tasks) {

    innerList.innerHTML += `<div id="goal-bar" class="goal-bar ${i.isdone? 'done' : ''}">
                <div id="goal">
                   <h2>
                      ${i.title}
                   </h2>
                   <p>
                      <span id="date-sign"class="material-symbols-outlined">
calendar_month
</span> <span>${i.date}</span>
                   </p>
                   
                </div>
                <div id="inner-btns">
${i.isdone ? `                   <button onclick="isDone(${index})" id="done-btn" class="btns" style="background-color: #831100">
<span class="material-symbols-outlined">
close
</span></button>
`: `                   
<button onclick="isDone(${index})" id="done-btn" class="btns">
<span class="material-symbols-outlined">
done
</span></button>`}
                  <button onclick="deleteTask(${index})" id="delete-btn" class="btns">
<span class="material-symbols-outlined">
delete
</span></button>
                  <button onclick="editTask(${index})" id="edit-btn" class="btns">
<span class="material-symbols-outlined">
edit
</span></button>
                </div>
             </div>`
    index++
  }

}

function getYourDate() {
  var date = new Date()
  var fullDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  return fullDate
}

function deleteTask(index) {
  
  var permition = confirm(`Do you want to delete "${i.title}"`)
  if (permition == true) {
    tasks.splice(index, 1)
    tasksNumberCount()
    tasksCompletionCount()
    setLocalStorage()
    fillInnerList()
  }
}

function editTask(index) {
  getLocalStorage()
  var task = tasks[index]
  var newTaskValue = prompt("Please enter the new task title", task.title)
  task.title = newTaskValue
  if (newTaskValue == null) {
    return
  }
  setLocalStorage()
  fillInnerList()
}

function isDone(index) {
  getLocalStorage()
  var task = tasks[index]
  task.isdone = !task.isdone
  tasksCompletionCount()
  if(task.isdone == null){
    return 
  }
  setLocalStorage()
  fillInnerList()
}

submitBtn.addEventListener("click", function() {
  var titleValue = prompt("what is your goal?");
  var dateValue = getYourDate()
  if(titleValue == null){
    return
  }else if(titleValue == ""){
    return
  }
  var newTask = {
    "title": titleValue,
    "date": dateValue,
    "isdone": false
  }
  tasks.unshift(newTask)
  setLocalStorage()
  fillInnerList()
  tasksNumberCount()

})

getLocalStorage()
tasksNumberCount()
tasksCompletionCount()
fillInnerList()

function getLocalStorage(){
  var retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
  tasks = retrievedTasks ?? []
}

function setLocalStorage(){
  var strTasks = JSON.stringify(tasks);
localStorage.setItem("tasks", strTasks)
}

function tasksNumberCount(){
  var tasksNum = tasks.length
  document.getElementById('tasks-count').innerHTML = tasksNum
}

function tasksCompletionCount(){
var index = 0
  tasks.map(function(num){
  if(num.isdone == true){
    index = index + 1
    document.getElementById('tasks-done').innerHTML = index
  }else if(num.isdone == false){
    index = index + 0
    document.getElementById('tasks-done').innerHTML = index
  }
})
}
