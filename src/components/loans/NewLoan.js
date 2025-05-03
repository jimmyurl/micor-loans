import { useState } from 'react';

export default function NewLoan() {
  const [loanData, setLoanData] = useState({
    clientId: '',
    amount: '',
    purpose: '',
    term: '',
    interestRate: '15',
    disbursementDate: '',
    paymentFrequency: 'Monthly'
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Sample clients data
  const clients = [
    { id: 'C1001', name: 'Maria Kimaro' },
    { id: 'C1002', name: 'John Mbogo' },
    { id: 'C1003', name: 'Sarah Masawe' },
    { id: 'C1004', name: 'Michael Mwakasege' },
    { id: 'C1005', name: 'Anna Kileo' }
  ];
  
  // Loan purpose options
  const purposeOptions = [
    'Business Expansion',
    'Education',
    'Agriculture',
    'Home Improvement',
    'Personal Use',
    'Emergency',
    'Debt Consolidation',
    'Other'
  ];
  
  // Payment frequency options
  const paymentFrequencies = [
    'Weekly',
    'Bi-weekly',
    'Monthly',
    'Quarterly'
  ];
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoanData(prevData => ({
      ...prevData,
      [id]: value
    }));
    
    // Clear error for this field when user changes it
    if (formErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!loanData.clientId) errors.clientId = 'Please select a client';
    if (!loanData.amount) errors.amount = 'Loan amount is required';
    else if (parseFloat(loanData.amount) < 50000) errors.amount = 'Minimum loan amount is 50,000 TZS';
    
    if (!loanData.purpose) errors.purpose = 'Loan purpose is required';
    if (!loanData.term) errors.term = 'Loan term is required';
    else if (parseInt(loanData.term) < 1) errors.term = 'Loan term must be at least 1 month';
    
    if (!loanData.interestRate) errors.interestRate = 'Interest rate is required';
    if (!loanData.disbursementDate) errors.disbursementDate = 'Disbursement date is required';
    
    return errors;
  };
  
  const calculatePaymentSchedule = () => {
    if (!loanData.amount || !loanData.term || !loanData.interestRate) return null;
    
    const principal = parseFloat(loanData.amount);
    const interestRate = parseFloat(loanData.interestRate) / 100 / 12; // Monthly interest rate
    const term = parseInt(loanData.term); // Loan term in months
    
    const monthlyPayment = principal * interestRate * Math.pow(1 + interestRate, term) / 
                          (Math.pow(1 + interestRate, term) - 1);
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: (monthlyPayment * term).toFixed(2),
      totalInterest: ((monthlyPayment * term) - principal).toFixed(2)
    };
  };
  
  const paymentInfo = calculatePaymentSchedule();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Loan data submitted:', loanData);
        // Implement loan creation logic here
        
        setSubmitSuccess(true);
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setLoanData({
            clientId: '',
            amount: '',
            purpose: '',
            term: '',
            interestRate: '15',
            disbursementDate: '',
            paymentFrequency: 'Monthly'
          });
          setSubmitSuccess(false);
        }, 2000);
      } catch (error) {
        console.error('Error submitting loan:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-TZ', { 
      style: 'currency', 
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Get today's date in YYYY-MM-DD format for min date input
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-green-800 mb-5 pb-2 border-b border-gray-200">
        Create New Loan
      </h2>
      
      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Loan created successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clientId" className="block mb-2 font-medium text-gray-700">
              Select Client <span className="text-red-500">*</span>
            </label>
            <select
              id="clientId"
              className={`w-full px-3 py-2 border ${formErrors.clientId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-green-500`}
              value={loanData.clientId}
              onChange={handleChange}
            >
              <option value="">-- Select Client --</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name} ({client.id})
                </option>
              ))}
            </select>
            {formErrors.clientId && (
              <p className="mt-1 text-sm text-red-500">{formErrors.clientId}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="amount" className="block mb-2 font-medium text-gray-700">
              Loan Amount (TZS) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="amount"
              className={`w-full px-3 py-2 border ${formErrors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-green-500`}
              min="50000"
              step="10000"
              value={loanData.amount}
              onChange={handleChange}
              placeholder="Min: 50,000"
            />
            {formErrors.amount && (
              <p className="mt-1 text-sm text-red-500">{formErrors.amount}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="purpose" className="block mb-2 font-medium text-gray-700">
              Loan Purpose <span className="text-red-500">*</span>
            </label>
            <select
              id="purpose"
              className={`w-full px-3 py-2 border ${formErrors.purpose ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-green-500`}
              value={loanData.purpose}
              onChange={handleChange}
            >
              <option value="">-- Select Purpose --</option>
              {purposeOptions.map(purpose => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
            {formErrors.purpose && (
              <p className="mt-1 text-sm text-red-500">{formErrors.purpose}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="term" className="block mb-2 font-medium text-gray-700">
              Loan Term (Months) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="term"
              className={`w-full px-3 py-2 border ${formErrors.term ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-green-500`}
              min="1"
              max="60"
              value={loanData.term}
              onChange={handleChange}
              placeholder="1-60 months"
            />
            {formErrors.term && (
              <p className="mt-1 text-sm text-red-500">{formErrors.term}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="interestRate" className="block mb-2 font-medium text-gray-700">
              Interest Rate (%) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="interestRate"
              className={`w-full px-3 py-2 border ${formErrors.interestRate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-green-500`}
              min="1"
              max="30"
              step="0.5"
              value={loanData.interestRate}
              onChange={handleChange}
            />
            {formErrors.interestRate && (
              <p className="mt-1 text-sm text-red-500">{formErrors.interestRate}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="disbursementDate" className="block mb-2 font-medium text-gray-700">
              Disbursement Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="disbursementDate"
              className={`w-full px-3 py-2 border ${formErrors.disbursementDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-green-500`}
              min={today}
              value={loanData.disbursementDate}
              onChange={handleChange}
            />
            {formErrors.disbursementDate && (
              <p className="mt-1 text-sm text-red-500">{formErrors.disbursementDate}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="paymentFrequency" className="block mb-2 font-medium text-gray-700">
              Payment Frequency
            </label>
            <select
              id="paymentFrequency"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              value={loanData.paymentFrequency}
              onChange={handleChange}
            >
              {paymentFrequencies.map(frequency => (
                <option key={frequency} value={frequency}>
                  {frequency}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {paymentInfo && loanData.amount && loanData.term && loanData.interestRate && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Payment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Payment</p>
                <p className="text-lg font-semibold text-green-700">{formatCurrency(paymentInfo.monthlyPayment)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Payment</p>
                <p className="text-lg font-semibold text-gray-700">{formatCurrency(paymentInfo.totalPayment)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="text-lg font-semibold text-gray-700">{formatCurrency(paymentInfo.totalInterest)}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => {
              setLoanData({
                clientId: '',
                amount: '',
                purpose: '',
                term: '',
                interestRate: '15',
                disbursementDate: '',
                paymentFrequency: 'Monthly'
              });
              setFormErrors({});
            }}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-300"
          >
            {isSubmitting ? 'Processing...' : 'Create Loan'}
          </button>
        </div>
      </form>
    </div>
  );
}