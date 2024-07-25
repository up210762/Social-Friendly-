// Dependencias
// eslint-disable-next-line no-unused-vars
import {Request, Response} from 'express';
import { getUserService, getUsersService, deleteUserService, updateUserService } from '../services/users';

export async function getOneUser(req: Request, res: Response) {
    const userId: string | number = req.user.id;
    
    const [user]: any = await getUserService(userId);

    //Valido si existe la tarea
    if (!user){
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.json(user);

}

export async function updateUser(req: Request, res: Response) {
        const userId = req.user.id;
        console.log(req.body)
    
        const resp = await updateUserService(userId, req.body)
        if (typeof resp === 'boolean') {
            if (resp === true)
                res.json({ message: "Usuario actualizado" })
            else
                res.status(404).json({ message: "El usuario no existe." })
        } else {
            res.status(500).json({ message: resp });
        }
}

export async function deleteUser(req: Request, res: Response) {
    const userId = req.user.id
    const resp = await deleteUserService(userId)
    res.status(200).json({ message: resp });
}