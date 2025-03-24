import * as React from "react"
import { cn } from "@/lib/utils"

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  smooth?: boolean
}

export function ChatMessageList({
  children,
  className,
  smooth = false,
  ...props
}: ChatMessageListProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = React.useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
      })
    }
  }, [smooth])

  React.useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  return (
    <div
      className={cn("flex flex-col overflow-y-auto p-4 gap-3", className)}
      {...props}
    >
      {children}
      <div ref={messagesEndRef} />
    </div>
  )
} 