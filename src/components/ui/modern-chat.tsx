"use client"

import * as React from "react"
import { Send } from "lucide-react"
import type { Message, Suggestion } from "@/types/chat"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TextareaAutosize from "react-textarea-autosize"
import { cn } from "@/lib/utils"
import ChatSuggestion from "@/components/chat/ChatSuggestion"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import TypingIndicator from "@/components/chat/TypingIndicator"

export interface ModernChatProps extends React.HTMLAttributes<HTMLDivElement> {
  initialMessages?: Message[]
  id?: string
  suggestions?: Suggestion[]
  titleText?: string
  placeholder?: string
  emoji?: string
}

export function ModernChat({
  initialMessages = [],
  id = "chat",
  suggestions = [],
  titleText = "Jatan's AI Assistant",
  placeholder = "Ask me anything about Jatan...",
  emoji = "🤖",
  className,
  ...props
}: ModernChatProps) {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages.length > 0 ? initialMessages : [
    {
      id: "welcome-message",
      content: "Hi there! 👋 I'm Jatan's AI assistant. I can tell you about his skills, experience, projects, or anything else you'd like to know. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = React.useState<string>("")
  const [isTyping, setIsTyping] = React.useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Don't send empty messages
    if (!input.trim()) {
      return
    }

    // Add user message to UI immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }
    
    setMessages((current) => [...current, userMessage])
    setInput("") // Clear input field
    setIsTyping(true) // Show typing indicator

    try {
      // Send to API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      
      // Add bot response to messages
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.answer,
        role: "assistant",
        timestamp: new Date(),
      }
      
      setMessages((current) => [...current, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I couldn't process your message. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }
      
      setMessages((current) => [...current, errorMessage])
    } finally {
      setIsTyping(false) // Hide typing indicator
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  // Scroll to the latest message
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  
  const scrollToBottom = React.useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  React.useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md border bg-background shadow-md",
        className
      )}
      {...props}
    >
      {/* Chat header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/avatar-placeholder.jpg" alt="Bot avatar" />
            <AvatarFallback>{emoji}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{titleText}</h3>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <ChatMessageList className="flex-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {message.content}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
            <TypingIndicator />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </ChatMessageList>

      {/* Suggestions */}
      {suggestions.length > 0 && messages.length === 0 && (
        <div className="mx-4 mb-4 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <ChatSuggestion
              key={suggestion.id}
              suggestion={suggestion}
              onClick={handleSuggestionClick}
            />
          ))}
        </div>
      )}

      {/* Chat input */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <TextareaAutosize
            id={`${id}-input`}
            value={input}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 resize-none bg-background outline-none"
            minRows={1}
            maxRows={5}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) {
                  const form = e.currentTarget.form;
                  if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
                }
              }
            }}
          />
          <button
            type="submit"
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90",
              !input.trim() && "cursor-not-allowed opacity-50"
            )}
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
} 