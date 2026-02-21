import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not okay");
      return res.json();
    })
    .then((data) => setPlants(data))
    .catch((error) => {
      console.error("Fetch plants failed:", error);
    });
  }, []);

  return (
    <div className="app">
      <Header />
      <PlantPage plants={plants} setPlants={setPlants} />
    </div>
  );
}

export default App;
