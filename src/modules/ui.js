import { searchBar, loadingSpinner } from "./constant.js";
import { setUpSumbitListener, setUpInputListener } from "./controller.js";

export function init() {
  removeLoading();
  const searchElement = createSearchBar();
  renderSearchBar(searchElement);
  setUpInputListener();
  setUpSumbitListener();
}

/* Loading spinners */
export function createLoadingSpinner(place) {
  const p = document.createElement("p");
  p.className = loadingSpinner.CLASS_NAME;
  p.textContent = `Loading results for ${place}`;

  return p;
}

export function renderLoadingSpinner(spinner) {
  const main = document.querySelector(".main");
  main.appendChild(spinner);
}

export function removeLoading() {
  const loadingElement = document
    .querySelector(".main")
    .querySelector(`.${loadingSpinner.CLASS_NAME}`);
  loadingElement.remove();
}

/* Search bar component*/

function createSearchBar() {
  const searchElement = document.createElement("search");
  searchElement.role = searchBar.ROLE;
  searchElement.className = searchBar.CLASS_NAME;

  const form = document.createElement("form");
  form.noValidate = true;

  const input = document.createElement("input");
  input.name = searchBar.INPUT_NAME;
  input.id = searchBar.INPUT_ID;
  input.required = true;
  input.placeholder = searchBar.INPUT_PLACEHOLDER;
  form.appendChild(input);

  const button = document.createElement("button");
  button.type = searchBar.BUTTON_TYPE;
  button.textContent = searchBar.BUTTON_TEXT;
  form.appendChild(button);

  searchElement.appendChild(form);

  return searchElement;
}

function renderSearchBar(searchElement) {
  const main = document.querySelector(".main");
  main.appendChild(searchElement);
}
