import React, { useEffect, useState } from 'react'
import Profile from '../GeneralComponents/Profile';

export default function FriendSideBar({ friendList, userId, setUserId }) {
    
    const [selectedFriend, setSelectedFriend] = useState()

    return (
        <div>
            <ul>
                {friendList.map((friend) => (
                    <li
                        key={friend.clerkUserId}
                        className={`flex items-center rounded-xl p-2 cursor-pointer ${userId === friend.clerkUserId ? "bg-gray-300" : "hover:bg-gray-100"}`}
                        onClick={() => {
                            setUserId(friend.clerkUserId); 
                            setSelectedFriend(friend);
                        }}
                    >
                        <img src={friend.imageUrl} alt="User Avatar" className="rounded-full w-12 h-12 object-cover mr-3"></img>
                        <div>
                            <p className="text-lg font-medium text-gray-800">{friend.displayName}</p>
                            <p className="text-sm text-gray-500">@{friend.username}</p>
                        </div>
                    </li>
                ))}
            </ul>
        
            {/* Profile Info */}
            <Profile selectedUser={selectedFriend} onClose={() => setSelectedFriend(null)}/>
        </div>

        
    )
}
