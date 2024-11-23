import React, { useState } from 'react'
//URL
// ../studyroom

//Import components
import Whiteboard from '../components/Whiteboard'
import Navbar from '../components/Navbar'

export default function StudyRoom() {

    const [isWBOpen, setIsWBOpen] = useState(true);

    const toggleWhiteboard = () => {
        setIsWBOpen(prevState => !prevState);
    };

    return (
        <div>
            {/*Navbar*/}
            <Navbar></Navbar>

            <div className='flex flex-col items-center pt-20'>

                {
                    !isWBOpen ?
                        (<span className=''> Whiteboard is closed.</span>)
                        :
                        (<Whiteboard />)
                }

            </div>


        </div>
    )
}
