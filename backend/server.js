import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 4001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//connect to db
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  port: process.env.PORT,
});

//Test db connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
  connection.release();
});

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

//Generera engångslösenord
async function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

/*
app.get("/", (req, res) => {
  res.send("hello test bank");
});
*/


//create - username, password
app.post("/create", async (req, res) => {
  const { username, password } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  //console.log("hashed password", hashedPassword);

  try {
    // Insert new user into users table
    const result = await query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    // Get id of user
    const [user] = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    //Create new account for the user, starting balance of 0
    const newAccount = await query(
      "INSERT INTO accounts (balance, user_id) VALUES (?, ?) ",
      [0, user.id]
    );
    console.log("New user and user account created:", newAccount);

    // Send a response indicating successful creation
    res.status(201).json({
      message: "New user and account created successfully",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// GET - users from db
app.get("/users", async (req, res) => {
  try {
    const users = await query("SELECT * FROM users");

    // If no users found
    if (users.length === 0) {
      console.log("No users found in the database");
    }

    // Send the users data as a response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

//login user
//Todo: När man loggar in ska ett engångslösenord skapas och skickas tillbaka i response.
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await query("SELECT * FROM users WHERE username = ? ", [
      username,
    ]);

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid username or password");
    }

    //generate session token
    const sessionToken = await generateOTP();

    //insert into sessions
    const result = await query(
      "INSERT INTO sessions (user_id, password) VALUES (?, ?)",
      [user.id, sessionToken]
    );
    console.log("session token login: ", sessionToken)
    console.log("result: ",result)
    res.status(200).json({ message: "Login successful", username: username, sessionToken: sessionToken });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/logout", async (req, res) => {
  const { sessionToken } = req.body;

  try {
    await query("DELETE FROM sessions WHERE password = ?", [sessionToken]);

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//Visa salodo (POST): "/accounts"
//Todo: För att göra detta behöver man skicka med sitt engångslösenord till backend.
//Todo: När man hämtar saldot ska samma engångslösenord skickas med i Post.
app.post("/account", async (req, res) => {
  const { username, sessionToken } = req.body;
  console.log("Received username:", username);
  console.log("Received sessionToken:", sessionToken);

  try {
    const [user] = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
  
    const session = await query(
      "SELECT * FROM sessions WHERE user_id = ? AND password = ?",
      [user.id, sessionToken]
    );
    if (!session) {
     // sessionToken;
      console.log("Account not found");
      return res.status(404).json({ message: "Failed to fetch account balance" });
    }
    const result = await query("SELECT balance FROM accounts WHERE user_id = ?", [user.id])
    const balance = result[0].balance
    console.log("session log", session)
    console.log("balance", balance)
    res.status(200).json({ balance: balance, username, sessionToken })
  } catch(error){
    return res.status(404).json({message: "Failed to fetch balance.", username})
  }

});

//transactions
app.post("/account/transactions", async (req, res) => {
  const { username, sessionToken, depositAmount } = req.body;
  
  try {
    // Get the user by username
    const [user] = await query("SELECT * FROM users WHERE username = ?", [username]);
    console.log("user trans", user)
    // Check if user exists
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
  
    // Fetch the session based on user id and session token
    const [session] = await query(
      "SELECT * FROM sessions WHERE user_id = ? AND password = ?",
      [user.id, sessionToken]
    );
    console.log("session trans", session)
    // Check session
    if (!session) {
      console.log("Session not found");
      return res.status(404).json({ message: "Session not found" });
    }

    // Fetch the current balance of the user's account
    const [account] = await query(
      "SELECT balance FROM accounts WHERE user_id = ?",
      [user.id]
    );
    const balance = parseFloat(account.balance);
   // console.log("balance trans", balance)
    // new balance after deposit
    const newBalance = balance + parseFloat(depositAmount);
    //console.log("new balance trans", newBalance)

    // Update balance in db
    await query("UPDATE accounts SET balance = ? WHERE user_id = ?", [newBalance, user.id]);

    res.status(200).json({ balance: newBalance });
  } catch (error) {
    console.error("Error processing deposit transaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/account/withdraw", async (req, res) => {
  const { username, sessionToken, withdrawAmount } = req.body;
  
  try {
    const [user] = await query("SELECT * FROM users WHERE username = ?", [username]);
    console.log("user trans", user)

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
  
    const [session] = await query(
      "SELECT * FROM sessions WHERE user_id = ? AND password = ?",
      [user.id, sessionToken]
    );

    if (!session) {
      console.log("Session not found");
      return res.status(404).json({ message: "Session not found" });
    }

    const [account] = await query(
      "SELECT balance FROM accounts WHERE user_id = ?",
      [user.id]
    );

    const balance = parseFloat(account.balance);
    const newBalance = balance - parseFloat(withdrawAmount);

    await query("UPDATE accounts SET balance = ? WHERE user_id = ?", [newBalance, user.id]);

    res.status(200).json({ balance: newBalance });
  } catch (error) {
    console.error("Error processing withdraw :", error);
    return res.status(500).json({ message: "Internal server error" });
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Bankens backend körs på http://localhost:${PORT}`);
});
