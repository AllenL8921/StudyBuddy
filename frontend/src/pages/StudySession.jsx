//StudySession.jsx
//

import React, { useEffect, useState } from "react";

//Import Components
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
const StudySession = () => {

    //Contains Data for the study session
    const [studySession, setStudySession] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    // useEffect(() => {
    //     fetchData();
    // }, [page]);

    // fetchData = async () => {
    //     setLoading(true);
    //     const response = await fetch(`/api/events?page=${page}`);
    //     const newSessions = await response.json();
    //     setStudySession((prev) => [...prev, ...newEvents]);
    //     setLoading(false);
    // };



    return (
        <>
            <Sidebar />

            <div className="flex">
                <Searchbar></Searchbar>

            </div>


            <div className="flex justify-around">
                <div className="flex-col">
                    <div className="flex gap-x-16">
                        {/* Load Existing study sessions*/}
                        {
                            loading && <p className="text-center mt-4">Loading more sessions...</p>
                        }
                        <h1 className='flex-1'>StudySession</h1>
                        <h1 className='flex-1'>StudySession</h1>
                    </div>
                </div>

            </div>
        </>

    )
};

export default StudySession;