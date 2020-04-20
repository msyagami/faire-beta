const clear = document.querySelector('.clear')
const list = document.getElementById('todo-list')
const input = document.getElementById('input')

//classes
const check = "fa-check-circle"
const unCheck = "fa-circle"
const strikethrough = "strikethrough"

// var
let lists, id

// get localStorage
let data = localStorage.getItem("TODO")
//check
if (data){
  lists = JSON.parse(data)
  id = lists.length
  loadList(lists)
}else {
  lists = []
  id = 0
}

//load 
function loadList(arr){
  arr.forEach(function(item){
    todoList(item.name, item.id, item.fin, item.bin)
  })
}

// clear button
clear.addEventListener("click", function(){
  localStorage.clear()
  location.reload()
})


function todoList(toDo, id, fin, bin) {

  if(bin){return}

  const FIN = fin ? check : unCheck
  const strike = fin ? strikethrough : ""
  
  const item = `<li class="todo-container">
                <i class="far ${FIN} co" job="complete" id="${id}"></i>
                <p class="text ${strike}">${toDo}</p>
                <i class="fas fa-trash de" job="delete" id="${id}"></i>
                </li>
                `
  const pos = "beforeend"
  list.insertAdjacentHTML(pos, item)
}

//add item
document.addEventListener('keyup', function(even){
  if(event.keyCode === 13){
    const toDo = input.value
    //if the input isnt empty
    if(toDo){
      todoList(toDo, id, false, false)
      lists.push({
        name: toDo,
        id: id,
        fin: false,
        bin: false,
      })
      //add to localStorage
      localStorage.setItem("TODO", JSON.stringify(lists))
      id++
    }
    input.value = ""
  }
})

function finToDo(element){
  element.classList.toggle(check)
  element.classList.toggle(unCheck)
  element.parentNode.querySelector(".text").classList.toggle(strikethrough)
  lists[element.id].fin = lists[element.id].fin ? false: true
}

function dumpToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode)
  lists[element.id].bin = true
}

// evt

list.addEventListener("click", function(evt){
  const element = evt.target
  const elementJob = element.attributes.job.value

  if(elementJob == "complete"){
    finToDo(element)
  }else if(elementJob == "delete"){
    dumpToDo(element)
  }
   //add to localStorage
   localStorage.setItem("TODO", JSON.stringify(lists))
})