import React, { useEffect, useState } from "react";
import { createTask } from "../services/tasks.ts"

const ModalInsert: React.FC<ModalInsertProps> = ({ showModal, onClose, onTaskCreated }) => {
  const initialValues = {
    name: "",
    deadline: "",
    description: "",
    fk_priorityid: "0",
    fk_statusid: "0"
  }
  const [formData, setFormData] = useState<TaskInsert>(initialValues);
  const [textoAlerta, setTextoAlerta] = useState<string>()
  const [mostrarAlertaCambios, setMostrarAlertaCambios] = useState<string>("d-none");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData: TaskInsert) => ({
      ...prevData,
      [name]: value
    }));
  };

  const resetFormData = () => {
    setFormData(initialValues);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.fk_priorityid || formData.fk_priorityid === "0" || !formData.fk_statusid || formData.fk_statusid === "0") {
        setMostrarAlertaCambios("")
        setTextoAlerta("Completa todos los campos.")
        return;
      }
      setMostrarAlertaCambios("d-none")
      await createTask(formData!); // Espera a que la tarea se cree antes de cerrar el modal
      onTaskCreated(); // Llama al callback para notificar que se creó una tarea
      handleClose();
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
    console.log(formData)
    onClose(); // Cierra el modal después de agregar la tarea
  };

  const handleClose = () => {
    resetFormData();
    onClose();
  }

  return (
    <>
      {/* Fondo oscurecido */}
      <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ zIndex: showModal ? 1040 : -1 }}></div>

      {/* Modal */}
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none', zIndex: showModal ? 1050 : -1 }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title">Agregar tarea</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="container">
              <div className={`alert alert-dismissible alert-danger ${mostrarAlertaCambios}`}>
                <button type="button" className="btn-close" onClick={() => { setMostrarAlertaCambios("d-none") }}></button>
                <strong>Alerta!!</strong> {textoAlerta}
              </div>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input onChange={handleChange} type="text" className="form-control" id="nombre" name="name" required placeholder="Ingresa el nombre de la tarea" value={formData.name} />
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción:</label>
                  <input onChange={handleChange} type="text" className="form-control" id="descripcion" name="description" required placeholder="Ingresa una descripción de la tarea" value={formData.description} />
                </div>
                <div className="form-group">
                  <label htmlFor="fecha">Fecha de vencimiento:</label>
                  <input onChange={handleChange} type="datetime-local" className="form-control" id="fecha" name="deadline" required placeholder="Ingresa la fecha de vencimiento de la tarea" value={formData.deadline} />
                </div>
                <div className="form-group">
                  <label htmlFor="estatus">Estatus:</label>
                  <select onChange={handleChange} value={formData.fk_statusid} className="form-select" id="estatus" name="fk_statusid">
                    <option disabled value="0">Selecciona un estatus</option>
                    <option value="1">Completada</option>
                    <option value="2">En proceso</option>
                    <option value="3">Pendiente</option>
                    <option value="4">Cancelada</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="prioridad">Prioridad:</label>
                  <select onChange={handleChange} value={formData.fk_priorityid} className="form-select" id="prioridad" name="fk_priorityid">
                    <option disabled value="0">Selecciona una prioridad</option>
                    <option value="1">Altamente prioritaria</option>
                    <option value="2">Prioritaria</option>
                    <option value="3">Medianamente prioritaria</option>
                    <option value="4">No prioritaria</option>
                  </select>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary me-2" onClick={handleClose}>Cerrar</button>
                  <button type="submit" className="btn btn-secondary">Agregar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface ModalInsertProps {
  showModal: boolean;
  onClose: () => void;
  onTaskCreated: () => void; // Nuevo callback para notificar que se creó una tarea
}
/*
  "name": "Trapear",
  "description": "Ejemplo trapear",
  "deadline": "2024-01-15 10:00:00",
  "fk_statusid": 1,
  "fk_priorityid": 2
*/
export interface TaskInsert {
  name: string;
  description: string;
  deadline: string;
  fk_statusid: string;
  fk_priorityid: string;
}
export default ModalInsert;
