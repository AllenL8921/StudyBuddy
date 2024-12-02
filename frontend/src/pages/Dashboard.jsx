import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Sidebar from '../components/GeneralComponents/Sidebar';
import PropTypes from 'prop-types';

// Memoize the UserProfile component to avoid unnecessary re-renders
const UserProfile = React.memo(({
    userInfo,
    isFormOpen,
    setIsFormOpen,
    handleDisplayNameChange,
    newDisplayName,
    setNewDisplayName
}) => (
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
                {/* Button to toggle visibility of the form */}
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="mt-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    {isFormOpen ? 'Cancel' : 'Change Display Name'}
                </button>
            </div>
        </div>

        {/* Conditionally render the form to change the display name */}
        {isFormOpen && (
            <div className="flex-col mt-4 w-full max-w-sm space-y-4">
                <form onSubmit={handleDisplayNameChange}>
                    <input
                        type="text"
                        value={newDisplayName}
                        onChange={(e) => setNewDisplayName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Enter new display name"
                        required
                    />
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="w-1/2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4"
                            disabled={!newDisplayName}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )}
    </div>
));
UserProfile.displayName = 'UserProfile';
UserProfile.propTypes = {
    userInfo: PropTypes.shape({
        imageUrl: PropTypes.string,
        username: PropTypes.string,
        id: PropTypes.string,
    }).isRequired,
    isFormOpen: PropTypes.bool.isRequired,
    setIsFormOpen: PropTypes.func.isRequired,
    handleDisplayNameChange: PropTypes.func.isRequired,
    newDisplayName: PropTypes.string.isRequired,
    setNewDisplayName: PropTypes.func.isRequired,
};
const Dashboard = () => {
    //User states
    const { isSignedIn, user } = useUser();
    const [userInfo, setUserInfo] = useState(null);
    const [newDisplayName, setNewDisplayName] = useState('');

    //Form states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

            setSuccessMessage('Display name updated successfully!'); // Show success message

            setNewDisplayName('');
            setIsFormOpen(false);

            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error updating display name:', error);
            setErrorMessage('Failed to update display name. Please try again.');

            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    // If user is not signed in, show login message
    if (!isSignedIn) {
        return <div>You are not logged in.</div>;
    }

    return (
        <>
            <Sidebar />
            <div className="ml-60 p-20 flex justify-center">
                <div className="max-w-3xl w-full">
                    <h1 className="text-3xl text-gray-700 font-bold mb-6">Welcome Back, {userInfo?.username}</h1>

                    {/* Display success or error message */}
                    {successMessage && (
                        <div className="bg-green-500 text-white py-2 px-4 rounded-md text-center mb-4">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="bg-red-500 text-white py-2 px-4 rounded-md text-center mb-4">
                            {errorMessage}
                        </div>
                    )}

                    {!userInfo ? (
                        <div className="flex justify-center items-center py-4">
                            <span className="loader"></span>
                            <p className="ml-2 text-gray-500">Loading your profile...</p>
                        </div>
                    ) : (
                        <UserProfile
                            userInfo={userInfo}
                            isFormOpen={isFormOpen}
                            setIsFormOpen={setIsFormOpen}
                            handleDisplayNameChange={handleDisplayNameChange}
                            newDisplayName={newDisplayName}
                            setNewDisplayName={setNewDisplayName}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;