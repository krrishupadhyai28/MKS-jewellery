const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(cors());

// Live Connection String to Neon DB
const connectionString = "postgresql://neondb_owner:npg_JxLA6iOHt4kl@ep-steep-field-ahbitz0q-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

const JWT_SECRET = "super_secret_jewelry_key_123";

// Test Live Connection to Neon on startup
pool.connect((err, client, release) => {
  if (err) return console.error("Neon Database Connection Failed ❌", err.stack);
  console.log("Connected to Live Neon Database securely! ✅");
  release();
});

// =========================================================================
// MIDDLEWARE: JWT Token Authentication Guard (Secures Customer & Admin data)
// =========================================================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Parses out "Bearer <TOKEN>"

  if (!token) {
    return res.status(401).json({ error: "Access denied. Sign in to continue." });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) return res.status(403).json({ error: "Session expired. Re-authenticate." });
    req.user = decodedUser; // Appends token payload data ({ id, email, role }) to req context
    next();
  });
};

// ==========================================
// AUTH APIs
// ==========================================
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required fields." });
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const checkResult = await pool.query("SELECT id FROM users WHERE email = $1", [sanitizedEmail]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: "This email is already registered." });
    }

    const nameToInsert = full_name ? full_name.trim() : sanitizedEmail.split("@")[0];
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO users (email, password_hash, full_name, role, is_verified) 
      VALUES ($1, $2, $3, 'CUSTOMER', true) 
      RETURNING id, email, full_name, role
    `;
    const result = await pool.query(insertQuery, [sanitizedEmail, hashedPassword, nameToInsert]);

    res.status(201).json({ message: "Registration successful!", user: result.rows[0] });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Database processing failed." });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter both email and password." });
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [sanitizedEmail]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials." });

    // Injects 'role' payload into token securely to protect admin panels later
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });
    
    res.json({ 
      token, 
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role } 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server authentication error." });
  }
});

// ==========================================
// PROFILE APIs (Protected via Token Guard)
// ==========================================
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT id, email, full_name, role, profile_image, created_at FROM users WHERE id = $1", [req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User profile not found." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to load user profile context." });
  }
});

// ==========================================
// PRODUCTS APIs (Public with Dynamic Routing)
// ==========================================
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products WHERE is_active = true ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve catalog rows." });
  }
});

// Dynamic Route Param handler matching "/api/products/:id" requests
app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id; // Extracts ID pattern dynamically from URL
    const result = await pool.query("SELECT * FROM products WHERE id = $1 AND is_active = true", [productId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "The jewelry item you are looking for does not exist." });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Single product search failure:", error);
    res.status(500).json({ error: "Error resolving product parameter payload." });
  }
});

// ==========================================
// VERCEL SERVERLESS ADAPTER EXPORTS
// ==========================================
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("Jewellery Secure Engine local instance listening on port 3000"));
}

module.exports = app;
