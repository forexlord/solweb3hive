import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ChatMessage {
  type: "prompt" | "response";
  id?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  chatId: string;
}

export interface AnonymousChatMessage {
  type: "prompt" | "response";
  id?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChat {
  id?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  messages: ChatMessage[];
}

interface ChatStore {
  chats: IChat[];
  setChats: (chats: IChat[]) => void;
  addChat: (chats: IChat) => void;
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  anonymousMessages: AnonymousChatMessage[];
  setAnonymousMessages: (messages: AnonymousChatMessage[]) => void;
  addAnonymousMessage: (message: AnonymousChatMessage) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      setChats: (chats: IChat[]) => set({ chats }),
      addChat: (chat: IChat) =>
        set((state) => ({ chats: [...state.chats, chat] })),
      messages: [],
      setMessages: (messages: ChatMessage[]) => set({ messages }),
      addMessage: (message: ChatMessage) =>
        set((state) => ({
          messages: [...state.messages, message],
          chats: state.chats.map((chat) =>
            chat.id === message.chatId
              ? { ...chat, messages: [...(chat?.messages || []), message] }
              : chat
          ),
        })),
      anonymousMessages: [],
      setAnonymousMessages: (messages: AnonymousChatMessage[]) =>
        set({ anonymousMessages: messages }),
      addAnonymousMessage: (message: AnonymousChatMessage) =>
        set((state) => ({
          anonymousMessages: [...state.anonymousMessages, message],
        })),
    }),
    { name: "chats", storage: createJSONStorage(() => sessionStorage) }
  )
);
