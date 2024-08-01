import React, { useEffect, useState } from 'react';
import Usuario from '../components/Usuario';
import { getOneUser, updateUser } from '../services/users';
import ModalUserUpdate, { UserUpdate } from '../components/ModalUserUpdate';

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
      console.log(getUser);
      setUser(getUser);
    } catch (error) {
      console.error('Error al obtener el usuario: ', error)
    }
  };

  if (!user)
    return;

  const bornDay = new Date(user.date_of_birthday!)

  const updateUserForm = async (user: UserUpdate) => {
    console.log(user)
    if (!user)
      return;
    try {
      const res = await updateUser(user)
      console.log(res)
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

  return (
    <div className='container mt-5 d-flex justify-content-center'>
      <div className="perfil-usuario d-grid">
        <div className={`modal-backdrop fade ${mostrarFormulario ? 'show' : ''}`} style={{ zIndex: mostrarFormulario ? 1030 : -1 }}></div>
        <ModalUserUpdate showModal={mostrarFormulario} onClose={onClose} updateUserForm={updateUserForm} />
        <h1>Perfil de Usuario</h1>
        <Usuario
          nombre={user.name}
          nombreUsuario={user.username}
          email={user.email}
          fechaNacimiento={bornDay.toDateString()}
          fotoUrl={user.utlPhoto}
        />
        <button className="btn btn-primary" onClick={() => toggleFormulario(user)}>Actualizar</button>
      </div>
    </div>
  );
};

interface User {
  name: string,
  username: string,
  email: string,
  date_of_birthday: string,
  utlPhoto: string
}
export default PerfilUsuario;
