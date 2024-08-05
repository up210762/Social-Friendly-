import { useState } from "react";
import ModalUploadImages from "./ModalImages";

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
  const [modalImagesDisplay, setModalImagesDisplay] = useState(false);
  return (
    <div className="usuario" style={{
      margin: 5,
      maxWidth: '400px',
      overflow: 'hidden',
    }}>
      <div
        className="foto d-flex justify-content-center"
      >
        <ModalUploadImages showModal={modalImagesDisplay} onClose={()=>setModalImagesDisplay(false)} />
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
        <div
          style={{
            height: '190px',
            width: '170px',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'end',
            position: 'absolute',
          }}>
          <img src="/public/default/plus.png"
            width="30"
            height="30"
            style={{
              textAlign: 'center',
              fontSize: '1.125rem',
              textAnchor: 'middle',
              backgroundColor: 'white',
              borderRadius: '100px',
              borderStyle: 'solid',
            }}
            onClick={()=>{
              setModalImagesDisplay(!modalImagesDisplay);
              console.log("Click");
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'grey'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
            }}
            alt="" />
        </div>
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
