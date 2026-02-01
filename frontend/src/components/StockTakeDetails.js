import { useStockTakeContext } from "../hooks/useStockTakeContext";
import { useAuthContext } from "../hooks/useAuthContext";

const StockTakeDetails = ({ stockTake, setEditingStockTake }) => {
  const { dispatch } = useStockTakeContext();
  const { user } = useAuthContext();

  // Check if user is supervisor or owner
  const canEdit = user && (user.role === "supervisor" || user._id === stockTake.user_id);
  const canDelete = user && (user.role === "supervisor" || user._id === stockTake.user_id);

  // Delete stock take
  const handleDelete = async () => {
    if (!user) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/stocktake/${stockTake._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await res.json();
      if (!res.ok) {
        console.error("Delete failed:", json.error);
        alert("Failed to delete: " + (json.error || "Unknown error"));
        return;
      }

      dispatch({ type: "DELETE_STOCKTAKE", payload: json });
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("Error deleting stock take");
    }
  };

  return (
    <div className="bg-white rounded p-3 shadow-sm mb-2 relative">
      <h4 className="text-blue-600 font-semibold">Stock Take</h4>
      <p>File Name: {stockTake.item_name}</p>
      <p>Quantity: {stockTake.qty}</p>
      <p>Location: {stockTake.location || "-"}</p>
      <p>Notes: {stockTake.notes || "-"}</p>

      {(canEdit || canDelete) && (
        <div className="absolute top-2 right-3 flex gap-2">
          {canEdit && (
            <span
              onClick={() => setEditingStockTake(stockTake)}
              className="cursor-pointer text-green-500"
              title="Edit"
            >
              ✎
            </span>
          )}
          {canDelete && (
            <span
              onClick={handleDelete}
              className="cursor-pointer text-red-500"
              title="Delete"
            >
              ✖
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StockTakeDetails;