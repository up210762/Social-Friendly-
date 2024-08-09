import React, { useState } from 'react';
const initialValues = {
    interestId: []
}

const ModalUploadImages: React.FC<ModalUserUpdateProps> = ({ showModal, onClose }) => {
    const [selectedInterestType, setSelectedInterestType] = useState<string>('');
    const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());
    const [formData, setFormData] = useState(initialValues);

    const interestTypes = [
        { id: '1', name: 'Actividad Física' },
        { id: '2', name: 'Entretenimiento' },
        { id: '3', name: 'Música' },
        { id: '4', name: 'Videojuegos' },
        // Añade más tipos de interés según sea necesario
    ];

    const interestsByType: Record<string, string[]> = {
        '1': ['Correr', 'Gimnasio', 'Ciclismo'],
        '2': ['Cine', 'Teatro', 'Conciertos'],
        '3': ['Rock', 'Pop', 'Jazz'],
        '4': ['FPS', 'RPG', 'MOBA'],
        // Añade más intereses específicos según el tipo
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {} catch (err) {}
    }

    const handleInterestTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedInterestType(event.target.value);
        setSelectedInterests(new Set()); // Limpiar selecciones cuando cambie el tipo
    };

    const handleCheckboxChange = (interest: string) => {
        setSelectedInterests(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(interest)) {
                newSelection.delete(interest);
            } else {
                newSelection.add(interest);
            }
            console.log(newSelection)
            return newSelection;
        });
    };

    return (
        <>
            <div
                className={`modal-backdrop fade ${showModal ? "show" : ""}`}
                style={{ zIndex: showModal ? 1040 : -1 }}
            ></div>

            <div
                className={`modal ${showModal ? "show" : ""}`}
                style={{ display: showModal ? "block" : "none", zIndex: showModal ? 1050 : -1 }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5>Imágenes</h5>
                            <button
                                type="button"
                                className="close"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'grey'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'white'
                                }}
                                onClick={onClose}>
                                <div>X</div>
                            </button>
                        </div>
                        <form onSubmit={handleOnSubmit}></form>
                        <div className="modal-body">
                            {/* Menú de selección de tipo de interés */}
                            <div className="form-group">
                                <label htmlFor="interestType">Tipo de Interés</label>
                                <select
                                    id="interestType"
                                    className="form-control"
                                    value={selectedInterestType}
                                    onChange={handleInterestTypeChange}
                                >
                                    <option value="">Seleccione un tipo de interés</option>
                                    {interestTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Checkboxes para intereses específicos */}
                            {selectedInterestType && (
                                <div className="form-group">
                                    <label>Intereses</label>
                                    <div>
                                        {interestsByType[selectedInterestType]?.map((interest, index) => (
                                            <div key={index} className="form-check">
                                                <input
                                                    type="checkbox"
                                                    id={`${index}`}
                                                    className="form-check-input"
                                                    checked={selectedInterests.has(interest)}
                                                    onChange={() => handleCheckboxChange(interest)}
                                                />
                                                <label htmlFor={`interest-${index}`} className="form-check-label">
                                                    {interest}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button>Agregar intereses</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalUploadImages;

interface ModalUserUpdateProps {
    showModal: boolean;
    onClose: () => void;
}
