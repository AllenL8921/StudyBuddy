import React, { useState } from 'react'

import { useUser } from '@clerk/clerk-react';
import { FaCalendarPlus } from 'react-icons/fa';

export default function StudySessionCreate() {

    const { user } = useUser();

    const [studySessionData, setstudySessionData] = useState({
        studySessionName: '',
        isPublic: '',
        description: '',
        selectedAttribute: null,
    });

    //Form visibility and control
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formShrink, setFormShrink] = useState(false);
    const [isIconVisible, setIsIconVisible] = useState(true);


    const handleChange = (e) => {
        const { label, value } = e.target;
        setstudySessionData({ ...setstudySessionData, [label]: value });
    };

    const handleIconClick = () => {
        setIsFormVisible(true);
        setIsIconVisible(false);
        setFormShrink(false);
    };

    const handleSubmit = () => {
        try {
            //Make a POST request to the backend API

            //Create session object to be sent
            const sessionDataToSubmit = {
                title: studySessionData.studySessionName,
            };

        } catch (error) {

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

                    <div className={`fixed flex items-center justify-center bg-white rounded-lg shadow-xl z-50 transition-all transform maxx-w-lg w-full p-6`}
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
                                    <label htmlFor="studySessionName" className="block text-sm font-medium text-gray-700">Study Session Name</label>
                                    <input
                                        id="studySessionName"
                                        name="studySessionName"
                                        type="text"
                                        value={studySessionData.studySessionName}
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

                                <button type='submit'
                                    className='w-full '>

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
