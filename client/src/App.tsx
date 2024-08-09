import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from './components/Navbar';
import ProtectedRoutes from './components/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import PerfilUsuario from './pages/PerfilUsuario';
import { ToastContainer, toast } from 'react-toastify'; // Importar ToastContainer y toast
import 'react-toastify/dist/ReactToastify.css'; // Estilos por defecto

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route index element={
            <ProtectedRoutes restrict={!isAuth} redirectTo='/login'>
              <Home />
            </ProtectedRoutes>
          } />
          <Route path='user' element={
            <ProtectedRoutes restrict={!isAuth} redirectTo='/login'>
              <PerfilUsuario />
            </ProtectedRoutes>
          } />
          <Route element={<ProtectedRoutes restrict={isAuth} redirectTo='/' />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='*' element={<h1>Not Found!!!!</h1>} />
        </Routes>
      </main>
      {/* Agregar ToastContainer aquí */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
