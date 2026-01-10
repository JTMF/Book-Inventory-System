import { useContext } from "react"
import { StockTakeContext } from "../context/StockTakeContext"

export const useStockTakeContext = () => {
  const context = useContext(StockTakeContext)
  if (!context) throw Error("useStockTakeContext must be used inside a StockTakeContextProvider")
  return context
}
