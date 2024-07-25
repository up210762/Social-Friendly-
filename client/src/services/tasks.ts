import { TaskInsert } from '../components/ModalInsert';
import { TaskUpdate } from '../components/ModalUpdate';
import { getToken } from './localStorage';

const BASE_URL = new URL('http://localhost:3000/api/');

export const getAllTasks = async (): Promise<Task[]> => {
  const TASK_URL = new URL('task', BASE_URL);

  const resp = await fetch(TASK_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!resp.ok) {
    resp.status
    //if (resp.status === 401 || resp.status === 403)
    if ([401, 403].includes(resp.status))
      throw new Error("Error de Autentificación")
  }
  const data: Task[] = await resp.json(); // Tipar directamente la respuesta como un arreglo de tareas
  return data;
};

export const getOneTask = async (idtask: number) => {
  const TASK_URL = new URL(`task/${idtask}`, BASE_URL);

  const resp = await fetch(TASK_URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!resp.ok) {
    resp.status
    //if (resp.status === 401 || resp.status === 403)
    if ([401, 403].includes(resp.status))
      throw new Error("Error de Autentificación")
  }
  const data = await resp.json();
  return data;
};

export const createTask = async (taskInsert: TaskInsert): Promise<Boolean> =>{
  const TASK_URL = new URL('task', BASE_URL);
  const resp = await fetch(TASK_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(taskInsert)
  });
  if (!resp.ok) {
    resp.status
    //if (resp.status === 401 || resp.status === 403)
    if ([401, 403].includes(resp.status))
      throw new Error("Error de Autentificación")
  }
  const seCreo = await resp.json();
  return seCreo;
};


export const updateTask = async (idtask:number, taskData:TaskUpdate) => {
  
  const TASK_URL = new URL(`task/${idtask}`, BASE_URL);

  const resp = await fetch(TASK_URL, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(taskData)
  });
  console.log(TASK_URL);
  // Verificar si la solicitud fue exitosa
  if (resp.ok) {
    console.log('Tarea actualizada exitosamente.');
  } else {
    console.error('Error al actualizar la tarea:', resp.statusText);
  }}

  export type Task = {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    estatus: string;
    prioridad: string;
  }

export const deleteTask = async (idTask: number) => {
  const TASK_URL = new URL(`task/${idTask}`, BASE_URL);

  const resp = await fetch(TASK_URL, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    }
  });
  // Verificar si la solicitud fue exitosa
  if (resp.ok) {
    console.log('Tarea borrada exitosamente.');
  } else {
    console.error('Error al borrar la tarea:', resp.statusText);
  }
}