const link =
  "http://api.weatherstack.com/current?access_key=7064dc763a6853f11dfe0bf912f2f912";

const fetchData = async () => {
  const result = await fetch(`${link}&query=Romny`);
  const data = await result.json();
  console.log(data);
};
fetchData();
