import React from 'react';

interface UsuarioProps {
  nombre: string | undefined;
  nombreUsuario: string | undefined;
  descripcion: string | null;
  intereses: string | null;
  email: string | undefined;
  fechaNacimiento: string | undefined;
  fotoUrl: string | undefined;
}

const Usuario: React.FC<UsuarioProps> = ({
  nombre,
  nombreUsuario,
  descripcion,
  intereses,
  email,
  fechaNacimiento,
  fotoUrl,
}) => {
  return (
    <div className="usuario" style={{
      margin: 5,
      maxWidth: '400px',
      overflow: 'hidden',
    }}>
      <div 
      className="foto d-flex justify-content-center"
      >
        <img 
        src={fotoUrl} 
        className="d-block user-select-none"
        alt="Photo" 
        width="200"
        height="200"
        style={{
          textAlign: 'center',
          fontSize: '1.125rem',
          textAnchor: 'middle',
          borderRadius: '100px',
          borderStyle: 'solid',
          borderColor: 'black',
        }}
        />
      </div>
      <div className="datos" style={{
        padding: '5px',
        margin: '15px',
        overflow: 'hidden',
        borderBottom: 'solid',
      }}>
        <h2 style={{
          wordWrap: 'break-word',
          whiteSpace: 'normal',
          borderTop: 'solid',
          borderBottom: 'solid',
          margin: '0',
          padding: '5px',
        }}>{nombre}</h2>
        <p style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '0',
          padding: '5px',
        }}>Username: {nombreUsuario}</p>
        <p style={
          {
            display: 'flex',
            justifyContent: 'center',
            borderTop: 'solid',
            borderBottom: 'solid',
            margin: '0',
            padding: '5px',
          }}>Descripcion: {descripcion}</p>
        <p style={
          {
            display: 'flex',
            justifyContent: 'center',
            margin: '0',
            padding: '5px',
          }}>Email: {email}</p>
        <p style={
          {
            display: 'flex',
            justifyContent: 'center',
            margin: '0',
            borderTop: 'solid',
            borderBottom: 'solid',
            padding: '5px',
          }}>Intereses: {intereses}</p>
        <p style={
          {
            display: 'flex',
            justifyContent: 'center',
            margin: '0',
            padding: '5px',
          }}>Fecha de nacimiento: {fechaNacimiento}</p>
      </div>
    </div>
  );
};

export default Usuario;
