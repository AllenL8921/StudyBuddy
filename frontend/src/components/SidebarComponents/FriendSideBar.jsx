import React, { useEffect, useState } from 'react'

export default function FriendSideBar({ friendList, selectedFriend, setSelectedFriend }) {
    

    return (
        <div>
            <ul>
                {friendList.map((friend) => (
                    <li
                        key={friend.clerkUserId}
                        className={`flex items-center rounded-xl p-2 cursor-pointer ${selectedFriend?.clerkUserId === friend.clerkUserId ? "bg-gray-300" : "hover:bg-gray-100"}`}
                        onClick={() => {
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
        
        </div>

        
    )
}
