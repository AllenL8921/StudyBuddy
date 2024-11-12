import React, { useState } from 'react';

export default function Searchbar() {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', query);
        // You can replace the console.log with an actual search functionality, e.g., API call.
    };

    return (
        <div className="flex justify-center items-center p-4">
            <form onSubmit={handleSearch} className="flex w-full max-w-md">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </form>
        </div>
    );
}
