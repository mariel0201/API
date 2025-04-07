import React, { useEffect, useState } from "react";

export default function WinesPage() {
  const [wines, setWines] = useState([]);
  const [newWine, setNewWine] = useState({ winery: "", wine: "", location: "" });
  const [editWine, setEditWine] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario

  useEffect(() => {
    fetch("https://api.sampleapis.com/wines/reds") // Ajusta la URL si es necesario
      .then((response) => response.json())
      .then((data) => setWines(data))
      .catch((error) => console.error("Error fetching wines:", error));
  }, []);

  // 🟢 Crear un nuevo vino
  const handleAddWine = () => {
    const newWineData = { ...newWine, id: wines.length + 1 };
    setWines([...wines, newWineData]);
    setNewWine({ winery: "", wine: "", location: "" });
    setShowForm(false); // Ocultar el formulario después de agregar
  };

  // 🔵 Actualizar un vino
  const handleUpdateWine = () => {
    setWines(wines.map((wine) => (wine.id === editWine.id ? editWine : wine)));
    setEditWine(null);
  };

  // 🔴 Eliminar un vino
  const handleDeleteWine = (id) => {
    setWines(wines.filter((wine) => wine.id !== id));
  };

  // 🔍 Filtrar vinos por nombre o bodega
  const filteredWines = wines.filter((wine) =>
    wine.winery.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wine.wine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="wines-title">Wines</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar vino o bodega..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Botón para mostrar el formulario */}
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-btn">
        {showForm ? "Ocultar Formulario" : "Agregar Vino"}
      </button>

      {/* Formulario para agregar un vino (se muestra solo si showForm es true) */}
      {showForm && (
        <div className="wine-form">
          <input
            type="text"
            placeholder="Bodega"
            value={newWine.winery}
            onChange={(e) => setNewWine({ ...newWine, winery: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nombre del vino"
            value={newWine.wine}
            onChange={(e) => setNewWine({ ...newWine, wine: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={newWine.location}
            onChange={(e) => setNewWine({ ...newWine, location: e.target.value })}
          />
          <button onClick={handleAddWine}>Guardar</button>
        </div>
      )}

      {/* Lista de vinos */}
      <div className="wines-container">
        {filteredWines.length > 0 ? (
          filteredWines.map((wine) => (
            <div key={wine.id} className="wine-card">
              <img className="wine-img" src={wine.image} alt={wine.wine} />
              <div className="wine-details">
                <h3>{wine.winery}</h3>
                <p><strong>Nombre:</strong> {wine.wine}</p>
                <p><strong>Ubicación:</strong> {wine.location}</p>
                <button onClick={() => setEditWine(wine)}>✏️ Editar</button>
                <button onClick={() => handleDeleteWine(wine.id)}>🗑️ Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron vinos.</p>
        )}
      </div>
    </div>
  );
}
