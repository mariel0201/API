import React, { useEffect, useState } from "react";
import "../index.css";

export default function NoticiasPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar noticias y categorías
  useEffect(() => {
    const fetchPosts = fetch("https://www.elmundotoday.com/wp-json/wp/v2/posts?per_page=100")
      .then((res) => res.json());
    const fetchCategories = fetch("https://www.elmundotoday.com/wp-json/wp/v2/categories")
      .then((res) => res.json());

    Promise.all([fetchPosts, fetchCategories])
      .then(([postData, categoryData]) => {
        setPosts(postData);
        setCategories(categoryData);
      })
      .catch((err) => console.error("Error al cargar datos:", err));
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategoryId === null || post.categories.includes(selectedCategoryId);
    const matchesSearch =
      post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedCategoryName = selectedCategoryId
    ? categories.find((c) => c.id === selectedCategoryId)?.name
    : null;

  return (
    <div className="noticias-container">
      <h1 className="noticias-titulo">📰 Noticias {selectedCategoryName && `de ${selectedCategoryName}`}</h1>

      <div className="categorias-menu">
        <button
          onClick={() => setSelectedCategoryId(null)}
          className={!selectedCategoryId ? "categoria-activa" : ""}
        >
          Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryId(cat.id)}
            className={selectedCategoryId === cat.id ? "categoria-activa" : ""}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar noticia..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="noticias-busqueda"
      />

      <div className="noticias-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div className="noticia-card" key={post.id}>
              <h3
                className="noticia-titulo"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div
                className="noticia-extracto"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <a
                className="noticia-enlace"
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Leer más →
              </a>
            </div>
          ))
        ) : (
          <p>No se encontraron noticias.</p>
        )}
      </div>
    </div>
  );
}
