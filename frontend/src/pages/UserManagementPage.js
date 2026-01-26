import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const UserManagementPage = () => {
    const { user } = useAuthContext()
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [editingId, setEditingId] = useState(null)
    const [editingRole, setEditingRole] = useState("")

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/all`, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                })

                if (!response.ok) {
                    throw new Error("Failed to fetch users")
                }

                const data = await response.json()
                setUsers(data)
                setFilteredUsers(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (user && user.role === "supervisor") {
            fetchUsers()
        }
    }, [user])

    // Handle search
    const handleSearch = (e) => {
        const query = e.target.value
        setSearchQuery(query)

        if (query === "") {
            setFilteredUsers(users)
        } else {
            const filtered = users.filter(user =>
                user.email.toLowerCase().includes(query.toLowerCase()) ||
                (user.name && user.name.toLowerCase().includes(query.toLowerCase()))
            )
            setFilteredUsers(filtered)
        }
    }

    // Handle update role
    const handleUpdateRole = async (userId, newRole) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role: newRole })
            })

            if (!response.ok) {
                throw new Error("Failed to update user role")
            }

            const updatedUser = await response.json()
            setUsers(users.map(u => u._id === userId ? updatedUser : u))
            setFilteredUsers(filteredUsers.map(u => u._id === userId ? updatedUser : u))
            setEditingId(null)
            setEditingRole("")
        } catch (err) {
            setError(err.message)
        }
    }

    // Handle delete user
    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })

            if (!response.ok) {
                throw new Error("Failed to delete user")
            }

            setUsers(users.filter(u => u._id !== userId))
            setFilteredUsers(filteredUsers.filter(u => u._id !== userId))
        } catch (err) {
            setError(err.message)
        }
    }

    if (!user || user.role !== "supervisor") {
        return (
            <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
                <h2>Access Denied</h2>
                <p>You must be a supervisor to access this page.</p>
            </div>
        )
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>User Management</h1>

            {error && (
                <div style={{
                    backgroundColor: "#fee",
                    color: "#c33",
                    padding: "12px",
                    borderRadius: "4px",
                    marginBottom: "20px"
                }}>
                    Error: {error}
                </div>
            )}

            {/* Search Bar */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search users by email or name..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "16px",
                        border: "1px solid #ddd",
                        borderRadius: "4px"
                    }}
                />
            </div>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div>
                    <h3>Total Users: {filteredUsers.length}</h3>

                    {filteredUsers.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <div style={{
                            overflowX: "auto",
                            boxShadow: "var(--card-shadow)",
                            borderRadius: "var(--border-radius)"
                        }}>
                            <table style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                backgroundColor: "#fff"
                            }}>
                                <thead>
                                    <tr style={{
                                        backgroundColor: "var(--primary)",
                                        color: "#fff"
                                    }}>
                                        <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Email</th>
                                        <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Name</th>
                                        <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Role</th>
                                        <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((userItem) => (
                                        <tr key={userItem._id} style={{
                                            borderBottom: "1px solid #eee",
                                            "&:hover": { backgroundColor: "#f9f9f9" }
                                        }}>
                                            <td style={{ padding: "12px" }}>{userItem.email}</td>
                                            <td style={{ padding: "12px" }}>{userItem.name || "N/A"}</td>
                                            <td style={{ padding: "12px" }}>
                                                {editingId === userItem._id ? (
                                                    <select
                                                        value={editingRole}
                                                        onChange={(e) => setEditingRole(e.target.value)}
                                                        style={{
                                                            padding: "6px",
                                                            borderRadius: "4px",
                                                            border: "1px solid #ddd"
                                                        }}
                                                    >
                                                        <option value="operator">Operator</option>
                                                        <option value="supervisor">Supervisor</option>
                                                    </select>
                                                ) : (
                                                    <span style={{
                                                        backgroundColor: userItem.role === "supervisor" ? "#f39c12" : "#27ae60",
                                                        color: "#fff",
                                                        padding: "4px 8px",
                                                        borderRadius: "4px",
                                                        fontSize: "12px",
                                                        fontWeight: "bold"
                                                    }}>
                                                        {userItem.role.toUpperCase()}
                                                    </span>
                                                )}
                                            </td>
                                            <td style={{ padding: "12px", textAlign: "center" }}>
                                                {editingId === userItem._id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateRole(userItem._id, editingRole)}
                                                            style={{
                                                                backgroundColor: "#27ae60",
                                                                color: "#fff",
                                                                border: "none",
                                                                padding: "6px 12px",
                                                                borderRadius: "4px",
                                                                cursor: "pointer",
                                                                marginRight: "8px"
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingId(null)}
                                                            style={{
                                                                backgroundColor: "#95a5a6",
                                                                color: "#fff",
                                                                border: "none",
                                                                padding: "6px 12px",
                                                                borderRadius: "4px",
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                setEditingId(userItem._id)
                                                                setEditingRole(userItem.role)
                                                            }}
                                                            style={{
                                                                backgroundColor: "#3498db",
                                                                color: "#fff",
                                                                border: "none",
                                                                padding: "6px 12px",
                                                                borderRadius: "4px",
                                                                cursor: "pointer",
                                                                marginRight: "8px"
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(userItem._id)}
                                                            style={{
                                                                backgroundColor: "#e74c3c",
                                                                color: "#fff",
                                                                border: "none",
                                                                padding: "6px 12px",
                                                                borderRadius: "4px",
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default UserManagementPage
