import { useState, useEffect } from "react";
import { useTransactionContext } from "../hooks/useTransactionContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TransactionForm = ({ editingTransaction, setEditingTransaction }) => {
  const { dispatch } = useTransactionContext();
  const { user } = useAuthContext();

  const [type, setType] = useState("inbound");
  const [item_name, setItemName] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [from_location, setFromLocation] = useState("");
  const [to_location, setToLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setItemName(editingTransaction.item_name);
      setQty(editingTransaction.qty);
      setLocation(editingTransaction.from_location || editingTransaction.to_location || "");
      setFromLocation(editingTransaction.from_location || "");
      setToLocation(editingTransaction.to_location || "");
      setNotes(editingTransaction.notes);
    }
  }, [editingTransaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setError("You must be logged in");

    let transactionData = { type, item_name, qty, notes };

    // Add location fields based on transaction type
    if (type === "movement") {
      transactionData.from_location = from_location;
      transactionData.to_location = to_location;
    } else {
      transactionData.from_location = type === "inbound" ? "" : location;
      transactionData.to_location = type === "outbound" ? "" : location;
    }

    const url = editingTransaction 
      ? `${process.env.REACT_APP_API_URL}/api/transactions/${editingTransaction._id}`
      : `${process.env.REACT_APP_API_URL}/api/transactions`;

    const res = await fetch(url, {
      method: editingTransaction ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(transactionData),
    });

    const json = await res.json();
    if (!res.ok) return setError(json.error);

    dispatch({ 
      type: editingTransaction ? "UPDATE_TRANSACTION" : "CREATE_TRANSACTION", 
      payload: json 
    });

    setType("inbound");
    setItemName("");
    setQty("");
    setLocation("");
    setFromLocation("");
    setToLocation("");
    setNotes("");
    setError(null);
    if (editingTransaction) setEditingTransaction(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow" style={{ maxWidth: "100%" }}>
      <h3 style={{ marginTop: 0, marginBottom: "24px", fontSize: "18px", fontWeight: 600 }}>
        {editingTransaction ? "Edit Transaction" : "Add Transaction"}
      </h3>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ marginBottom: 0, marginTop: "12px" }}>
          <option value="inbound">Inbound</option>
          <option value="outbound">Outbound</option>
          <option value="movement">Movement</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>Book Name:</label>
        <input
          type="text"
          value={item_name}
          onChange={(e) => setItemName(e.target.value)}
          required
          style={{ marginBottom: 0, marginTop: "12px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>Quantity:</label>
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          required
          style={{ marginBottom: 0, marginTop: "12px" }}
        />
      </div>

      {type === "movement" ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>From Location:</label>
            <input
              type="text"
              value={from_location}
              onChange={(e) => setFromLocation(e.target.value)}
              required
              style={{ marginBottom: 0, marginTop: "12px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>To Location:</label>
            <input
              type="text"
              value={to_location}
              onChange={(e) => setToLocation(e.target.value)}
              required
              style={{ marginBottom: 0, marginTop: "12px" }}
            />
          </div>
        </>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
            {type === "inbound" ? "Inbound Location:" : "Outbound Location:"}
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ marginBottom: 0, marginTop: "12px" }}
          />
        </div>
      )}

      <div style={{ marginBottom: "24px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>Notes:</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ marginBottom: 0, marginTop: "12px" }}
        />
      </div>

      <button className="bg-green-500 text-white px-4 py-2" style={{ marginBottom: "16px" }}>
        {editingTransaction ? "Update" : "Save"}
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default TransactionForm;
