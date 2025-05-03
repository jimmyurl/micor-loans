import { useState } from 'react';


export default function Sidebar({ activeSection, onSectionChange }) {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'newLoan', label: 'New Loan' },
      { id: 'newClient', label: 'New Client' },
      { id: 'disbursement', label: 'Disbursements' },
      { id: 'repayment', label: 'Repayments' },
      { id: 'reports', label: 'Generate Reports' }
    ];
  
    return (
      <div className="w-full md:w-60 bg-white rounded-lg shadow p-5">
        <h3 className="text-green-800 font-medium text-lg pb-3 mb-3 border-b border-gray-200">
          Quick Actions
        </h3>
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <a
                href="#"
                className={`block px-3 py-2 rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'bg-gray-100 text-green-800'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-green-800'
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }