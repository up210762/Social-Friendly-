// like.ts

import { getToken } from './localStorage';

const BASE_URL = new URL('http://localhost:3000/api/');

export const createLike = async (userId: string | number, likedUserId: string | number) => {
  const LIKE_URL = new URL('like', BASE_URL);

  // Verificar si el like ya existe antes de crear uno nuevo
  const existsUrl = new URL('likes/check', BASE_URL);
  existsUrl.searchParams.append('userId', userId.toString());
  existsUrl.searchParams.append('likedUserId', likedUserId.toString());

  const checkResp = await fetch(existsUrl.toString(), {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!checkResp.ok) {
    if ([401, 403].includes(checkResp.status)) {
      throw new Error("Error de Autentificación");
    }
    throw new Error("No se pudo verificar si el like existe. Inténtalo de nuevo.");
  }

  const { exists } = await checkResp.json();
  if (exists) {
    throw new Error("Ya has dado like a este usuario.");
  }

  // Crear el like si no existe
  const resp = await fetch(LIKE_URL.toString(), {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ userId, likedUserId })
  });

  if (!resp.ok) {
    if ([401, 403].includes(resp.status)) {
      throw new Error("Error de Autentificación");
    }
    throw new Error("No se pudo dar like. Inténtalo de nuevo.");
  }
  return resp.json();
};

export const getLikes = async () => {
  const LIKE_URL = new URL('likes', BASE_URL);

  const resp = await fetch(LIKE_URL.toString(), {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!resp.ok) {
    if ([401, 403].includes(resp.status)) {
      throw new Error("Error de Autentificación");
    }
    throw new Error("No se pudieron obtener los likes. Inténtalo de nuevo.");
  }
  return resp.json();
};
