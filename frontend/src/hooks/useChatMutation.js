import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useChatMutation = (setResponse, model) => {
    const [isWaitingFirstChunk, setIsWaitingFirstChunk] = useState(false);
    const [abortController, setAbortController] = useState(null);

    const mutation = useMutation({
        mutationFn: async (prompt) => {
            try {
                setIsWaitingFirstChunk(true);
                
                const controller = new AbortController();
                setAbortController(controller);

                const stream = await fetch(`${API_URL}/api/ai/chat/${model}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt }),
                    signal: controller.signal 
                });

                const reader = stream.body.getReader();
                const decoder = new TextDecoder();

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });
                        const lines = chunk.split('\n').filter(line => line.trim());

                        for (const line of lines) {
                            if (line.startsWith('data: ')) {
                                const data = line.slice(6);
                                if (data === '[DONE]') continue;

                                try {
                                    const json = JSON.parse(data);
                                    if (json.content) {
                                        setIsWaitingFirstChunk(false);
                                        setResponse(r => r + json.content);
                                    }
                                } catch {
                                    console.log('Parsing error');
                                }
                            }
                        }
                    }
                } finally {
                    reader.cancel(); 
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Stream aborted by user');
                } else {
                    console.log('Fetch error', error);
                }
            }
        },
        onMutate: () => setResponse(''),
    });

    const stopStream = () => {
        if (abortController) {
            abortController.abort();
        }
    };

    return { mutation, isWaitingFirstChunk, stopStream };
};