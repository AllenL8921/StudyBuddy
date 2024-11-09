import { useEffect, useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import Components
import EventCreate from '../components/EventCreate';
import EventCard from '../components/EventCard';
import Sidebar from '../components/Sidebar';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchEvents();
    }, [page]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/events`);
            const newEvents = await response.json();
            setEvents((prev) => [...prev, ...newEvents]);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.offsetHeight
        ) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Sidebar />
            <div className="flex min-h-screen">
                {/* Main Content - */}
                <div className="container ml-[270px] py-32"> {/* Adjust `ml-[250px]` based on sidebar width */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                title={event.title}
                                date={event.date}
                                description={event.description}
                            />
                        ))}
                    </div>

                    {loading && (
                        <div className="text-center mt-4">
                            <p>Loading more events...</p>
                            <div className="spinner-border animate-spin text-blue-500 mt-2"></div>
                        </div>
                    )}
                </div>

                {/* Event Creation Button */}
                <div className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300">
                    <Link to="/event/create">
                        <FaCalendarPlus className="text-3xl" />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default EventList;
