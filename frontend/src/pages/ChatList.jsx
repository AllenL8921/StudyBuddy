import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import ChatRoom from "../components/ChatRoom";
import { useUser } from "@clerk/clerk-react";

const ChatList = () => {
    const { user } = useUser();
    const [roomId, setRoomId] = useState(null);
    const [chatRooms, setChatRooms] = useState([])

    useEffect(() => {

        const fetchChatRooms = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/chatRooms/${user.id}`);
                const data = await response.json();
                if (data) {
                    setChatRooms(data);
                }
            } catch (error) {
                console.error("Error fetching chat rooms:", error);
            }
        }

        fetchChatRooms()
    }, [user]);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 ml-60 bg-gray-200 overflow-y-auto">
                <Sidebar />
                <div className="p-4 mt-12">
                    <h2 className="text-lg font-semibold mb-4">Chat Rooms</h2>
                    <ul>
                        {chatRooms.map((room) => (
                            <li
                                key={room.roomId}
                                className={`p-2 cursor-pointer ${
                                    roomId === room.roomId ? "bg-gray-300" : "hover:bg-gray-100"
                                }`}
                                onClick={() => setRoomId(room.roomId)}
                            >
                                {room.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow">
                {roomId ? (
                    <ChatRoom roomId={roomId} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-lg text-gray-500">Select a chat room to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatList;
