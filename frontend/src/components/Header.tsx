import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">HealthiNet</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/chat" className="text-gray-700 hover:text-blue-600 transition-colors">
                Consultation
              </Link>
            </li>
            <li>
              <Link to="/health-records" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dossier Médical
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
