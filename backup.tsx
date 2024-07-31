import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import identData from './database.json';
import customerModal from './customerDetails';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const priorityOrder = ['HIGH', 'MEDIUM', 'LOW', 'N/A'];

  // Sort the data by priority
  const sortedIdent = identData.sort((a, b) => {
    const aPriorityIndex = priorityOrder.indexOf(a.priority);
    const bPriorityIndex = priorityOrder.indexOf(b.priority);
    return aPriorityIndex - bPriorityIndex;
  });

  const getPriorityClassName = (priority:string ) => {
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

  return (
    <div className="App">
      <div className="header-navbar">
        <nav>
          <span className="mainTitle">CRM</span>
          <input type="search" placeholder="Search Names, ID, etc." className="searchBar" />
          <button className="createNew-Customer">+ Create</button>
        </nav>
      </div>
      {sortedIdent.slice(0, 24).map((ident) => (
        <div className="customerIdent-container" key={ident.uid} onClick={() => setIsModalVisible(true)}>

          <div className="customerIdent-info" id={`${ident.name} ${ident.uid}`}>
            <span className={`userID idents`}>#{ident.uid}</span>
            <span className={`userName idents`}>{ident.name}</span>
            <span className={`userPriority idents ${getPriorityClassName(ident.priority)}`}>
                {ident.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
