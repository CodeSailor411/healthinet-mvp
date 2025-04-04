import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  type = 'button'
}) => {
  // Styles de base
  const baseStyles = 'rounded-md font-medium focus:outline-none transition-all duration-300';
  
  // Styles de variante
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
    secondary: 'bg-green-600 text-white hover:bg-green-700 shadow-md',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
  };
  
  // Styles de taille
  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-5 py-2',
    large: 'px-6 py-3 text-lg'
  };
  
  // Styles pour l'état désactivé
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Combiner tous les styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;
  
  // Animations
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  return (
    <motion.button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      variants={buttonVariants}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
