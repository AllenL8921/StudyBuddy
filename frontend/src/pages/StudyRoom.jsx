import React from 'react'
//URL
// ../studyroom

//Import components
import Whiteboard from '../components/Whiteboard'
import Navbar from '../components/Navbar'

export default function StudyRoom() {
    return (
        <div>
            <Navbar></Navbar>
            <Whiteboard />
        </div>
    )
}
