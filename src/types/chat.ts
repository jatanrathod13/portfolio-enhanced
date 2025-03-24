export type MessageStatus = 'sending' | 'sent' | 'error';

export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  status?: MessageStatus;
};

export type ChatState = {
  messages: Message[];
  isLoading: boolean;
};

export type Suggestion = {
  id: string;
  text: string;
}; 