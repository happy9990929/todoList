var newTodo = document.getElementById('newTodo');
var num = document.getElementById('num');
var addBtn = document.getElementById('addBtn');
var todoList = document.getElementById('todoList');
var clearAll = document.getElementById('clearAll');

addBtn.addEventListener('click', addTodo);
clearAll.addEventListener('click', clearTodo);
todoList.addEventListener('click', doSomethingList);
newTodo.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        addTodo();
    }
})

var todoData = [];
render(todoData);

function addTodo(){
    var newTodoVal = newTodo.value.trim();
    var newId = Math.floor(Date.now());
    if(newTodoVal!==''){
        todoData.push({
            id: newId,
            title: newTodoVal,
            completed: false
        })
    }
    render(todoData);
    newTodo.value = '';
}

function clearTodo(){
    todoData = [];
    render(todoData);
}

function deleteTodo(id){
    var newIndex = 0;
    todoData.forEach((item, key) =>{
        if(id==item.id){
            newIndex = key;
        }
    });
    todoData.splice(newIndex, 1);
    render(todoData);
}

function completeTodo(id) {
    todoData.forEach((item) => {
      if (id == item.id) {
        item.completed = item.completed ? false : true;
      }
    })
    render(todoData);
  }

function doSomethingList(e) {
    var action = e.target.parentNode.dataset.action;
    var id = e.target.parentNode.dataset.id;
    if(action == 'remove'){
        deleteTodo(id)
    } else if(action === 'complete'){
        completeTodo(id)
    }
}

function render(data){
    var str = '';
    data.forEach(item => {
        str += `<div class="card cardBox">
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
            <div data-action="complete" data-id="${item.id}" class="d-flex align-items-center">
                <input type="checkbox" class="mr-2" ${item.completed ? 'checked' : ''}>
                <div class="${item.completed ? 'completed' : ''}">${item.title}</div>
            </div>
            <button class="close" aria-label="Close" data-action="remove" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        </div>
            
        </div>
    </div>`
    });
    todoList.innerHTML = str;
    num.textContent = data.length;
}