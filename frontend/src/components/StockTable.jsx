import React from 'react';

const StockTable = ({ stocks, onUpdate, onDelete }) => {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Trade Code</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Open Price</th>
                    <th>Close</th>
                    <th>Volume</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map((stock) => (
                    <tr key={stock.id}>
                        <td>{stock.id}</td>
                        <td>{stock.date}</td>
                        <td>{stock.trade_code}</td>
                        <td>{stock.high}</td>
                        <td>{stock.low}</td>
                        <td>{stock.open_price}</td>
                        <td>{stock.close}</td>
                        <td>{stock.volume}</td>
                        <td>
                            <button onClick={() => onUpdate(stock)}>Update</button>
                            <button onClick={() => onDelete(stock.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StockTable;
