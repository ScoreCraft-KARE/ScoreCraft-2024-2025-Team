import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmation</h2>
        <p>{message}</p>
        <p className="modal-additional-text">Please confirm your action. This operation cannot be undone.</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Confirm</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
