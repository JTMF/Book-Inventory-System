import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Reports = () => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [stockTakes, setStockTakes] = useState([]);

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
        t.type,
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

      <table className="w-full text-sm" style={{ marginTop: "24px" }}>
        <thead>
          <tr className="bg-gray-100">
            <th style={{ padding: "12px", textAlign: "left" }}>Type</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Book Name</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Qty</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
            <th style={{ padding: "12px", textAlign: "left" }}>From Location</th>
            <th style={{ padding: "12px", textAlign: "left" }}>To Location</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Inbound Location</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Outbound Location</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Location</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Notes</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Record Type</th>
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
              <tr key={t._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "12px" }}>{t.type}</td>
                <td style={{ padding: "12px" }}>{t.item_name}</td>
                <td style={{ padding: "12px" }}>{t.qty}</td>
                <td style={{ padding: "12px" }}>{new Date(t.date).toLocaleDateString()}</td>
                <td style={{ padding: "12px" }}>{fromLoc}</td>
                <td style={{ padding: "12px" }}>{toLoc}</td>
                <td style={{ padding: "12px" }}>{inboundLoc}</td>
                <td style={{ padding: "12px" }}>{outboundLoc}</td>
                <td style={{ padding: "12px" }}>{t.notes || "-"}</td>
                <td style={{ padding: "12px" }}>Transaction</td>
              </tr>
            );
          })}
          {stockTakes.map(s => (
            <tr key={s._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
