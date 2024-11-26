import React, { useState, useEffect } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react'; // Assuming you have a custom hook for user data
import AttributesDropDown from '../AttributesDropDown';

const EventForm = ({ addEvent }) => {
    const { user } = useUser();
    const [eventData, setEventData] = useState({
        title: '',
        date: '',
        description: '',
        selectedAttribute: [], // Ensure this is always an array
    });

    const [loading, setLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formShrink, setFormShrink] = useState(false);
    const [isIconVisible, setIsIconVisible] = useState(true);

    useEffect(() => {
        if (eventData.selectedAttribute) {
            console.log("Updated attribute tags: ", eventData.selectedAttribute);
        }
    }, [eventData.selectedAttribute]);

    const handleAttributeChange = (selectedOptions) => {
        console.log("Selected Options: ", selectedOptions);
        // Ensure selectedAttribute is always an array of selected options
        setEventData(prevData => ({
            ...prevData,
            selectedAttribute: selectedOptions || [],
        }));
    };

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
            //Create eventData object to be sent
            const eventDataToSubmit = {
                title: eventData.title,
                description: eventData.description,
                date: eventData.date,
                attributeIds: eventData.selectedAttribute.map(attr => attr.value),
                organizerId: user.id,
            };

            console.log(eventDataToSubmit);

            const response = await fetch('http://localhost:8080/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventDataToSubmit),
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            setSuccess('Event created successfully!');
            addEvent(eventData);
            setEventData({ title: '', date: '', description: '', selectedAttribute: [] }); // Clear the form

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
        setIsIconVisible(false);
        setFormShrink(false);
    };

    return (
        <div className="relative flex items-center justify-center">
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
                    className={`fixed flex items-center justify-center bg-white rounded-lg shadow-xl z-40 transition-all transform max-w-lg w-full p-6`}
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                    }}
                >
                    <div className="w-full max-w-lg">
                        <h3 className="text-lg text-gray-800 font-semibold mb-4">Create Event</h3>

                        {/* Error and Success Messages */}
                        {error && <div className="text-red-600 mb-4">{error}</div>}
                        {success && <div className="text-green-600 mb-4">{success}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={eventData.title}
                                    onChange={handleChange}
                                    className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
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
                                    className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
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
                                    className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <AttributesDropDown selectedAttribute={eventData.selectedAttribute}
                                    onSelect={handleAttributeChange}
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
                </div>
            )}
        </div>
    );
};

export default EventForm;
