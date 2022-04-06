console.log("I am ready boys")


/// Tüm elemanları seçtik

const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

const filter = document.querySelector("#filter");
const clearbtn = document.querySelector("#clear-todos")


eventListeners();

function eventListeners() {
    form.addEventListener("submit", addToDo);
    document.addEventListener("DOMContentLoaded", LoadAllTodos);
    document.addEventListener("click", deleteToDoUı);
    filter.addEventListener("keyup", filterTodos)
    clearbtn.addEventListener("click", clearAllTodos)
}

function addToDo(e) {

    const newTodo = todoInput.value;


    if (newTodo == "") {
        console.log("Boş geçilemez");
    } else {
        console.log("elsede");
        addTodotoUI(newTodo);
        addTodoToLocalStorage(newTodo);
    }

    e.preventDefault();
}

function LoadAllTodos() {
    let alltodos = getFromLocalStorege();
    console.log(typeof (alltodos));
    alltodos.forEach(element => {
        addTodotoUI(element);
    });


}

function getFromLocalStorege() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}

function addTodoToLocalStorage(newtodo) {
    let todos = getFromLocalStorege();
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos))

}



function addTodotoUI(value) {
    const listitem = document.createElement("li");
    const link = document.createElement("a");

    link.className = "delete-item";
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    listitem.className = "list-group-item d-flex justify-content-between";
    listitem.appendChild(document.createTextNode(value))
    listitem.appendChild(link)

    todoList.appendChild(listitem)
}

function deleteToDoUı(e) {
    //

    if (e.target.className === "fa fa-remove") {
        //
        e.target.parentElement.parentElement.remove();

        console.log(e.target.parentElement.previousSibling)
        deleteStorage(e.target.parentElement.parentElement.textContent)
    } else {

    }

}

function deleteStorage(todo) {
    let alltodos = getFromLocalStorege();

    alltodos.forEach(function (item, index) {
        if (item === todo) {

            alltodos.splice(index, 1);
        }
    })

    localStorage.setItem("todos", JSON.stringify(alltodos));
}

function filterTodos(e) {
    let filtervalue = e.target.value.toLowerCase();
    const listitem = document.querySelectorAll(".list-group-item")

    listitem.forEach(function (listitem) {
        const text = listitem.textContent.toLocaleLowerCase();
        if (text.indexOf(filtervalue) === -1) {
            console.log("Yok tır")
            listitem.setAttribute("style", "display:none !important")
        } else {
            listitem.setAttribute("style", "display:block")
        }
    })
}

function clearAllTodos() {
    alert("Hepsi Silinecek")
    console.log("clear butonu")
    localStorage.removeItem("todos");


    ///todoList.innerHTML=""; Bu yöntem yavaşmış

    while (todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild);
    }
}