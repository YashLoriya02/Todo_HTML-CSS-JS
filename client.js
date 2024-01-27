const btn = document.querySelector(".btn")
const inputValue = document.querySelector(".input")
const TodoList = document.querySelector(".todosList")
let todos = []
let newTodos = []
let updatedTodos = []

const getTodosFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("myTodos")) || []
}

const addTodo = () => {
    todos = getTodosFromLocalStorage()
    const valueOfTodo = inputValue.value.trim()
    if (todos.includes(valueOfTodo)) {
        alert("Duplicate Values not Allowed.")
    }
    if (valueOfTodo.length !== 0 && !todos.includes(valueOfTodo)) {
        todos.push(valueOfTodo)
        localStorage.setItem("myTodos", JSON.stringify(todos))
        console.log(todos)
    }
}

const showTodo = () => {
    const newTodos = getTodosFromLocalStorage()
    newTodos.forEach(element => {
        const liElement = document.createElement('li')
        liElement.innerHTML = element
        TodoList.append(liElement)
    });
}

const deleteTodo = (e) => {
    const selectedTodo = e.target.textContent
    console.log(selectedTodo)
    newTodos = getTodosFromLocalStorage()
    updatedTodos = newTodos.filter((todo) => todo !== selectedTodo)
    localStorage.setItem("myTodos", JSON.stringify(updatedTodos))
    console.log(updatedTodos)
    TodoList.innerHTML = ""
    showTodo()
    if (updatedTodos.length === 0) {
        TodoList.innerHTML = "<li>No Todos Found</li>"
    }
    alert("Todo Deleted Successfully.")
}

btn.addEventListener("click", (e) => {
    e.preventDefault()
    addTodo()
    inputValue.value = ""
    TodoList.innerHTML = ""
    showTodo()
})

TodoList.addEventListener("click", (e) => {
    deleteTodo(e)
})

const mainTodos = getTodosFromLocalStorage()
if (mainTodos.length === 0) {
    TodoList.innerHTML = "<li>No Todos Found</li>"
}
else{
    showTodo()
}
