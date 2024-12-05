import React from 'react';
import EventCard from './EventCard';
import EventCreate from './EventCreate';

const EventList = ({ eventsData, loading }) => {

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            {/* Events Grid */}
            <div className="container mt-8 px-4 sm:px-8 lg:px-16 xl:px-32 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {eventsData.length > 0 ? (
                        eventsData.map((event) => (
                            <EventCard
                                key={event.eventId}
                                eventId={event.eventId}
                                title={event.title}
                                date={event.scheduledDate}
                                description={event.description}
                                endpoint='joinEvent'
                            />
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
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
                    addEvent={newEvent => setEvents(prevEvents => [...prevEvents, newEvent])}
                />
            </div>
        </div>
    );
};

export default EventList;
