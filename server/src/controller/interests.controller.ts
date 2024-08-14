// Dependencias
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import {
    getInterestsByTypeService,
    getTypeInterestsService,
    getUsersInterestsService,
    selectInterestsService
} from '../services/interests';
import { KnnClassifier, TraerUsersCercanos } from '../services/knnClassifier';

export async function getUserInterestRoute(req: Request, res: Response) {
    const user_id: number = parseInt(req.params.id!);
    const userInterests: any = req.body.interests;
    console.log("User: " + user_id + " Interests_id: " + userInterests);
    const classifier = new KnnClassifier(20);
    const [users]: any = await getUsersInterestsService(user_id)

    if (!users) {
        res.json({ message: "Sin intereses" });
        return
    }
    // console.log(users)
    const ids = TraerUsersCercanos(users)
    console.log(ids);
    res.json(users);
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