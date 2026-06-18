import { httpPost } from "../../config/httphandler"; 

export const sendChatMessage = async (messages) => {
  // api.js interceptor auto-attaches Bearer token if logged in
  const data = await httpPost("/api/chat/", { messages });
  return data.reply;
};