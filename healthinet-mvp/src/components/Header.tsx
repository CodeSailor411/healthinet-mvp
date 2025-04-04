import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Vérifier si un lien est actif
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Liens de navigation
  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/chat', label: 'Consultation' },
    { path: '/health-records', label: 'Dossier Médical' },
    { path: '/nearby-specialists', label: 'Spécialistes à proximité' }
  ];
  
  // Animations
  const headerVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };
  
  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500
      }
    },
    hover: { 
      scale: 1.05,
      color: '#3B82F6',
      transition: { duration: 0.2 }
    }
  };
  
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <motion.header 
      className="bg-white shadow-md"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <motion.span 
              className="text-xl font-bold text-gray-800"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              HealthiNet
            </motion.span>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                variants={linkVariants}
                whileHover="hover"
                custom={index}
              >
                <Link 
                  to={link.path} 
                  className={`font-medium ${isActive(link.path) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div 
                      className="h-1 bg-blue-600 rounded-full mt-1"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* Menu Hamburger - Mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Navigation - Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden py-4 border-t border-gray-100"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    variants={linkVariants}
                    whileHover="hover"
                    custom={index}
                  >
                    <Link 
                      to={link.path} 
                      className={`block py-2 px-4 rounded-md ${isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
