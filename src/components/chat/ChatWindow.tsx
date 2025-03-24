import { useChat } from '@/hooks/useChat';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Minimize, Maximize, ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import ChatMessage from './ChatMessage';
import ChatSuggestion from './ChatSuggestion';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const { messages, isLoading, sendMessage, suggestions } = useChat();
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  
  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <motion.div
      className={`fixed bottom-5 right-5 rounded-2xl shadow-xl overflow-hidden z-50 
                 border border-gray-200 dark:border-gray-800
                 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      initial={{ opacity: 0, y: 20, width: 380, height: isMinimized ? 60 : 500 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        width: isMinimized ? 280 : 380,
        height: isMinimized ? 60 : 500
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 bg-primary/5 backdrop-blur-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h3 className="font-medium text-sm">Chat with Jatan's Assistant</h3>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {isMinimized ? <Maximize size={14} /> : <Minimize size={14} />}
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col h-[calc(500px-60px)]"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggestions */}
            {suggestions.length > 0 && messages.length < 3 && (
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 overflow-x-auto">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex gap-2 pb-1">
                  {suggestions.map((suggestion) => (
                    <ChatSuggestion 
                      key={suggestion.id} 
                      suggestion={suggestion} 
                      onClick={handleSuggestionClick} 
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Input */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 pl-3">
                <textarea
                  className="flex-1 bg-transparent text-sm resize-none focus:outline-none max-h-20"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`p-2 rounded-lg ${
                    input.trim() ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  } transition-colors disabled:opacity-50`}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isMinimized && (
        <motion.div 
          className="flex items-center justify-between px-3 h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-sm truncate">Chat with Jatan's Assistant</p>
          <ChevronDown size={16} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatWindow; 