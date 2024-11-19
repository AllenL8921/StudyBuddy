import React, { useState, useEffect } from 'react'
import Select from 'react-select';

export default function AttributesDropDown({ selectedOption, onSelect }) {
    const [attributeList, setAttributeList] = useState([]);

    const fetchAttributes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/attributes');

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const formattedAttributes = data.attributes.map(attribute => ({
                value: attribute.id,
                label: attribute.attributeName
            }));

            setAttributeList(formattedAttributes);


        } catch (error) {
            console.error("Error fetching attributes:", error.message);
        }
    };

    useEffect(() => {
        fetchAttributes();
        console.log(attributeList);
    }, []);

    return (
        <div>
            <h2>Select an Attribute</h2>

            <Select
                options={attributeList}
                value={selectedOption}
                onChange={onSelect}
            />

        </div>
    )
}
