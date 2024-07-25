// Dependencias
// eslint-disable-next-line no-unused-vars
import {Request, Response} from 'express';
import { getTasksService, createTaskService, getTaskService, updateTaskService, deleteTaskService } from '../services/tasks';

export async function getAllTasks(req: Request, res: Response) {
	// Obtenemos el ID a partir de la autentificación del usuario
    const user_id: number | string = req.user.id
    
    // Realizamos la consulta a las tareas
	const tasks = await getTasksService(user_id)
    
    res.json(tasks)
}

export async function getOneTask(req: Request, res: Response) {
    //Extraer id de usuario.
    const taskId: string | undefined = req.params.id;
    const userId: string | number = req.user.id;
    
    // Obtenemos la tarea
    const [task]: any = await getTaskService(taskId, userId);

    //Valido si existe la tarea
    if (!task){
        res.status(404).json({ message: "Task not found" });
        return;
    }

    res.json(task);

}

export async function createTask(req: Request, res: Response) {
    const body = req.body
    // Verificar si los datos requeridos están presentes
    if (!body.fk_statusid || !body.fk_priorityid || !body.name || !body.description || !body.deadline) {
        return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    try {
        const result = await createTaskService(req.user.id ,body)

        if (result) {
            // Devolver el resultado de la consulta
            res.json({ message: "Tarea creada exitosamente."});
        }
        return true;
    } catch (error) {
        // Manejar cualquier error que ocurra durante la ejecución de la consulta
        console.error("Error al crear la tarea:", error);
        res.status(500).json({ message: "Error al crear la tarea. Por favor, inténtalo de nuevo más tarde." });
        return false;
    }
}

export async function updateTask(req: Request, res: Response) {
        const userId = req.user.id;
        const taskId = req.params.id;
    
        const resp = await updateTaskService(userId, taskId, req.body)
        if (typeof resp === 'boolean') {
            if (resp === true)
                res.json({ message: "Tarea actualizada" })
            else
                res.status(404).json({ message: "El usuario o tarea no existe." })
        } else {
            res.status(500).json({ message: resp });
        }
}

export async function deleteTask(req: Request, res: Response) {
    const taskId = req.params.id;
    const userId = req.user.id // Obtener el ID de la tarea de los parámetros de la URL
    const resp = await deleteTaskService(userId, taskId)
    // Respuesta al cliente indicando que la tarea se borro exitosamente 
    res.status(200).json({ message: resp });
}