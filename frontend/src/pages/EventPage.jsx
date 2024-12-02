import React, { useState, useEffect } from 'react'

//Import Components 
import Searchbar from '../components/GeneralComponents/Searchbar'
import Sidebar from '../components/GeneralComponents/Sidebar';
import EventList from '../components/EventComponents/EventList'
import Carousel from "../components/CarouselComponents/Carousel";

export default function EventPage() {
    const [eventsData, setEventsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = (data) => {
        setLoading(true);
        setError(null);

        try {
            setEventsData(data);
        } catch (err) {
            setError('Something went wrong during the search.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Sidebar />
            <div className="py-5 w-full px-4 sm:px-8 lg:px-16 xl:px-32">
                <Searchbar onSearch={handleSearch} category={'events'} />
            </div>
            <Carousel></Carousel>

            <EventList eventsData={eventsData} loading={loading} error={error} />

        </div>
    )
}
