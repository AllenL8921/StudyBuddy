import { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";

export default function EventCard({ eventId, organizer, title, date, description, endpoint }) {

    const [formattedDate, setFormattedDate] = useState('');
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
        console.log(eventId, title, date, description, endpoint)
        // Handle join event logic
        const response = await fetch(`http://localhost:8080/api/users/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id, eventId: eventId }),
        }
        )
        const data = response.json();
        console.log(data.message)

    };

    return (
        <div className="relative w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <h2 className="text-xl font-bold text-blue-500">{eventId}</h2>
            <h2 className="text-xl font-bold text-blue-500">{'@' + organizer || 'Organizer not available'}</h2>

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
