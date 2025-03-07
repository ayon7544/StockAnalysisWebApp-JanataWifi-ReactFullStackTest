const API_URL = "http://127.0.0.1:8000/api/stocks/"; // Update if needed

// Fetch all stocks (READ)
export async function fetchStocks() {
  try {
    const response = await fetch(API_URL);
    return response.ok ? await response.json() : [];
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return [];
  }
}

// Add a new stock (CREATE)
export async function createStock(stockData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stockData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating stock:", error);
  }
}

// Update an existing stock (UPDATE)
export async function updateStock(id, stockData) {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stockData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating stock:", error);
  }
}

// Delete a stock (DELETE)
export async function deleteStock(id) {
  try {
    await fetch(`${API_URL}${id}/`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting stock:", error);
  }
}
