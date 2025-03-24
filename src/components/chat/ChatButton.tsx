"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot } from 'lucide-react';
import { ModernChat } from '@/components/ui/modern-chat';
import type { Suggestion } from "@/types/chat"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  // Enhanced suggestions that reflect Jatan's background
  const suggestions: Suggestion[] = [
    { id: "1", text: "What projects has Jatan worked on?" },
    { id: "2", text: "What are Jatan's technical skills?" },
    { id: "3", text: "Tell me about Jatan's work in AI" },
    { id: "4", text: "What is Jatan's education background?" }
  ]

  // Show the welcome bubble after a short delay when user first visits
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    
    if (!hasVisitedBefore) {
      const timer = setTimeout(() => {
        setShowBubble(true);
        localStorage.setItem("hasVisitedBefore", "true");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <AnimatePresence>
          {showBubble && !isOpen && (
            <motion.div
              className="absolute -top-20 right-0 p-3 rounded-xl bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg text-sm max-w-[250px] border border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Hello! 👋 I'm Jatan's AI assistant. Need information about his skills, experience, or projects?
              <div className="absolute bottom-[-10px] right-4 w-5 h-5 rotate-45 bg-inherit border-r border-b border-gray-200 dark:border-gray-800" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          className={`p-3 rounded-full shadow-lg ${
            isOpen ? "bg-gray-200 dark:bg-gray-800" : "bg-primary text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowBubble(false);
          }}
          aria-label={isOpen ? "Close chat" : "Open chat with Jatan's assistant"}
          type="button"
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 md:right-8 lg:w-[450px]"
          >
            <ModernChat suggestions={suggestions} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 