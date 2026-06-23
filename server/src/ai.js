function fallbackSuggestion(context = {}) {
  const moduleName = context.module || "comparison";
  const query = context.query || context.pickup || "your search";

  if (moduleName === "ride") {
    return `AI tip: compare Bike and Auto first for ${query}. Pick the cheapest option only if pickup time is also acceptable.`;
  }

  if (moduleName === "ecommerce") {
    return `AI tip: for ${query}, check the cheapest result and the best-quality result. Prefer higher rating when the price difference is small.`;
  }

  return "AI tip: compare price, rating, delivery/pickup time, and reliability before choosing.";
}

async function callOllama({ localUrl, model, prompt }) {
  const baseUrl = (localUrl || "http://localhost:11434").replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model || "llama3.2",
      prompt,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error("Local AI request failed.");
  }

  const data = await response.json();
  return data.response || fallbackSuggestion();
}

async function callByok({ apiKey, model, prompt }) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a concise comparison assistant for rides and shopping."
        },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error("BYOK AI request failed.");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || fallbackSuggestion();
}

export async function recommendWithAi(req, res) {
  const { provider = "fallback", localUrl, model, apiKey, context = {} } = req.body;
  const prompt = `Give one short practical recommendation for this comparison data: ${JSON.stringify(context)}`;

  try {
    if (provider === "local") {
      const suggestion = await callOllama({ localUrl, model, prompt });
      return res.json({ provider: "local", suggestion });
    }

    if (provider === "byok" && apiKey) {
      const suggestion = await callByok({ apiKey, model, prompt });
      return res.json({ provider: "byok", suggestion });
    }
  } catch (error) {
    return res.json({
      provider: "fallback",
      suggestion: fallbackSuggestion(context),
      notice: error.message
    });
  }

  return res.json({
    provider: "fallback",
    suggestion: fallbackSuggestion(context)
  });
}
