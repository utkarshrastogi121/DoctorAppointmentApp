import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const IMMEDIATE_EMERGENCIES = [
  /\bsuicid(e|al)\b/i,
  /\bkill myself\b/i,
  /\bcrushing chest pain\b/i,
  /\bunconscious\b/i,
  /\bheart attack\b/i,
  /\bstroke symptoms\b/i,
  /\bface droop(ing)?\b/i,
  /\bsevere bleeding\b/i,
  /\bcan'?t breathe at all\b/i,
];

const PROMPT_INJECTIONS = [
  /ignore (all )?(previous|above) instructions/i,
  /system prompt/i,
  /you are now in developer mode/i,
  /jailbreak/i,
  /bypass safety/i,
];

const MEDICAL_DISCLAIMER =
  "\n\n*Disclaimer: I am an AI assistant and not a doctor. If you have any serious issue, please book a doctor appointment through our Medicare app.*";

function checkImmediateTriage(userMessage) {
  for (const pattern of PROMPT_INJECTIONS) {
    if (pattern.test(userMessage)) {
      return {
        safe: false,
        reason: "Prompt injection detected.",
        fallbackMessage:
          "Your request violates our security policy and cannot be processed.",
      };
    }
  }

  for (const pattern of IMMEDIATE_EMERGENCIES) {
    if (pattern.test(userMessage)) {
      return {
        safe: false,
        reason: "Critical emergency detected.",
        fallbackMessage:
          "Emergency Alert: Your symptoms may indicate a life-threatening emergency. Please contact emergency services immediately or visit the nearest emergency room." +
          MEDICAL_DISCLAIMER,
      };
    }
  }

  return { safe: true };
}

async function classifyDomainAndSeverity(userMessage) {
  const prompt = `You are a strict guardrail classifier for a medical platform called Medicare.
Your job is to determine if the user query is strictly health/medical/Medicare related.

CRITICAL RULES:
- "isHealthRelated" must be TRUE ONLY for: symptoms, diseases, medications, treatments, human anatomy, mental health, diet/nutrition for health, Medicare insurance, hospital/doctor visits, pregnancy, exercise/wellness.
- "isHealthRelated" must be FALSE for: general science (sky color, weather, physics), coding, math, general knowledge, sports, entertainment, casual chit-chat, geography, recipes (non-dietary).

Examples:
- "what is color of sky" -> {"isHealthRelated": false, "severity": "NONE", "requiresAppointment": false, "reason": "General science question"}
- "write python code" -> {"isHealthRelated": false, "severity": "NONE", "requiresAppointment": false, "reason": "Programming query"}
- "I have a headache and nausea" -> {"isHealthRelated": true, "severity": "MILD", "requiresAppointment": false, "reason": "Common symptoms"}
- "I have chest pain radiating to arm" -> {"isHealthRelated": true, "severity": "CRITICAL", "requiresAppointment": true, "reason": "Cardiac red flag"}
- "high fever for 4 days and coughing blood" -> {"isHealthRelated": true, "severity": "SERIOUS", "requiresAppointment": true, "reason": "Persistent severe infection"}

User query: "${userMessage.replace(/"/g, '\\"')}"

Return ONLY a valid JSON object matching this schema:
{
  "isSafe": boolean,
  "isHealthRelated": boolean,
  "severity": "CRITICAL" | "SERIOUS" | "MILD" | "NONE",
  "requiresAppointment": boolean,
  "reason": "short explanation"
}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.0,
    });

    const parsed = JSON.parse(completion.choices[0]?.message?.content || "{}");
    console.log("[Guardrail Analysis]:", parsed);

    return {
      isSafe: parsed.isSafe ?? true,
      isHealthRelated: Boolean(parsed.isHealthRelated),
      severity: parsed.severity || "NONE",
      requiresAppointment: Boolean(parsed.requiresAppointment),
      reason: parsed.reason || "",
    };
  } catch (error) {
    console.error("Guardrail model classification error:", error.message);
    return {
      isSafe: true,
      isHealthRelated: false,
      severity: "NONE",
      requiresAppointment: false,
      reason: "Classification failed or timed out",
    };
  }
}

export async function runInputGuardrails(userMessage) {
  const immediateCheck = checkImmediateTriage(userMessage);
  if (!immediateCheck.safe) return immediateCheck;

  const analysis = await classifyDomainAndSeverity(userMessage);

  if (!analysis.isSafe) {
    return {
      safe: false,
      reason: "Query flagged as unsafe.",
      fallbackMessage:
        "I cannot assist with this request as it contains prohibited or unsafe content.",
    };
  }

  if (!analysis.isHealthRelated) {
    return {
      safe: false,
      reason: "Query outside healthcare domain.",
      fallbackMessage:
        "I am Medicare's healthcare assistant. I can only assist with health-related topics, symptoms, wellness, and Medicare coverage. Please ask a health-related question.",
    };
  }

  return {
    safe: true,
    metadata: {
      severity: analysis.severity,
      requiresAppointment: analysis.requiresAppointment,
      reason: analysis.reason,
    },
  };
}

export function runOutputGuardrails(modelResponse, guardrailMetadata = {}) {
  let finalResponse = modelResponse;

  if (
    guardrailMetadata.severity === "SERIOUS" ||
    guardrailMetadata.requiresAppointment
  ) {
    finalResponse += `\n\nImportant: Because your symptoms may require an in-person clinical checkup, please book an appointment with a doctor through the Medicare app.`;
  }

  if (!finalResponse.includes("Disclaimer")) {
    finalResponse += MEDICAL_DISCLAIMER;
  }

  return finalResponse;
}