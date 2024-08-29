const BASE_URL = new URL("http://localhost:3000/api/");

const ROL_URL = new URL('rol', BASE_URL)

export const setToken = (token: string) => {
  localStorage.setItem('tokenApp', token);
};

export const getToken = () => {
  return localStorage.getItem('tokenApp');
};

export const isAdmin = async () => {
  const token = getToken();
  const res = await fetch(ROL_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  if (!res.ok)
    return 'false'
  else {
    return await res.json()
  }
}