import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fontsource/dancing-script";

export default function CoffeePage() {
  const [coffees, setCoffees] = useState([]);
  const [newCoffee, setNewCoffee] = useState({
    title: "",
    description: "",
    ingredients: "",
    price: "",
    totalSales: "",
  });
  const [editCoffeeId, setEditCoffeeId] = useState(null);
  const [editCoffeeData, setEditCoffeeData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("https://api.sampleapis.com/coffee/hot")
      .then((response) => response.json())
      .then((data) => setCoffees(data))
      .catch((error) => console.error("Error fetching coffee:", error));
  }, []);

  const handleAddCoffee = () => {
    const newCoffeeData = {
      ...newCoffee,
      id: coffees.length + 1,
      ingredients: newCoffee.ingredients.split(",").map((i) => i.trim()),
    };
    setCoffees([...coffees, newCoffeeData]);
    setNewCoffee({ title: "", description: "", ingredients: "", price: "", totalSales: "" });
    setShowForm(false);
  };

  const handleEditClick = (coffee) => {
    setEditCoffeeId(coffee.id);
    setEditCoffeeData({
      title: coffee.title,
      description: coffee.description,
      ingredients: coffee.ingredients.join(", "),
      price: coffee.price || "",
      totalSales: coffee.totalSales || "",
    });
  };

  const handleUpdateCoffee = (id) => {
    setCoffees(
      coffees.map((coffee) =>
        coffee.id === id
          ? {
              ...coffee,
              ...editCoffeeData,
              ingredients: editCoffeeData.ingredients.split(",").map((i) => i.trim()),
            }
          : coffee
      )
    );
    setEditCoffeeId(null);
    setEditCoffeeData({});
  };

  const handleDeleteCoffee = (id) => {
    setCoffees(coffees.filter((coffee) => coffee.id !== id));
  };

  const filteredCoffees = coffees.filter((coffee) =>
    coffee.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Link to="/">Volver a la página principal</Link>

      <div className="coffee-card">
        <h1 className="coffee-title">Coffee</h1>
      </div>

      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar café..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Botón para mostrar/ocultar el formulario */}
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-btn">
        {showForm ? "Ocultar Formulario" : "Agregar Café"}
      </button>

      {/* Formulario de creación */}
      {showForm && (
        <div className="coffee-form">
          <input
            type="text"
            placeholder="Título"
            value={newCoffee.title}
            onChange={(e) => setNewCoffee({ ...newCoffee, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newCoffee.description}
            onChange={(e) => setNewCoffee({ ...newCoffee, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ingredientes (separados por coma)"
            value={newCoffee.ingredients}
            onChange={(e) => setNewCoffee({ ...newCoffee, ingredients: e.target.value })}
          />
          <input
            type="text"
            placeholder="Precio"
            value={newCoffee.price}
            onChange={(e) => setNewCoffee({ ...newCoffee, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ventas totales"
            value={newCoffee.totalSales}
            onChange={(e) => setNewCoffee({ ...newCoffee, totalSales: e.target.value })}
          />
          <button onClick={handleAddCoffee}>Guardar</button>
        </div>
      )}

      {/* Tarjetas de cafés */}
      <div className="cards-container">
        {filteredCoffees.map((coffee) => (
          <div key={coffee.id} className="card">
            <img className="img" src={coffee.image} alt={coffee.title} />
            <div className="coffee-details">
              {editCoffeeId === coffee.id ? (
                <>
                  <input
                    type="text"
                    value={editCoffeeData.title}
                    onChange={(e) => setEditCoffeeData({ ...editCoffeeData, title: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editCoffeeData.description}
                    onChange={(e) =>
                      setEditCoffeeData({ ...editCoffeeData, description: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editCoffeeData.ingredients}
                    onChange={(e) =>
                      setEditCoffeeData({ ...editCoffeeData, ingredients: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editCoffeeData.price}
                    onChange={(e) =>
                      setEditCoffeeData({ ...editCoffeeData, price: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editCoffeeData.totalSales}
                    onChange={(e) =>
                      setEditCoffeeData({ ...editCoffeeData, totalSales: e.target.value })
                    }
                  />
                  <button onClick={() => handleUpdateCoffee(coffee.id)}>💾 Guardar</button>
                  <button onClick={() => setEditCoffeeId(null)}>❌ Cancelar</button>
                </>
              ) : (
                <>
                  <h3>{coffee.title}</h3>
                  <p>{coffee.description}</p>
                  <p><strong>Ingredientes:</strong> {coffee.ingredients.join(", ")}</p>
                  <p><strong>Precio:</strong> {coffee.price || "N/A"}</p>
                  <p><strong>Ventas totales:</strong> {coffee.totalSales || "N/A"}</p>
                  <button onClick={() => handleEditClick(coffee)}>✏️ Editar</button>
                  <button onClick={() => handleDeleteCoffee(coffee.id)}>🗑️ Eliminar</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
