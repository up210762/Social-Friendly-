import { useState } from "react";
import ModalUpdate, { TaskUpdate } from "./ModalUpdate";

interface Task {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    estatus: string;
    prioridad: string;
}

interface Props {
    tasks: Task[];
    deleteTask: (idTask: number) => void;
    updateTaskForm: (idTask: number,task:TaskUpdate) => void;
}

const Tarea: React.FC<Props> = ({ tasks, deleteTask, updateTaskForm}) => {
    
    const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
    const [idTask,setIdTask]=useState<number>()

    const toggleFormulario = (idTask:number) => {
        setIdTask(idTask);
        setMostrarFormulario(!mostrarFormulario);

    };
    if (tasks.length === 0) {
        return (
            <div className="text-center">
                <h1 className="mb-4">No hay tareas</h1>
            </div>
        )
    }

    function onClose(){
        setMostrarFormulario(false);
        setIdTask(undefined);
    }

    

    return (
        <>
        <div className={`modal-backdrop fade ${mostrarFormulario ? 'show' : ''}`} style={{ zIndex: mostrarFormulario ? 1030 : -1 }}></div>
        <ModalUpdate idTask={idTask!} showModal={mostrarFormulario} onClose={onClose} updateTaskForm={updateTaskForm}/>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Fecha Limite</th>
                    <th>Estatus</th>
                    <th>Prioridad</th>
                    <th>Actualizar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.nombre}</td>
                        <td>{task.descripcion}</td>
                        <td>{formatDate(task.fecha)}</td>
                        <td>{task.estatus}</td>
                        <td>{task.prioridad}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => toggleFormulario(task.id)}>Actualizar</button>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={()=>{deleteTask(task.id)}}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
};

// Función para formatear la fecha
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("es-MX")} ${date.toLocaleTimeString("es-MX")}`;
}

export default Tarea;

