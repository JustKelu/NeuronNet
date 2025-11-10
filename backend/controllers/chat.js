import { streamChatResponse } from '../services/chat.js';

export const chatController = async (req, res) => {
    const modelKey = req.params.model;
    const prompt = req.body.prompt;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        await streamChatResponse(modelKey, prompt, (content) => {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
        });
    } catch (err) {
        console.error("Errore: ", err);
        res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    } finally {
        res.end();
    }
};