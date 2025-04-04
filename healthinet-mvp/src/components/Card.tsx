import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  animate = true
}) => {
  // Animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  };

  // Rendu du composant
  const renderCard = () => (
    <motion.div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      variants={animate ? cardVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      whileHover={animate ? "hover" : undefined}
      transition={{ duration: 0.3 }}
    >
      {title && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );

  return renderCard();
};

export default Card;
