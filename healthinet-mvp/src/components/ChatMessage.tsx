import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  // Animations
  const messageVariants = {
    hidden: { 
      opacity: 0, 
      x: isUser ? 20 : -20,
      y: 10 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    }
  };
  
  // Styles conditionnels
  const containerClasses = `flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`;
  const messageClasses = `max-w-[80%] p-3 rounded-lg shadow-sm ${
    isUser 
      ? 'bg-blue-600 text-white rounded-br-none' 
      : 'bg-white text-gray-700 rounded-bl-none'
  }`;
  
  // Formater l'heure
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <motion.div
      className={containerClasses}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <div className={messageClasses}>
        <p className="whitespace-pre-wrap">{message.text}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-400'} text-right`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
