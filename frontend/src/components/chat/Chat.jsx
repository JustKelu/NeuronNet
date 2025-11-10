import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChatMutation } from '../../hooks/useChatMutation';
import { ChatMessage } from './ChatMessage';

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [model, setModel] = useState('groq');
    const [response, setResponse] = useState('');

    const models = {
        'llama': '/Llama-Logo.png',
        'gpt': '/ChatGPT-Logo.png',
        'groq': '/Groq-Logo.png'
    };

    const { register, handleSubmit, reset } = useForm();
    const { mutation, isWaitingFirstChunk } = useChatMutation(setResponse, model);

    const onSubmit = (d) => {
        mutation.mutate(d.prompt);
        reset();
    };

    return (
        <div className="flex flex-col items-center h-screen bg-neutral-800 p-4 gap-6">
            <div className="relative flex-1 w-full max-w-3xl p-6 text-gray-100 rounded-lg overflow-y-auto">
                {isWaitingFirstChunk ? (
                    <div className="text-base leading-loose">I'm thinking...</div>
                ) : response === '' ? (
                    <div className='absolute inset-0 flex justify-center items-center'>
                        <span className="text-xl text-gray-400 italic">Start a new conversation.</span>
                    </div>
                ) : (
                    <ChatMessage text={response} />
                )}
            </div>

            <form className="relative w-full max-w-3xl px-4" onSubmit={handleSubmit(onSubmit)}>
                <textarea 
                    {...register('prompt')}
                    rows={4} 
                    placeholder="Message" 
                    className='w-full px-4 py-3 pr-31 rounded-lg border border-gray-600 bg-neutral-700 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 shadow-sm transition duration-200 resize-none'
                />
                <button 
                    type='submit'
                    className="absolute right-6 top-7/10 w-25 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition duration-200 font-bold"
                >
                    ↵ 
                </button>
                <div className="absolute right-6 top-3/10 -translate-y-1/2">
                    <button 
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-gray-900 text-white px-3 py-2 w-25 rounded-md hover:bg-gray-800 transition duration-200 font-bold flex items-center gap-2"
                    >
                        <img src={models[model]} className="w-5 h-5" />
                        {model}
                    </button>
                    
                    {isOpen && (
                        <div className="absolute bottom-full right-0 mb-1 w-32 bg-white rounded-md shadow-lg z-50">
                            <div 
                                onClick={() => { setModel('groq'); setIsOpen(false); }}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-t-md"
                            >
                                <img src="/Groq-Logo.png" className="w-5 h-5 object-contain flex-shrink-0" />
                                <span className="text-gray-800 text-sm">Groq</span>
                            </div>
                            <div 
                                onClick={() => { setModel('llama'); setIsOpen(false); }}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-t-md"
                            >
                                <img src="/Llama-Logo.png" className="w-5 h-5 object-contain flex-shrink-0" />
                                <span className="text-gray-800 text-sm">Llama</span>
                            </div>
                            <div 
                                onClick={() => { setModel('gpt'); setIsOpen(false); }}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-b-md"
                            >
                                <img src="/ChatGPT-Logo.png" className="w-5 h-5 object-contain flex-shrink-0" />
                                <span className="text-gray-800 text-sm">GPT</span>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}