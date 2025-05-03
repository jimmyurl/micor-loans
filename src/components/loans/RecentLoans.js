export default function RecentLoans({ loans }) {
    // Function to render status badge
    const getStatusBadge = (status) => {
      let badgeClass = '';
      
      switch (status.toLowerCase()) {
        case 'active':
          badgeClass = 'bg-green-100 text-green-800';
          break;
        case 'overdue':
          badgeClass = 'bg-red-100 text-red-800';
          break;
        case 'pending':
          badgeClass = 'bg-yellow-100 text-yellow-800';
          break;
        case 'closed':
          badgeClass = 'bg-gray-100 text-gray-800';
          break;
        default:
          badgeClass = 'bg-blue-100 text-blue-800';
      }
      
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
          {status}
        </span>
      );
    };
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Loan ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Client Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Amount (TZS)
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Disbursement Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{loan.id}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{loan.client}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{loan.amount}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{loan.date}</td>
                <td className="px-4 py-3 text-sm">
                  {getStatusBadge(loan.status)}
                </td>
                <td className="px-4 py-3 text-sm space-x-2">
                  <button className="px-2 py-1 text-xs bg-blue-50 text-blue-600 border border-blue-200 rounded">
                    View
                  </button>
                  <button className="px-2 py-1 text-xs bg-green-50 text-green-600 border border-green-200 rounded">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }