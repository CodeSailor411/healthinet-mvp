import React from 'react';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div 
        className={`max-w-xs md:max-w-md rounded-lg p-3 ${
          isBot 
            ? 'bg-white text-gray-800 shadow-md rounded-bl-none' 
            : 'bg-blue-600 text-white rounded-br-none'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessage;
