import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
import { ExpandingTextArea } from './ExpandingTextArea';
import Recorder from './Recorder';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const messagesEndRef = useRef(null);
    const fileRef = useRef(null);
    const submitButtonRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Transcription function
    const uploadAudio = async (blob) => {
        const file = new File([blob], "audio.webm", { type: 'audio/webm' });

        if (fileRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileRef.current.files = dataTransfer.files;

            if (submitButtonRef.current) {
                submitButtonRef.current.click();
            }
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');
        setIsLoading(true); // Set loading state to true after adding user's message

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: 'user', content: input },
            ],
        });

        const botMessage = { role: 'bot', content: response.choices[0].message.content };

        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setIsLoading(false); // Set loading state to false after 1 second
        }, 1000);
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90vh', width: '90%', margin: 'auto', backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '20px', boxSizing: 'border-box' }}>
            <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '10px',
                        backgroundColor: msg.role === 'user' ? '#0078d4' : '#e0e0e0',
                        color: msg.role === 'user' ? 'white' : 'black',
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                        {msg.content}
                    </div>
                ))}
                {isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '10px' }}>
                        <video src="/img/loading.webm" autoPlay loop muted style={{ width: '50px', height: '50px' }} />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', padding: '10px', boxSizing: 'border-box' }}>
                <Recorder uploadAudio={uploadAudio} />
                    <ExpandingTextArea
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        input={input}
                        handleInputChange={handleInputChange}
                        onEnterPress={handleEnter}
                    />
                    <button ref={submitButtonRef} type="submit" style={{ padding: '10px 20px', border: 'none', borderRadius: '10px', backgroundColor: '#0078d4', color: 'white', cursor: 'pointer', marginLeft: '10px' }}>
                        Send
                    </button>
                </form>
                <input type="file" ref={fileRef} style={{ display: 'none' }} />
            </div>
        </div>
    );
};

export default Chat;
