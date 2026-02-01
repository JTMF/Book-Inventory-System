import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import StockTakeForm from "./StockTakeForm";

const StockTakeList = () => {
  const { user } = useAuthContext();
  const [stockTakes, setStockTakes] = useState([]);
  const [editingStockTake, setEditingStockTake] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchStockTakes = async () => {
      if (!user) return;

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/stocktake`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await res.json();
        if (res.ok) setStockTakes(json);
      } catch (error) {
        console.error("Failed to fetch stock takes:", error);
      }
    };

    fetchStockTakes();
  }, [user]);

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

  const handleFormSuccess = (newStockTake, isEdit) => {
    if (isEdit) {
      setStockTakes(stockTakes.map(s => s._id === newStockTake._id ? newStockTake : s));
      setEditingStockTake(null);
    } else {
      setStockTakes([newStockTake, ...stockTakes]);
    }
    setShowForm(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow" style={{ maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#059669" }}>Stock Takes</h3>
        <button
          onClick={() => {
            setEditingStockTake(null);
            setShowForm(!showForm);
          }}
          style={{
            backgroundColor: "#059669",
            color: "#fff",
            padding: "8px 20px",
            borderRadius: "var(--border-radius)",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "16px"
          }}
        >
          + Add Stock Take
        </button>
      </div>

      {(showForm || editingStockTake) && (
        <div style={{ marginBottom: "32px", padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
          <h3 style={{ marginTop: 0, fontSize: "16px", fontWeight: 600 }}>
            {editingStockTake ? "Edit Stock Take" : "Add New Stock Take"}
          </h3>
          <StockTakeForm
            editingStockTake={editingStockTake}
            setEditingStockTake={(st) => {
              if (st) {
                setEditingStockTake(st);
              } else {
                setEditingStockTake(null);
                if (!editingStockTake) setShowForm(false);
              }
            }}
            onSuccess={handleFormSuccess}
          />
        </div>
      )}

      <div style={{
        overflowX: "auto",
        boxShadow: "var(--card-shadow)",
        borderRadius: "var(--border-radius)"
      }}>
        <table className="w-full text-sm" style={{ marginTop: "24px", width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--primary)", color: "#fff" }}>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>File Name</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Qty</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Location</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Date</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Notes</th>
              <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockTakes.map(s => (
              <tr key={s._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>{s.item_name}</td>
              <td style={{ padding: "12px" }}>{s.qty}</td>
              <td style={{ padding: "12px" }}>{s.location || "-"}</td>
              <td style={{ padding: "12px" }}>{new Date(s.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: "12px" }}>{s.notes || "-"}</td>
              <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                {user && (user.role === "supervisor" || user._id === s.user_id) && (
                  <>
                    <span 
                      onClick={() => {
                        setEditingStockTake(s);
                        setShowForm(false);
                      }} 
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

      {stockTakes.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", marginTop: "24px" }}>No stock takes yet</p>
      )}
    </div>
  );
};

export default StockTakeList;
