const models = {
    'groq': 'groq/compound',
    'llama': 'llama-3.1-8b-instant',
    'gpt': 'openai/gpt-oss-120b',
}

export const streamChatResponse = async (modelKey, prompt, onChunk) => {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: models[modelKey],
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = ''; 

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        buffer = lines.pop() || '';

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data: ')) {
                const jsonString = trimmedLine.slice(6);
                if (jsonString === '[DONE]') continue;

                try {
                    const json = JSON.parse(jsonString);
                    const content = json?.choices?.[0]?.delta?.content;
                    if (content) onChunk(content);
                } catch (err) {
                    console.error("Errore parsing chunk:", err.message);
                    console.error("JSON string:", jsonString);
                }
            }
        }
    }
};