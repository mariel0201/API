import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WinesPage from "./pages/WinesPage";
import CoffeePage from "./pages/CoffeePage";
import JsonDataPage from "./pages/JsonDataPage";
import "@fontsource/dancing-script"; // O puedes especificar el peso si lo deseas


export default function App() {
  return (
    <Router>
      <div className="container">
        <h1>Practica API</h1>
        <nav>
          <ul>
            <li><Link to="/wines">Noticias</Link></li>
            <li><Link to="/coffee">Café</Link></li>
            <li><Link to="/jsondata">Beers</Link></li>
          </ul>
        </nav>

        {/* Aquí se renderizan las páginas sin duplicarlas */}
        <Routes>
          <Route path="/wines" element={<WinesPage />} />
          <Route path="/coffee" element={<CoffeePage />} />
          <Route path="/jsondata" element={<JsonDataPage />} />
        </Routes>
      </div>
    </Router>
  );
}
