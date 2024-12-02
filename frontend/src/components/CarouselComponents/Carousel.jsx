// Carousel.js
import React, { useState } from 'react';
import CarouselItem from './CarouselItem';

import { RiEnglishInput } from "react-icons/ri";
import { PiMathOperationsFill } from "react-icons/pi";
import { FaComputer } from "react-icons/fa6";
import { IoMdMusicalNotes } from "react-icons/io";
import { TbBrandAmongUs } from "react-icons/tb";

export default function Carousel() {
    const subjects = [
        { id: 1, icon: <PiMathOperationsFill />, label: 'Math' },
        { id: 2, icon: <RiEnglishInput />, label: 'English' },
        { id: 3, icon: <FaComputer />, label: 'Computer Science' },
        { id: 4, icon: <IoMdMusicalNotes />, label: 'Music' },
        { id: 5, icon: <TbBrandAmongUs />, label: 'Game' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % subjects.length);
    };

    const prevItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + subjects.length) % subjects.length);
    };

    return (
        <div className="relative flex items-center justify-center w-full mt-10 pl-60"> {/* Add space for the sidebar */}
            {/* Prev Button */}
            <button
                onClick={prevItem}
                className="right-50 z-20 bg-blue-500 text-white p-4 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
                &#8592;
            </button>

            {/* Carousel Container */}
            <div className="flex items-center justify-center overflow-hidden w-full">
                <div className="flex space-x-8 px-8 transition-all duration-300">
                    {subjects.map((subject, index) => (
                        <div key={subject.id} className="flex-shrink-0">
                            <CarouselItem
                                icon={subject.icon}
                                label={subject.label}
                                isActive={index === currentIndex}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Button */}
            <button
                onClick={nextItem}
                className=" right-10 z-20 bg-blue-500 text-white p-4 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
                &#8594;
            </button>
        </div>
    );
}
