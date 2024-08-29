import conn from '../db'
import { API_URL, MAIN_DB_PREFIX } from "../keys"

const API_PHOTOS_URL = new URL('api-auth',API_URL)

class serverAuth {
    userId: number;
    
    constructor (userId: number) {
        this.userId = userId;
    }
    
    private async getUser() {
        const SQL = `SELECT id, username FROM ${MAIN_DB_PREFIX}tr_user
        WHERE id=?`;
        const [user] = await conn.query(SQL, [this.userId])
        return user;
    }
    
    public getToken = async (): Promise<string> => {
        const user = await this.getUser();
        const res = await fetch(API_PHOTOS_URL, {
            method: 'POST',
            body: JSON.stringify(user)
        })
        return ''
    }
}

export default serverAuth