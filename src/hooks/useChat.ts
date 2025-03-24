import { useState, useCallback } from 'react';
import type { Message, Suggestion } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_SUGGESTIONS: Suggestion[] = [
  { id: '1', text: 'What projects have you worked on?' },
  { id: '2', text: 'Tell me about your skills in AI and data engineering' },
  { id: '3', text: 'What was your role at Optimal Solutions Group?' },
  { id: '4', text: "What's your educational background?" }
];

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: "👋 Hi! I'm Jatan's digital assistant. Feel free to ask me about Jatan's experience, skills, or projects.",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessageId = uuidv4();
    const userMessage: Message = {
      id: userMessageId,
      content,
      role: 'user',
      timestamp: new Date(),
      status: 'sending'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      });

      if (!response.ok) throw new Error('Failed to get a response');
      
      const data = await response.json();
      
      // Update user message status
      setMessages(prev => prev.map(msg => 
        msg.id === userMessageId ? { ...msg, status: 'sent' } : msg
      ));
      
      // Add assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        content: data.answer || "Sorry, I couldn't process your request.",
        role: 'assistant',
        timestamp: new Date(),
        status: 'sent'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Generate new context-aware suggestions
      if (messages.length > 2) {
        // Reset suggestions after conversation is going
        setSuggestions([
          { id: uuidv4(), text: 'Tell me more about your projects' },
          { id: uuidv4(), text: 'What technologies do you work with?' }
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Update user message status
      setMessages(prev => prev.map(msg => 
        msg.id === userMessageId ? { ...msg, status: 'error' } : msg
      ));
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        role: 'assistant',
        timestamp: new Date(),
        status: 'error'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages.length]);

  return {
    messages,
    isLoading,
    sendMessage,
    suggestions
  };
}; 