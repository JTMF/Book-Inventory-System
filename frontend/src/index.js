import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { AuthContextProvider } from "./context/AuthContext"
import { TransactionContextProvider } from "./context/TransactionContext"
import { StockTakeContextProvider } from "./context/StockTakeContext"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <TransactionContextProvider>
                <StockTakeContextProvider>
                    <App />
                </StockTakeContextProvider>
            </TransactionContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
)
