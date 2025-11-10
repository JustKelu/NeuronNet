import { useForm } from "react-hook-form";

export const ChatInput = ({ onSubmit }) => {
    const { register, handleSubmit, reset } = useForm();

    const handleFormSubmit = (data) => {
        onSubmit(data.prompt);
        reset();
    };

    return (
        <form className="relative w-full max-w-3xl px-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <textarea 
                {...register('prompt')}
                rows={4} 
                placeholder="Scrivi il tuo messaggio..." 
                className='w-full px-4 py-3 pr-14 rounded-lg border border-gray-600 bg-neutral-700 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 shadow-sm transition duration-200 resize-none'
            />
            <button 
                type='submit'
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-bold"
            >
                ↑
            </button>
        </form>
    );
};
