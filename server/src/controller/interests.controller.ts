// Dependencias
// eslint-disable-next-line no-unused-vars
import {Request, Response} from 'express';
import { getInterestsByTypeService,
    getTypeInterestsService,
    getUsersInCommonService,
    getUsersInterestsService,
    selectInterestsService } from '../services/interests';
import {TraerUsersCercanos } from '../services/knnClassifier';
import { any } from 'zod';

export async function getUserInterestRoute(req: Request, res: Response) {
    const user_id: number = parseInt(req.params.id!);
    const userInterests: any = req.body.interests;
    console.log("User: "+ user_id + " Interests_id: " + userInterests);
    const [users]: any = await getUsersInterestsService(user_id);

    if (!users) {
        res.json({ message: "Sin intereses" });
        return
    }
    const ids  = TraerUsersCercanos(users,20);
    const [userCommon]: any = await getUsersInCommonService(user_id,ids);
    res.json(userCommon);
}

// Este ya quedó funcional
export async function getTypeInterest(req: Request, res: Response) {
    const [types]: any = await getTypeInterestsService();

    //Valido si existe la tarea
    if (!types){
        res.status(404).json({ message: "Types not found" });
        return;
    }

    res.json(types);

}

//Este ya quedó funcional
export async function getInterestByType(req: Request, res: Response) {
    const typeInterestId: number = parseInt(req.params.id!)
    //console.log(typeInterestId)
    if (!typeInterestId) {
        return res.status(402).json({ message: "No se encuentra el id." });
    }

    try {
        const [result] = await getInterestsByTypeService(typeInterestId)

        if (!result) {
            res.json({ message: "No hay información."});
            return;
        }
        //console.log(result)
        return res.json(result);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la ejecución de la consulta
        console.error("Error al obtener la información:", error);
        res.status(500).json({ message: "Error de servidor." });
        return;
    }
}

export async function registerInterest(req: Request, res: Response) {
        const userId = parseInt(req.params.id!);
        const interests: number[] = req.body.interests || [];
        let success: boolean = false;
        console.log(interests);
        interests.map(interest => {
            const resp = selectInterestsService(userId, interest)
            if (!resp)
                success = false;
            success = true;
        })
        
        if (success == false) {
            res.json("Error. No se pudo registrar.")
            return
        }
        res.json("Intereses agregados correctamente.")
}