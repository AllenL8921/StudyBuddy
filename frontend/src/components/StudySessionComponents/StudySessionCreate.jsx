import React, { useState, useEffect } from 'react'

import { useUser } from '@clerk/clerk-react';
import { FaCalendarPlus } from 'react-icons/fa';

//Import Components
import AttributesDropDown from '../AttributesDropDown';

export default function StudySessionCreate(studySessionList, addStudySession) {

    const { user } = useUser();

    const [studySessionData, setStudySessionData] = useState({
        title: '',
        isPublic: true,
        description: '',
        selectedAttribute: [],
    });

    //Form visibility and control
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isIconVisible, setIsIconVisible] = useState(true);

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formShrink, setFormShrink] = useState(false);

    useEffect(() => {
        if (studySessionData.selectedAttribute) {
            console.log("Updated attribute tags: ", studySessionData.selectedAttribute);
        }
    }, [studySessionData.selectedAttribute]);

    const handleAttributeChange = (selectedOptions) => {
        console.log("Selected Options: ", selectedOptions);

        //Iterate through the data fields
        setStudySessionData(prevData => ({
            ...prevData,
            selectedAttribute: selectedOptions || [],
        }));
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setStudySessionData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value, //Checks if the field is a checkbox value
        }));
    };

    const handleGoBack = (e) => {
        setFormShrink(true);
        setTimeout(() => {
            setIsFormVisible(false);
            setIsIconVisible(true);
        }, 300);
    };

    const handleIconClick = () => {
        setIsFormVisible(true);
        setIsIconVisible(false);
        setFormShrink(false);
    };

    const handleSubmit = async (e) => {
        try {
            //Make a POST request to the backend API

            //Create sessionData object to be sent
            const sessionDataToSubmit = {
                title: studySessionData.title,
                isPublic: studySessionData.isPublic,
                description: studySessionData.description,
                attributeIds: studySessionData.selectedAttribute.map(attr => attr.value),
                organizerId: user.id,
            };

            console.log(sessionDataToSubmit);

            const response = await fetch('http://localhost:8080/api/studySessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sessionDataToSubmit),
            });

            if (!response.ok) {
                throw new Error('Failed to create study session');
            }

            setSuccess('Event created successfully!');

            setStudySessionData({ title: '', date: '', description: '', selectedAttribute: [] });
            addStudySession(studySessionData);

            setIsFormVisible(false);
            setFormShrink(true); // Start shrinking animation
            setIsIconVisible(true); // Show the calendar icon after shrinking
        } catch (error) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className='relative flex items-center justify-center'>
            {/* Calendar Icon */}
            {
                isIconVisible && (
                    <button
                        className='fixed bottom-5 right-5 p-4 bg-blue-600 text-white text-2xl rounded-full shadow-lg hover:bg-blue-700 focus:ring-blue-500 transform-all'
                        onClick={handleIconClick}>
                        <FaCalendarPlus />
                    </button>
                )
            }

            {/* Study Session Form */}
            {
                isFormVisible && (

                    <div
                        className={`fixed flex items-center justify-center bg-white rounded-lg shadow-xl z-40 transition-all transform max-w-lg w-full p-6`}
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                        }}
                    >

                        <div className='w-full max-w-lg'>
                            <h3 className='text-lg text-gray-800 font-semibold mb-4'>Create Study Session</h3>

                            {/* Error and Success Messages */}
                            {error && <div className="text-red-600 mb-4">{error}</div>}
                            {success && <div className="text-green-600 mb-4">{success}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Study Session Name</label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={studySessionData.title}
                                        onChange={handleChange}
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800" // Added text-gray-800 here
                                        required
                                    />
                                </div>

                                {/*Checkbox for whether it is public/private*/}
                                <div className="mb-4 flex items-center">
                                    <input
                                        id="isPublic"
                                        name="isPublic"
                                        type="checkbox"
                                        checked={studySessionData.isPublic}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">Make this session public</label>
                                </div>


                                {/*Study Session Description*/}
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Event Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={studySessionData.description}
                                        onChange={handleChange}
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800" // Added text-gray-800 here
                                        rows="4"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <AttributesDropDown selectedAttribute={studySessionData.selectedAttribute}
                                        onSelect={handleAttributeChange}
                                    />
                                </div>

                                <button type='submit'
                                    className='w-full mt-4 bg-blue-600 text-white p-2 rounded-md shadow-sm hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400'
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
                )

            }
        </div>
    )
}
