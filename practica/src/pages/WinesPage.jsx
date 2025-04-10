import React, { useEffect, useState } from "react";
import "../fonts.css";

export default function WinesPage() {
  const [wines, setWines] = useState([]);
  const [newWine, setNewWine] = useState({ winery: "", wine: "", location: "" });
  const [editWineId, setEditWineId] = useState(null);
  const [editWineData, setEditWineData] = useState({ winery: "", wine: "", location: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("https://api.sampleapis.com/wines/reds")
      .then((response) => response.json())
      .then((data) => setWines(data))
      .catch((error) => console.error("Error fetching wines:", error));
  }, []);

  const handleAddWine = () => {
    const newWineData = { ...newWine, id: wines.length + 1 };
    setWines([...wines, newWineData]);
    setNewWine({ winery: "", wine: "", location: "" });
    setShowForm(false);
  };

  const handleEditClick = (wine) => {
    setEditWineId(wine.id);
    setEditWineData({
      winery: wine.winery,
      wine: wine.wine,
      location: wine.location,
    });
  };

  const handleUpdateWine = (id) => {
    setWines(
      wines.map((wine) =>
        wine.id === id ? { ...wine, ...editWineData } : wine
      )
    );
    setEditWineId(null);
    setEditWineData({ winery: "", wine: "", location: "" });
  };

  const handleDeleteWine = (id) => {
    setWines(wines.filter((wine) => wine.id !== id));
  };

  const filteredWines = wines.filter((wine) =>
    wine.winery?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wine.wine?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ fontFamily: "Anatomy" }} className="wines-title">Wines</h1>

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

      {/* Formulario para agregar un vino */}
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
                {editWineId === wine.id ? (
                  <>
                    <input
                      type="text"
                      value={editWineData.winery}
                      onChange={(e) =>
                        setEditWineData({ ...editWineData, winery: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={editWineData.wine}
                      onChange={(e) =>
                        setEditWineData({ ...editWineData, wine: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={editWineData.location}
                      onChange={(e) =>
                        setEditWineData({ ...editWineData, location: e.target.value })
                      }
                    />
                    <button onClick={() => handleUpdateWine(wine.id)}>💾 Guardar</button>
                    <button onClick={() => setEditWineId(null)}>❌ Cancelar</button>
                  </>
                ) : (
                  <>
                    <h3>{wine.winery}</h3>
                    <p><strong>Nombre:</strong> {wine.wine}</p>
                    <p><strong>Ubicación:</strong> {wine.location}</p>
                    <button onClick={() => handleEditClick(wine)}>✏️ Editar</button>
                    <button onClick={() => handleDeleteWine(wine.id)}>🗑️ Eliminar</button>
                  </>
                )}
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
