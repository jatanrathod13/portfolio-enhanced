"use client";

import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';

const TypingIndicator = () => {
  const { isDark } = useTheme();

  return (
    <div className="flex items-start gap-3">
      <Avatar className="w-8 h-8 border border-primary/20">
        <Image 
          src="/profile.jpg" 
          alt="Jatan" 
          width={32} 
          height={32}
          className="rounded-full object-cover" 
        />
      </Avatar>
      
      <motion.div
        className={`p-4 rounded-2xl rounded-tl-none max-w-[75%] ${
          isDark 
            ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' 
            : 'bg-gray-100 border border-gray-200'
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex space-x-2 h-6 items-center">
          <motion.div 
            className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2 }}
          />
          <motion.div 
            className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.2, repeatDelay: 0.2 }}
          />
          <motion.div 
            className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.4, repeatDelay: 0.2 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default TypingIndicator; 