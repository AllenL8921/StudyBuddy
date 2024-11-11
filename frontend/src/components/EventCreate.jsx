import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const CreateEvent = () => {
    const { user } = useUser();

    //Get all the necessary data to create an event from the form
    /*      
        organizerId : the current userId
        chatRoomId : the id for the chatroom, can be NULL
        title : the name for the event, 
        date : the date of the event, can be NULL
        description : the description for the event can be NULL
    */
    const [eventData, setEventData] = useState({
        title: '',
        date: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...eventData,
                    userId: user.id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            alert('Event created successfully!');
            setEventData({ title: '', date: '', description: '' });
            setIsFormVisible(false); // Hide form after successful creation
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-4">Create Event</h1>
                {error && <p className="text-red-500" aria-live="assertive">{error}</p>}

                {!isFormVisible ? (
                    <button
                        onClick={() => setIsFormVisible(true)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-200"
                    >
                        Create an Event
                    </button>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto z-50 relative"> {/* Added z-50 */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Event Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={eventData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Event Date</label>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    value={eventData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={eventData.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    rows="4"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-4 py-2 text-white rounded transition duration-200 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'}`}
                            >
                                {loading ? 'Creating...' : 'Create Event'}
                            </button>
                            <Link to="/EventList" className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-black transition duration-200">
                                Go Back
                            </Link>
                        </form>
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default CreateEvent;
