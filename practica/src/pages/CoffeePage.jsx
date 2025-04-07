import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fontsource/dancing-script";

export default function CoffeePage() {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    fetch("https://api.sampleapis.com/coffee/hot")
      .then((response) => response.json())
      .then((data) => setCoffees(data))
      .catch((error) => console.error("Error fetching coffee:", error));
  }, []);

  return (
    <div className="container">
      
      <Link to="/">Volver a la página principal</Link>
      {/* Sección de café */}
      <div className="coffee-card">
  <h1 className="coffee-title">Coffee</h1>
</div>
      <div className="cards-container">
        {coffees.map((coffee) => (
          <div key={coffee.id} className="card">
            <img className="img" src={coffee.image} alt={coffee.title} />
            <div className="coffee-details">
              <h3>{coffee.title}</h3>
              <p>{coffee.description}</p>
              <p><strong>Ingredientes:</strong> {coffee.ingredients.join(", ")}</p>
              <p><strong>Precio:</strong> {coffee.price || "N/A"}</p>
              <p><strong>Ventas totales:</strong> {coffee.totalSales || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
