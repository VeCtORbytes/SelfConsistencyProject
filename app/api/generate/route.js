import { callOpenAI, callGemini, callClaude } from "../../../lib/providers.js";

export async function POST(req) {
  const { prompt, history = [] } = await req.json();

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return Response.json({ error: "Prompt is required." }, { status: 400 });
  }

  const settled = await Promise.allSettled([
    callOpenAI(prompt, history),
    callGemini(prompt, history),
    callClaude(prompt, { history }),
  ]);

  const results = settled.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : { model: null, error: r.reason?.message || "Unknown error" },
  );

  // Label failures with a fallback name matching their position, so the UI
  // can still show which provider failed even though the call threw before
  // returning a model label.
  const labels = [
    "OpenAI (gpt-4o-mini)",
    "Gemini (3.5-flash)",
    "Claude (4.5 Haiku)",
  ];
  const modelAnswers = results.map((r, i) => ({
    model: r.model || labels[i],
    answer: r.answer || null,
    error: r.error || null,
  }));

  const succeeded = modelAnswers.filter((r) => r.answer);

  if (succeeded.length === 0) {
    return Response.json(
      {
        modelAnswers,
        error: "All model calls failed. Check API keys and try again.",
      },
      { status: 502 },
    );
  }

  const evaluatorPrompt = buildEvaluatorPrompt(prompt, succeeded, history);

  try {
    const { answer: finalAnswer } = await callClaude(evaluatorPrompt, {
      system:
        "You are the Self-Consistency Evaluator & Synthesizer, an impartial, analytical AI engine designed to compare responses from multiple independent language models and synthesize them into a single, high-fidelity, and authoritative final answer.\n\n" +
        "Compare candidate responses from OpenAI (gpt-4o-mini), Gemini (3.5-flash), and Claude (4.5 Haiku). Identify consensus and discrepancies, extract the strongest elements, and write a unified converged answer. Do not mention model names or synthesis processes within the answer text itself.\n\n" +
        "Write a concise, high-density, and complete final answer. Keep explanations direct, clear, and factual without redundant details, verbose intros, or repetitive summaries. This ensures the output is high-quality, comprehensive, and fits fully within token boundaries without being truncated.\n\n" +
        "Strictly append a horizontal rule (---) followed by a section titled '### Model Evaluation & Synthesis' breaking down the most accurate model, percentage weightages, and reasoning justification.",
      maxTokens: 4096,
    });
    return Response.json({ modelAnswers, finalAnswer });
  } catch (e) {
    const fallbackAnswer = succeeded[0].answer;
    const finalAnswer = 
      fallbackAnswer + 
      "\n\n---\n### Model Evaluation & Synthesis\n" +
      "- **Most Accurate Model:** " + succeeded[0].model + " (Evaluator Fallback)\n" +
      "- **Weightage/Influence:**\n" +
      "  - OpenAI (gpt-4o-mini): " + (succeeded[0].model.includes("OpenAI") ? "100%" : "0%") + "\n" +
      "  - Gemini (3.5-flash): " + (succeeded[0].model.includes("Gemini") ? "100%" : "0%") + "\n" +
      "  - Claude (4.5 Haiku): " + (succeeded[0].model.includes("Claude") ? "100%" : "0%") + "\n" +
      "- **Evaluation Reasoning:** The Self-Consistency Evaluator encountered an unexpected error (`" + e.message + "`). The system activated a token-free defensive fallback, routing the " + succeeded[0].model + " answer directly to prevent request failure.";

    return Response.json({ modelAnswers, finalAnswer, fallbackUsed: true });
  }
}

function buildEvaluatorPrompt(originalPrompt, answers, history = []) {
  let contextStr = "";
  if (history.length > 0) {
    contextStr =
      "Conversation history context:\n" +
      history
        .map((h) => `User: "${h.question}"\nAssistant: "${h.answer}"`)
        .join("\n\n") +
      "\n\n";
  }

  const blocks = answers
    .map((a, i) => `--- Response ${i + 1} (${a.model}) ---\n${a.answer}`)
    .join("\n\n");

  return `${contextStr}Current question:
"${originalPrompt}"

Below are independent answers from ${answers.length} different AI models to the current question.

${blocks}

Task:
1. Identify where the answers agree — that agreement is a signal of reliability.
2. Identify where they disagree, and reason about which position is best supported.
3. Identify the strongest, most accurate, most complete parts of each response.
4. Write ONE final answer that synthesizes the best of all responses. Keep the output concise, highly detailed, and complete. Avoid long-winded, verbose filler text; maintain a high density of information so the answer compiles fully and is not cut off. Do not mention "Response 1/2/3" or the synthesis process in your final answer — just give the best possible direct answer to the original question.
5. After the final answer, add a horizontal rule (---) followed by a section titled "### Model Evaluation & Synthesis". In this section:
   - Identify the "Most Accurate Model" for this turn.
   - Distribute weightage/influence as percentages for each model: OpenAI (gpt-4o-mini), Gemini (3.5-flash), and Claude (4.5 Haiku) summing to 100%.
   - Explain the justification/reasoning for the weightage (why certain models were more accurate, comprehensive, or if any had errors).

Strictly format this section exactly as:
---
### Model Evaluation & Synthesis
- **Most Accurate Model:** [Model Name]
- **Weightage/Influence:**
  - OpenAI (gpt-4o-mini): [X]%
  - Gemini (3.5-flash): [Y]%
  - Claude (4.5 Haiku): [Z]%
- **Evaluation Reasoning:** [Provide your justification and comparison details here]`;
}
