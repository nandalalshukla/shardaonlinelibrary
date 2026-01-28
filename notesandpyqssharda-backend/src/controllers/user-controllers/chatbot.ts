import { Request, Response } from "express";
import { getChatModel, SYSTEM_PROMPT } from "../../config/gemini.js";

interface ChatMessage {
  role: "user" | "model";
  parts: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export const chatWithBot = async (req: Request, res: Response) => {
  try {
    const { message, history = [] }: ChatRequest = req.body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required and must be a non-empty string",
      });
    }

    // Get the chat model
    const model = getChatModel();

    // Add system prompt as first message if history is empty
    const chatHistory =
      history.length === 0
        ? [
            { role: "user" as const, parts: [{ text: "Hello" }] },
            { role: "model" as const, parts: [{ text: SYSTEM_PROMPT }] },
          ]
        : history.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.parts }],
          }));

    // Start chat session with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    return res.status(200).json({
      success: true,
      message: "Response generated successfully",
      data: {
        response: text,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Error in chatWithBot:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate response",
      error: error.message || "Internal server error",
    });
  }
};

export const clearChatHistory = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Chat history cleared successfully",
    });
  } catch (error: any) {
    console.error("Error in clearChatHistory:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to clear chat history",
      error: error.message || "Internal server error",
    });
  }
};
