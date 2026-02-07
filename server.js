const express = require("express");
const cors = require("cors");
const path = require("path");

const auth = require("./routes/auth");
const bookings = require("./routes/bookings");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend correctly
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Default route (IMPORTANT)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// APIs
app.use("/api/auth", auth);
app.use("/api/bookings", bookings);

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
