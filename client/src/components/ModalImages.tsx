const ModalUploadImages: React.FC<ModalUserUpdateProps> = ({ showModal, onClose }) => {

    return (
        <>
            {/* Fondo oscurecido */}
            <div
                className={`modal-backdrop fade ${showModal ? "show" : ""}`}
                style={{ zIndex: showModal ? 1040 : -1 }}
            ></div>

            {/* Modal */}
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
                                <div >X</div>
                            </button>
                        </div>
                        <div className="modal-body">

                        </div>
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

export interface UserUpdate {
    full_name?: string;
    username?: string;
    description?: string | null;
    interest?: string | null;
    password?: string;
    date_of_birthday?: Date | string;
    urlPhoto?: string | null
}