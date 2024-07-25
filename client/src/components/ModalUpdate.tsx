import React, { useEffect, useState } from "react";
import { getOneTask } from "../services/tasks";

const ModalUpdate: React.FC<ModalUpdateProps> = ({ showModal, onClose, idTask, updateTaskForm }) => {
  const [task, setTask] = useState<TaskUpdate>({
    name: undefined,
    description: undefined,
    deadline: undefined,
    fk_priorityid: undefined,
    fk_statusid: undefined
  });
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    if (idTask) {
      (async () => {
        try {
          const taskData = await getOneTask(idTask) as any;
          const date = new Date(taskData.deadline);
          const formatedDate = formatDateISOString(date);
          setTask({
            name: taskData.name,
            description: taskData.description,
            deadline: formatedDate,
            fk_priorityid: taskData.fk_priorityid,
            fk_statusid: taskData.fk_statusid
          });
          setValidationError(""); // Limpiar mensaje de error de validación al cargar una nueva tarea
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [idTask, showModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setTask(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const onUpdateTask = (): void => {
    // Validar que no haya campos vacíos
    if (Object.values(task).some(value => !value)) {
      setValidationError("Complete todos los campos");
    } else {
      // Todos los campos están llenos, actualizar la tarea
      updateTaskForm(idTask, task);
      onClose();
    }
  };

  return (
    <>
      {/* Fondo oscurecido */}
      <div className={`modal-backdrop fade ${showModal ? "show" : ""}`} style={{ zIndex: showModal ? 1040 : -1 }}></div>

      {/* Modal */}
      <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none", zIndex: showModal ? 1050 : -1 }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title">Actualizar tarea</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input onChange={handleChange} value={task.name} type="text" className="form-control" id="nombre" name="name" required placeholder="Ingresa el nombre de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción:</label>
                  <input onChange={handleChange} value={task.description} type="text" className="form-control" id="descripcion" name="description" required placeholder="Ingresa una descripción de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="fecha">Fecha de vencimiento:</label>
                  <input onChange={handleChange} value={task.deadline} type="datetime-local" className="form-control" id="fecha" name="deadline" required placeholder="Ingresa la fecha de vencimiento de la tarea" />
                </div>
                <div className="form-group">
                  <label htmlFor="estatus">Estatus:</label>
                  <select onChange={handleChange} value={task.fk_statusid} className="form-select" id="estatus" name="fk_statusid" required>
                    <option disabled value="">Selecciona un estatus</option>
                    <option value="1">Completada</option>
                    <option value="2">En proceso</option>
                    <option value="3">Pendiente</option>
                    <option value="4">Cancelada</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="prioridad">Prioridad:</label>
                  <select onChange={handleChange} value={task.fk_priorityid} className="form-select" id="prioridad" name="fk_priorityid" required>
                    <option disabled value="">Selecciona una prioridad</option>
                    <option value="1">Altamente prioritaria</option>
                    <option value="2">Prioritaria</option>
                    <option value="3">Medianamente prioritaria</option>
                    <option value="4">No prioritaria</option>
                  </select>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary me-2" onClick={onClose}>Cerrar</button>
                  <button type="button" className="btn btn-secondary" onClick={onUpdateTask}>Actualizar</button>
                </div>
              </form>
              {validationError && <div className="text-danger">{validationError}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const formatDateISOString = (date: Date): string => {
  // Extraer los componentes de la fecha y hora
  var año = date.getFullYear();
  var mes = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses comienzan desde 0, por eso se suma 1
  var día = ('0' + date.getDate()).slice(-2);
  var hora = ('0' + date.getHours()).slice(-2);
  var minuto = ('0' + date.getMinutes()).slice(-2);

  // Construir la cadena de fecha y hora manualmente
  var cadenaFechaHora = año + '-' + mes + '-' + día + 'T' + hora + ':' + minuto;

 return(cadenaFechaHora); // Salida: "2024-04-03T17:40"
};
export default ModalUpdate;

interface ModalUpdateProps {
  showModal: boolean;
  onClose: () => void;
  idTask: number;
  updateTaskForm: (idTask: number,task:TaskUpdate) => void;
}

export interface TaskUpdate {
  name?: string;
  description?: string;
  deadline?: any;
  fk_statusid?: number | string;
  fk_priorityid?: number | string;
}