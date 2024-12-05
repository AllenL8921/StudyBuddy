import React from 'react'

//Import components
import Carousel from '../components/CarouselComponents/Carousel'
import Sidebar from '../components/GeneralComponents/Sidebar'
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
            const response = await fetch('http://localhost:8080/api/studySessions');
            const data = await response.json();

            setStudySessionData(data);
            setFilteredSessionData(data); // Initially, show all sessions
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Something went wrong while fetching events. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchQuery) => {
        if (searchQuery.trim() === '') {
            setFilteredSessionData(studySessionData); // If query is empty, reset the filtered events
            return;
        }

        const results = studySessionData.filter(
            (studySession) => studySession.title.toLower().includes(searchQuery.toLowerCase())
        );

        setFilteredEvents(results);
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="py-5 w-full px-4 sm:px-8 lg:px-16 xl:px-32">
                <Searchbar onSearch={handleSearch} category={'studySessions'} />
            </div>

            <Carousel />

            <StudySessionList studySessionData={filteredSessionData} loading={loading} error={error} />

        </div>
    )
}
