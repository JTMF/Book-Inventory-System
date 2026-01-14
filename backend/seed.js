require("dotenv").config()
const mongoose = require("mongoose")
const User = require("./models/userModel")

const seedAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database")

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin@inventory.com" })
        if (existingAdmin) {
            console.log("Admin user already exists")
            process.exit(0)
        }

        // Create admin user
        const adminUser = await User.signup(
            "admin@inventory.com",
            "AdminPassword123!",
            "admin"
        )

        console.log("✅ Admin user created successfully!")
        console.log("Email: admin@inventory.com")
        console.log("Password: AdminPassword123!")
        console.log("Role: admin")

        await mongoose.disconnect()
        process.exit(0)
    } catch (error) {
        console.error("❌ Error seeding admin user:", error.message)
        process.exit(1)
    }
}

seedAdminUser()
