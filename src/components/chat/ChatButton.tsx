import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { useTheme } from '@/hooks/useTheme';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitialAnimation, setShowInitialAnimation] = useState(false);
  const { isDark } = useTheme();

  // Show the initial animation after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialAnimation(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <AnimatePresence>
          {showInitialAnimation && !isOpen && (
            <motion.div
              className={`absolute -top-16 right-0 p-3 rounded-xl ${
                isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              } shadow-lg text-sm max-w-[200px] border border-gray-200 dark:border-gray-700`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              Have questions about my work? Ask me anything!
              <div className="absolute bottom-[-6px] right-4 w-3 h-3 rotate-45 bg-inherit border-r border-b border-gray-200 dark:border-gray-700" />
            </motion.div>
          )}
        </AnimatePresence>
      
        <motion.button
          type="button"
          className={`p-3 rounded-full ${
            isOpen 
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white' 
              : 'bg-primary text-white shadow-lg shadow-primary/25'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowInitialAnimation(false);
          }}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default ChatButton; 