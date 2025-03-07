import React, { useEffect, useState } from "react";
import { fetchStocks } from "../api";

function StockList() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStocks()
            .then((data) => {
                setStocks(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching stocks:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>Stock List</h2>
            {loading ? <p>Loading...</p> : null}
            <ul>
                {stocks.length > 0 ? (
                    stocks.map((stock) => (
                        <li key={stock.id}>{stock.name} - ${stock.price}</li>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </ul>
        </div>
    );
}

export default StockList;
