import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '../../types';

interface ConversationState {
  step: 'category' | 'size' | 'color';
  category: string;
  size: string;
  color: string;
}

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  conversationState: ConversationState;
}

const initialState: ChatState = {
  messages: [
    {
      id: '1',
      text: 'Hello! I\'m your shopping assistant. I can help you find the perfect product by asking a few questions. What are you looking for today? Try saying "shoes", "shirts", "jeans", "dresses", or "jackets"!',
      sender: 'bot',
      timestamp: Date.now(),
    },
  ],
  isOpen: false,
  isTyping: false,
  conversationState: {
    step: 'category',
    category: '',
    size: '',
    color: ''
  }
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<ChatMessage, 'id' | 'timestamp'>>) => {
      const message: ChatMessage = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        ...action.payload,
      };
      state.messages.push(message);
    },
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    setConversationState: (state, action: PayloadAction<ConversationState>) => {
      state.conversationState = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [initialState.messages[0]];
      state.conversationState = initialState.conversationState;
    },
  },
});

export const {
  addMessage,
  toggleChat,
  setTyping,
  setConversationState,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;