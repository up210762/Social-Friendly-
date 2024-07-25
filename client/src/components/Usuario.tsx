import React from 'react';

interface UsuarioProps {
  nombre: string | undefined;
  nombreUsuario: string | undefined;
  email: string | undefined;
  fechaNacimiento: string | undefined;
  fotoUrl: string | undefined;
}

const Usuario: React.FC<UsuarioProps> = ({
  nombre,
  nombreUsuario,
  email,
  fechaNacimiento,
  fotoUrl,
}) => {
  return (
    <div className="usuario" style={{
      margin: 5
    }}>
      <div className="foto d-flex justify-content-center">
        <svg xmlns={fotoUrl}
          className="d-block user-select-none"
          width="200"
          height="200"
          aria-label="Placeholder: Image cap"
          focusable="false"
          role="img"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 318 180"
          style={{
            fontSize: '1.125rem',
            textAnchor: 'middle'
          }}>
          <rect width="100%" height="100%" fill="#868e96"></rect>
          <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Photo</text>
        </svg>
      </div>
      <div className="datos">
        <h2>{nombre}</h2>
        <p>Nombre de usuario: {nombreUsuario}</p>
        <p>Email: {email}</p>
        <p>Fecha de nacimiento: {fechaNacimiento}</p>
      </div>
    </div>
  );
};

export default Usuario;
