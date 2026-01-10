import { useEffect, useState } from "react"
import { useTransactionContext } from "../hooks/useTransactionContext"
import { useStockTakeContext } from "../hooks/useStockTakeContext"
import { useAuthContext } from "../hooks/useAuthContext"

import TransactionDetails from "../components/TransactionDetails"
import TransactionForm from "../components/TransactionForm"
import StockTakeDetails from "../components/StockTakeDetails"
import StockTakeForm from "../components/StockTakeForm"

const Dashboard = () => {
  const { transactions, dispatch: dispatchTransactions } = useTransactionContext()
  const { stockTakes, dispatch: dispatchStockTakes } = useStockTakeContext()
  const { user } = useAuthContext()

  const [editingTransaction, setEditingTransaction] = useState(null)
  const [editingStockTake, setEditingStockTake] = useState(null)

  useEffect(() => {
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
  }, [dispatchTransactions, dispatchStockTakes, user])

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-4">

      <div>
        <h2 className="text-xl font-bold mb-2">Transactions</h2>

        {transactions && transactions.map(t => (
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
  )
}

export default Dashboard
