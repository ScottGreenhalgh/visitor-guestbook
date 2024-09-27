import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

const templateUsernames = [
  "User123",
  "TechGuru",
  "NatureLover",
  "BookWorm",
  "FitnessFanatic",
  "FoodieGal",
  "TravelBug",
  "MusicManiac",
  "MovieBuff",
  "GamerDude",
];
const templateMessages = [
  "Hey everyone, how's it going?",
  "Just finished setting up my new PC. It's a beast!",
  "Check out this amazing sunset I captured today!",
  "Just finished reading 'The Great Gatsby'. What a classic!",
  "Crushed my workout today! Feeling great!",
  "Made the best lasagna ever tonight. Recipe coming soon!",
  "Just booked my tickets to Japan! Can't wait to explore.",
  "Listening to the new album by my favorite band. It's fire!",
  "Excited for the latest smartphone release! Anyone else getting it?",
  "Just finished reading The Night Circus—a magical experience! Highly recommend.",
];

async function seedTemplate() {
  await db.query(`TRUNCATE visitors RESTART IDENTITY`);
  for (let i = 0; templateMessages.length > i; i++) {
    await db.query(
      `INSERT INTO visitors (username, message, likes) VALUES ($1, $2, $3);`,
      [templateUsernames[i], templateMessages[i], 0]
    );
  }
}

seedTemplate();
console.log("reset db");

// create table with the following:

// CREATE TABLE visitors (
//   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   username VARCHAR(100),
//   message TEXT,
//   likes INT,
//   time TIMESTAMP
// )
