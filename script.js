const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const itemsFilter = document.getElementById("filter");

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  itemList.appendChild(li);

  itemInput.value = "";

  checkUI();
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;

  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure")) {
      // remove the list item, going up dom tree
      e.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
}

function clearItems() {
  // while the item list has a first child remove it
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

// checks the state of the ui/ see if there are items
function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearButton.style.display = "none";
    itemsFilter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    itemsFilter.style.display = "block";
  }
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    // get the text, the first child is the text, textContent to get the text, no quotes
    const itemName = item.firstChild.textContent.toLocaleLowerCase();

    // if the text typed matches name
    // return -1 if text is not in the text
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function filterItems2(e) {
  const items = itemList.querySelectorAll("li");
  const filterText = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.textContent.toLowerCase();

    if (itemName.includes(filterText)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// event listeners
itemForm.addEventListener("submit", addItem);

itemList.addEventListener("click", removeItem);

clearButton.addEventListener("click", clearItems);

itemsFilter.addEventListener("input", filterItems2);

checkUI();
