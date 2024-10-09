import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [chatState, setChatState] = useState({});

    return (
        <ChatContext.Provider value={{ chatState, setChatState }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;
