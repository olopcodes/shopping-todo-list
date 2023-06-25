const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const itemsFilter = document.getElementById("filter");
const formButton = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromLocalStorage();

  itemsFromStorage.forEach((item) => addItemToDom(item));

  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);

    itemToEdit.classList.remove("edit-mode");

    itemToEdit.remove();

    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("That item already exists");
      return;
    }
  }

  addItemToDom(newItem);

  addItemToStorage(newItem);

  itemInput.value = "";

  checkUI();
}

function addItemToDom(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromLocalStorage();

  // add item to array
  itemsFromStorage.push(item);

  // save array in local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromLocalStorage() {
  let itemsFromStorage;

  // check if there are items in localStorage
  if (localStorage.getItem("items") === null) {
    // if none initialize array
    itemsFromStorage = [];
  } else {
    // get the data from localstorage which is an array
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
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

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("edit-mode"));

  item.classList.add("edit-mode");

  formButton.innerHTML = `<i class="fa-solid fa-pen"></i>  Update Item`;
  formButton.style.backgroundColor = "#228b33";

  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Are you sure")) {
    // remove item from dom
    item.remove();

    // remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(text) {
  console.log(text);
  let itemsFromStorage = getItemsFromLocalStorage();

  // keeping the items that are not equal to the text
  itemsFromStorage = itemsFromStorage.filter((item) => item !== text);

  console.log(itemsFromStorage, "af");

  // saving the new filtered array in localstorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  // while the item list has a first child remove it
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // remove from localstorage
  localStorage.removeItem("items");

  checkUI();
}

// checks the state of the ui/ see if there are items
function checkUI() {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearButton.style.display = "none";
    itemsFilter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    itemsFilter.style.display = "block";
  }

  formButton.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
  formButton.style.backgroundColor = "#333";

  isEditMode = false;
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromLocalStorage();

  return itemsFromStorage.includes(item);
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

function init() {
  // event listeners
  itemForm.addEventListener("submit", onAddItemSubmit);

  itemList.addEventListener("click", onClickItem);

  clearButton.addEventListener("click", clearItems);

  itemsFilter.addEventListener("input", filterItems2);

  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
