import { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";

export default function EventCard({ eventId, organizer, title, date, description, endpoint }) {

    const [formattedDate, setFormattedDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { user } = useUser();

    useEffect(() => {
        const formatDate = () => {

            if (!date) {
                setFormattedDate('No date available');
                return;
            }

            const formattedDateString = date.replace(' ', 'T');

            const parsedDate = new Date(formattedDateString);

            if (isNaN(parsedDate)) {
                setFormattedDate('Invalid date');
            } else {
                const formatted = parsedDate.toLocaleDateString();
                setFormattedDate(formatted);
            }
        };

        formatDate();
    }, [date]);

    const handleButton = async () => {
        console.log('Parameters: ', eventId, title, date, description, endpoint)
        // Handle join event logic
        const response = await fetch(`http://localhost:8080/api/users/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id, eventId: eventId }),
        }
        );

        // Check if the response is OK 
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
            setSuccessMessage(`Failed to join event: ${error.message}`);
        }

        // Response is OK
        // Display a success message
        setSuccessMessage('Successfully joined the event!');

        const data = await response.json();
        console.log(data.message)
    };

    return (
        <div className="relative w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <h2 className="text-xl font-bold text-blue-500">{eventId}</h2>
            <h2 className="text-xl font-bold text-blue-500">{'@' + organizer || 'Organizer not available'}</h2>

            <p className="text-gray-600">{formattedDate}</p>
            <p className="mt-2 text-gray-700">{description}</p>

            {successMessage && (
                <div className="mt-4 p-2 bg-green-100 text-green-800 border border-green-300 rounded">
                    {successMessage}
                </div>
            )}

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
