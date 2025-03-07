import React, { useState } from "react";
import { addStock } from "../api";

function StockManager() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addStock({ name, price });
        setName("");
        setPrice("");
    };

    return (
        <div>
            <h1>Manage Stocks</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Stock Name" required />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Stock Price" required />
                <button type="submit">Add Stock</button>
            </form>
        </div>
    );
}

export default StockManager;
