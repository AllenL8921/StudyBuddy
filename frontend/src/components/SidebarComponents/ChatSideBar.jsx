import { useState } from 'react';

export default function ChatSideBar({chatRooms, setRoomId, setMessages, roomId}) {
    // const [isOpen, setIsOpen] = useState(false);

    // // Toggle the state when the button is clicked
    // const handleClick = () => {
    //     setIsOpen(!isOpen);
    // };

    // return (
    //     <div>
    //         {!isOpen ? (
    //             <button onClick={handleClick}>Chat</button> //The chat bar is not open
    //         ) : (
    //             <div>
    //                 <h2>Chat Sidebar</h2>
    //                 <button onClick={handleClick}>Close</button>
    //             </div>
    //         )}
    //     </div>
    // );
    return (
        <ul>
            {chatRooms.map((room) => (
                <li
                    key={room.chatRoomId}
                    className={`p-2 cursor-pointer ${roomId === room.chatRoomId ? "bg-gray-300" : "hover:bg-gray-100"}`}
                    onClick={() => { setRoomId(room.chatRoomId), setMessages([]) }}
                >
                    {room.title}
                </li>
            ))}
        </ul>
    )
}
