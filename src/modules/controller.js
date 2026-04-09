import { searchBar, toggleButton } from "./constant";
import { fetchWeatherData } from "./weather";
import {
  createLoadingSpinner,
  renderLoadingSpinner,
  removeLoading,
  getWeatherWrapper,
  clearContent,
  changeHeaderText,
  getHeader,
  showInFahrenheit,
  showInCelsius,
  createErrorMessage,
  renderErrorMessage,
  getErrorMessage,
  deleteElement,
  showButton,
  hideButton,
  showElement,
  hideElement,
  disableSearchBar,
  enableSearchBar,
  higlightCelsiusButton,
  higlightFahrenheitButton,
  removeButtonHiglight,
  clearInput,
} from "./ui";

let currentWeatherData;
/* Submit listener */

export function setUpSumbitListener() {
  const searchElement = document.querySelector(`.${searchBar.CLASS_NAME}`);
  if (!searchElement) throw new Error("Element not found");
  searchElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.target.querySelector(`#${searchBar.INPUT_ID}`);
    disableSearchBar(input);
    if (!input.validity.valid) {
      validateSearchInput(input);
      return;
    }

    new Promise((resolve) => {
      hideButton();
      const error = getErrorMessage();
      deleteElement(error);
      const head = getHeader();
      hideElement(head);
      const loading = createLoadingSpinner(input.value);
      const wrapper = getWeatherWrapper();
      hideElement(wrapper);
      clearContent(wrapper);
      clearContent(head);
      renderLoadingSpinner(loading);
      resolve();
    })
      .then(() => {
        return fetchWeatherData(input.value);
      })
      .then((weatherData) => {
        showButton();
        higlightCelsiusButton();
        currentWeatherData = weatherData;
        showInCelsius(currentWeatherData);
        const head = getHeader();
        showElement(head);
        changeHeaderText(head, currentWeatherData.resolvedAddress);
        const wrapper = getWeatherWrapper();
        showElement(wrapper);
      })
      .catch((error) => {
        console.log(error);
        const wrapper = getWeatherWrapper();
        clearContent(wrapper);
        const errorMessage = createErrorMessage();
        renderErrorMessage(errorMessage);
      })
      .finally(() => {
        removeLoading();
        enableSearchBar(input);
        clearInput(input);
      });
  });
}

export function setUpInputListener() {
  const searchElement = document.querySelector(`.${searchBar.CLASS_NAME}`);
  if (!searchElement) throw new Error("Element not found");

  searchElement.addEventListener("input", (event) => {
    const input = event.target;
    if (!input.validity.valid) {
      validateSearchInput(input);
      return;
    }
  });
}

export function setUpClickListener() {
  const main = document.querySelector(".main");
  main.addEventListener("click", (event) => {
    if (event.target.id === toggleButton.CELSIUS.id) {
      removeButtonHiglight();
      higlightCelsiusButton();
      const wrapper = getWeatherWrapper();
      clearContent(wrapper);
      showInCelsius(currentWeatherData);
    } else if (event.target.id === toggleButton.FARENHEIT.id) {
      removeButtonHiglight();
      const wrapper = getWeatherWrapper();
      higlightFahrenheitButton();
      clearContent(wrapper);
      showInFahrenheit(currentWeatherData);
    }
  });
}

function validateSearchInput(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity("Please enter a city.");
  } else {
    input.setCustomValidity("");
  }
  input.reportValidity();
}
