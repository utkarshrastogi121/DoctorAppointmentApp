import Chat from '../models/ChatSchema.js'
import { generateAIResponse } from '../Services/GroqService.js'

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      })
    }

    const aiReply = await generateAIResponse(message)

    const savedChat = await Chat.create({
      message,
      response: aiReply,
    })

    res.status(200).json({
      success: true,
      message: 'Chat response generated successfully',
      data: savedChat,
      reply: aiReply,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      message: 'AI chatbot failed',
    })
  }
}