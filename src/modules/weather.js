import { VISUAL_CROSSING_API } from "./api";

export async function fetchWeatherData(place) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=us&key=${VISUAL_CROSSING_API}&contentType=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch api");
  console.log(response);
  const weatherData = await response.json();
  const { resolvedAddress, days } = weatherData;
  const formattedWeather = { resolvedAddress, days };
  return formattedWeather;
}
