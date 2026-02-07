const express = require("express");
const db = require("../config/db");
const router = express.Router();

// GET all bookings
router.get("/", (req, res) => {
  db.query("SELECT * FROM bookings ORDER BY id DESC", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

// ADD booking
router.post("/", (req, res) => {
  const { guest, room } = req.body;

  if (!guest || !room) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.query(
    "INSERT INTO bookings (guest, room) VALUES (?, ?)",
    [guest, room],
    err => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ success: true });
    }
  );
});

// UPDATE booking
router.put("/:id", (req, res) => {
  const { guest, room } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE bookings SET guest = ?, room = ? WHERE id = ?",
    [guest, room, id],
    err => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ success: true });
    }
  );
});

// DELETE booking
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM bookings WHERE id = ?",
    [id],
    err => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ success: true });
    }
  );
});

module.exports = router;