import React, { useEffect, useState } from 'react'

export default function FriendSideBar({friendList, userId, setuserId}) {

    return (
        
            <ul>
                {friendList.map((friend) => (
                    <li
                        key={friend.clerkUserId}
                        className={`flex items-center rounded-xl p-2 cursor-pointer ${userId === friend.clerkUserId ? "bg-gray-300" : "hover:bg-gray-100"}`}
                        onClick={() => setuserId(friend.clerkUserId)}
                    >
                        <img src={friend.imageUrl} alt="User Avatar" className="rounded-full w-10 h-10 object-cover"></img>
                        <span className="ml-3 ">{friend.username}</span>
                    </li>
                ))}
            </ul>

        
    )
}
