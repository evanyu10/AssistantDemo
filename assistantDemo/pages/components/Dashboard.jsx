import React, { useState } from 'react';
import Chat from './Chat'
import ChatProvider from './ChatProvider';

import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faComments, faUser, faTimeline } from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
    const [state, setState] = useState(0);

    return (
        <div>
            <ChatProvider>
                <Chat />
            </ChatProvider> 
        </div>
            
    );
};

export default Dashboard;
