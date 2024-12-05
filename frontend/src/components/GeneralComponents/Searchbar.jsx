import React, { useState } from 'react';

export default function Searchbar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setQuery(e.target.value);
        setLoading(true);

        onSearch(e.target.value);

        setLoading(false); // Reset loading state once search is done
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="flex w-full max-w-md">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {loading && (
                <div className="mt-4 text-blue-600">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
}
