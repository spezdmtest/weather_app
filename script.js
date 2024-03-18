const link =
  "http://api.weatherstack.com/current?access_key=951981ebc5a411b6a982668563334cf4";

const root = document.getElementById("root");

let store = {
  city: "Romny",
  feelslike: 0,
  cloudcover: 0,
  temperature: 0,
  humidity: 0,
  observationTime: "00:00 AM",
  pressure: 0,
  uvIndex: 0,
  visibility: 0,
  isDay: "yes",
  description: "",
  windSpeed: 0,
};

const fetchData = async () => {
  const result = await fetch(`${link}&query=${store.city}`);
  const data = await result.json();
  console.log(data);

  const {
    current: {
      feelslike,
      cloudcover,
      temperature,
      humidity,
      observation_time: observationTime,
      pressure,
      uv_index: uvIndex,
      visibility,
      is_day: isDay,
      weather_descriptions: description,
      wind_speed: windSpeed,
    },
  } = data;

  store = {
    ...store,
    isDay,
    pressure,
    uvIndex,
    feelslike,
    cloudcover,
    temperature,
    humidity,
    observationTime,
    visibility,
    windSpeed,
    description: description[0],
  };

  renderComponent();
};

const getImage = (description) => {
  const value = description.toLowerCase();
  switch (value) {
    case "patchy rain nearby":
      return "cloud.png";
    case "cloud":
      return "cloud.png";
    case "fog":
      return "fog.png";
    case "sunny":
      return "sunny.png";
    case "partly cloudy":
      return "partly.png";
    default:
      return "the.png";
  }
};

const markup = () => {
  const { city, description, observationTime, temperature } = store;
  return `
    <div class="container">
      <div class="top">
        <div class="city">
          <div class="city-subtitle">Weather Today in</div>
          <div class="city-title" id="city">
            <span>${city}</span>
          </div>
        </div>
        <div class="city-info">
          <div class="top-left">
            <img class="icon" src="./img/${getImage(description)}" alt="" />
            <div class="description">${description}</div>
          </div>
          <div class="top-right">
            <div class="city-info__subtitle">as of ${observationTime}</div>
            <div class="city-info__title">${temperature}°</div>
          </div>
        </div>
      </div>
      <div id="properties"></div>
    </div>`;
};

const renderComponent = () => {
  root.innerHTML = markup();
};

fetchData();
