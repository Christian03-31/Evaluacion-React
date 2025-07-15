import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HabilidadesPage() {
  const [habilidades, setHabilidades] = useState([]);
  const [habilidad, setHabilidad] = useState('');
  const [nivel, setNivel] = useState('Básico');
  const navigate = useNavigate();

  const agregarHabilidad = () => {
    if (habilidad.trim() === '') return;
    setHabilidades([...habilidades, { habilidad, nivel }]);
    setHabilidad('');
    setNivel('Básico');
  };

  const continuar = () => {
    localStorage.setItem('habilidades', JSON.stringify(habilidades));
    navigate('/formulario');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Habilidades Requeridas</h2>
      <input
        type="text"
        placeholder="Ej: React"
        value={habilidad}
        onChange={(e) => setHabilidad(e.target.value)}
      />
      <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
        <option value="Básico">Básico</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
      </select>
      <button onClick={agregarHabilidad}>Agregar</button>

      <ul>
        {habilidades.map((item, index) => (
          <li key={index}>{item.habilidad} - {item.nivel}</li>
        ))}
      </ul>

      <button onClick={continuar} disabled={habilidades.length === 0}>
        Continuar
      </button>
    </div>
  );
}

export default HabilidadesPage;
