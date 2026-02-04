require("dotenv").config()
const mongoose = require("mongoose")
const User = require("./models/userModel")

const seedSupervisorUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database")

        const existingSupervisor = await User.findOne({ email: "supervisor@inventory.com" })
        if (existingSupervisor) {
            console.log("Supervisor user already exists")
            process.exit(0)
        }

        // Create supervisor user
            "supervisor@inventory.com",
            "SupervisorPassword123!",
            "supervisor"
        )

        console.log("✅ Supervisor user created successfully!")
        console.log("Email: supervisor@inventory.com")
        console.log("Password: SupervisorPassword123!")
        console.log("Role: supervisor")

        await mongoose.disconnect()
        process.exit(0)
    } catch (error) {
        console.error("❌ Error seeding supervisor user:", error.message)
        process.exit(1)
    }
}

seedSupervisorUser()
