export interface Message {
  id: string
  type: "user" | "ai" | "system"
  content: string
  timestamp: Date
  feedback?: "up" | "down"
}
