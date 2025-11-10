import { processInlineMarkdown } from './processInlineMarkdown';

export const MarkdownRenderer = ({ text }) => {
    if (typeof text !== 'string') return null;

    const lines = text.split('\n');

    return lines.map((line, i) => {
        if (line.startsWith('### ')) return <h3 key={i} className="text-2xl font-bold mt-4 mb-2">{processInlineMarkdown(line.slice(4))}</h3>;
        if (line.startsWith('## ')) return <h2 key={i} className="text-3xl font-bold mt-4 mb-2">{processInlineMarkdown(line.slice(3))}</h2>;
        if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-bold mt-4 mb-2">{processInlineMarkdown(line.slice(2))}</h1>;
        return <span key={i}>{processInlineMarkdown(line)}{'\n'}</span>;
    });
};
