window.onload = function() {
  document.getElementById("add").onclick = addItem;
}

let elements = [];

const addItem = function() {
  let newItem = document.getElementById("item").value;
  elements.push(newItem);
  let listItem = document.createElement("LI");
  listItem.innerHTML = newItem;
  document.body.appendChild(listItem);
}
