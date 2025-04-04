import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = 'Décrivez vos symptômes...',
  disabled = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Gérer l'envoi avec la touche Entrée (sauf si Shift est pressé)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };
  
  // Animations
  const containerVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    }
  };
  
  const focusVariants = {
    unfocused: { 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
    },
    focused: { 
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)' 
    }
  };
  
  return (
    <motion.div 
      className="border-t border-gray-200 bg-white p-4"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div 
        className="flex items-end bg-white rounded-lg border border-gray-300 overflow-hidden"
        variants={focusVariants}
        animate={isFocused ? 'focused' : 'unfocused'}
        transition={{ duration: 0.2 }}
      >
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-grow px-4 py-3 min-h-[80px] max-h-[200px] resize-none focus:outline-none"
          rows={3}
        />
        
        <div className="p-2">
          <Button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            variant="primary"
            className="rounded-full w-10 h-10 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </motion.div>
      
      {disabled && (
        <motion.p 
          className="text-sm text-gray-500 mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Veuillez patienter pendant que nous analysons votre message...
        </motion.p>
      )}
    </motion.div>
  );
};

export default ChatInput;
