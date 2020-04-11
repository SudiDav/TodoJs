var btn = document.getElementById("add");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

function inputLength() {
  return input.value.length;
}

function createEventElement() {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  ul.appendChild(li);
  input.value = "";
}
function AddListAfterClick() {
  if (inputLength() > 0) {
    createEventElement();
  }
}
function AddListAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createEventElement();
  }
}

btn.addEventListener("click", AddListAfterClick);

input.addEventListener("keypress", AddListAfterKeypress);
