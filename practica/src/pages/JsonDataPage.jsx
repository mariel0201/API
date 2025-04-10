import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "@fontsource/dancing-script";
import fallbackImage from "../assets/Taz.gif";
import "../fonts.css";

export default function JsonDataPage() {
  const [data, setData] = useState([]);
  const [imageErrorIds, setImageErrorIds] = useState([]);



  useEffect(() => {
    fetch('https://api.sampleapis.com/beers/ale')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching json data:', error));
  }, []);

  const handleImageError = (id) => {
    if (!imageErrorIds.includes(id)) {
      setImageErrorIds(prev => [...prev, id]);
    }
  };

  return (
    <div className="container">
      <Link to="/">Volver a la página principal</Link>

      <div className="Jsondata-card">
        <h1 className="Jsondata-title">Json Data</h1>
      </div>

      <div className="cards-container">
        {data.length > 0 ? (
          data.map((beer) => (
            <div key={beer.id} className="card">
              <img
                className={imageErrorIds.includes(beer.id) ? "fallback-img" : "img"}
                id={imageErrorIds.includes(beer.id) ? "icono" : ""}
                src={imageErrorIds.includes(beer.id) ? fallbackImage : beer.image}
                alt={beer.name}
                onError={() => handleImageError(beer.id)}
              />

              <div className="coffee-details">
                <h3>{beer.name}</h3>
                <p><strong>Precio:</strong> {beer.price}</p>
                <p><strong>Rating:</strong> ⭐ {beer.rating?.average?.toFixed(1)} / 5</p>
                <p><strong>Reseñas:</strong> {beer.rating?.reviews}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
}
