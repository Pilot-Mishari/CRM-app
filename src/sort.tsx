import React from 'react';
import identData from './database.json'; // Assuming you have this file
import { Customer } from './interface';

function SortByPriority() {
  const priorityOrder = ['HIGH', 'MEDIUM', 'LOW', 'N/A'];

  // Sort the data by priority
  const sortedIdent = identData.sort((a: Customer, b: Customer) => {
    const aPriorityIndex = priorityOrder.indexOf(a.priority);
    const bPriorityIndex = priorityOrder.indexOf(b.priority);
    return aPriorityIndex - bPriorityIndex;
  });

  // Render the sorted data
  return (
    <div className="SortByPriority">
      {sortedIdent.map((ident: Customer) => (
        <div key={ident.uid}>
          <span>{ident.name}</span>
          <span>#{ident.uid}</span>
          <span>{ident.priority}</span>
        </div>
      ))}
    </div>
  );
}

export default SortByPriority;
