import React, { useState, useEffect } from 'react'

//Import components
import Carousel from '../components/CarouselComponents/Carousel'
import Sidebar from '../components/GeneralComponents/Sidebar'
import Searchbar from '../components/GeneralComponents/Searchbar'
import StudySessionList from '../components/StudySessionComponents/StudySessionList'

export default function StudyPage() {

    const [studySessionData, setStudySessionData] = useState([]);
    const [filteredSessionData, setFilteredSessionData] = useState([]);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Make request to backend API to get all study sessions
            const response = await fetch('http://localhost:8080/api/studySessions');
            const data = await response.json();

            setStudySessionData(data);
            setFilteredSessionData(data); // Initially, show all sessions
        } catch (error) {
            console.error('Error fetching study sessions:', error);
            setError('Something went wrong while fetching study sessions. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const addStudySession = (newSession) => {
        setStudySessionData((prevSessions) => [...prevSessions, newSession]);
    };

    const handleSearch = (searchQuery) => {
        if (searchQuery.trim() === '') {
            setFilteredSessionData(studySessionData); // If query is empty, reset the filtered events
            return;
        }

        const results = studySessionData.filter(
            (studySession) => studySession.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredSessionData(results);
    };

    return (
        <div>
            <Sidebar />
            <div className="py-5 w-full px-4 sm:px-8 lg:px-16 xl:px-32">
                <Searchbar onSearch={handleSearch} category={'studySessions'} />
            </div>

            <Carousel />

            <StudySessionList studySessionData={filteredSessionData}
                loading={loading}
                addStudySession={addStudySession}
            />
        </div>
    );
}
