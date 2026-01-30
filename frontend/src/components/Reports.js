import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import TransactionForm from "./TransactionForm";
import StockTakeForm from "./StockTakeForm";

const Reports = () => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [stockTakes, setStockTakes] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editingStockTake, setEditingStockTake] = useState(null);

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

  // Handle transaction delete
  const handleDeleteTransaction = async (id) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.ok) {
        setTransactions(transactions.filter(t => t._id !== id));
      } else {
        const json = await res.json();
        alert("Failed to delete: " + (json.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting transaction");
    }
  };

  // Handle stock take delete
  const handleDeleteStockTake = async (id) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this stock take?")) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/stocktake/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.ok) {
        setStockTakes(stockTakes.filter(s => s._id !== id));
      } else {
        const json = await res.json();
        alert("Failed to delete: " + (json.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting stock take");
    }
  };

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
    <div className="bg-white p-4 rounded shadow" style={{ maxWidth: "100%" }}>
      <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px", fontWeight: 600, color: "#059669" }}>Reports</h3>
      <button
        onClick={downloadCSV}
        style={{
          backgroundColor: "#059669",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "var(--border-radius)",
          border: "none",
          cursor: "pointer",
          marginBottom: "24px",
          fontWeight: 500,
          fontSize: "14px"
        }}
      >
        Download CSV
      </button>

      <div style={{
        overflowX: "auto",
        boxShadow: "var(--card-shadow)",
        borderRadius: "var(--border-radius)"
      }}>
        <table className="w-full text-sm" style={{ marginTop: "24px", width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--primary)", color: "#fff" }}>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Type</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Book Name</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Qty</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Date</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>From Location</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>To Location</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Inbound Location</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Outbound Location</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Location</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Notes</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Record Type</th>
              <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => {
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

              return (
                <tr key={t._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px" }}>{t.type.charAt(0).toUpperCase() + t.type.slice(1)}</td>
                <td style={{ padding: "12px" }}>{t.item_name}</td>
                <td style={{ padding: "12px" }}>{t.qty}</td>
                <td style={{ padding: "12px" }}>{new Date(t.date).toLocaleDateString()}</td>
                <td style={{ padding: "12px" }}>{fromLoc}</td>
                <td style={{ padding: "12px" }}>{toLoc}</td>
                <td style={{ padding: "12px" }}>{inboundLoc}</td>
                <td style={{ padding: "12px" }}>{outboundLoc}</td>
                <td style={{ padding: "12px" }}>-</td>
                <td style={{ padding: "12px" }}>{t.notes || "-"}</td>
                <td style={{ padding: "12px" }}>Transaction</td>
                <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                  {user && (user.role === "supervisor" || user._id === t.user_id) && (
                    <>
                      <span 
                        onClick={() => setEditingTransaction(t)} 
                        className="cursor-pointer text-green-500" 
                        title="Edit"
                        style={{ cursor: "pointer" }}
                      >
                        ✎
                      </span>
                      <span 
                        onClick={() => handleDeleteTransaction(t._id)} 
                        className="cursor-pointer text-red-500" 
                        title="Delete"
                        style={{ cursor: "pointer" }}
                      >
                        ✖
                      </span>
                    </>
                  )}
                </td>
              </tr>
            );
            })}
            {stockTakes.map(s => (
              <tr key={s._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>Stock Take</td>
              <td style={{ padding: "12px" }}>{s.item_name}</td>
              <td style={{ padding: "12px" }}>{s.qty}</td>
              <td style={{ padding: "12px" }}>{new Date(s.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: "12px" }}>-</td>
              <td style={{ padding: "12px" }}>-</td>
              <td style={{ padding: "12px" }}>-</td>
              <td style={{ padding: "12px" }}>-</td>
              <td style={{ padding: "12px" }}>{s.location || "-"}</td>
              <td style={{ padding: "12px" }}>{s.notes || "-"}</td>
              <td style={{ padding: "12px" }}>Stock Take</td>
              <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                {user && (user.role === "supervisor" || user._id === s.user_id) && (
                  <>
                    <span 
                      onClick={() => setEditingStockTake(s)} 
                      className="cursor-pointer text-green-500" 
                      title="Edit"
                      style={{ cursor: "pointer" }}
                    >
                      ✎
                    </span>
                    <span 
                      onClick={() => handleDeleteStockTake(s._id)} 
                      className="cursor-pointer text-red-500" 
                      title="Delete"
                      style={{ cursor: "pointer" }}
                    >
                      ✖
                    </span>
                  </>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {editingTransaction && (
        <div style={{ marginTop: "32px", padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
          <h3 style={{ marginTop: 0, fontSize: "16px", fontWeight: 600 }}>Edit Transaction</h3>
          <TransactionForm
            editingTransaction={editingTransaction}
            setEditingTransaction={setEditingTransaction}
          />
        </div>
      )}

      {editingStockTake && (
        <div style={{ marginTop: "32px", padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
          <h3 style={{ marginTop: 0, fontSize: "16px", fontWeight: 600 }}>Edit Stock Take</h3>
          <StockTakeForm
            editingStockTake={editingStockTake}
            setEditingStockTake={setEditingStockTake}
          />
        </div>
      )}
    </div>
  );
};

export default Reports;
