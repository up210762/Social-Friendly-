import getToken from "./serverAuth";
import { API_URL, JWT_SECRET } from "../keys";
import { verify } from "jsonwebtoken";
import { STATUS_CODES } from "http";


const API_PHOTOS = new URL('test', API_URL);

export const testGetMethodService = async (token: string) => {
    try {
        //const decoded: any = verify(token, JWT_SECRET);
        //const userId = decoded.id;
        //const serverToken = getToken(userId);
        const res = await fetch(API_PHOTOS, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer 21j3o1ij2o1ij2j13j`,
            }
        });

        if (!res.ok)
            if (res.status === 401)
                return {
                    status: 401,
                    message: 'No estás autorizado'
            }
        
        const message = await res.json()
        
        if (message)
            return {
                status: res.status,
                message: message
            }
    } catch (err) {
        return {
            status: 500,
            message: 'No se puede conectar al servidor de fotos.'
        }
    }
}

export const testPostMethodService = async (token: string) => {
    try {
        //const decoded: any = verify(token, JWT_SECRET);
        //const userId = decoded.id;
        //const serverToken = getToken(userId);
        const res = await fetch(API_PHOTOS, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer 21j3o1ij2o1ij2j13j`,
            }
        });

        if (!res.ok)
            if (res.status === 401)
                return {
                    status: 401,
                    message: 'No estás autorizado'
            }
        
        const message = await res.json()
        
        if (message)
            return {
                status: res.status,
                message: message
            }
    } catch (err) {
        return {
            status: 500,
            message: 'No se puede conectar al servidor de fotos.'
        }
    }
}

export const testPutMethodService = async (token: string) => {
    try {
        //const decoded: any = verify(token, JWT_SECRET);
        //const userId = decoded.id;
        //const serverToken = getToken(userId);
        const res = await fetch(API_PHOTOS, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer 21j3o1ij2o1ij2j13j`,
            }
        });

        if (!res.ok)
            if (res.status === 401)
                return {
                    status: 401,
                    message: 'No estás autorizado'
            }
        
        const message = await res.json()
        
        if (message)
            return {
                status: res.status,
                message: message
            }
    } catch (err) {
        return {
            status: 500,
            message: 'No se puede conectar al servidor de fotos.'
        }
    }
}

export const testDeleteMethodService = async (token: string) => {
    try {
        //const decoded: any = verify(token, JWT_SECRET);
        //const userId = decoded.id;
        //const serverToken = getToken(userId);
        const res = await fetch(API_PHOTOS, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer 21j3o1ij2o1ij2j13j`,
            }
        });
        
        if (!res.ok)
            if (res.status === 401)
                return {
                    status: 401,
                    message: 'No estás autorizado'
            }
        
        const message = await res.json()
        
        if (message)
            return {
                status: res.status,
                message: message
            }
    } catch (err) {
        return {
            status: 500,
            message: 'No se puede conectar al servidor de fotos.'
        }
    }
}