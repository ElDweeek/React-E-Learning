import React from 'react';
import './ConfirmDialog.css'; // For styling the dialog

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <p className='text-dark'>{message}</p>
        <button className="btn btn-primary" onClick={onConfirm}>Yes</button>
        <button className="btn btn-secondary" onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
