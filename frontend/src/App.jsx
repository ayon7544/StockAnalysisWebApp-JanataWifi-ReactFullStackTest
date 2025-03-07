import React, { useEffect, useState, useRef } from "react";
import { fetchStocks, createStock, updateStock, deleteStock } from "./api";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./styles.css";
import "./App.css";

// Registering required ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newStock, setNewStock] = useState({
    trade_code: "",
    open_price: "",
    high: "",
    low: "",
    close: "",
    volume: "",
    date: "",
  });
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksPerPage] = useState(5);
  const [selectedTradeCode, setSelectedTradeCode] = useState(""); // To track the selected trade_code for the chart
  const stockRefs = useRef({});

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    setLoading(true);
    const data = await fetchStocks();
    setStocks(data);
    setLoading(false);
  };

  const handleCreate = async (isUpdate = false) => {
    if (isUpdate && selectedStock) {
      await updateStock(selectedStock.id, newStock);
    } else {
      await createStock(newStock);
    }

    setNewStock({
      trade_code: "",
      open_price: "",
      high: "",
      low: "",
      close: "",
      volume: "",
      date: "",
    });

    setSelectedStock(null);
    loadStocks();
  };

  const handleUpdate = (stock) => {
    setSelectedStock(stock);
    setNewStock({
      trade_code: stock.trade_code,
      date: stock.date,
      high: stock.high,
      low: stock.low,
      open_price: stock.open_price,
      close: stock.close,
      volume: stock.volume,
    });
  };

  const handleDelete = async (id) => {
    await deleteStock(id);
    loadStocks();
  };

  // Filter stocks based on search query
  const filteredStocks = stocks.filter(stock =>
    stock.trade_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = filteredStocks.slice(indexOfFirstStock, indexOfLastStock);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const firstMatch = filteredStocks[0];
    if (e.target.value && firstMatch && stockRefs.current[firstMatch.id]) {
      stockRefs.current[firstMatch.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Handle page change
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredStocks.length / stocksPerPage);

  // Data for the chart
  const chartData = {
    labels: stocks
      .filter(stock => stock.trade_code === selectedTradeCode)
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sorting by date
      .map(stock => stock.date), // x-axis: sorted dates
    datasets: [
      {
        label: "Close Price",
        data: stocks
          .filter(stock => stock.trade_code === selectedTradeCode)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(stock => stock.close), // y-axis: close prices
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y1",
      },
      {
        label: "Volume",
        data: stocks
          .filter(stock => stock.trade_code === selectedTradeCode)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(stock => stock.volume), // y-axis: volumes
        backgroundColor: "rgba(153,102,255,0.2)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
        yAxisID: "y2",
        type: "bar",
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        ticks: {
          beginAtZero: true,
        },
      },
      y2: {
        type: "linear",
        position: "right",
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="app">
      <h1>Stock Market Dashboard</h1>
      {loading ? <p className="loading">Loading...</p> : null}

      <div className="main-content">
        {/* Left Column (Add New Stock and Search) */}
        <div className="left-column">
          <div className="form-container">
            <h2>{selectedStock ? "Update Stock" : "Add New Stock"}</h2>
            <input
              type="text"
              placeholder="Trade Code"
              value={newStock.trade_code}
              onChange={e => setNewStock({ ...newStock, trade_code: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date"
              value={newStock.date}
              onChange={e => setNewStock({ ...newStock, date: e.target.value })}
            />
            <input
              type="number"
              placeholder="High"
              value={newStock.high}
              onChange={e => setNewStock({ ...newStock, high: e.target.value })}
            />
            <input
              type="number"
              placeholder="Low"
              value={newStock.low}
              onChange={e => setNewStock({ ...newStock, low: e.target.value })}
            />
            <input
              type="number"
              placeholder="Open Price"
              value={newStock.open_price}
              onChange={e => setNewStock({ ...newStock, open_price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Close"
              value={newStock.close}
              onChange={e => setNewStock({ ...newStock, close: e.target.value })}
            />
            <input
              type="number"
              placeholder="Volume"
              value={newStock.volume}
              onChange={e => setNewStock({ ...newStock, volume: e.target.value })}
            />
            <button onClick={() => handleCreate(selectedStock ? true : false)}>
              {selectedStock ? "Update Stock" : "Add Stock"}
            </button>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Trade Code"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Right Column (Stock List) */}
        <div className="right-column">
          {/* Chart Section */}
          <div className="chart-container">
            <select
              value={selectedTradeCode}
              onChange={(e) => setSelectedTradeCode(e.target.value)}
            >
              <option value="">Select Trade Code</option>
              {stocks.map((stock, index) => (
                <option key={index} value={stock.trade_code}>
                  {stock.trade_code}
                </option>
              ))}
            </select>
            {selectedTradeCode && (
              <>
                <Line data={chartData} options={chartOptions} />
                <Bar data={chartData} options={chartOptions} />
              </>
            )}
          </div>

          {/* Display Stocks */}
          {currentStocks.length > 0 ? (
            <table className="stock-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Trade Code</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Close</th>
                  <th>Volume</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStocks.map((stock) => (
                  <tr key={stock.id} ref={(el) => (stockRefs.current[stock.id] = el)}>
                    <td>{stock.id}</td>
                    <td>{stock.trade_code}</td>
                    <td>${stock.open_price}</td>
                    <td>${stock.high}</td>
                    <td>${stock.low}</td>
                    <td>${stock.close}</td>
                    <td>{stock.volume.toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleUpdate(stock)}>Update</button>
                      <button onClick={() => handleDelete(stock.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No stock data available</p>
          )}

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
