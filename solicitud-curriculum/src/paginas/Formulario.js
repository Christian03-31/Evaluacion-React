import React, { useState } from 'react';

function FormularioPage() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');

  const enviar = () => {
    alert(`Formulario enviado:\n${nombre} ${apellido} - ${correo}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Formulario del Postulante</h2>
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
      <button onClick={enviar}>Enviar</button>
    </div>
  );
}

export default FormularioPage;
