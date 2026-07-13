// Each function returns { model, answer } or throws with a readable message.
// Kept as plain fetch calls (no SDKs) to minimize dependencies.

const TIMEOUT_MS = 60_000;

/**
 * Creates an abort controller to reject operations that exceed network timeouts.
 * @param {number} ms - Timeout threshold in milliseconds.
 * @returns {{signal: AbortSignal, clear: Function}}
 */
function withTimeout(ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, clear: () => clearTimeout(timer) };
}

/**
 * Queries OpenAI's gpt-4o-mini model in parallel.
 * @param {string} prompt - Current prompt question.
 * @param {Array} history - Chat memory context.
 * @returns {Promise<{model: string, answer: string}>}
 */
export async function callOpenAI(prompt, history = []) {
  const { signal, clear } = withTimeout(TIMEOUT_MS);
  try {
    const messages = [];
    for (const turn of history) {
      messages.push({ role: "user", content: turn.question });
      messages.push({ role: "assistant", content: turn.answer });
    }
    messages.push({ role: "user", content: prompt });

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
      }),
      signal,
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`OpenAI ${res.status}: ${err.slice(0, 200)}`);
    }
    const data = await res.json();
    return { model: "OpenAI (gpt-4o-mini)", answer: data.choices[0].message.content.trim() };
  } finally {
    clear();
  }
}

/**
 * Queries Google's gemini-3.5-flash model in parallel.
 * @param {string} prompt - Current prompt question.
 * @param {Array} history - Chat memory context.
 * @returns {Promise<{model: string, answer: string}>}
 */
export async function callGemini(prompt, history = []) {
  const { signal, clear } = withTimeout(TIMEOUT_MS);
  try {
    const contents = [];
    for (const turn of history) {
      contents.push({ role: "user", parts: [{ text: turn.question }] });
      contents.push({ role: "model", parts: [{ text: turn.answer }] });
    }
    contents.push({ role: "user", parts: [{ text: prompt }] });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
      signal,
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini ${res.status}: ${err.slice(0, 200)}`);
    }
    const data = await res.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!answer) throw new Error("Gemini returned no content (possibly blocked by safety filters)");
    return { model: "Gemini (3.5-flash)", answer };
  } finally {
    clear();
  }
}

/**
 * Queries Anthropic's Claude models (default: claude-4.5-haiku) in parallel.
 * @param {string} prompt - Current prompt question.
 * @param {Object} options - API configurations (system instructions, custom model, token limits, history).
 * @returns {Promise<{model: string, answer: string}>}
 */
export async function callClaude(prompt, { system, model = "claude-haiku-4-5-20251001", maxTokens = 4096, history = [] } = {}) {
  const { signal, clear } = withTimeout(TIMEOUT_MS);
  try {
    const messages = [];
    for (const turn of history) {
      messages.push({ role: "user", content: turn.question });
      messages.push({ role: "assistant", content: turn.answer });
    }
    messages.push({ role: "user", content: prompt });

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        ...(system ? { system } : {}),
        messages,
      }),
      signal,
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Claude ${res.status}: ${err.slice(0, 200)}`);
    }
    const data = await res.json();
    const textBlock = Array.isArray(data.content) ? data.content.find((block) => block.type === "text") : null;
    const answer = textBlock?.text?.trim();
    if (!answer) throw new Error("Claude returned no content");
    const modelLabel = model.includes("haiku") ? "Claude (4.5 Haiku)" : "Claude (5 Sonnet)";
    return { model: modelLabel, answer };
  } finally {
    clear();
  }
}
