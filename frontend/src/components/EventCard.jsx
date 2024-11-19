import React, { useState, useEffect } from 'react';

export default function EventCard({ eventId, title, date, description }) {

    const [formattedDate, setFormattedData] = useState('');


    useEffect(() => {

        const formatData = async () => {
            try {
                const formatted = new Date(date).toLocaleDateString();
                setFormattedData(formatted);
            } catch (error) {
                console.error("Error formatting date:", error);
            }
        };
        formatData();
    }, [date]);



    const handleButton = () => {

    };

    return (
        <div className="relative w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <h2 className="text-xl font-bold text-blue-500">{eventId}</h2>

            <p className="text-gray-600">{formattedDate}</p>
            <p className="mt-2 text-gray-700">{description}</p>

            <div className="mt-4 flex justify-center">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200"
                    onClick={handleButton}
                >
                    Join
                </button>
            </div>
        </div>
    );
}
