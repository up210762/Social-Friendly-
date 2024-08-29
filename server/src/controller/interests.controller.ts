// Dependencias
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import {
    getInterestsByTypeService,
    getTypeInterestsService,
    getUsersInCommonService,
    getUsersInterestsService,
    selectInterestsService,
    selectInterestsWithType
} from '../services/interests';
import { KnnClassifier, TraerUsersCercanos } from '../services/knnClassifier';
import { JWT_SECRET } from '../keys';
import { verify } from 'jsonwebtoken';

export async function getUserInterestRoute(req: Request, res: Response) {
    const user_id: number = parseInt(req.params.id!);
    const userInterests: any = req.body.interests;
    console.log("User: " + user_id + " Interests_id: " + userInterests);
    const [users]: any = await getUsersInterestsService(user_id);

    if (!users) {
        res.json({ message: "Sin intereses" });
        return
    }
    const ids = TraerUsersCercanos(users, 20);
    const [userCommon]: any = await getUsersInCommonService(user_id, ids);
    res.json(userCommon);
}

// Este ya quedó funcional
export async function getTypeInterest(req: Request, res: Response) {
    const [types]: any = await getTypeInterestsService();

    //Valido si existe la tarea
    if (!types) {
        res.status(404).json({ message: "Types not found" });
        return;
    }

    res.json(types);

}

export async function getInterestWithType(req: Request, res: Response) {
    const types: any = await selectInterestsWithType();

    // Verifica si hay resultados
    if (!types || types.length === 0) {
        res.status(404).json({ message: "Types not found" });
        return;
    }

    // Recorre cada tipo de interés y convierte la cadena a un array
    types.forEach((type: any) => {
        type.interests = type.interests.split(',');
    });

    res.json(types);

}

//Este ya quedó funcional
export async function getInterestByType(req: Request, res: Response) {
    const specificInterests: Array<any> = [];

    try {
        const interestsType: Array<any> = await getTypeInterestsService();

        for (let interest of interestsType[0]) {
            const res = await getInterestsByTypeService(interest.id)
            specificInterests.push(res[0])
        }

        if (specificInterests.length === 0) {
            res.json({ message: "No hay información." });
            return;
        }
        return res.json(specificInterests);

    } catch (error) {
        // Manejar cualquier error que ocurra durante la ejecución de la consulta
        console.error("Error al obtener la información:", error);
        return res.status(500).json({ message: "Error de servidor." });
    }
}

export async function registerInterest(req: Request, res: Response) {
    const authHeader = req.headers['authorization'];

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    const decoded: any = verify(token, JWT_SECRET);
    const userId: number = decoded.id;
    const interests: Array<number> = req.body.interests;

    if (interests && interests.length > 0) {
        let success: boolean = false;

        //console.log(interests);
        interests.map((interest: any) => {
            const resp = selectInterestsService(userId, interest)
            if (!resp)
                success = false;
            success = true;
        })

        if (success == false) {
            return res.status(400).json("Error. No se pudo registrar.")
        }
        return res.json("Intereses agregados correctamente.")
    } else {
        return res.status(400).json("No se seleccionaron intereses.")
    }
}