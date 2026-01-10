import { useAuthContext } from "./useAuthContext"
import { useTransactionContext } from "./useTransactionContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchTransactions } = useTransactionContext()

  const logout = () => {
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
    dispatchTransactions({ type: "SET_TRANSACTIONS", payload: null })
  }

  return { logout }
}
