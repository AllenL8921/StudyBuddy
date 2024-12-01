import React, { useState } from 'react';

export default function Searchbar({ onSearch, category }) {
    const [query, setQuery] = useState('');
    const [endpoint, setEndpoint] = useState(category);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        console.log('Searching for:', query);
        // You can replace the console.log with an actual search functionality, e.g., API call.

        try {
            const response = await fetch(`http://localhost:8080/api/${endpoint}/search?name=${query}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Search results:', data);

            if (onSearch) {
                onSearch(data);
            }

            setQuery('');
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
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

            {error && (
                <div className="mt-4 text-red-600">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
