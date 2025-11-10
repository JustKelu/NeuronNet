import { parseResponse } from '../../utils/parsResponse';
import { CodeBlock } from './CodeBlock';
import { MarkdownRenderer } from '../markdown/MarkdownRenderer';

export const ChatMessage = ({ text }) => {
    const parts = parseResponse(text);

    return (
        <div className="text-base leading-loose">
            {parts.map((part, index) => {
                if (part.type === 'code') {
                    return <CodeBlock key={index} language={part.language} content={part.content} />;
                }

                return (
                    <div key={index} className="whitespace-pre-wrap mb-4">
                        <MarkdownRenderer text={part.content} />
                    </div>
                );
            })}
        </div>
    );
};
