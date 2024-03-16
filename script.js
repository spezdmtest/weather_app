const link =
  "http://api.weatherstack.com/current?access_key=fc3a599323c964c600f1a162cc442b4a";

const fetchData = async () => {
  const result = await fetch(`${link}&query=Romny`);
  const data = await result.json();
  console.log(data);
};

fetchData();
