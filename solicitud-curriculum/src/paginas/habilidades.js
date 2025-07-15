import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HabilidadesPage() {
    
  const [habilidad, setHabilidad] = useState('');
  const [nivel, setNivel] = useState('Básico');
  const [experiencia, setExperiencia] = useState('');
  const [estudios, setEstudios] = useState('');
  const [descripcionTrabajo, setDescripcionTrabajo] = useState('');
  const [habilidades, setHabilidades] = useState([]);
  const navigate = useNavigate();

  const agregarHabilidad = () => {
    if (habilidad.trim() === '') return;

    const nuevaHabilidad = {
      habilidad,
      nivel,
      experiencia,
      estudios,
      descripcionTrabajo,
    };

    setHabilidades([...habilidades, nuevaHabilidad]);

    // Limpiar campos
    setHabilidad('');
    setNivel('Básico');
    setExperiencia('');
    setEstudios('');
    setDescripcionTrabajo('');
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
        placeholder="Nombre de la habilidad"
        value={habilidad}
        onChange={(e) => setHabilidad(e.target.value)}
      />

      <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
        <option value="Básico">Básico</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
      </select>

      <input
        type="number"
        placeholder="Años de experiencia requeridos"
        value={experiencia}
        onChange={(e) => setExperiencia(e.target.value)}
      />

      <input
        type="text"
        placeholder="Dónde realizó sus estudios"
        value={estudios}
        onChange={(e) => setEstudios(e.target.value)}
      />

      <textarea
        placeholder="Breve descripción de cómo trabaja"
        value={descripcionTrabajo}
        onChange={(e) => setDescripcionTrabajo(e.target.value)}
      />

      <button onClick={agregarHabilidad}>Agregar</button>

      <ul>
        {habilidades.map((item, index) => (
          <li key={index}>
            <p><strong>{item.habilidad}</strong> - {item.nivel}</p>
            <p><span>Experiencia requerida: {item.experiencia} años</span></p>
            <p><span>Estudios: {item.estudios}</span></p>
            <p><span>Descripción: {item.descripcionTrabajo}</span></p>
          </li>
        ))}
      </ul>

      <button onClick={continuar} disabled={habilidades.length === 0}>
        Continuar
      </button>
    </div>
  );
}

export default HabilidadesPage;
