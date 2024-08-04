import { login, type UserLogin } from "../services/auth";
import { FormEvent, useState } from 'react';
import { setToken } from '../services/localStorage';
import { useNavigate } from "react-router-dom";

function Login() {
  const [userLogin, setUserLogin] = useState<UserLogin>({});
  const [mostrarAlertaError, setMostrarAlertaError] = useState<string>("d-none");
  const navigate = useNavigate();

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { value: inputValue, name: inputName } = e.currentTarget;
    setUserLogin(preventState => ({
      ...preventState,
      [inputName]: inputValue
    }))

  }
  const handleSumbitInput = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { token } = await login(userLogin);

      setToken(token);
      navigate('/');
    } catch (error) {
      setMostrarAlertaError("");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-sm-4">
          <h2 className="mb-4">Inicio de Sesión</h2>
          <form className="mb-3" onSubmit={handleSumbitInput}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onInput={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onInput={handleInputChange} />
            </div>
            <div className={`alert alert-danger ${mostrarAlertaError}`}><strong>Ups..</strong> usuario o contraseña incorrectos</div>
            <div className="row justify-content-center">
              <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
              <small id="emailHelp" className="form-text text-muted">¿No tienes una cuenta? <a href="/register">Registrate</a></small>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
