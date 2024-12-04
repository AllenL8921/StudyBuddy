import React, { useEffect, useState } from "react";

// Import Components
import Sidebar from "../GeneralComponents/Sidebar";
import Searchbar from "../GeneralComponents/Searchbar";
import EventCard from "../EventComponents/EventCard";
import StudySessionCreate from "./StudySessionCreate";

const StudySession = () => {

    // Contains Data for the study session
    const [studySession, setStudySession] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/studySessions`);
        const newSessions = await response.json();

        setStudySession(newSessions);
        console.log(newSessions);

        setLoading(false);
    };

    const onButtonClick = () => {
        // TODO:: 
        // Join the session 
        // Then Update the associated tables

        // Finally 
        // Redirect to ../studyroom
    };

    return (
        <>
            <Sidebar />
            {/* Search Bar */}
            <div className="py-5 w-full px-4 sm:px-8 lg:px-16 xl:px-32">
                <Searchbar />
            </div>

            <div className="min-h-screen flex flex-col items-center bg-gray-100">

                {/* Study Session Grid */}
                <div className="container mt-8 px-4 sm:px-8 lg:px-16 xl:px-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {studySession.map((event) => (
                            <EventCard
                                key={event.studySessionId}
                                eventId={event.studySessionId}
                                title={event.title}
                                description={event.description}
                                endpoint='joinRoom'
                            />
                        ))}
                    </div>

                    {/* Loading Spinner or Message */}
                    {loading && (
                        <div className="flex justify-center items-center mt-6">
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}

                </div>

                {/* Study Session Creation Button */}
                <div className="fixed bottom-6 right-6">
                    <StudySessionCreate
                        studySessionList={studySession}
                        addStudySession={newSession => setStudySession(prevSessions => [...prevSessions, newSession])}
                    />
                </div>

            </div>
        </>
    );
};

export default StudySession;
