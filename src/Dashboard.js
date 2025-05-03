import DashboardStats from './DashboardStats';
import RecentLoans from '../loans/RecentLoans';
import { useState } from 'react';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const stats = [
    { title: 'Total Active Loans', value: '145', type: 'default' },
    { title: 'Total Disbursed (TZS)', value: '56,450,000', type: 'default' },
    { title: 'Fully Repaid Loans', value: '48', type: 'success' },
    { title: 'Overdue Loans', value: '15', type: 'danger' }
  ];
  
  // Sample loan data
  const loansData = [
    { id: 'L1001', client: 'Maria Kimaro', amount: '1,500,000', date: '2025-04-22', status: 'Active' },
    { id: 'L1002', client: 'John Mbogo', amount: '850,000', date: '2025-04-18', status: 'Overdue' },
    { id: 'L1003', client: 'Sarah Masawe', amount: '2,100,000', date: '2025-04-15', status: 'Active' },
    { id: 'L1004', client: 'Michael Mwakasege', amount: '1,200,000', date: '2025-04-12', status: 'Closed' },
    { id: 'L1005', client: 'Anna Kileo', amount: '650,000', date: '2025-04-10', status: 'Active' }
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-800 mb-5 pb-2 border-b border-gray-200">
        Dashboard
      </h2>
      
      <DashboardStats stats={stats} />
      
      <h2 className="text-xl font-semibold text-green-800 mt-8 mb-4">
        Recent Loans
      </h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by client name or loan ID"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="bg-green-800 text-white px-5 py-2 rounded-r-md hover:bg-green-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      
      <RecentLoans loans={loansData} />
    </div>
  );
}