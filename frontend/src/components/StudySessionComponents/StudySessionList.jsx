import React, { useEffect, useState } from "react";

// Import Components
import EventCard from "../EventComponents/EventCard";
import StudySessionCreate from "./StudySessionCreate";

const StudySessionList = ({ studySessionData, addStudySession, loading }) => {

    return (
        <>
            <div className="min-h-screen flex flex-col items-center bg-gray-100">

                {/* Study Session Grid */}
                <div className="container mt-8 px-4 sm:px-8 lg:px-16 xl:px-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {studySessionData.length > 0 ? (
                            studySessionData.map((studySession) => (
                                <EventCard
                                    key={studySession.studySessionId}
                                    eventId={studySession.studySessionId}
                                    title={studySession.title}
                                    organizer={studySession.organizerUsername}
                                    description={studySession.description}
                                    endpoint='joinRoom'
                                />
                            ))
                        ) : (
                            <p>No study sessions found.</p>
                        )}
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
                    <StudySessionCreate addStudySession={addStudySession} />
                </div>

            </div>
        </>
    );
};

export default StudySessionList;
