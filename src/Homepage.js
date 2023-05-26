import { useState, useEffect } from "react";

const HomePage = ({ username }) => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities) {
      setCities(storedCities);
    }
  }, []);

  const handleAddCity = async (e) => {
    e.preventDefault();

    if (cities.length >= 5) {
      setError("Maximum 5 cities can be added");
      return;
    }
    if (
      cities.some((city) => city.name.toLowerCase() === newCity.toLowerCase())
    ) {
      setError("City already exists");
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=45256285c0f042d887b142639232605&q=${newCity}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather information.");
      }
      const cityData = await response.json();
      const newCityData = {
        name: cityData.location.name,
        description: cityData.current.condition.text,
        image: cityData.current.condition.icon,
        temperature: cityData.current.temp_c,
        humidity: cityData.current.humidity,
        precipitation: cityData.current.precip_mm,
      };

      const updatedCities = [...cities, newCityData];
      setCities(updatedCities);
      localStorage.setItem("cities", JSON.stringify(updatedCities));

      setNewCity("");
      setError("");
    } catch (error) {
      setError("Failed to fetch weather information.");
    }
  };

  const handleRemoveCity = (index) => {
    const updatedCities = cities.filter((_, i) => i !== index);
    setCities(updatedCities);
    localStorage.setItem("cities", JSON.stringify(updatedCities));
  };
  return (
    <div>
      <h2>Welcome to the weather app, {username}</h2>
      <div className="add-city-container">
        <h3>Add Favorite City</h3>
        <form onSubmit={handleAddCity}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter city name"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      <div className="favorite-cities-container">
        {cities.map((city, index) => (
          <div key={index} className="card">
            <h4>{city.name}</h4>
            <p>Description: {city.description}</p>
            <img src={city.image} alt={city.description} />
            <p>Temperature: {city.temperature}°C</p>
            <p>Humidity: {city.humidity}%</p>
            <p>Precipitation: {city.precipitation} mm</p>
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveCity(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
