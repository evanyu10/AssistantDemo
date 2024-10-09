"use client"

import React, { useState } from 'react';
import OpenAI from 'openai';
import { ExpandingTextArea } from './ExpandingTextArea';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || "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",
        dangerouslyAllowBrowser: true,
    });

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: 'user', content: input },
            ],
        });

        const userMessage = { role: 'user', content: input };
        const botMessage = { role: 'bot', content: response.choices[0].message.content };

        setMessages([...messages, userMessage, botMessage]);
        setInput('');
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90vh', width: '90%', margin: 'auto', backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '20px', boxSizing: 'border-box' }}>
            <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '10px',
                        backgroundColor: msg.role === 'user' ? '#0078d4' : '#e0e0e0',
                        color: msg.role === 'user' ? 'white' : 'black',
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '70%',
                    }}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', padding: '10px', boxSizing: 'border-box' }}>
                <ExpandingTextArea
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    input={input}
                    handleInputChange={handleInputChange}
                    onEnterPress={handleEnter}
                />
                <button type="submit" style={{ padding: '10px 20px', border: 'none', borderRadius: '10px', backgroundColor: '#0078d4', color: 'white', cursor: 'pointer', marginLeft: '10px' }}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
