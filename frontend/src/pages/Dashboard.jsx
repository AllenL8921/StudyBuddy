import { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';
import EventCreate from '../components/EventCreate';

const Dashboard = () => {
    const { isSignedIn, user } = useUser();
    const [userInfo, setUserInfo] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');
    const formRef = useRef(null);
    const inputRef = useRef(null);  // Ref to focus input when form is opened
    const debouncedDisplayName = useRef(''); // Store the input value to debounce

    useEffect(() => {
        if (isSignedIn && user) {
            setUserInfo(user);
        }
    }, [isSignedIn, user]);

    // Handle update of display name
    const handleDisplayNameChange = async (e) => {
        e.preventDefault();
        if (!newDisplayName) return; // Don't submit if display name is empty

        try {
            // Make a POST request to the backend API
            const response = await fetch(`http://localhost:8080/api/users/${user.id}/displayName`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ displayName: newDisplayName }),
            });

            if (!response.ok) {
                throw new Error('Failed to update display name');
            }

            const data = await response.json();

            // Update the user info with the new display name
            setUserInfo({
                ...userInfo,
                displayName: data.user.displayName,
            });

            setNewDisplayName(''); // Clear the input field
            setIsFormOpen(false); // Close the form

        } catch (error) {
            console.error('Error updating display name:', error);
        }
    };

    // If user is not signed in, show login message
    if (!isSignedIn) {
        return <div>You are not logged in.</div>;
    }

    const UserProfile = ({ userInfo }) => (
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-md">
            <div className="flex gap-6 items-center">
                <img
                    src={userInfo?.imageUrl}
                    alt="User Avatar"
                    className="rounded-full w-24 h-24 object-cover"
                />
                <div className="flex flex-col py-3">
                    <h3 className="text-xl font-bold">{userInfo?.username}</h3>
                    <p className="text-gray-500">Buddy ID: {userInfo?.id}</p>
                    {/* Button to change displayName */}
                    <button
                        onClick={() => {
                            setIsFormOpen(true);
                            setNewDisplayName(userInfo?.displayName || ''); // Initialize input with current displayName
                            debouncedDisplayName.current = userInfo?.displayName || ''; // Store current display name in ref
                        }}
                        className="mt-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Change Display Name
                    </button>
                </div>
            </div>

            {/* Conditionally render the form to change the display name */}
            {isFormOpen && (
                <form
                    ref={formRef}
                    onSubmit={handleDisplayNameChange}
                    className="mt-4 w-full max-w-sm space-y-4"
                >
                    <input
                        ref={inputRef}  // Focus the input automatically when the form is opened
                        type="text"
                        value={newDisplayName}
                        onChange={(e) => {
                            setNewDisplayName(e.target.value); // Update the display name state on input change
                            debouncedDisplayName.current = e.target.value; // Store input value in ref for debouncing
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Enter new display name"
                        required
                    />
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsFormOpen(false)}
                            className="w-1/2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );

    // Focus the input when the form is opened
    useEffect(() => {
        if (isFormOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFormOpen]);

    return (
        <>
            <Sidebar />
            <div className="ml-60 p-20 flex justify-center">
                <div className="max-w-3xl w-full">
                    <h1 className="text-3xl text-gray-700 font-bold mb-6">Welcome Back, {userInfo?.username}</h1>
                    {!userInfo ? (
                        <div className="flex justify-center items-center py-4">
                            <span className="loader"></span>
                            <p className="ml-2 text-gray-500">Loading your profile...</p>
                        </div>
                    ) : (
                        <UserProfile userInfo={userInfo} />
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
