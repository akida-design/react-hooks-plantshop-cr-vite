import React, { useState } from "react";

function PlantCard({ plant, setPlants }) {
  const { id, name, image, price } = plant;
  const [isSoldOut, setIsSoldOut] = useState(!!plant.isSoldOut);

  function handleToogleSold() {
    const newStatus = !isSoldOut;

    setIsSoldOut(newStatus);

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isSoldOut: newStatus }),
    })
    .then((res) => {
      if(!res.ok) throw new Error("Failed to update the plant");
      return res.json();
    })
    .then((updatedPlant) => {
      // update parent list
      if (setPlants) {
        setPlants((prev) => prev.map((p) => (p.id === updatedPlant.id ? updatedPlant : p)));
      }
    })
    .catch((err) => {
      console.error("Error updating plant:", err);
      setIsSoldOut(!newStatus);
    });
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${Number(price).toFixed(2)}</p>
      {isSoldOut ? (
        <button onClick={handleToogleSold}>Out of Stock</button>
      ) : (
        <button  className="primary" onClick={handleToogleSold}>In Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
