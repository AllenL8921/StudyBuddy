import { useEffect, useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import Components
import EventCreate from '../components/EventCreate';
import EventCard from '../components/EventCard';
import Sidebar from '../components/Sidebar';

const EventList = () => {
    const [events, setEvents] = useState([]); // List of events
    const [loading, setLoading] = useState(false); // Loading state
    const [page, setPage] = useState(1); // Page number for pagination

    useEffect(() => {
        // Fetch events whenever the page changes or the component is first loaded
        fetchEvents(page);
    }, [page]);

    const fetchEvents = async (pageNumber) => {
        setLoading(true);

        //Using pagenumbers in our fetch request
        //Allows us to break our query into "portions"
        //Where we skip items based on an offset calculated using :
        //how many items are allowed on a page and the page number

        try {
            // Fetch events from the API, passing the page number for pagination
            const response = await fetch(`http://localhost:8080/api/events?page=${pageNumber}`);
            const newEvents = await response.json();

            // When loading the first page, reset the events list
            if (pageNumber === 1) {
                setEvents(newEvents);
            } else {
                // If it's not the first page, append new events to the list
                setEvents((prev) => {
                    // To avoid duplicates, only append events not already in the list
                    const eventIds = new Set(prev.map(event => event.id)); // Set of existing event IDs
                    const filteredNewEvents = newEvents.filter(event => !eventIds.has(event.id)); // Filter out existing events

                    // Return the updated event list
                    return [...prev, ...filteredNewEvents];
                });
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.offsetHeight
        ) {
            // Increment the page number when scrolled to the bottom
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        // Add scroll event listener to load more events when scrolling
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Sidebar />
            {/*Add a searchbar component here*/}

            <div className="flex min-h-screen">
                {/* Main Content */}
                <div className="container ml-[280px] mt-20 py-24">
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
                    <EventCreate></EventCreate>
                </div>
            </div>
        </>
    );
};

export default EventList;
