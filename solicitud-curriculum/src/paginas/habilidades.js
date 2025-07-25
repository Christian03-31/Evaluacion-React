import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HabilidadesPage() {
  //define los estados para cada parte del formulario
  const [paso, setPaso] = useState(1);
  const [habilidades, setHabilidades] = useState([]);
  const [habilidad, setHabilidad] = useState('');
  const [nivel, setNivel] = useState('Básico');
  const [experiencia, setExperiencia] = useState('');
  const [estudios, setEstudios] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [colorFondo, setColorFondo] = useState('#ffffff');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Postulación"; //cambia el titulo del documento
  }, []);

  //Se utiliza para cambiar los colores de fondo del formulario
  const cambiarColorFondo = () => {
    const colores = ['#ffffff', '#f0f0f0', '#f5e6b3'];
    const indiceActual = colores.indexOf(colorFondo);
    const siguienteIndice = (indiceActual + 1) % colores.length;
    setColorFondo(colores[siguienteIndice]);
  };

  //Se utiliza para agregar las habilidades en el formulario
  const agregarHabilidad = () => {
    if (habilidad.trim() === '') return;
    setHabilidades([...habilidades, { habilidad, nivel }]);
    setHabilidad('');
    setNivel('Básico');
  };

  //Es para borrar una habilidad
  const eliminarHabilidad = (indice) => {
    const nuevasHabilidades = habilidades.filter((_, i) => i !== indice);
    setHabilidades(nuevasHabilidades);
  };

  //Avanza o finaliza los datos
  const continuar = () => {
    if (paso === 1 && habilidades.length === 0) return;
    if (paso === 2 && experiencia.trim() === '') return;
    if (paso === 3 && estudios.trim() === '') return;
    if (paso === 4 && descripcion.trim() === '') return;

    if (paso < 5) {
      setPaso(paso + 1);
    } else {
      const datos = {
        habilidades,
        experiencia,
        estudios,
        descripcion,
      };
      localStorage.setItem('requisitos', JSON.stringify(datos));
      navigate('/formulario');  //redirige al formulario final
    }
  };

  //Retrocede un paso en el formulario
  const volver = () => {
    if (paso > 1) {
      setPaso(paso - 1);
    }
  };

  return (
    <div className="body-fondo">
      <div className="contenedor2" style={{ backgroundColor: colorFondo }}>
        <div style={{ textAlign: 'right' }}>
          <button onClick={cambiarColorFondo}>Cambiar fondo</button>
        </div>

        <h2>Formulario de postulación</h2>

        {paso === 1 && (
          <>
            <h3>Paso 1: Ingresar habilidades</h3>
            <input
              type="text"
              placeholder="Ej: React, Comunicación, Liderazgo"
              value={habilidad}
              onChange={(e) => setHabilidad(e.target.value)}
            />
            <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
            <button onClick={agregarHabilidad}>Agregar habilidad</button>
            <ul>
              {habilidades.map((h, i) => {
                let claseNivel = 'habilidad-basico';
                if (h.nivel === 'Intermedio') claseNivel = 'habilidad-intermedio';
                else if (h.nivel === 'Avanzado') claseNivel = 'habilidad-avanzado';

                return (
                  <li key={i} className={claseNivel}>
                    <strong>{h.habilidad}</strong> - Nivel: {h.nivel}
                    <button
                      onClick={() => eliminarHabilidad(i)} //Este boton sirve para eliminar una habilidad en caso de que te equivoques
                      className="btn-eliminar"
                      style={{ marginLeft: '10px', color: 'red' }}
                      title="Eliminar habilidad"
                    >
                      ❌
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {paso === 2 && (
          <>
            <h3>Paso 2: Años de experiencia</h3>
            <input
              type="number"
              min="0" //Define el numero minimo de años de experiencia
              placeholder="Ej: 3"
              value={experiencia}
              onChange={(e) => setExperiencia(e.target.value)}
            />
          </>
        )}

        {paso === 3 && (
          <>
            <h3>Paso 3: Nivel de estudios</h3> 
            <select value={estudios} onChange={(e) => setEstudios(e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option value="Técnico">Técnico</option>
              <option value="Superior">Superior</option>
            </select>
          </>
        )}

        {paso === 4 && (
          <>
            <h3>Paso 4: Breve descripción de cómo trabaja</h3> 
            <textarea
              placeholder="Ej: Responsable, proactivo, con buena comunicación..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </>
        )}

        {paso === 5 && (
          <>
            <h3>Resumen de informacion ingresada</h3>
            <ul>
              {habilidades.map((h, i) => {
                let claseNivel = 'habilidad-basico';
                if (h.nivel === 'Intermedio') claseNivel = 'habilidad-intermedio';
                else if (h.nivel === 'Avanzado') claseNivel = 'habilidad-avanzado';

                return (
                  <li key={i} className={claseNivel}>
                    <strong>{h.habilidad}</strong> - Nivel: {h.nivel}
                  </li>
                );
              })}
            </ul>
            <p><strong>Años de experiencia:</strong> {experiencia}</p>
            <p><strong>Nivel de estudios:</strong> {estudios}</p>
            <p><strong>Descripción:</strong> {descripcion}</p>
          </>
        )}

        <div style={{ marginTop: '20px' }}>
          {paso > 1 && <button onClick={volver}>Volver</button>}
          <button onClick={continuar} style={{ marginLeft: '10px' }}>
            {paso < 5 ? 'Siguiente' : 'Finalizar'}
          </button>
        </div>
      </div>
    </div>
  );
}

//Exporta el componente para que sea utilizado en App.js
export default HabilidadesPage;
