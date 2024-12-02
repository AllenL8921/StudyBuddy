import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

//Import Components
import Sidebar from "../components/GeneralComponents/Sidebar";
import Chat from "../components/Chat";
import ChatSideBar from "../components/SidebarComponents/ChatSideBar";

const ChatList = () => {
    const { user } = useUser();

    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState(null);
    const [studyChatRooms, setStudyChatRooms] = useState([])
    const [eventChatRooms, setEventChatrooms] = useState([])
    const [filter, setFilter] = useState("study");

    useEffect(() => {

        const fetchChatRooms = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/chatRooms/${user.id}`);
                const data = await response.json();
                if (data) {
                    setStudyChatRooms(data[0]);
                    setEventChatrooms(data[1])
                    console.log('studyChatRooms', studyChatRooms)
                    console.log('eventChatRooms', eventChatRooms)
                }

                //Debug
                console.log('fetchChatRooms ', data);
            } catch (error) {
                console.error("Error fetching chat rooms:", error);
            }
        };

        fetchChatRooms();
    }, [user]);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 ml-60 bg-gray-200 overflow-y-auto">
                <Sidebar />
                <div className="p-4 mt-12">
                    <h2 className="text-lg font-semibold mb-4">Chat Rooms</h2>

                    {/* Select Buttons */}
                    <div className="mb-4 flex justify-around">
                        <button
                            className={`px-4 py-2 rounded ${filter === "study" ? "bg-indigo-500 text-white" : "bg-gray-300"}`}
                            onClick={() => setFilter("study")}
                        >
                            Study Sessions
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${filter === "event" ? "bg-indigo-500 text-white" : "bg-gray-300"}`}
                            onClick={() => setFilter("event")}
                        >
                            Events
                        </button>
                    </div>

                    <ChatSideBar chatRooms={filter === "study" ? studyChatRooms : eventChatRooms} setRoomId={setRoomId} setMessages={setMessages} roomId={roomId} />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow">
                {roomId ? (
                    <Chat roomId={roomId} messages={messages} setMessages={setMessages} />
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
