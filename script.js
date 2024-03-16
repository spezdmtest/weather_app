const link =
  "http://api.weatherstack.com/current?access_key=fc3a599323c964c600f1a162cc442b4a";

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

const markup = () => {
  return `
    <div class="container">
      <div class="top">
        <div class="city">
          <div class="city-subtitle">Weather Today in</div>
          <div class="city-title" id="city">
            <span></span>
          </div>
        </div>
        <div class="city-info">
          <div class="top-left">
            <img class="icon" src="./img/" alt="" />
            <div class="description"></div>
          </div>
          <div class="top-right">
            <div class="city-info__subtitle">as of</div>
            <div class="city-info__title">°</div>
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
