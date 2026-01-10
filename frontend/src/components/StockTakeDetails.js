import { useStockTakeContext } from "../hooks/useStockTakeContext";
import { useAuthContext } from "../hooks/useAuthContext";

const StockTakeDetails = ({ stockTake, setEditingStockTake }) => {
  const { dispatch } = useStockTakeContext();
  const { user } = useAuthContext();

  // Delete stock take
  const handleDelete = async () => {
    if (!user) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/stocktake/${stockTake._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete stock take");

      dispatch({ type: "DELETE_STOCKTAKE", payload: json });
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  return (
    <div className="bg-white rounded p-3 shadow-sm mb-2 relative">
      <h4 className="text-blue-600 font-semibold">Stock Take</h4>
      <p>Book Name: {stockTake.item_name}</p>
      <p>Quantity: {stockTake.qty}</p>
      <p>Location: {stockTake.location || "-"}</p>
      <p>Notes: {stockTake.notes || "-"}</p>

      <div className="absolute top-2 right-3 flex gap-2">
        <span
          onClick={() => setEditingStockTake(stockTake)}
          className="cursor-pointer text-green-500"
          title="Edit"
        >
          ✎
        </span>
        <span
          onClick={handleDelete}
          className="cursor-pointer text-red-500"
          title="Delete"
        >
          ✖
        </span>
      </div>
    </div>
  );
};

export default StockTakeDetails;