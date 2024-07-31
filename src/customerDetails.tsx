import React from 'react';
import { Customer } from './interface';
import { CustomerModalProps } from './interface';

const CustomerModal: React.FC<CustomerModalProps> = ({ customerData, onClose, onEdit }) => {
  if (!customerData) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Customer Details</h2>
        <p>Name: {customerData.name}</p>
        <p>Email: {customerData.email}</p>
        <p>Priority: {customerData.priority}</p>
        <p>Notes: {customerData.notes}</p>
        <p>CRD: {customerData.crd}</p>
        <button onClick={onEdit} className='edit-Button'>Edit Information</button>
        <button onClick={onClose} className='edit-Button'>Close</button>
      </div>
    </div>
  );
};

export default CustomerModal;
