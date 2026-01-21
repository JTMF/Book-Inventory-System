import { NavLink, Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    // Common styles for nav links
    const getLinkStyle = (isActive) => ({
        color: isActive ? "var(--primary)" : "#fff",
        fontWeight: 600,
        padding: "10px 16px",
        borderRadius: "var(--border-radius)",
        textDecoration: "none",
        transition: "all 0.2s ease",
        backgroundColor: isActive ? "#fff" : "transparent",
        border: "2px solid transparent",
        boxShadow: isActive ? "0 2px 8px rgba(40,54,80,0.1)" : "none",
        cursor: "pointer"
    })

    const handleNavHover = (e, isActive) => {
        if (!isActive) {
            e.target.style.backgroundColor = "rgba(255,255,255,0.15)"
        }
    }

    const handleNavLeave = (e, isActive) => {
        if (!isActive) {
            e.target.style.backgroundColor = "transparent"
        }
    }

    return (
        <header style={{ 
            background: "var(--primary)", 
            boxShadow: "var(--card-shadow)",
            position: "sticky",
            top: 0,
            zIndex: 100
        }}>
            <div style={{ 
                maxWidth: 1400, 
                margin: "0 auto", 
                padding: "0 24px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                height: "90px"
            }}>
                {/* Logo Section */}
                <div style={{ 
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flexShrink: 0
                }}>
                    <Link to="/" style={{ 
                        textDecoration: "none", 
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0
                    }}>
                        {/* Logo Image */}
                        <img 
                            src="/L & J warehouse Co..png" 
                            alt="L & J Warehouse Co Logo" 
                            style={{
                                width: 90,
                                height: 90,
                                objectFit: "contain",
                                flexShrink: 0,
                                cursor: "pointer"
                            }} 
                        />
                    </Link>
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        <h1 style={{ 
                            color: "#fff", 
                            fontWeight: 700, 
                            fontSize: 26, 
                            margin: 0,
                            lineHeight: "1"
                        }}>
                            L & J Warehouse Co
                        </h1>
                        <span style={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: 13,
                            fontWeight: 500,
                            letterSpacing: 0.5
                        }}>
                            Inventory Management
                        </span>
                    </div>
                </div>

                {/* Navigation and User Section */}
                <nav style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "4px",
                    marginLeft: "auto",
                    flexWrap: "nowrap",
                    justifyContent: "flex-end"
                }}>
                    {user && (
                        <>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                paddingRight: "16px",
                                marginLeft: "24px",
                                marginRight: "24px",
                                borderRight: "2px solid rgba(255,255,255,0.2)"
                            }}>
                                <span style={{ 
                                    color: "rgba(255,255,255,0.8)", 
                                    fontSize: "14px",
                                    fontWeight: 500
                                }}>
                                    {user.email}
                                </span>
                                <span style={{
                                    backgroundColor: "rgba(255,255,255,0.2)",
                                    color: "#fff",
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    textTransform: "capitalize"
                                }}>
                                    {user.role}
                                </span>
                            </div>
                            <NavLink
                                to="/"
                                end
                                style={({ isActive }) => getLinkStyle(isActive)}
                                onMouseOver={(e) => handleNavHover(e, e.target.className.includes("active"))}
                                onMouseOut={(e) => handleNavLeave(e, e.target.className.includes("active"))}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/transaction"
                                style={({ isActive }) => getLinkStyle(isActive)}
                                onMouseOver={(e) => handleNavHover(e, e.target.className.includes("active"))}
                                onMouseOut={(e) => handleNavLeave(e, e.target.className.includes("active"))}
                            >
                                Transaction
                            </NavLink>
                            <NavLink
                                to="/stocktake"
                                style={({ isActive }) => getLinkStyle(isActive)}
                                onMouseOver={(e) => handleNavHover(e, e.target.className.includes("active"))}
                                onMouseOut={(e) => handleNavLeave(e, e.target.className.includes("active"))}
                            >
                                Stock Take
                            </NavLink>
                            <NavLink
                                to="/reports"
                                style={({ isActive }) => getLinkStyle(isActive)}
                                onMouseOver={(e) => handleNavHover(e, e.target.className.includes("active"))}
                                onMouseOut={(e) => handleNavLeave(e, e.target.className.includes("active"))}
                            >
                                Reports
                            </NavLink>
                            <NavLink
                                to="/users"
                                style={({ isActive }) => getLinkStyle(isActive)}
                                onMouseOver={(e) => handleNavHover(e, e.target.className.includes("active"))}
                                onMouseOut={(e) => handleNavLeave(e, e.target.className.includes("active"))}
                            >
                                Users
                            </NavLink>
                            <button onClick={handleClick} style={{
                                background: "var(--primary)",
                                color: "#fff",
                                border: "2px solid var(--primary)",
                                padding: "10px 16px",
                                borderRadius: "var(--border-radius)",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                fontSize: "14px"
                            }}
                                onMouseOver={e => { 
                                    e.target.style.backgroundColor = "#fff"; 
                                    e.target.style.color = "var(--primary)";
                                    e.target.style.boxShadow = "0 4px 12px rgba(40,54,80,0.15)";
                                }}
                                onMouseOut={e => { 
                                    e.target.style.backgroundColor = "var(--primary)"; 
                                    e.target.style.color = "#fff";
                                    e.target.style.boxShadow = "none";
                                }}
                            >
                                Log out
                            </button>
                        </>
                    )}
                    {!user && (
                        <>
                            <NavLink
                                to="/login"
                                style={({ isActive }) => getLinkStyle(isActive)}
                                onMouseOver={(e) => handleNavHover(e, e.target.className.includes("active"))}
                                onMouseOut={(e) => handleNavLeave(e, e.target.className.includes("active"))}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                style={({ isActive }) => getLinkStyle(isActive)}
                                onMouseOver={(e) => handleNavHover(e, e.target.className.includes("active"))}
                                onMouseOut={(e) => handleNavLeave(e, e.target.className.includes("active"))}
                            >
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
