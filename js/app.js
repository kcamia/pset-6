let list = [];

let elements = document.getElementsByClassName("table-row");
let priorityButtons = document.getElementsByClassName("priority-button");
let completedButtons = document.getElementsByClassName("completed-button");
let removeButtons = document.getElementsByClassName("delete-button");
let text = document.getElementsByClassName("text");

let priorityChanged;
let completionChanged;
let itemRemoved;


window.onload = function() {
    document.getElementById("task-table").onclick = functionMod;

    document.getElementById("add-input").onclick = createItem;
};


document.addEventListener("keyup", function(pressEnter) {
  if (pressEnter.keyCode === 13) {
    createItem();
  }
});

const functionMod = function() {
    itemImportant();
    completedItem();
    goneItem();
}

const itemImportant = function() {
    priorityChanged = false;

    for (let i = 0; i < priorityButtons.length; i++) {
        priorityButtons[i].onclick = function() {
            if (list[i].prioritized === false) {
                const elementToPrioritize = elements[i];
                priorityButtons[i].style.color = "red";
                elements[0].before(elementToPrioritize);
                list[i].prioritized = true;

                const objectToMove = list[i];
                list.splice(i, 1);
                list.unshift(objectToMove);
                priorityChanged = true;
            }
            else if (list[i].prioritized) {
                const elementToPrioritize = elements[i];
                priorityButtons[i].style.color = "black";
                elements[elements.length - 1].after(elementToPrioritize);
                list[i].prioritized = false;

                const objectToMove = list[i];
                list.splice(i, 1);
                list.push(objectToMove);
                priorityChanged = true;
            }
        };

        if (priorityChanged) {
            break;
        }
    }
};

const completedItem = function() {
    completionChanged = false;

    for (let i = 0; i < completedButtons.length; i++) {
        completedButtons[i].onclick = function() {
            if (list[i].completed === false) {
                text[i].style.setProperty("text-decoration", "line-through");
                list[i].completed = true;
            }
            else if (list[i].completed) {
                text[i].style.setProperty("text-decoration", "none");
                list[i].completed = false;
            }
        };

        if (priorityChanged) {
            break;
        }
    }
};

const goneItem = function() {
    itemRemoved = false;

    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].onclick = function() {
            const elementToRemove = elements[i];
            elementToRemove.remove();
            list.splice(i, 1);
            itemRemoved = true;
        };

        if (itemRemoved) {
            break;
        }
    }
};

const createItem = function() {
    let input = document.getElementById("input").value;
    if (input === "") {}
    else {
        let object = {
            task: input,
            prioritized: false,
            completed: false,
            htmlRow: null,
            htmlPriorityButton: null,
            htmlText: null,
            htmlCompletedButton: null,
            htmlCheckImage: null,
            htmlRemoveButton: null,
            htmlRemoveImage: null
        }

        list.push(object);

        let x = list.indexOf(object);

        list[x].htmlRow = document.createElement("tr");
        list[x].htmlRow.setAttribute("class", "table-row");
        document.getElementById("task-table").append(list[x].htmlRow);

        list[x].htmlPriorityButton = document.createElement("td");
        list[x].htmlPriorityButton.setAttribute("class", "priority-button");
        elements[x].append(list[x].htmlPriorityButton);

        list[x].htmlPriorityImage = document.createElement("img");
        list[x].htmlPriorityImage.src = "images/important.png";
        list[x].htmlPriorityImage.setAttribute("class", "remove");
        priorityButtons[x].append(list[x].htmlPriorityImage);

        list[x].htmlCompletedButton = document.createElement("td");
        list[x].htmlCompletedButton.setAttribute("class", "completed-button");
        elements[x].append(list[x].htmlCompletedButton);

        list[x].htmlCheckImage = document.createElement("img");
        list[x].htmlCheckImage.src = "images/checkmark.png";
        list[x].htmlCheckImage.setAttribute("class", "check");
        completedButtons[x].append(list[x].htmlCheckImage);

        list[x].htmlText = document.createElement("td");
        list[x].htmlText.innerHTML = list[x].task;
        list[x].htmlText.setAttribute("class", "text");
        elements[x].append(list[x].htmlText);

        list[x].htmlRemoveButton = document.createElement("td");
        list[x].htmlRemoveButton.setAttribute("class", "delete-button");
        elements[x].append(list[x].htmlRemoveButton);

        list[x].htmlRemoveImage = document.createElement("img");
        list[x].htmlRemoveImage.src = "images/remove.png";
        list[x].htmlRemoveImage.setAttribute("class", "remove");
        removeButtons[x].append(list[x].htmlRemoveImage);
    }
    document.getElementById("input").value = "";
};
