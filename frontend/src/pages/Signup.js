import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("operator")
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password, role)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3 className="text-emerald-600 font-semibold mb-3">Sign Up</h3>
 
            <label>Email address:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
            />

            <label>Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />

            <label>Role:</label>
            <select 
                onChange={(e) => setRole(e.target.value)} 
                value={role}
                style={{
                    padding: "10px 12px",
                    borderRadius: "var(--border-radius)",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                    fontFamily: "inherit"
                }}
            >
                <option value="operator">Operator</option>
                <option value="supervisor">Supervisor</option>
            </select>

            <button 
                disabled={isLoading}
                style={{
                    background: "var(--primary)",
                    color: "#fff",
                    border: "2px solid var(--primary)",
                    padding: "10px 24px",
                    borderRadius: "var(--border-radius)",
                    fontWeight: 600,
                    cursor: isLoading ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    fontSize: "14px",
                    width: "100%",
                    opacity: isLoading ? 0.6 : 1
                }}
                onMouseOver={(e) => {
                    if (!isLoading) {
                        e.target.style.backgroundColor = "#fff"; 
                        e.target.style.color = "var(--primary)";
                        e.target.style.boxShadow = "0 4px 12px rgba(40,54,80,0.15)";
                    }
                }}
                onMouseOut={(e) => {
                    if (!isLoading) {
                        e.target.style.backgroundColor = "var(--primary)"; 
                        e.target.style.color = "#fff";
                        e.target.style.boxShadow = "none";
                    }
                }}
            >
                Sign up
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup
