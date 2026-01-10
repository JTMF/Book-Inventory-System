import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, role = "operator") => {
    setIsLoading(true)
    setError(null)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
    } else {
      localStorage.setItem("user", JSON.stringify(json))
      dispatch({ type: "LOGIN", payload: json })
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
