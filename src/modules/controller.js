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
  showButton,
  hideButton,
  showHeader,
  hideHeader,
} from "./ui";

let currentWeatherData;
/* Submit listener */

export function setUpSumbitListener() {
  const searchElement = document.querySelector(`.${searchBar.CLASS_NAME}`);
  if (!searchElement) throw new Error("Element not found");

  searchElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = event.target.querySelector(`#${searchBar.INPUT_ID}`);
    if (!input.validity.valid) {
      validateSearchInput(input);
      return;
    }

    new Promise((resolve) => {
      hideButton();
      const head = getHeader();
      hideHeader(head);
      const loading = createLoadingSpinner(input.value);
      const wrapper = getWeatherWrapper();
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
        currentWeatherData = weatherData;
        showInCelsius(currentWeatherData);
        const head = getHeader();
        showHeader(head);
        changeHeaderText(head, currentWeatherData.resolvedAddress);
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
      const wrapper = getWeatherWrapper();
      clearContent(wrapper);
      showInCelsius(currentWeatherData);
    } else if (event.target.id === toggleButton.FARENHEIT.id) {
      const wrapper = getWeatherWrapper();
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
