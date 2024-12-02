import React from 'react'

//Import components
import Carousel from '../components/CarouselComponents/Carousel'
import Sidebar from '../components/GeneralComponents/Sidebar'
import StudySessionList from '../components/StudySessionComponents/StudySessionList'

export default function StudyPage() {
    return (
        <div>
            <Sidebar></Sidebar>

            <Carousel />

        </div>
    )
}
