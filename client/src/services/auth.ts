import { getToken } from '../services/localStorage';

const BASE_URL = new URL("http://localhost:3000/api/");

export const login = async (user: UserLogin): Promise<HttpResponse> => {
    const LOGIN_URL = new URL('login', BASE_URL)
    const resp = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });

    if (!resp.ok) {
        if (resp.status === 404) {
            throw new Error("El usuario no se encontró");
        }
        else if (resp.status === 403) {
            throw new Error("La contraseña es incorrecta!");
        }
        else {
            throw new Error("Algo salio mal!!!");
        }
        
    }
    return resp.json()
}

export function register(user: UserRegister) {
    const REGISTER_URL = new URL('register', BASE_URL);
    return fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }).then((resp) => {
        console.log(resp)
        if (!resp.ok) {
            throw new Error("Algo salio mal :(");
        }
        return resp.json()
    });
}

export const auth = async () => {
    const AUTH_URL = new URL('auth', BASE_URL);

    const resp = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });

    if (!resp.ok) {
        throw new Error("error de Autentificacion!");
    }
};

export type UserRegister = {
    fullname?: string;
    username?: string;
    email?: string;
    password?: string;
    birthday?: string;

}
export type UserLogin = {
    username?: string;
    email?: string;
    password?: string;
}
export type HttpResponse = {
    token: string;
}