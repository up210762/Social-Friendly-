import React, { useState, useEffect, FormEvent } from 'react';

const ModalUploadImages: React.FC<ModalInterestProps> = ({ showModal, onClose, giveInterestTypes, giveInterestsByType }) => {
    const [interestTypes, setInterestTypes] = useState<{ id: string; name: string }[]>([]);
    const [selectedInterestType, setSelectedInterestType] = useState<string>('');
    const [interestsByType, setInterestsByType] = useState<{ id: string; name: string }[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (interestTypes.length === 0 || interestsByType.length === 0) {
            setInterestTypes(giveInterestTypes)
            setInterestsByType(giveInterestsByType)
        }
    }, [])

    const handleInterestTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedInterestType(event.target.value);
    };

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (selectedInterests.size > 0)
                console.log(selectedInterests);
            else
                alert("Selecciona mínimo un interés.");
        } catch (error) {}
    }

    const handleCheckboxChange = (interestId: string) => {
        setSelectedInterests(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(interestId)) {
                newSelection.delete(interestId);
            } else {
                if (newSelection.size < 3) {
                    newSelection.add(interestId);
                } else {
                    alert("Límite máximo alcanzado!")
                }
            }
            return newSelection;
        });
    };


    if (!interestsByType || interestsByType.length === 0 || !interestTypes)
        return

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
                <form onSubmit={handleOnSubmit} method="post">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5>Seleccionar Intereses</h5>
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
                            <div className="modal-body">
                                Menú de selección de tipo de interés
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
                                        <label>Intereses Específicos</label>
                                        <div>
                                            {interestsByType.map((interest: any) => (
                                                <div key={interest[parseInt(selectedInterestType) - 1].id} className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        id={`${interest[parseInt(selectedInterestType) - 1].id}`}
                                                        className="form-check-input"
                                                        checked={selectedInterests.has(interest[parseInt(selectedInterestType) - 1].id)}
                                                        onChange={() => handleCheckboxChange(interest[parseInt(selectedInterestType) - 1].id)}
                                                    />
                                                    <label htmlFor={`${interest[parseInt(selectedInterestType) - 1].id}`} className="form-check-label">
                                                        {interest[parseInt(selectedInterestType) - 1].interest_name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button type="submit" style={{ border: 'none' }}>Seleccionar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ModalUploadImages;

interface ModalInterestProps {
    giveInterestTypes: Array<any>;
    giveInterestsByType: Array<any>;
    showModal: boolean;
    onClose: () => void;
}
