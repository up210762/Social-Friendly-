import React, { useState, useEffect } from "react";
import ModalInsert from "../components/ModalInsert";
import Tarea from "../components/Tarea";
//import { tasks as data } from "../task";
import { getAllTasks, deleteTask, updateTask } from "../services/tasks";
import { TaskUpdate, formatDateISOString } from "../components/ModalUpdate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';



const Home: React.FC = () => {
  const [mostrarAlertaCambios, setMostrarAlertaCambios] = useState<string>("d-none");
  const [textoAlerta,setTextoAlerta] = useState<string>("Tarea agregada con éxito.")
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    fetchAllTask();
    //setTasks(data);
  }, [mostrarFormulario]);

  const fetchAllTask = async () => {
    try {
      const tasks = await getAllTasks(); // Llama a la función getAllTasks para obtener los datos
      setTasks(tasks)
      //setTasks(tasksData); // Establece los datos obtenidos del servidor en el estado local
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };
  
  const toggleFormulario = (): void => {
    setMostrarFormulario(!mostrarFormulario);
    
  };

  const handleTaskCreated = (): void => {
    setTextoAlerta("Tarea agregada con éxito.");
    setMostrarAlertaCambios(""); // Muestra la alerta después de crear la tarea
  };

  const deleteTaskForm = async (idTask: number) => {
    const conf = confirm("Seguro que desea borrar la tarea?")


    if (conf) {
      await deleteTask(idTask);
      await fetchAllTask();
      setTextoAlerta("Se ha eliminado la tarea.");
      setMostrarAlertaCambios("");
    }
  }

  const updateTaskForm = async (idTask: number, task:TaskUpdate) => {
    console.log(`Se actualizará la tarea con el id:${idTask}`)
    console.log(task)
    const date = new Date(task!.deadline)
    task!.deadline = formatDateISOString(date)
    try {
      await updateTask(idTask, task!); // Espera a que la tarea se cree antes de cerrar el modal
      await fetchAllTask(); //Actualizar pantalla
      setTextoAlerta(`Se ha modificado la tarea: ${task.name}.`);
      setMostrarAlertaCambios("");
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  }

  return (
    <>
      {/* Fondo oscurecido */}
      <div className={`modal-backdrop fade ${mostrarFormulario ? 'show' : ''}`} style={{ zIndex: mostrarFormulario ? 1030 : -1 }}></div>

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-center">Lista de tareas</h1>
          <div>
            <ModalInsert showModal={mostrarFormulario} onClose={toggleFormulario} onTaskCreated={handleTaskCreated}/>
            <button className="btn btn-primary ms-3" onClick={toggleFormulario}><FontAwesomeIcon icon={faPlus} /> Agregar tarea </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={`alert alert-dismissible alert-success ${mostrarAlertaCambios}`}>
          <button type="button" className="btn-close" onClick={()=>{setMostrarAlertaCambios("d-none")}}></button>
          <strong>Correcto!!</strong> {textoAlerta}
        </div>
        <Tarea tasks={tasks} deleteTask={deleteTaskForm} updateTaskForm={updateTaskForm}/>
      </div>
    </>
  );
}

interface Task {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  estatus: string;
  prioridad: string;
}
export default Home;

