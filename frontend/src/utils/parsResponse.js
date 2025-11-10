export const parseResponse = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            const textContent = text.slice(lastIndex, match.index).trim();
            if (textContent) parts.push({ type: 'text', content: textContent });
        }

        parts.push({
            type: 'code',
            language: match[1] || 'text',
            content: match[2] || ''
        });

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        const textContent = text.slice(lastIndex).trim();
        if (textContent) parts.push({ type: 'text', content: textContent });
    }

    return parts;
};
