window.onload = function() {
  document.getElementById("add").onclick = clickAdd;
}

let listItems = [];


const createNewItem = function() {
  var newItem = {
    name: (item),
    priority: 1,
    completed: false,
    removed: false
  };
  listItems.push(newItem);
}

const clickAdd = function() {
  let item = document.getElementById("item").value;
  createNewItem(item);
  let listItem = document.createElement("LI");
  listItem.innerHTML = item;
  document.body.appendChild(listItem);
}
