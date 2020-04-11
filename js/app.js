// select the elements

const clear = document.querySelector(".clear");
const dateElmnt = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//class name declarations

const check = "fas fa-check-circle";
const uncheck = "far fa-circle";
const linethrough = "lineThrough";

// show the date in the header

const opts = { weekday: "short", month: "long", day: "numeric" };
const today = new Date();
dateElmnt.innerHTML = today.toLocaleDateString("en-US", opts);

//store todos in an arrayList

let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list to the user interface
} else {
  // if data isn't empty
  LIST = [];
  id = 0;
}

// load items to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.toDo, item.id, item.done, item.trash);
  });
}

// clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//our todo list function
function addToDo(toDo, id, done, trash) {
  //check if the item is trash
  if (trash) {
    return;
  }
  const completed = done ? check : uncheck;
  const line = done ? linethrough : "";
  const item = `
        <li class="item">
            <i class="${completed} co" job="complete" id="${id}"></i>
            <p class="text ${line}">${toDo}</p>
            <i class="fas fa-trash-alt de" job="delete" id="${id}"></i>           
        </li>
      `;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}
// create a do iten when the user call the action

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    // Get the value from our input field
    const toDo = input.value;

    // check if the is not empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        toDo: toDo,
        id: id,
        done: false,
        trash: false,
      });
      //add items to the local storage
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

//Completed to do

function completedTodo(task) {
  task.classList.toggle(check);
  task.classList.toggle(uncheck);
  task.parentNode.querySelector(".text").classList.toggle(linethrough);

  LIST[task.id].done = LIST[task.id].done ? false : true;
}

function deleteToDo(task) {
  task.parentNode.parentNode.removeChild(task.parentNode);
  LIST[task.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function (e) {
  const task = e.target; // this will return the clicked elementin the list
  const taskJob = task.attributes.job.value; // this will return complete or delete task
  if (taskJob === "complete") {
    completedTodo(task);
  } else if (taskJob === "delete") {
    deleteToDo(task);
  }
  //add items to the local storage
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
