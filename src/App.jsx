import { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import NewLoan from './components/loans/NewLoan';
import NewClient from './components/clients/NewClient';
import Disbursement from './components/disbursement/Disbursement';
import Repayment from './components/repayment/Repayment';
import Reports from './components/reports/Reports';
import DisbursementModal from './components/disbursement/DisbursementModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  const [disbursementData, setDisbursementData] = useState(null);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleShowDisbursementModal = (data) => {
    setDisbursementData(data);
    setShowDisbursementModal(true);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'newLoan':
        return <NewLoan />;
      case 'newClient':
        return <NewClient />;
      case 'disbursement':
        return <Disbursement onShowModal={handleShowDisbursementModal} />;
      case 'repayment':
        return <Repayment />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-5 my-5">
          <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
          <div className="flex-1 bg-white rounded-lg shadow p-5">
            {renderContent()}
          </div>
        </div>
      </div>
      
      {showDisbursementModal && (
        <DisbursementModal 
          isOpen={showDisbursementModal}
          onClose={() => setShowDisbursementModal(false)}
          data={disbursementData}
        />
      )}
    </div>
  );
}