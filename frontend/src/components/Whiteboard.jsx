// Whiteboard.jsx
import React, { useRef, useEffect } from 'react';
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

const Whiteboard = () => {
    const handleMount = (editor) => {
        editor.createShape({
            type: 'text',
            x: 200,
            y: 200,
            props: {
                text: 'Welcome to StudyBuddy!',
            },
        })

        editor.selectAll()

        editor.zoomToSelection({
            animation: { duration: 5000 },
        })
    }

    return (
        <div style={{ position: 'fixed', inset: 75 }}>
            <Tldraw onMount={handleMount} />
        </div>

    );
};

export default Whiteboard;
