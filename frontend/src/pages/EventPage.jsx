import React, { useState, useEffect } from 'react'

//Import Components 
import Searchbar from '../components/GeneralComponents/Searchbar'
import Sidebar from '../components/GeneralComponents/Sidebar';
import EventList from '../components/EventComponents/EventList'
import Carousel from "../components/CarouselComponents/Carousel";

export default function EventPage() {
    const [eventsData, setEventsData] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all events when the component mounts
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/events');
            const data = await response.json();

            setEventsData(data);
            setFilteredEvents(data); // Initially, show all events
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Something went wrong while fetching events. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchQuery) => {
        if (searchQuery.trim() === '') {
            setFilteredEvents(eventsData); // If query is empty, reset the filtered events
            return;
        }

        // Filter events based on title (case-insensitive search)
        const results = eventsData.filter(event =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEvents(results);
    };


    return (
        <div>
            <Sidebar />

            <div className="py-5 w-full px-4 sm:px-8 lg:px-16 xl:px-32">
                <Searchbar onSearch={handleSearch} category={'events'} />
            </div>

            <Carousel />

            <EventList eventsData={filteredEvents} loading={loading} error={error} />

        </div>
    )
}
