import { getToken } from "./localStorage";

const BASE_URL = 'http://localhost:3000/api/'
const API_URL = new URL('test-api-photos', BASE_URL)

export const serverConnection = async (method: any) => {
    try {
        const res = await fetch(API_URL, {
            method: method,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            }
        });

        if (!res) {
            return {
                status: 500,
                message: "No hay respuesta"
            }
        }
        
        
        if (!res.ok) {
            return res
        }
        
        const message = await res.json()

        if (message)
            return {
                status: message.status,
                message: `${message.message}`
            }

    } catch (err: any) {
        return {
            status: 500,
            message: `No se pudo conectar al servidor principal.`
        }
    }
}