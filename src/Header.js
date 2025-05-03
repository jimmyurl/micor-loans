import { useState } from 'react';

export default function Header() {
  const [activeLink, setActiveLink] = useState('dashboard');

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  return (
    <header className="bg-green-800 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="logo text-2xl font-bold flex items-center">
          Pamoja <span className="text-yellow-400 ml-1">Microfinance</span>
        </div>
        
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-wrap">
            <li className="mb-2 mr-2 md:mb-0">
              <a 
                href="#" 
                className={`px-4 py-2 rounded transition-colors ${
                  activeLink === 'dashboard' 
                    ? 'bg-yellow-400 text-gray-800' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => handleNavClick('dashboard')}
              >
                Dashboard
              </a>
            </li>
            <li className="mb-2 mr-2 md:mb-0">
              <a 
                href="#" 
                className={`px-4 py-2 rounded transition-colors ${
                  activeLink === 'loans' 
                    ? 'bg-yellow-400 text-gray-800' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => handleNavClick('loans')}
              >
                Loans
              </a>
            </li>
            <li className="mb-2 mr-2 md:mb-0">
              <a 
                href="#" 
                className={`px-4 py-2 rounded transition-colors ${
                  activeLink === 'clients' 
                    ? 'bg-yellow-400 text-gray-800' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => handleNavClick('clients')}
              >
                Clients
              </a>
            </li>
            <li className="mb-2 mr-2 md:mb-0">
              <a 
                href="#" 
                className={`px-4 py-2 rounded transition-colors ${
                  activeLink === 'reports' 
                    ? 'bg-yellow-400 text-gray-800' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => handleNavClick('reports')}
              >
                Reports
              </a>
            </li>
            <li className="mb-2 md:mb-0">
              <a 
                href="#" 
                className={`px-4 py-2 rounded transition-colors ${
                  activeLink === 'settings' 
                    ? 'bg-yellow-400 text-gray-800' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => handleNavClick('settings')}
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}