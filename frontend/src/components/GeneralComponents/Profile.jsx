export default function Profile({selectedUser, onClose}) {
    
    return (
        <>
            {selectedUser && (  
                <div className="bg-white shadow rounded-lg p-6">
                    
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Info</h2>
                        <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-800 focus:outline-none"
                                aria-label="Close profile">
                                X
                        </button>
                    </div>
                
                    {/* Info detail */}
                    <div className="flex items-center mb-6">
                        <img
                            src={selectedUser.imageUrl}
                            alt={`${selectedUser.displayName}'s Avatar`}
                            className="rounded-full w-20 h-20 object-cover mr-6"
                        />
                        <div>
                            <p className="text-xl font-medium text-gray-800">{selectedUser.displayName}</p>
                            <p className="text-md text-gray-500">@{selectedUser.username}</p>
                        </div>
                    </div>
                    <div className="text-sm text-gray-600">
                        <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                        <p><span className="font-medium">Joined:</span> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            )}
        </>
    )
}