// NewCustomerModal.tsx
import React, { useState } from 'react';
import { Customer } from './interface';


type NewCustomerModalProps = {
  onClose: () => void;
  onSave: (newCustomer: Customer) => void;
};

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({ onClose, onSave }) => {
  const [customer, setCustomer] = useState<Customer>({
    uid: '',
    name: '',
    email: '',
    priority: 'N/A',
    notes: '',
    crd: new Date().toLocaleDateString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSave = () => {
    onSave(customer);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Customer</h2>
        <label>
          Name:
          <input type="text" name="name" value={customer.name} onChange={handleChange} className='infoChg'/>
        </label>
        <br></br><br></br>
        <label>
          Email:
          <input type="email" name="email" value={customer.email} onChange={handleChange} className='infoChg'/>
        </label>
        <br></br><br></br>
        <label>
          Priority:
          <select name="priority" value={customer.priority} onChange={handleChange}>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
            <option value="N/A">N/A</option>
          </select>
        </label>
        <br></br><br></br>
        <label>
          Notes:
          <textarea name="notes" value={customer.notes} onChange={handleChange} className='infoChg'/>
        </label>
        <br></br><br></br>
        <button onClick={handleSave} className='edit-Button'>Save</button>
        <button onClick={onClose} className='edit-Button'>Close</button>
      </div>
    </div>
  );
};

export default NewCustomerModal;
