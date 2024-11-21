import Sidebar from "./Sidebar";
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUser } from '@clerk/clerk-react';

// Initialize the socket connection
const socket = io("http://localhost:8080");

const Chat = () => {
    //UserData
    const { isSignedIn, user } = useUser();
    const [displayName, setDisplayName] = useState('');

    //Chat messages
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false); // Track sending state
    const roomId = 123;

    useEffect(() => {

        // Fetch userinfo for displayname from DB
        const fetchUserDisplayName = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${user.id}`);

                // Check if the response is ok (status 200)
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Fetched user data from the server:', data);

                // Ensure data has displayName property before setting it
                if (data && data.user.displayName) {
                    setDisplayName(data.user.displayName);
                } else {
                    console.warn('No display name found in the response');
                }

            } catch (error) {
                console.error('Error fetching user display name:', error);
            }
        };

        fetchUserDisplayName();

        // Fetch initial messages when the component mounts
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/message/getMessage/${roomId}`);
                const data = await response.json();
                console.log('Fetched messages from the server:', data);
                if (data && data.length) {
                    setMessages(data);
                } else {
                    console.log('No messages found');
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        // Set up socket listener to receive new messages
        socket.on('chatMessage', (data) => {
            console.log("Received new message from server:", data);

            // Prevent duplicate messages (based on messageId or other unique identifier)
            setMessages((prevMessages) => {
                // Check if the message already exists in state
                if (!prevMessages.some((msg) => msg.messageId === data.messageId)) {
                    return [...prevMessages, data]; // Add new message if it doesn't already exist
                }
                return prevMessages;
            });
        });

        return () => {
            socket.off('chatMessage');
        };
    }, [roomId]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (isSending || !message.trim()) return;

        setIsSending(true);

        const msgData = { roomId: roomId, senderId: user.id, text: message.trim() };
        console.log("Sending message:", msgData);

        socket.emit('chatMessage', msgData, (response) => {

            setIsSending(false);

            if (response.status === 'success') {
                console.log("Message sent successfully:", response.message);

                // Prevent sending same message twice
                // could be caused by react rerendering
                // current fix is having messaged be saved in an array

                setMessages((prevMessages) => {
                    if (!prevMessages.some((msg) => msg.messageId === response.message.messageId)) {
                        return [...prevMessages, response.message];
                    }
                    return prevMessages;
                });
            } else {
                console.error('Error sending message:', response.message);
            }

            setMessage('');
        });
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-200 overflow-y-auto">
                <Sidebar />
            </div>

            {/* Main Content (Chat area + Right Column) */}
            <div className="flex-grow flex">
                {/* Chat Area (2/3 of screen width) */}
                <div className="w-2/3 bg-white p-4 shadow-lg flex flex-col">
                    <h1 className="text-2xl font-bold mb-4 text-center">Chat</h1>

                    {/* Messages Display Area */}
                    <div className="flex-grow border-t border-gray-300 p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <p key={index} className="mb-2">
                                <strong className="text-indigo-600">{displayName}:</strong> {msg.text}
                            </p>
                        ))}
                    </div>

                    {/* Message Input */}
                    <form onSubmit={sendMessage} className="flex mt-4">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600"
                            disabled={isSending}
                        >
                            {isSending ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>

                {/* Right Column (1/3 of screen width) */}
                <div className="w-1/3 bg-gray-100 p-4">
                    <h2 className="text-xl font-semibold mb-4">User Info / Settings</h2>
                    {/* Add any content or widgets here for the right column */}
                    <div className="mb-4">
                        <p className="text-sm">Username: {user ? displayName : "Guest"}</p>
                        {/* You can add more information about the user or settings here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
