import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FormularioPage() { //Estado para los campos de entrada del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [requisitos, setRequisitos] = useState(null);
  const [colorFondo, setColorFondo] = useState('#ffffff');
  const navigate = useNavigate();

  //Al montar el componente, se recuperan los datos guardados
  useEffect(() => {
    const datosGuardados = localStorage.getItem('requisitos');
    if (datosGuardados) {
      setRequisitos(JSON.parse(datosGuardados));
    }
  }, []);

  //Funcion para validar el formato de correo electronico
  const validarCorreo = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const enviar = () => {
    if ( //Valida los campos vacios
      nombre.trim() === '' ||
      apellido.trim() === '' ||
      correo.trim() === ''
    ) {
      alert('Error: alguno de los campos no está completo, por favor revisar.');
      return;
    }

    //Valida el formato de correo electronico
    if (!validarCorreo(correo)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    //Este mensaje se envia cuando se ingresan los datos correctamente
    alert('Bien hecho, correo enviado de forma correcta');


    //Con esto se limpian los daros ingresados
    setNombre('');
    setApellido('');
    setCorreo('');
    localStorage.removeItem('requisitos');


    //COn este comando se redirecciona a la pagina inicial
    navigate('/');
  };

  const cambiarColorFondo = () => { //Cambia os colores del fondo 
    const colores = ['#ffffff', '#f0f0f0', '#f5e6b3'];
    const indiceActual = colores.indexOf(colorFondo);
    const siguienteIndice = (indiceActual + 1) % colores.length;
    setColorFondo(colores[siguienteIndice]);
  };

  return (
    <div className="body-fondo">
      <div className="contenedor2" style={{ backgroundColor: colorFondo }}>
        <div style={{ textAlign: 'right' }}>
          <button onClick={cambiarColorFondo}>Cambiar fondo</button>
        </div>

        <h2>Formulario del Postulante</h2>

        {requisitos && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Resumen de la información registrada</h3>
            <ul>
              {requisitos.habilidades.map((h, i) => {
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
            <p><strong>Años de experiencia:</strong> {requisitos.experiencia}</p>
            <p><strong>Nivel de estudios:</strong> {requisitos.estudios}</p>
            <p><strong>Descripción:</strong> {requisitos.descripcion}</p>
          </div>
        )}

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <div style={{ marginTop: '20px' }}>
          <button onClick={() => navigate('/')}>Volver</button>
          <button onClick={enviar} style={{ marginLeft: '10px' }}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

//Exporta el componente para que sea utilizado en App.js
export default FormularioPage;
