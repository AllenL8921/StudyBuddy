import Sidebar from "../components/Sidebar";
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUser } from '@clerk/clerk-react';

// Initialize the socket connection
const socket = io("http://localhost:8080");

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false); // Track sending state
    const roomId = 123;

    useEffect(() => {
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
                return prevMessages; // Return existing messages if the new one is a duplicate
            });
        });

        // Clean up the socket listener when the component unmounts
        return () => {
            socket.off('chatMessage'); // Remove the listener on cleanup
        };
    }, [roomId]);

    const { isSignedIn, user } = useUser();

    const sendMessage = async (e) => {
        e.preventDefault();  // Prevent default form submission

        // Prevent double sending if the message is already being sent or the input is empty
        if (isSending || !message.trim()) return;  // Only proceed if message is not empty and not already sending

        setIsSending(true); // Set sending state to true to block multiple submissions

        const msgData = { roomId: roomId, senderId: user.id, text: message.trim() };
        console.log("Sending message:", msgData);

        // Emit the message through Socket.IO with a callback for acknowledgment
        socket.emit('chatMessage', msgData, (response) => {
            // Reset sending state after callback
            setIsSending(false);

            if (response.status === 'success') {
                console.log("Message sent successfully:", response.message);

                // Prevent adding the same message twice
                setMessages((prevMessages) => {
                    if (!prevMessages.some((msg) => msg.messageId === response.message.messageId)) {
                        return [...prevMessages, response.message];
                    }
                    return prevMessages;  // Return existing messages if duplicate
                });
            } else {
                console.error('Error sending message:', response.message);
                // Optionally show an error message to the user
            }

            // Clear the message input after sending
            setMessage('');
        });
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-1/4 h-full flex-col bg-gray-200 overflow-y-scroll">
                <Sidebar />
            </div>

            <div className="flex-grow mt-20 ml-1/4 flex flex-col h-full bg-white shadow-lg p-4 rounded-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Chat</h1>
                <div className="flex-grow border-t border-gray-300 p-4 overflow-y-scroll">
                    {messages.map((msg, index) => (
                        <p key={index} className="mb-2">
                            <strong className="text-indigo-600">{msg.senderId}:</strong> {msg.text}
                        </p>
                    ))}
                </div>
                <form onSubmit={sendMessage} className="flex">
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
                        disabled={isSending} // Disable button while sending
                    >
                        {isSending ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
