import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HabilidadesPage from './paginas/habilidades';
import FormularioPage from './paginas/Formulario';

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
