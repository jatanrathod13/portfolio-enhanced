"use client";

import type { Suggestion } from '@/types/chat';
import { motion } from 'framer-motion';

interface ChatSuggestionProps {
  suggestion: Suggestion;
  onClick: (text: string) => void;
}

const ChatSuggestion = ({ suggestion, onClick }: ChatSuggestionProps) => {
  return (
    <motion.button
      className="px-3 py-2 text-sm rounded-full bg-gray-100 dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700 hover:bg-gray-200 
                dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(suggestion.text)}
    >
      {suggestion.text}
    </motion.button>
  );
};

export default ChatSuggestion; 