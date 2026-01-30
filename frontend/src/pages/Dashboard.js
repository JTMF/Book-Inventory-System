import { useEffect, useState } from "react"
import { useTransactionContext } from "../hooks/useTransactionContext"
import { useStockTakeContext } from "../hooks/useStockTakeContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { mockTransactions, mockStockTakes } from "../mockData"

import LiveDataShowcase from "../components/LiveDataShowcase"
import TransactionDetails from "../components/TransactionDetails"
import TransactionForm from "../components/TransactionForm"
import StockTakeDetails from "../components/StockTakeDetails"
import StockTakeForm from "../components/StockTakeForm"

const USE_MOCK_DATA = true // Set to true to use local mock data, false to use API

const Dashboard = () => {
  const { transactions, dispatch: dispatchTransactions } = useTransactionContext()
  const { stockTakes, dispatch: dispatchStockTakes } = useStockTakeContext()
  const { user } = useAuthContext()

  const [editingTransaction, setEditingTransaction] = useState(null)
  const [editingStockTake, setEditingStockTake] = useState(null)
  const [timeFilter, setTimeFilter] = useState("all")

  useEffect(() => {
    if (USE_MOCK_DATA) {
      // Use local mock data
      dispatchTransactions({ type: "SET_TRANSACTIONS", payload: mockTransactions })
      dispatchStockTakes({ type: "SET_STOCKTAKES", payload: mockStockTakes })
    } else {
      // Use API calls
      const fetchTransactions = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        const data = await res.json()
        if (res.ok) {
          dispatchTransactions({ type: "SET_TRANSACTIONS", payload: data })
        }
      }

      const fetchStockTakes = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/stocktake`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        const data = await res.json()
        if (res.ok) {
          dispatchStockTakes({ type: "SET_STOCKTAKES", payload: data })
        }
      }

      if (user) {
        fetchTransactions()
        fetchStockTakes()
      }
    }
  }, [dispatchTransactions, dispatchStockTakes, user])

  // Calculate KPIs
  const totalStockTakes = stockTakes?.length || 0

  // Stock Accuracy % - Completed vs Total stock takes
  const completedStockTakes = stockTakes?.filter(s => s.status === 'Completed')?.length || 0
  const stockAccuracy = totalStockTakes > 0 ? Math.round((completedStockTakes / totalStockTakes) * 100) : 0

  // Inventory Turnover - Based on transaction frequency
  const inventoryTurnover = transactions?.length > 0 ? transactions.length : 0
  const avgTurnover = transactions?.length > 0 
    ? (transactions.reduce((sum, t) => sum + t.quantity, 0) / Math.max(transactions.length, 1)).toFixed(1) 
    : 0

  // Shrinkage estimate (items in stock takes with discrepancies)
  const shrinkageItems = stockTakes?.filter(s => s.variance && s.variance < 0)?.length || 0
  const shrinkageRate = totalStockTakes > 0 ? Math.round((shrinkageItems / totalStockTakes) * 100) : 0

  // Filter transactions by time
  const getFilteredTransactions = () => {
    const now = new Date()
    return transactions?.filter(t => {
      const txDate = new Date(t.createdAt || t.date)
      const diffMs = now - txDate
      const diffHours = diffMs / (1000 * 60 * 60)
      const diffDays = diffMs / (1000 * 60 * 60 * 24)

      switch (timeFilter) {
        case "1h":
          return diffHours <= 1
        case "4h":
          return diffHours <= 4
        case "1d":
          return diffDays <= 1
        case "7d":
          return diffDays <= 7
        case "30d":
          return diffDays <= 30
        case "90d":
          return diffDays <= 90
        case "1y":
          return diffDays <= 365
        default:
          return true
      }
    }) || []
  }

  const filteredTransactions = getFilteredTransactions()

  const KPICard = ({ label, value, unit = "", status = "normal", subtext = "" }) => {
    let color = "var(--primary)"
    if (status === "warning") color = "#f5a623"
    if (status === "danger") color = "#e7195a"
    if (status === "success") color = "#10b981"

    return (
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "var(--border-radius)",
        boxShadow: "var(--card-shadow)",
        border: "1px solid #e8eef7"
      }}>
        <p style={{ margin: "0 0 8px 0", color: "#999", fontSize: "14px" }}>{label}</p>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 700, color }}>{value}{unit}</h3>
        {subtext && <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>{subtext}</p>}
      </div>
    )
  }

  return (
    <div>
      <LiveDataShowcase />
      
      {/* Primary KPIs - Top 3 */}
      <div className="grid md:grid-cols-3 gap-4 mt-4 mb-6">
        <KPICard 
          label="Stock Accuracy %" 
          value={stockAccuracy} 
          unit="%"
          status={stockAccuracy >= 95 ? "success" : stockAccuracy >= 80 ? "warning" : "danger"}
          subtext={`${completedStockTakes}/${totalStockTakes} verified`}
        />
        <KPICard 
          label="Inventory Turnover" 
          value={avgTurnover} 
          unit=" units/tx"
          status="normal"
          subtext={`${inventoryTurnover} total transactions`}
        />
        <KPICard 
          label="Shrinkage Rate" 
          value={shrinkageRate} 
          unit="%"
          status={shrinkageRate > 5 ? "danger" : shrinkageRate > 2 ? "warning" : "success"}
          subtext={`${shrinkageItems} items with variance`}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-4">

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 className="text-xl font-bold mb-0">Transactions</h2>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--border-radius)",
              border: "1px solid #d1d5db",
              background: "#fff",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: 500,
              color: "#374151"
            }}
          >
            <option value="all">All Time</option>
            <option value="1h">Last Hour</option>
            <option value="4h">Last 4 Hours</option>
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
        <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#999" }}>Showing {filteredTransactions.length} transaction(s)</p>

        {filteredTransactions && filteredTransactions.map(t => (
          <TransactionDetails
            key={t._id}
            transaction={t}
            setEditingTransaction={setEditingTransaction}
          />
        ))}

        {editingTransaction && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Edit Transaction</h3>
            <TransactionForm
              editingTransaction={editingTransaction}
              setEditingTransaction={setEditingTransaction}
            />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Stock Takes</h2>

        {stockTakes && stockTakes.map(s => (
          <StockTakeDetails
            key={s._id}
            stockTake={s}
            setEditingStockTake={setEditingStockTake}
          />
        ))}

        {editingStockTake && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Edit Stock Take</h3>
            <StockTakeForm
              editingStockTake={editingStockTake}
              setEditingStockTake={setEditingStockTake}
            />
          </div>
        )}
      </div>

    </div>
    </div>
  )
}

export default Dashboard
