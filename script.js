const link =
  "http://api.weatherstack.com/current?access_key=7b048faeac1477bce5ee8a11ba24330e";

const root = document.getElementById("root");
const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
const form = document.getElementById("form");

let store = {
  city: "Romny",
  feelslike: 0,
  cloudcover: 0,
  temperature: 0,
  observationTime: "00:00 AM",
  isDay: "yes",
  description: "",
  properties: {
    cloudcover: {},
    humidity: {},
    windSpeed: {},
    pressure: {},
    visibility: {},
    uvIndex: {},
  },
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
    feelslike,
    temperature,
    observationTime,
    description: description[0].trim(),
    properties: {
      cloudcover: {
        title: "cloudcover",
        value: `${cloudcover} %`,
        icon: "cloud.png",
      },
      humidity: {
        title: "humidity",
        value: `${humidity} %`,
        icon: "humidity.png",
      },
      windSpeed: {
        title: "windSpeed",
        value: `${windSpeed} km/h`,
        icon: "wind.png",
      },
      pressure: {
        title: "pressure",
        value: `${pressure} %`,
        icon: "gauge.png",
      },
      uvIndex: {
        title: "uvIndex",
        value: `${uvIndex} / 100`,
        icon: "uv-index.png",
      },
      visibility: {
        title: "visibility",
        value: `${visibility} %`,
        icon: "visibility.png",
      },
    },
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

const renderProperty = (properties) => {
  return Object.values(properties)
    .map(({ title, value, icon }) => {
      // const { title, value, icon } = data;
      return `
    <div class="property">
      <div class="property-icon">
        <img src="./img/icons/${icon}" alt="">
      </div>
      <div class="property-info">
        <div class="property-info__value">${value}</div>
        <div class="property-info__description">${title}</div>
      </div>
    </div>
    `;
    })
    .join("");
};

const markup = () => {
  const { city, description, observationTime, temperature, isDay, properties } =
    store;

  const containerClass = isDay === "yes" ? "is-day" : "";

  return `
    <div class="container ${containerClass}">
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
      <div id="properties">${renderProperty(properties)}</div>
    </div>
    `;
};

const toggleClass = () => {
  popup.classList.toggle("active");
};

const renderComponent = () => {
  root.innerHTML = markup();

  const city = document.getElementById("city");
  city.addEventListener("click", toggleClass);
};

const handleInput = (e) => {
  store = {
    ...store,
    city: e.target.value,
  };
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(store.city);
}

form.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);

fetchData();
