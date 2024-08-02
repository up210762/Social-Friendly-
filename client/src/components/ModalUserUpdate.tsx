import React, { useEffect, useState } from "react";
import { getOneUser } from "../services/users";

const ModalUserUpdate: React.FC<ModalUserUpdateProps> = ({ showModal, onClose, updateUserForm }) => {
  const [user, setUser] = useState<UserUpdate>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const getUser = await getOneUser();
        setUser(getUser)

        if (!user)
          return;
        const birthday = new Date(user.birthday!)
        const formatedDate = formatDateISOString(new Date(birthday))
        setUser({
          name: user.name,
          birthday: formatedDate,
          username: user.username
        })
      } catch (error) {
        console.error(error)
      }
    })()
    return () => {
      setUser(undefined)
    }
  }, [showModal])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setUser(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  if (!user) return;

  return (
    <>
      {/* Fondo oscurecido */}
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ zIndex: showModal ? 1040 : -1 }}
      ></div>

      {/* Modal */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none", zIndex: showModal ? 1050 : -1 }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title">Actualizar Usuario</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input onChange={handleChange} defaultValue={user.name} type="text" className="form-control" id="name" name="name" required placeholder="Ingresa tu nombre completo" />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Usuario:</label>
                  <input onChange={handleChange} defaultValue={user.username} type="text" className="form-control" id="username" name="username" required placeholder="Ingresa el username nuevo" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <div className="d-flex justify-content-start align-items-center" style={{ backgroundColor: 'white', margin: 0, padding: 0, borderRadius: 5 }}>
                    <input
                      onChange={handleChange}
                      type={showPassword ? `text` : `password`}
                      className="form-control"
                      id="password"
                      name="password"
                      required placeholder="Ingresa una contraseña nueva"
                      style={{ width: '90%' }} />
                    <div className="btn" style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 5,
                        alignItems: 'center',
                        width: '10%',
                        height: '100%'
                      }}>
                      <img 
                      src={showPassword ? '/src/assets/ojo(1).png' : '/src/assets/ojo.png'} 
                      onClick={() => { showPassword ? setShowPassword(false) : setShowPassword(true) }} 
                      style={{width: '100%'}}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="birthday">Fecha de nacimiento:</label>
                  <input onChange={handleChange} defaultValue={user.birthday?.toString()} type="date" className="form-control" id="birthday" name="birthday" required placeholder="Ingresa tu fecha de nacimiento" />
                </div>

                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary me-2" onClick={onClose}>Cerrar</button>
                  <button type="button" className="btn btn-secondary" onClick={() => { updateUserForm(user); onClose(); }}>Actualizar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const formatDateISOString = (date: Date): string => {
  // Extraer los componentes de la fecha y hora
  var año = date.getFullYear();
  var mes = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses comienzan desde 0, por eso se suma 1
  var día = ('0' + date.getDate()).slice(-2);
  var hora = ('0' + date.getHours()).slice(-2);
  var minuto = ('0' + date.getMinutes()).slice(-2);

  // Construir la cadena de fecha y hora manualmente
  var cadenaFechaHora = año + '-' + mes + '-' + día + 'T' + hora + ':' + minuto;

  return (cadenaFechaHora); // Salida: "2024-04-03T17:40"
};
export default ModalUserUpdate;

interface ModalUserUpdateProps {
  showModal: boolean;
  onClose: () => void;
  updateUserForm: (user: UserUpdate) => void;
}

export interface UserUpdate {
  name?: string;
  username?: string;
  password?: string;
  birthday?: Date | string;
}