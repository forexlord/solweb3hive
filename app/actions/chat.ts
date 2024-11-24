'use server'

import prisma from "../../lib/prisma";

export async function getChats(userId: string) {
  try {
    const chats = await prisma.chat.findMany({
      where: { userId },
      include: {
        messages: true,
      },
    });

    return { chats };
  } catch (error) {
    console.error("Error with fetching chats:", error);
    throw new Error("Failed to fetch chats");
  }
} 

export async function createChat(userId: string) {
  try {
    const chat = await prisma.chat.create({
      data: { userId },
    });

    return { chat };
  } catch (error) {
    console.error("Error with creating chats:", error);
    throw new Error("Failed to create chat");
  }
}

export async function sendMessage(prompt: string, chatId: string) {
  try {
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    // Call custom AI endpoint
    const response = await fetch('https://sol3hive-ai.onrender.com/web3-idea/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_message: prompt
      })
    });

    const aiResponse = await response.json();

    // Save prompt to database
    await prisma.message.create({
      data: {
        type: "prompt",
        content: prompt,
        chatId,
      },
    });

    // Save AI response to database
    await prisma.message.create({
      data: {
        type: "response",
        content: aiResponse.response || aiResponse.message || "No response received",
        chatId,
      },
    });

    return { 
      success: true,
      result: aiResponse.response || aiResponse.message || "No response received", 
      chatId 
    };
  } catch (error) {
    console.error("Error with AI request:", error);
    throw new Error("Something went wrong");
  }
}