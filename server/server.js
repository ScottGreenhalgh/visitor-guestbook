import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

app.get("/", (req, res) => {
  res.json("root route");
});

app.get("/messages", async (req, res) => {
  try {
    const msg = (await db.query(`SELECT * FROM visitors ORDER BY id ASC`)).rows;
    console.log("Fetched messages from DB");
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).console.error(err);
  }
});

app.post("/messages", async (req, res) => {
  try {
    if (!req.body.username) {
      req.body.username = "anon";
    }
    const { username, message } = req.body;
    const newMsg = (
      await db.query(
        `INSERT INTO visitors (username, message, likes) VALUES ($1, $2, $3)`,
        [username, message, 0]
      )
    ).rows[0];
    return res.status(200).json({ newMsg });
  } catch (err) {
    res.status(500).console.error(err);
  }
});

app.listen(8080, () => console.log("App running on port 8080"));
