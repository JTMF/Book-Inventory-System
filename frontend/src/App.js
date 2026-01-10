import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext"
import { TransactionContextProvider } from "./context/TransactionContext"
import { StockTakeContextProvider } from "./context/StockTakeContext"
import { useAuthContext } from "./hooks/useAuthContext"

import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import TransactionPage from "./pages/TransactionPage"
import StockTakePage from "./pages/StockTakePage"
import ReportsPage from "./pages/ReportsPage"

function AppContent() {
  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/transaction" element={user ? <TransactionPage /> : <Navigate to="/login" />} />
          <Route path="/stocktake" element={user ? <StockTakePage /> : <Navigate to="/login" />} />
          <Route path="/reports" element={user ? <ReportsPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function App() {
  return (
    <AuthContextProvider>
      <TransactionContextProvider>
        <StockTakeContextProvider>
          <AppContent />
        </StockTakeContextProvider>
      </TransactionContextProvider>
    </AuthContextProvider>
  )
}

export default App
