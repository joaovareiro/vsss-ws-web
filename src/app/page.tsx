'use client'

import React, { useState, useEffect } from 'react';

export default function Home() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000');

        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            setPosition({ x: data.x, y: data.y });
        });

        return () => {
            socket.close();
        }
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="w-96 h-96 bg-black mt-15 relative">
                <div
                    className="w-12 h-12 bg-yellow-400 absolute"
                    style={{ left: `${position.x}px`, top: `${position.y}px` }}
                />
            </div>
            {/* Rest of your form code */}
            <div className="text-black mt-10">
                Coordinates: ({position.x}, {position.y})
            </div>
        </div>
    );
}
