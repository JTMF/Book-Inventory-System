import { useTransactionContext } from "../hooks/useTransactionContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TransactionDetails = ({ transaction, setEditingTransaction }) => {
  const { dispatch } = useTransactionContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) return;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/transactions/${transaction._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await res.json();
    if (res.ok) dispatch({ type: "DELETE_TRANSACTION", payload: json });
  };

  // Check if user is supervisor or owner
  const canEdit = user && (user.role === "supervisor" || user._id === transaction.user_id);
  const canDelete = user && (user.role === "supervisor" || user._id === transaction.user_id);

  return (
    <div className="bg-white rounded p-3 shadow-sm mb-2 relative">
      <h4 className="text-emerald-600">{transaction.type.toUpperCase()}</h4>
      <p>Book Name: {transaction.item_name}</p>
      <p>Quantity: {transaction.qty}</p>
      {transaction.type === "movement" ? (
        <>
          <p>From Location: {transaction.from_location || "-"}</p>
          <p>To Location: {transaction.to_location || "-"}</p>
        </>
      ) : (
        <p>Location: {transaction.type === "inbound" ? transaction.to_location : transaction.from_location || "-"}</p>
      )}
      <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
      <p>Notes: {transaction.notes || "-"}</p>
      
      {(canEdit || canDelete) && (
        <div className="absolute top-2 right-3 flex gap-2">
          {canEdit && (
            <span 
              onClick={() => setEditingTransaction(transaction)} 
              className="cursor-pointer text-green-500" 
              title="Edit"
            >
              ✎
            </span>
          )}
          {canDelete && (
            <span onClick={handleClick} className="cursor-pointer text-red-500" title="Delete">
              ✖
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
