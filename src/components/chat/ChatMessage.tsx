import type { Message } from '@/types/chat';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { isDark } = useTheme();
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 border border-primary/20">
          <Image 
            src="/profile.jpg" 
            alt="Jatan" 
            width={32} 
            height={32} 
            className="rounded-full object-cover"
          />
        </Avatar>
      )}

      <div
        className={`max-w-[75%] p-4 rounded-2xl ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-none'
            : isDark 
              ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white rounded-tl-none' 
              : 'bg-gray-100 border border-gray-200 rounded-tl-none'
        }`}
      >
        <div className="prose prose-sm dark:prose-invert">
          {message.content}
        </div>
        
        {message.status === 'error' && (
          <div className="text-xs mt-1 text-red-500">
            Error sending message
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 bg-primary/10 text-primary">
          <span className="text-xs font-semibold">You</span>
        </Avatar>
      )}
    </motion.div>
  );
};

export default ChatMessage; 