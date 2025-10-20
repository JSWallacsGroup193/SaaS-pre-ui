"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat-interface"
import type { Message } from "@/types/chat"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "Chat started",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setIsLoading(true)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `I understand you're asking about: "${text}". Here's some helpful information:\n\n- Check the system pressure\n- Verify refrigerant levels\n- Inspect electrical connections\n\n\`\`\`\nSuperheat = Suction Line Temp - Evap Saturation Temp\n\`\`\`\n\nLet me know if you need more details!`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleClearHistory = () => {
    setMessages([
      {
        id: Date.now().toString(),
        type: "system",
        content: "Chat cleared",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="h-screen bg-[#0f172a]">
      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        onClearHistory={handleClearHistory}
        isLoading={isLoading}
      />
    </div>
  )
}
