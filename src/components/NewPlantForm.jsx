import React, { useState } from "react";

function NewPlantForm({ setPlants }) {
  // state for form
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  // form submission
  function handleSubmit(e) {
    e.preventDefault();
    const newPlant = {
      name: name.trim(),
      image: image.trim(),
      price: price,
    };

    // simple validation
    if (!newPlant.name || !newPlant.image || newPlant.price === "") return;

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to create plant");
      return res.json();
    })
    .then((createdPlant) => {
      // add new plant to parent state
      setPlants((prev) => [...prev, createdPlant]);
      // clear from
      setName("");
      setImage("");
      setPrice("");
    })
    .catch((err) => {
      console.error("Error creating plant:", err);
    });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" name="image" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
