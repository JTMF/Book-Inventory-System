import { useState } from "react"
import { useTransactionContext } from "../hooks/useTransactionContext"
import { useAuthContext } from "../hooks/useAuthContext"

const BookTransactionForm = () => {
  const { dispatch } = useTransactionContext()
  const { user } = useAuthContext()

  const [type, setType] = useState("inbound")
  const [itemName, setItemName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const transaction = { type, itemName, quantity, location, notes }

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(transaction)
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error)
      return
    }

    dispatch({ type: "CREATE_TRANSACTION", payload: data })
    setItemName("")
    setQuantity("")
    setLocation("")
    setNotes("")
    setError(null)
  }

  return (
    <form className="p-4 border rounded mt-4" onSubmit={handleSubmit}>
      <h2 className="font-bold text-lg">Add Book Transaction</h2>

      <label className="block mt-3">Transaction Type</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="inbound">Inbound (Book Added)</option>
        <option value="outbound">Outbound (Book Removed)</option>
      </select>

      <label className="block mt-3">Book Title</label>
      <input
        className="border p-2 w-full"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <label className="block mt-3">Quantity</label>
      <input
        type="number"
        className="border p-2 w-full"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <label className="block mt-3">Location</label>
      <input
        className="border p-2 w-full"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <label className="block mt-3">Notes (optional)</label>
      <input
        className="border p-2 w-full"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
        Save
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  )
}

export default BookTransactionForm
