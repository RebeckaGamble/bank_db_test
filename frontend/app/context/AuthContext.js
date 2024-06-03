"use client";
import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionToken, setSessionToken] = useState("")


  //CREATE
  const createUser = async (username, password) => {
    const response = await fetch("http://localhost:4001/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      console.log("New user created.");
    } else {
      throw new Error("Failed to create user in context");
    }
  };

  //Login
  const loginUser = async (username, password) => {
    try {
      const response = await fetch("http://localhost:4001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login user");
      }

      const { sessionToken } = await response.json();
      setIsLoggedIn(true)
      setUsername(username);
      console.log("Login successful");

      console.log("session", sessionToken);
      return { username, sessionToken };
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login user");
      throw error;
    }
  };

 //Logout
  const handleLogout = async () => {
    try {  
      const response = await fetch("http://localhost:4001/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionToken, username }), 
      });
  
      if (response.ok) {
        setIsLoggedIn(false); 
        setUsername("")
        setSessionToken("")
      } else {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  //Get balance
  const getAccountBalance = async (username) => {
    try {
      const response = await fetch("http://localhost:4001/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, sessionToken }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch account balance");
      }
      const data = await response.json();
      const { balance } = data;
      setBalance(balance); 
    } catch (error) {
      console.error("Error fetching account balance:", error);
    }
  };

  //deposit money
  const depositMoney = async (username, sessionToken, depositAmount) => {
    try {
      const response = await fetch("http://localhost:4001/account/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, sessionToken, depositAmount }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to deposit money");
      }
  
      const data = await response.json();
      const { newBalance } = data; 
      setBalance(newBalance); 
    } catch (error) {
      console.error("Error depositing money:", error);
    }
  };

  //withdraw
  const withdrawMoney = async (username, sessionToken, withdrawAmount) => {
    try {
      const response = await fetch("http://localhost:4001/account/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, sessionToken, withdrawAmount }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to withdraw money");
      }
  
      const data = await response.json();
      const { newBalance } = data; 
      setBalance(newBalance);
    } catch (error) {
      console.error("Error withdrawing money:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        error,
        username,
        createUser,
        loginUser,
        sessionToken,
        setSessionToken,
        withdrawMoney,
        handleLogout,
        isLoggedIn,
        setIsLoggedIn,
        balance,
        setBalance,
        getAccountBalance,
        depositMoney,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
