import React, { useState } from 'react';

export default function ChatSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the state when the button is clicked
    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {!isOpen ? (
                <button onClick={handleClick}>Chat</button> //The chat bar is not open
            ) : (
                <div>
                    <h2>Chat Sidebar</h2>
                    <button onClick={handleClick}>Close</button>
                </div>
            )}
        </div>
    );
}
