import React, { useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react'; // Assuming you have a custom hook for user data

const EventForm = () => {
    const { user } = useUser();
    const [eventData, setEventData] = useState({
        title: '',
        date: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formShrink, setFormShrink] = useState(false);
    const [isIconVisible, setIsIconVisible] = useState(true); // Icon is visible initially

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

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

            setSuccess('Event created successfully!');
            setEventData({ title: '', date: '', description: '' });
            setIsFormVisible(false);
            setFormShrink(true); // Start shrinking animation
            setIsIconVisible(true); // Show the calendar icon after shrinking
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setFormShrink(true); // Trigger shrink animation
        setTimeout(() => {
            setIsFormVisible(false);
            setIsIconVisible(true); // Show the calendar icon after shrink
        }, 300); // Ensure timing matches the transition duration
    };

    const handleIconClick = () => {
        setIsFormVisible(true);
        setIsIconVisible(false); // Hide the icon when the form expands
        setFormShrink(false); // Reset the shrink animation state
    };

    return (
        <div className="relative">
            {/* Floating Calendar Icon */}
            {isIconVisible && (
                <button
                    onClick={handleIconClick}
                    className="fixed bottom-5 right-5 p-4 bg-blue-600 text-white text-2xl rounded-full shadow-lg z-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                    <FaCalendarPlus />
                </button>
            )}

            {/* Event Form */}
            {isFormVisible && (
                <div
                    className={`fixed bottom-24 right-5 w-72 p-6 bg-white rounded-lg shadow-xl z-40 transition-all transform ${formShrink ? 'scale-100 opacity-100' : 'scale-100 opacity-100'}`}
                    style={{ transition: 'transform 0.3s ease-out, opacity 0.3s ease-out' }}
                >
                    <h3 className="text-lg text-gray-700font-semibold mb-4">Create Event</h3>

                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {success && <div className="text-green-500 mb-4">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={eventData.title}
                                onChange={handleChange}
                                className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Event Date</label>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                value={eventData.date}
                                onChange={handleChange}
                                className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Event Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={eventData.description}
                                onChange={handleChange}
                                className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows="4"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 bg-blue-600 text-white p-2 rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Create Event'}
                        </button>
                    </form>

                    <button
                        onClick={handleGoBack}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default EventForm;
