import React from 'react';

export default function EventCard({ title, date, description }) {

    //Handle button click function

    return (
        <div className="relative w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600">{date}</p>
            <p className="mt-2 text-gray-700">{description}</p>

            <div className="mt-4 flex justify-center">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200"
                    aria-label={`Join ${title} event`}
                >
                    Join
                </button>
            </div>
        </div>
    );
}
