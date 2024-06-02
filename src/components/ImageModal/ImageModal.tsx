import Modal from 'react-modal';
import css from "../ImageModal/ImageModal.module.css"

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: 'none',
    backgroundSize:'cover',
    overflow: 'none',
    border: 'none',
    maxWidth: '90vw', 
    padding: '0px',
    maxHeight: '90vh',
  },
};

Modal.setAppElement('#root');

interface ModalImage {
  open: boolean,
  selectedImage: string | null;
  onClose: () => void
}

export default function ImageModal({ open, selectedImage, onClose }:ModalImage) {
  return (
    <Modal isOpen={open} style={customStyles} shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true} onRequestClose={onClose} contentLabel="Example Modal">
      {selectedImage && (
          <img className={css.image} src={selectedImage} alt={selectedImage} />
      )}
    </Modal>
  );
}
