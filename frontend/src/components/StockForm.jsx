import React, { useState } from 'react';

const StockForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        date: '',
        trade_code: '',
        high: '',
        low: '',
        open_price: '',
        close: '',
        volume: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="trade_code" placeholder="Trade Code" onChange={handleChange} required />
            <input type="date" name="date" onChange={handleChange} required />
            <input type="number" name="high" placeholder="High" onChange={handleChange} required />
            <input type="number" name="low" placeholder="Low" onChange={handleChange} required />
            <input type="number" name="open_price" placeholder="Open Price" onChange={handleChange} required />
            <input type="number" name="close" placeholder="Close" onChange={handleChange} required />
            <input type="number" name="volume" placeholder="Volume" onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default StockForm;
