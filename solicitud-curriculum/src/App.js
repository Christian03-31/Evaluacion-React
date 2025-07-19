//Importa react y los modulos necesarios para el enrutamiento
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Con esto se importan las paginas que utilizare
import HabilidadesPage from './paginas/habilidades';
import FormularioPage from './paginas/Formulario';
import './App.css';//Importa los estilos

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HabilidadesPage />} />
        <Route path="/formulario" element={<FormularioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
