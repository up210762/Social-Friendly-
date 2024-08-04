import React, { useEffect, useState } from 'react';
import Usuario from '../components/Usuario';
import { getOneUser, updateUser } from '../services/users';
import ModalUserUpdate, { UserUpdate } from '../components/ModalUserUpdate';
import noImage from '../../public/avatar.png'

const PerfilUsuario: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  const toggleFormulario = (userData: User) => {
    setUser(userData)
    setMostrarFormulario(!mostrarFormulario);
  };

  useEffect(() => {
    showUserData();
  }, [])

  const showUserData = async () => {
    try {
      const getUser = await getOneUser();
      setUser(getUser);
    } catch (error) {
      console.error('Error al obtener el usuario: ', error)
    }
  };


  if (!user)
    return;

  const bornDay = new Date(user.date_of_birthday!)

  const updateUserForm = async (user: UserUpdate) => {
    if (!user)
      return;
    try {
      await updateUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  const onClose = () => {
    setMostrarFormulario(false);
    showUserData();
  }

  if (!user)
    return;

  const link = user.urlPhoto?user.urlPhoto:noImage

  console.log(link)
  return (
    <div className='container mt-5 d-flex justify-content-center'>
      <div className="perfil-usuario d-grid degradade-border-image" style={{
        
      }}>
        <div className={`modal-backdrop fade ${mostrarFormulario ? 'show' : ''}`} style={{ zIndex: mostrarFormulario ? 1030 : -1 }}></div>
        <ModalUserUpdate showModal={mostrarFormulario} onClose={onClose} updateUserForm={updateUserForm} />
        <h1 style={{
          display: 'flex',
          justifyContent: 'center',
        }}>Perfil de Usuario</h1>
        <Usuario
          nombre={user.full_name}
          descripcion={user.description}
          intereses={user.interest}
          nombreUsuario={user.username}
          email={user.email}
          fechaNacimiento={bornDay.toDateString()}
          fotoUrl={link}
        />
        <button className="btn btn-primary" onClick={() => toggleFormulario(user)}>Actualizar</button>
      </div>
    </div>
  );
};

export interface User {
  id: number,
  full_name: string,
  description: string | null,
  interest: string | null,
  username: string,
  email: string,
  date_of_birthday: string,
  urlPhoto: string | null
}
export default PerfilUsuario;
