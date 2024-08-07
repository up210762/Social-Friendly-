// Dependencias
// eslint-disable-next-line no-unused-vars
import {Request, Response} from 'express';
import { getInterestsService, getTypeInterestsService, getUsersInterestsService, selectInterestsService } from '../services/interests';
import { KnnClassifier } from '../services/knnClassifier';

export async function getUserInterest(req: Request, res: Response) {
    const user_id: number = parseInt(req.params.id!);
    const interests: Array<number> = req.body.interests;
    const interestArray: Array<any> = []
    const users = new KnnClassifier(20);

    interests.map(interestId => {
        const interest = getUsersInterestsService(user_id, interestId);
        interestArray.push(interest);
    });

    if (!interestArray) {
        res.json({ message: "Sin intereses" });
        return
    }


    
    res.json(interestArray);
}

export async function getTypeInterest(req: Request, res: Response) {
    const [types]: any = await getTypeInterestsService();

    //Valido si existe la tarea
    if (!types){
        res.status(404).json({ message: "Types not found" });
        return;
    }

    res.json(types);

}

export async function getInterest(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id!)
    if (!userId) {
        return res.status(402).json({ message: "No se encuentra el id." });
    }

    try {
        const result = await getInterestsService(userId)

        if (!result) {
            res.json({ message: "No hay información."});
            return;
        }
        return result;
    } catch (error) {
        // Manejar cualquier error que ocurra durante la ejecución de la consulta
        console.error("Error al obtener la información:", error);
        res.status(500).json({ message: "Error de servidor." });
        return;
    }
}

export async function registerInterest(req: Request, res: Response) {
        const userId = parseInt(req.params.id!);
        const interests: Array<number> = req.body.interests!;
        let success: boolean = false;

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