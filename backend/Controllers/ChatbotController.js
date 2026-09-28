import Chat from '../models/ChatSchema.js'
import { generateAIResponse } from '../Services/GroqService.js'
import { runInputGuardrails, runOutputGuardrails } from '../Services/guardrailsService.js'

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      })
    }

    // Run Input Guardrails (Health-check, severity, emergency triage & safety)
    const guardCheck = await runInputGuardrails(message)

    // If query is off-topic, unsafe, or an immediate emergency
    if (!guardCheck.safe) {
      const savedChat = await Chat.create({
        message,
        response: guardCheck.fallbackMessage,
      })

      return res.status(200).json({
        success: true,
        message: 'Response generated with guardrails applied',
        data: savedChat,
        reply: guardCheck.fallbackMessage,
        flagged: true,
        reason: guardCheck.reason,
        severity: guardCheck.severity || 'NONE',
        suggestAppointment: false,
      })
    }

    const rawAiReply = await generateAIResponse(message)

    // Run Output Guardrail (appends booking banner if serious + medical disclaimer)
    const finalAiReply = runOutputGuardrails(rawAiReply, guardCheck.metadata)

    const savedChat = await Chat.create({
      message,
      response: finalAiReply,
    })

    res.status(200).json({
      success: true,
      message: 'Chat response generated successfully',
      data: savedChat,
      reply: finalAiReply,
      flagged: false,
      severity: guardCheck.metadata?.severity || 'MILD',
      suggestAppointment: Boolean(guardCheck.metadata?.requiresAppointment),
    })
  } catch (error) {
    console.error('AI chatbot error:', error)

    res.status(500).json({
      success: false,
      message: 'AI chatbot failed',
    })
  }
}