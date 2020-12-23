/* Global Variables */

// api key from openWeatherMap
const weatherApiKey = "2d0f2126063762f53766ac5883919c38";
// base url of openWeatherMap
const baseUrl = `http://api.openweathermap.org/data/2.5/weather`;

const generateButton = document.getElementById("generate");
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const dateUI = document.getElementById("date");
const tempUI = document.getElementById("temp");
const contentUI = document.getElementById("content");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

/**
 * async function to fetch the current weather in any US city by zip code
 */
const getWeather = async (zipCode) => {
  const url = `${baseUrl}?zip=${zipCode},us&appid=${weatherApiKey}`;
  const response = await fetch(url);
  try {
    json = await response.json();
    const responseFromServer = await postWetherToServer(json.main.temp);
    updateUI(responseFromServer);
  } catch (e) {
    return "";
  }
};

// async function to post current weather, date and user response to local server
const postWetherToServer = async (temp) => {
  const data = {
    temperature: temp,
    date: newDate,
    feelings: feelingsInput.value,
  };
  const response = await fetch("/postData", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const dataFromServer = await response.json();
    return dataFromServer;
  } catch (e) {
    return;
  }
};

// function to update the ui with three parameters (tempreature, date and user response)
const updateUI = ({ temperature, date = new Date(), feelings }) => {
  tempUI.innerHTML = temperature;
  dateUI.innerHTML = date;
  contentUI.innerHTML = feelings;
};

// attach event listener to the button with ID 'generate'
generateButton.addEventListener("click", () => {
  getWeather(zipInput.value);
});
