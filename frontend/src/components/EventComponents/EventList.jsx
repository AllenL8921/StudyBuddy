import { useEffect, useState } from 'react';

// Import Components
import EventCreate from './EventCreate';
import EventCard from './EventCard';

const EventList = ({ eventsData, loading }) => {

    const [events, setEvents] = useState([]); // List of events
    const [page, setPage] = useState(1); // Page number for pagination

    useEffect(() => {
        // Fetch events whenever the page changes or the component is first loaded
        fetchEvents(page);
    }, [page]);

    const fetchEvents = async (pageNumber) => {

        try {
            // Fetch events from the API, passing the page number for pagination
            const response = await fetch(`http://localhost:8080/api/events`);
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

            <div className="min-h-screen flex flex-col items-center bg-gray-100">
                {/* Events Grid */}
                <div className="container mt-8 px-4 sm:px-8 lg:px-16 xl:px-32 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {events.map((event) => (
                            <EventCard
                                key={event.eventId}
                                eventId={event.eventId}
                                title={event.title}
                                date={event.scheduledDate}
                                description={event.description}
                                endpoint='joinEvent'
                            />
                        ))}
                    </div>

                    {/* Loading Spinner */}
                    {loading && (
                        <div className="flex justify-center items-center mt-6">
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Event Creation Button */}
                <div className="fixed bottom-6 right-6">
                    <EventCreate
                        addEvent={newEvent => setEvents(prevSessions => [...prevSessions, newEvent])}
                    />
                </div>
            </div>
        </>
    );
};

export default EventList;
