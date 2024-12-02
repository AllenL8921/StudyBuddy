// CarouselItem.js
import React from 'react';

export default function CarouselItem({ icon, label, isActive }) {
    return (
        <div
            className={`flex flex-col items-center text-center p-6 transition-all duration-300 transform ${isActive ? 'scale-110 opacity-100' : 'scale-95 opacity-70'
                }`}
        >
            <div className="text-4xl mb-4">{icon}</div>
            <p className="text-lg font-semibold">{label}</p>
        </div>
    );
}
