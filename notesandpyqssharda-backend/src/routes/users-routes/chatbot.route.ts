import { Router } from "express";
import {
  chatWithBot,
  clearChatHistory,
} from "../../controllers/user-controllers/chatbot.js";

const chatbotRouter = Router();

// POST /api/v1/chatbot - Send a message to the chatbot
chatbotRouter.post("/", chatWithBot);

// POST /api/v1/chatbot/clear - Clear chat history
chatbotRouter.post("/clear", clearChatHistory);

export default chatbotRouter;
