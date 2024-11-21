//StudySession.jsx
//

import React, { useEffect, useState } from "react";

//Import Components
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import EventCard from "../components/EventComponents/EventCard";

const StudySession = () => {

    //Contains Data for the study session
    const [studySession, setStudySession] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/chatrooms`);
        const newSessions = await response.json();

        setStudySession(newSessions);
        console.log(newSessions);

        setLoading(false);
    };

    const onButtonClick = () => {

    };

    return (
        <>
            <Sidebar />

            <div className="flex justify-center">
                <Searchbar />
            </div>

            <div className="container ml-[280px] mt-20">
                <div className="flex-col">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {studySession.map((event) => (
                            <EventCard
                                key={event.roomId}
                                roomId={event.roomId}
                                title={event.roomName}
                                description={event.description}
                            />
                        ))
                        }
                    </div>


                    <div className="flex gap-x-16">
                        {/* Load Existing study sessions*/}
                        {
                            loading && <p className="text-center mt-4">Loading study sessions...</p>
                        }
                    </div>
                </div>

            </div>
        </>

    )
};

export default StudySession;