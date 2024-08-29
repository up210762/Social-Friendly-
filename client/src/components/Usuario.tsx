import { useEffect, useState } from "react";
import ModalUploadImages from "./ModalInterests";
import { getToken } from "../services/localStorage";

const BASE_URL = 'http://localhost:3000/api/'

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
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());
  const [interestTypes, setInterestTypes] = useState<any>()
  const [interestsByType, setInterestsByType] = useState<any>()
  const [modalImagesDisplay, setModalImagesDisplay] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}interest-types`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setInterestTypes(data);
      })
      .catch(error => {
        console.error('Error fetching interest types:', error);
      });
  }, []);

  // Solicitar intereses específicos cuando se selecciona un tipo de interés
  useEffect(() => {
    fetch(`${BASE_URL}interests`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setInterestsByType(data);
        setSelectedInterests(new Set());  // Limpiar selecciones al cambiar de tipo
      })
      .catch(error => {
        console.error('Error fetching interests:', error);
      });
  }, []);
  
  if (!interestsByType || !interestTypes)
    return

  return (
    <div className="usuario" style={{
      margin: 5,
      maxWidth: '400px',
      overflow: 'hidden',
    }}>
      <div
        className="foto d-flex justify-content-center"
      >
        <ModalUploadImages showModal={modalImagesDisplay} onClose={() => setModalImagesDisplay(false)} giveInterestTypes={interestTypes!} giveInterestsByType={interestsByType!} />
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'grey'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
            }} />
        </div>
      </div>
      <div className="datos" style={{
        padding: '5px',
        margin: '15px',
        overflow: 'hidden',
        borderBottom: 'solid',
      }}>
        <h2 style={{
          display: 'flex',
          wordWrap: 'break-word',
          whiteSpace: 'normal',
          justifyContent: 'left',
          fontSize: '25px',
          borderTop: 'solid',
          borderBottom: 'solid',
          margin: '0',
          padding: '7px',
        }}>{nombre}</h2>
        <p style={{
          display: 'flex',
          justifyContent: 'left',
          fontSize: '20px',
          margin: '0',
          padding: '7px',
        }}>Username: {nombreUsuario}</p>
        <p style={
          {
            display: 'flex',
            justifyContent: 'left',
            fontSize: '20px',
            borderTop: 'solid',
            borderBottom: 'solid',
            margin: '0',
            padding: '7px',
          }}>Descripcion: {descripcion}</p>
        <p style={
          {
            display: 'flex',
            justifyContent: 'left',
            fontSize: '20px',
            margin: '0',
            padding: '7px',
          }}>Email: {email}</p>
        <div style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          margin: '0',
          borderTop: 'solid',
          borderBottom: 'solid',
          padding: '7px',
        }}>
          <p style={
            {
              display: 'flex',
              justifyContent: 'left',
              fontSize: '20px',
            }}>Intereses: {intereses}</p>
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
            onClick={() => {
              setModalImagesDisplay(!modalImagesDisplay);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'grey'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
            }} />
        </div>
        <p style={
          {
            display: 'flex',
            justifyContent: 'left',
            fontSize: '20px',
            margin: '0',
            padding: '7px',
          }}>Fecha de nacimiento: {fechaNacimiento}</p>
      </div>
    </div>
  );
};

export default Usuario;
