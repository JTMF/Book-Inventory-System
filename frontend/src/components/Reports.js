import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useAuthContext } from "../hooks/useAuthContext";

const Reports = () => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [stockTakes, setStockTakes] = useState([]);
  const [chartData, setChartData] = useState({
    transactionTrend: [],
    transactionTypes: [],
    bookInventory: [],
    locationInventory: []
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch Transactions
      const tRes = await fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const tJson = await tRes.json();
      if (tRes.ok) setTransactions(tJson);

      // Fetch Stock Takes
      const sRes = await fetch(`${process.env.REACT_APP_API_URL}/api/stocktake`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const sJson = await sRes.json();
      if (sRes.ok) setStockTakes(sJson);
    };

    fetchData();
  }, [user]);

  // Process data for charts
  useEffect(() => {
    // Transaction Type Chart (Inbound vs Outbound)
    const inbound = transactions.filter(t => t.type === "inbound").length;
    const outbound = transactions.filter(t => t.type === "outbound").length;
    const movement = transactions.filter(t => t.type === "movement").length;
    
    const transactionTypes = [
      { name: "Inbound", value: inbound, fill: "#10b981" },
      { name: "Outbound", value: outbound, fill: "#ef4444" },
      { name: "Movement", value: movement, fill: "#3b82f6" }
    ];

    // Book Inventory Chart
    const bookInventory = stockTakes.map(s => ({
      name: s.item_name.substring(0, 20),
      quantity: s.qty,
      fullName: s.item_name
    }));

    // Location Inventory Chart
    const locationMap = {};
    stockTakes.forEach(s => {
      if (!locationMap[s.location]) {
        locationMap[s.location] = 0;
      }
      locationMap[s.location] += s.qty;
    });
    const locationInventory = Object.entries(locationMap).map(([loc, qty]) => ({
      name: loc || "Unknown",
      quantity: qty
    }));

    // Transaction Trend (last 7 days)
    const today = new Date();
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      last7Days.push(d.toISOString().split('T')[0]);
    }

    const transactionTrend = last7Days.map(day => {
      const count = transactions.filter(t => {
        const tDate = new Date(t.date || t.createdAt).toISOString().split('T')[0];
        return tDate === day;
      }).length;
      return {
        date: new Date(day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        transactions: count
      };
    });

    setChartData({
      transactionTrend,
      transactionTypes,
      bookInventory,
      locationInventory
    });
  }, [transactions, stockTakes]);

  const downloadCSV = () => {
    // Combine Transactions and StockTakes
    const csvRows = [
      ["Type", "Book Name", "Quantity", "Date", "From Location", "To Location", "Inbound Location", "Outbound Location", "Location", "Notes", "Record Type"]
    ];

    transactions.forEach(t => {
      let inboundLoc = "-";
      let outboundLoc = "-";
      let fromLoc = "-";
      let toLoc = "-";
      
      if (t.type === "inbound") {
        inboundLoc = t.to_location || "-";
      } else if (t.type === "outbound") {
        outboundLoc = t.from_location || "-";
      } else if (t.type === "movement") {
        fromLoc = t.from_location || "-";
        toLoc = t.to_location || "-";
      }

      csvRows.push([
        t.type.charAt(0).toUpperCase() + t.type.slice(1),
        t.item_name,
        t.qty,
        new Date(t.date).toLocaleDateString(),
        fromLoc,
        toLoc,
        inboundLoc,
        outboundLoc,
        t.notes || "-",
        "Transaction"
      ]);
    });

    stockTakes.forEach(s => {
      csvRows.push([
        "Stock Take",
        s.item_name,
        s.qty,
        new Date(s.createdAt).toLocaleDateString(),
        "-",
        "-",
        "-",
        "-",
        s.location || "-",
        s.notes || "-",
        "Stock Take"
      ]);
    });

    const csvString = csvRows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.csv";
    link.click();
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
      <h3 style={{ marginTop: 0, marginBottom: "24px", fontSize: "20px", fontWeight: 600, color: "#059669" }}>
        📊 Reports & Analytics
      </h3>

      {/* Charts Section */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
          {/* Transaction Trend Chart */}
          <div style={{ backgroundColor: "#f9fafb", padding: "16px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h4 style={{ marginTop: 0, marginBottom: "16px", fontSize: "14px", fontWeight: 600, color: "#374151" }}>
              Transaction Trend (Last 7 Days)
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.transactionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="transactions" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} name="Transactions" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Transaction Types Pie Chart */}
          <div style={{ backgroundColor: "#f9fafb", padding: "16px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h4 style={{ marginTop: 0, marginBottom: "16px", fontSize: "14px", fontWeight: 600, color: "#374151" }}>
              Transaction Type Distribution
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.transactionTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.transactionTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Book Inventory Chart */}
          <div style={{ backgroundColor: "#f9fafb", padding: "16px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h4 style={{ marginTop: 0, marginBottom: "16px", fontSize: "14px", fontWeight: 600, color: "#374151" }}>
              Book Inventory Levels
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.bookInventory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} angle={-45} textAnchor="end" height={80} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="quantity" fill="#10b981" name="Quantity" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Location Inventory Chart */}
          <div style={{ backgroundColor: "#f9fafb", padding: "16px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h4 style={{ marginTop: 0, marginBottom: "16px", fontSize: "14px", fontWeight: 600, color: "#374151" }}>
              Inventory by Location
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.locationInventory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={12} />
                <YAxis dataKey="name" type="category" fontSize={12} width={100} />
                <Tooltip />
                <Bar dataKey="quantity" fill="#f59e0b" name="Total Units" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CSV Download */}
      <button
        onClick={downloadCSV}
        style={{
          backgroundColor: "#059669",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontWeight: 500,
          fontSize: "14px",
          marginBottom: "24px",
          width: "auto"
        }}
      >
        📥 Download CSV Report
      </button>

      {/* Data Table */}
      <h4 style={{ marginTop: "32px", marginBottom: "16px", fontSize: "16px", fontWeight: 600, color: "#374151" }}>
        Detailed Records
      </h4>
      <div style={{ overflowX: "auto" }}>
        <table className="w-full text-sm" style={{ marginTop: "24px", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#374151" }}>Type</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#374151" }}>Book Name</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#374151" }}>Qty</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#374151" }}>Date</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#374151" }}>Location</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#374151" }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "12px", color: "#10b981", fontWeight: 500 }}>{t.type.toUpperCase()}</td>
                <td style={{ padding: "12px" }}>{t.item_name}</td>
                <td style={{ padding: "12px" }}>{t.qty}</td>
                <td style={{ padding: "12px" }}>{new Date(t.date || t.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "12px" }}>{t.location || t.to_location || t.from_location || "-"}</td>
                <td style={{ padding: "12px", fontSize: "12px", color: "#6b7280" }}>{t.notes || "-"}</td>
              </tr>
            ))}
            {stockTakes.map(s => (
              <tr key={s._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "12px", color: "#3b82f6", fontWeight: 500 }}>STOCK</td>
                <td style={{ padding: "12px" }}>{s.item_name}</td>
                <td style={{ padding: "12px" }}>{s.qty}</td>
                <td style={{ padding: "12px" }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "12px" }}>{s.location || "-"}</td>
                <td style={{ padding: "12px", fontSize: "12px", color: "#6b7280" }}>{s.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
