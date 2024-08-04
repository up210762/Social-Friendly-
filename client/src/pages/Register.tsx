import { FormEvent, useState } from 'react';
import { register, type UserRegister } from "../services/auth";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [user, setUser] = useState<UserRegister>({});
  const [password2Display, setPassword2Display] = useState("d-none");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<string>("password");
  const [showPassword2, setShowPassword2] = useState<string>("password");
  const [allDataAlert, setAlldataAlert] = useState<boolean>(false);
  //const [name, setName] = useState<string>();


  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { value: inputValue, name: inputName } = e.currentTarget;
    setUser(preventState => ({
      ...preventState,
      [inputName]: inputValue
    }))
    if (inputName === "password2") {
      const originalPassword = user.password;
      const confirmPassword = inputValue;


      if (confirmPassword === "") {
        setPassword2Display("d-none");
        return;
      }

      setPassword2Display(originalPassword && originalPassword === confirmPassword
        ? "d-none"
        : "d-block");
    }
  }
  const handleSumbitInput = async (e: FormEvent<HTMLFormElement>) => {
    if (user.birthday && user.email && user.fullname && user.password && user.username) {

      try {
        e.preventDefault();
        await register(user);
        navigate('/login')
      } catch (error) {

      }
    }
    else {
      setAlldataAlert(true)
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(showPassword == "password" ? "text" : "password")

  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(showPassword2 == "password" ? "text" : "password")
  };



  //values[0] // -> Valor del estado actual
  //values[1] // -> Funcion para cambiar el estado

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-sm-4">
          <h2 className="mb-4">Registro</h2>
          <form className="mb-3" onSubmit={handleSumbitInput}>
            <div className={`alert alert-danger ${!allDataAlert ? "d-none" : "d-block"}`}>
              <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
              <strong>Oh snap!</strong> <a href="#" className="alert-link">Change a few things up</a> and try submitting again.
            </div>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
                onInput={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onInput={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onInput={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="birthday" className="form-label">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                name="birthday"
                onInput={handleInputChange} />
            </div>
            <label htmlFor="password" className="form-label">Contraseña</label>
            <div className="input-group mb-3">
              <input
                type={showPassword}
                className="form-control"
                id="password"
                name="password"
                onInput={handleInputChange} />
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
                onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword == "password" ? faEyeSlash : faEye} />
              </button>
            </div>
            <label htmlFor="password2" className="form-label">Confirmar contraseña</label>
            <div className="mb-3 input-group">
              <input
                type={showPassword2}
                className="form-control"
                id="password2"
                name="password2"
                onInput={handleInputChange} />
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
                onClick={togglePasswordVisibility2}>
                <FontAwesomeIcon icon={showPassword2 == "password" ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className={`alert alert-dismissible alert-danger ${password2Display}`}>
              {/* <button type="button" className="btn-close" data-bs-dismiss="alert"></button> */}
              <a href="#password2" className="alert-link">Parece que hay un error
              </a><br />
              Las contraseñas no coinciden
            </div>
            <div className="row justify-content-center">
              <button type="submit" className="btn btn-primary btn-block">Registrarse</button>

              <small id="emailHelp" className="form-text text-muted">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></small>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}



export default Register;