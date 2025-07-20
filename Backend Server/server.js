const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URL;

console.log("Attempting to connect to MongoDB...");
if (!mongoURI) {
    console.error("MONGO_URL is not defined in the .env file");
    process.exit(1);
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB successfully"))
.catch(err => {
    console.error("❌ Error connecting to MongoDB:", err);
    console.error("Connection string used (Hiding Credentials):", mongoURI.replace(/\/\/.*@/, '//<username>:<password>@'));
});


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, match: /^[0-9]{10}$/ }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
    try {
        const { name, username, password, phone } = req.body;

        if (!name || !username || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await User.findOne({ username });
        if (existing) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const newUser = new User({ name, username, password, phone });
        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User registered successfully!",
            data: savedUser
        });

    } catch (error) {
        console.error("❌ Error saving user:", error);
        res.status(500).json({
            message: "Failed to register user",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Cyber Pass backend running at http://localhost:${PORT}`);
});
