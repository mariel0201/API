// src/pages/JsonDataPage.jsx
import React, { useEffect, useState } from 'react';

export default function JsonDataPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://www.jsondataai.com')  // Asegúrate de utilizar el endpoint adecuado
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching json data:', error));
  }, []);

  return (
    <div>
      <h1>Json Data</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : 'Cargando datos...'}</pre>
    </div>
  );
}


