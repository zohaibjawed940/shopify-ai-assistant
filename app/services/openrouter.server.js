export async function callOpenRouter(messages, tools) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-small-3.2-24b-instruct:free', // or any other model
        messages,
        tools,
        tool_choice: 'auto',
      }),
    });
  
    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  }
  