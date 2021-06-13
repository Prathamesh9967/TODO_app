const todoForm = document.querySelector('.form-group');
const todoInput = document.querySelector('.form-control');
const todoItemsList = document.querySelector('.todo-list');

let todos = [];

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo(todoInput.value);
    console.log(todoInput.value)
});

function addTodo(item){
    if (item !==''){ 
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);

        todoInput.value = '';
    }
}

function renderTodos(todos){
    todoItemsList.innerHTML = '';
    
    todos.forEach(function(item){
        const checked = item.completed ? 'checked':null;

        //make a li element
        const li = document.createElement('li');
        li.setAttribute('class' , 'item');
        li.setAttribute('data-key' , item.id);

        if (item.completed === true){
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        <h5>${item.name}</h5>
        
        <i class="fa fa-trash delete-button"></i>
        `;
        todoItemsList.append(li);
    });
}

function addToLocalStorage(todos){
    localStorage.setItem('todos' , JSON.stringify(todos));
    renderTodos(todos);
}

function getFromLocalStorage(){
    const ref = localStorage.getItem('todos');
    if(ref){
        todos = JSON.parse(ref);
        renderTodos(todos);
    }
}

function toggle(id){
    todos.forEach(function(item){
        if (item.id == id){
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id){
    todos = todos.filter(function(item){
        return item.id != id;
    });
    addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click' , function(event){
    if (event.target.type === 'checkbox'){
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')){
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});


// date function
var todayContainer = document.querySelector(".today");

var d = new Date();

var weekday = new Array(7);
weekday[0] = "Sunday 🖖";
weekday[1] = "Monday 💪😀";
weekday[2] = "Tuesday 😜";
weekday[3] = "Wednesday 😌☕️";
weekday[4] = "Thursday 🤗";
weekday[5] = "Friday 🍻";
weekday[6] = "Saturday 😴";

var n = weekday[d.getDay()];

var randomWordArray = Array(
  "Oh my, it's ",
  "Whoop, it's ",
  "Happy ",
  "Seems it's ",
  "Awesome, it's ",
  "Have a nice ",
  "Happy fabulous ",
  "Enjoy your "
);

var randomWord =
  randomWordArray[Math.floor(Math.random() * randomWordArray.length)];


todayContainer.innerHTML = randomWord + n;