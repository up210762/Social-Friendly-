
//Dependencias
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

//Componentes
import App from './App';

// Estilos
import './css/index.css';
import 'bootswatch/dist/minty/bootstrap.min.css';
//import 'bootswatch/dist/Minty/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

//Punto de entrada
const app = document.getElementById('root')!;
const root = ReactDOM.createRoot(app);


// Renderizado de la aplicación
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);