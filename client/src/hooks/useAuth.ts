import { useEffect, useState } from "react";
import { getToken } from "../services/localStorage";
import { auth } from "../services/auth";
import { useLocation } from 'react-router-dom';

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setIsAuth(false);
      return;
    }

    auth()
      .then(() => setIsAuth(true))
      .catch(() => {
        setIsAuth(false);
      });

  }, [location]);

  return { isAuth };
}