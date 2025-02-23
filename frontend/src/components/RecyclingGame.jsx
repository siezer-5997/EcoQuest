import React, { useState } from "react";
import "./RecyclingGame.css";

const itemsData = [
    { id: 1, name: "Plastic Bottle", category: "recyclable" },
    { id: 2, name: "Banana Peel", category: "compost" },
    { id: 3, name: "Paper", category: "recyclable" },
    { id: 4, name: "Styrofoam Cup", category: "trash" },
    { id: 5, name: "Paper Cup", category: "recyclable" },

];

const binsData = [
    { id: "recyclable", name: "Recyclable Bin" },
    { id: "trash", name: "Trash Bin" },
    { id: "compost", name: "Compost Bin" },
];

const RecyclingGame = () => {
    const [items, setItems] = useState(itemsData);
    const [message, setMessage] = useState("");

    const handleDragStart = (e, itemId) => {
        e.dataTransfer.setData("itemId", itemId);
    };

    const handleDrop = (e, binId) => {
        const itemId = e.dataTransfer.getData("itemId");
        const item = items.find((i) => i.id === parseInt(itemId));
        if (!item) return;

        if (item.category === binId) {
            setMessage(`Correct! ${item.name} belongs in the ${binId} bin.`);
            // Remove the correctly dropped item
            setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
        } else {
            setMessage(`Oops! ${item.name} does not belong in the ${binId} bin.`);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="recycling-game">
            <h2>Recycling Game</h2>
            {message && (
                <div className={`message ${message.startsWith("Oops!") ? "error" : ""}`}>
                    {message}
                </div>
            )}
            <div className="game-area">
                <div className="items-container">
                    <h3>Items</h3>
                    <div className="items">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="game-item"
                                draggable
                                onDragStart={(e) => handleDragStart(e, item.id)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bins-container">
                    <h3>Bins</h3>
                    <div className="bins">
                        {binsData.map((bin) => (
                            <div
                                key={bin.id}
                                className="bin"
                                onDrop={(e) => handleDrop(e, bin.id)}
                                onDragOver={handleDragOver}
                            >
                                {bin.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecyclingGame;
