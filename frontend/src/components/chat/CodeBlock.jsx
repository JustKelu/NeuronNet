import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CodeBlock = ({ language, content }) => {
    const copyToClipboard = async (text) => {
        try {
            const cleanText = text || '';
            await navigator.clipboard.writeText(cleanText);
        } catch (err) {
            console.error('Errore nella copia:', err);
        }
    };

    return (
        <div className="relative group mb-6">
            <button
                onClick={() => copyToClipboard(content)}
                className="absolute top-3 right-3 px-3 py-1 text-sm bg-neutral-700 hover:bg-neutral-600 text-gray-200 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
                Copia
            </button>

            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    borderRadius: '0.5rem',
                    padding: '2rem',
                    margin: '0 !important',
                }}
                codeTagProps={{ style: { fontSize: '16px', lineHeight: '1.5' } }}
            >
                {content}
            </SyntaxHighlighter>
        </div>
    );
};