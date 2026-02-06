import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import TransactionForm from "./TransactionForm";

const TransactionList = () => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await res.json();
        if (res.ok) setTransactions(json);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, [user]);

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

  const handleFormSuccess = (newTransaction, isEdit) => {
    if (isEdit) {
      setTransactions(transactions.map(t => t._id === newTransaction._id ? newTransaction : t));
      setEditingTransaction(null);
    } else {
      setTransactions([newTransaction, ...transactions]);
    }
    setShowForm(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow" style={{ maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#059669" }}>Transactions</h3>
        <button
          onClick={() => {
            setEditingTransaction(null);
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
          + Add Transaction
        </button>
      </div>

      {(showForm || editingTransaction) && (
        <div style={{ marginBottom: "32px", padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
          <h3 style={{ marginTop: 0, fontSize: "16px", fontWeight: 600 }}>
            {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
          </h3>
          <TransactionForm
            editingTransaction={editingTransaction}
            setEditingTransaction={(tx) => {
              if (tx) {
                setEditingTransaction(tx);
              } else {
                setEditingTransaction(null);
                if (!editingTransaction) setShowForm(false);
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
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Type</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Book Name</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Qty</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Date</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>From Location</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>To Location</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Inbound Location</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Outbound Location</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Notes</th>
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
                <td style={{ padding: "12px" }}>{t.notes || "-"}</td>
                <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                  {user && (user.role === "supervisor" || user._id === t.user_id) && (
                    <>
                      <span 
                        onClick={() => {
                          setEditingTransaction(t);
                          setShowForm(false);
                        }} 
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
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", marginTop: "24px" }}>No transactions yet</p>
      )}
    </div>
  );
};

export default TransactionList;
