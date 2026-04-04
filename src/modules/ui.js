import {
  searchBar,
  loadingSpinner,
  weatherWrapper,
  weatherCard,
  header,
  icons,
  toggleButton,
} from "./constant.js";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
import * as weatherIcons from "./icons.js";

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

export function createSearchBar() {
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

export function renderSearchBar(searchElement) {
  const main = document.querySelector(".main");
  main.appendChild(searchElement);
}
/* Header */

export function createWeatherCardHeader() {
  const h1 = document.createElement("h1");
  h1.className = header.CLASS_NAME;
  return h1;
}

export function renderHeader(header) {
  const main = document.querySelector(".main");
  main.appendChild(header);
}

export function getHeader() {
  try {
    const h1 = document.querySelector(`.${header.CLASS_NAME}`);
    if (!h1) throw new Error("Element not found");
    return h1;
  } catch (error) {
    console.error(error);
  }
}

export function changeHeaderText(head, place) {
  head.textContent = `Weather forecast of ${place}`;
}

/* Weather UI components */

export class WeatherCard {
  constructor(temp, date, icon, description, symbol) {
    this.temp = temp;
    this.date = date;
    this.icon = icon;
    this.description = description;
    this.symbol = symbol;
  }

  renderWeatherCard(card) {
    try {
      const wrapper = document.querySelector(`.${weatherWrapper.CLASS_NAME}`);
      if (!wrapper) throw new Error("Element not found");
      wrapper.appendChild(card);
    } catch (error) {
      console.log(error);
    }
  }

  createWeatherCard() {
    const card = document.createElement("div");
    card.className = weatherCard.CARD_CLASS;
    card.appendChild(this.#createImage());
    card.appendChild(this.#createTemp());
    card.appendChild(this.#createDescription());
    card.appendChild(this.#createDate());
    return card;
  }

  #createImage() {
    const div = document.createElement("div");
    div.className = weatherCard.ICON_CLASS;
    div.innerHTML = checkIcon(this.icon);
    return div;
  }

  #createTemp() {
    const temp = document.createElement("h2");
    temp.className = weatherCard.TEMP_CLASS;
    temp.textContent = this.temp + this.symbol;
    return temp;
  }

  #createDescription() {
    const desc = document.createElement("p");
    desc.className = weatherCard.DESCRIPTION_CLASS;
    desc.textContent = this.description;
    return desc;
  }

  #createDate() {
    const parsedDate = parseISO(this.date);
    const date = convertDate(parsedDate);
    const time = document.createElement("time");
    time.className = weatherCard.DATE_CLASS;
    time.textContent = date;

    return time;
  }
}

export function createWrapper() {
  const div = document.createElement("section");
  div.className = weatherWrapper.CLASS_NAME;

  return div;
}

export function renderWrapper(wrapper) {
  const main = document.querySelector(".main");
  main.appendChild(wrapper);
}

export function getWeatherWrapper() {
  try {
    const wrapper = document.querySelector(`.${weatherWrapper.CLASS_NAME}`);
    if (!wrapper) throw new Error("Element missing");
    return wrapper;
  } catch (error) {
    console.error(error);
  }
}

export function clearContent(element) {
  element.innerHTML = "";
}

function convertDate(date) {
  if (isToday(date)) {
    return format(date, "'Today', MMM dd");
  } else if (isTomorrow(date)) {
    return format(date, "'Tommorow', MMM dd");
  } else {
    return format(date, "EEEE, MMM dd");
  }
}

function checkIcon(icon) {
  if (icon === icons.CLEAR_DAY) return weatherIcons.clearDay;
  else if (icon === icons.CLOUDY) return weatherIcons.cloudy;
  else if (icon === icons.RAIN) return weatherIcons.rainy;
  else if (icon === icons.PARTLY_CLOUDY) return weatherIcons.partlyCloudy;
  else if (icon === icons.SNOW) return weatherIcons.snow;
}

/* Toggle Buttons */

export function createButton() {
  const buttonDetails = [toggleButton.CELSIUS, toggleButton.FARENHEIT];
  const div = document.createElement("div");
  div.className = toggleButton.CLASS_NAME;
  buttonDetails.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item.text;
    button.id = item.id;
    div.appendChild(button);
  });

  return div;
}

export function renderButton(buttons) {
  const main = document.querySelector(".main");
  main.appendChild(buttons);
}

export function showInFahrenheit(currentWeatherData) {
  if (!currentWeatherData) return null;
  currentWeatherData.forEach((item) => {
    const component = new WeatherCard(
      item.temp,
      item.datetime,
      item.icon,
      item.description,
      toggleButton.FARENHEIT.text,
    );
    const card = component.createWeatherCard();
    component.renderWeatherCard(card);
  });
}

export function showInCelsius(currentWeatherData) {
  if (!currentWeatherData) return null;
  const celsiusWeatherData = currentWeatherData.map((item) =>
    formatNumber(Number(((item.temp - 32) * 5) / 9)),
  );
  currentWeatherData.forEach((item, index) => {
    const component = new WeatherCard(
      celsiusWeatherData[index],
      item.datetime,
      item.icon,
      item.description,
      toggleButton.CELSIUS.text,
    );
    const card = component.createWeatherCard();
    component.renderWeatherCard(card);
  });
}

function formatNumber(num) {
  if (num % 1 === 0) return num.toString();
  return Number(num.toFixed(1));
}
