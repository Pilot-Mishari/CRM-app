import React, { useState, useEffect } from 'react';
import './App.css';
import identData from './database.json'; // Ensure the path is correct
import CustomerModal from './customerDetails'; // Ensure this is your details modal component file
import EditCustomerModal from './editCustomerMods'; // Ensure this is your edit modal component file
import { Customer } from './interface';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isNewModalVisible, setIsNewModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load customer data from JSON file
    setCustomers(identData as Customer[]);
  }, []);

  const priorityOrder = ['HIGH', 'MEDIUM', 'LOW', 'N/A'];

  // Sort the data by priority
  const sortedCustomers = customers.sort((a, b) => {
    const aPriorityIndex = priorityOrder.indexOf(a.priority);
    const bPriorityIndex = priorityOrder.indexOf(b.priority);
    return aPriorityIndex - bPriorityIndex;
  });

  // Filter customers based on search query
  const filteredCustomers = sortedCustomers.filter((customer) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      customer.uid.toLowerCase().includes(searchLower) ||
      customer.name.toLowerCase().includes(searchLower)
    );
  });

  const getPriorityClassName = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'priority-high';
      case 'MEDIUM':
        return 'priority-medium';
      case 'LOW':
        return 'priority-low';
      default:
        return 'na-priority';
    }
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsModalVisible(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalVisible(false);
    setSelectedCustomer(null);
  };

  const handleEditClick = () => {
    setIsDetailsModalVisible(false);
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedCustomer(null);
  };

  const handleNewClick = () => {
    setIsNewModalVisible(true);
  };

  const handleCloseNewModal = () => {
    setIsNewModalVisible(false);
  };

  // Handle saving edited customer data
  const handleEdit = (editedCustomer: Customer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.uid === editedCustomer.uid ? editedCustomer : customer
      )
    );
    handleCloseEditModal(); // Close modal after editing
  };

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    handleCloseNewModal();
  };

  const handleDeleteCustomer = (uid: string) => {
    setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.uid !== uid));
    handleCloseNewModal();
  }

  return (
    <div className="App">
      <div className="header-navbar">
        <nav>
          <span className="mainTitle">CRM</span>
          <input
            type="search"
            placeholder="Search Names, ID, etc."
            className="searchBar"
            value={searchQuery} // Bind input value to search query state
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state on input change
          />
          <button className="createNew-Customer" onClick={handleNewClick}>+ Create</button>
        </nav>
      </div>
      {filteredCustomers.slice(0, 150).map((customer) => (
        <div
          className="customerIdent-container"
          key={customer.uid}
          onClick={() => handleCustomerClick(customer)}
        >
          <div className="customerIdent-info" id={`${customer.name} ${customer.uid}`}>
            <span className={`userID idents`}>#{customer.uid}</span>
            <span className={`userName idents`}>{customer.name}</span>
            <span className={`userPriority idents ${getPriorityClassName(customer.priority)}`}>
              {customer.priority}
            </span>
          </div>
        </div>
      ))}
      {isDetailsModalVisible && selectedCustomer && (
        <CustomerModal
          customerData={selectedCustomer}
          onClose={handleCloseDetailsModal}
          onEdit={handleEditClick} // Include onEdit here
        />
      )}
      {isEditModalVisible && selectedCustomer && (
        <EditCustomerModal
          customerData={selectedCustomer}
          onDelete={null}
          onClose={handleCloseEditModal}
          onEdit={handleEdit} // Include onEdit here
        />
      )}

      { isNewModalVisible && (
        <EditCustomerModal
          customerData={{
            uid: (customers.length + 1).toString(),
            name: '',
            email: '',
            priority: 'N/A',
            notes: '',
            crd: new Date().toISOString().split('T')[0],
          }}
          onDelete={null}
          onClose = {handleCloseNewModal}
          onEdit = {handleAddCustomer}
        />
        
      )}

      { isNewModalVisible && selectedCustomer && (
        <EditCustomerModal 
          customerData={selectedCustomer}
          onClose={() => {
            return CustomerModal
          }}
          onEdit={handleEdit}
          onDelete={null}
        />
      )}
    </div>
  );
};

export default App;
