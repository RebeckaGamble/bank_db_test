"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function UserAccount() {
  const [loading, setLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [updateBalance, setUpdateBalance] = useState(false);
  const {
    isLoggedIn,
    balance,
    username,
    sessionToken,
    depositMoney,
    withdrawMoney,
    getAccountBalance,
  } = useAuthContext();

  const handleDeposit = async (e) => {
    e.preventDefault();

    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      try {
        setLoading(true);
        await depositMoney(username, sessionToken, amount);
        setDepositAmount("");
        setUpdateBalance((prev) => !prev);
        console.log("Deposit successful");
      } catch (error) {
        console.error("Error depositing money:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (username && sessionToken) {
      setLoading(true);
      getAccountBalance(username, sessionToken)
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching account balance:", error);
          setLoading(false);
        });
    }
  }, [username, sessionToken, updateBalance]); //depositAmount, balance,

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const amount = parseFloat(withdrawAmount);
    if (amount > 0) {
      try {
        setLoading(true);
        await withdrawMoney(username, sessionToken, amount);
        setWithdrawAmount("");
        setUpdateBalance((prev) => !prev);
        console.log("Withdrawal successful");
      } catch (error) {
        console.error("Error withdrawing money:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full justify-center pt-10 flex mx-auto">
        {" "}
        <div className="text-[18px]">
          You must log in to your account, go to{" "}
          <Link href="/login" className="text-blue-700 dark:text-blue-300">login</Link>.
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-[90rem] mx-auto w-full h-auto py-10 lg:py-20">
      <h3 className="text-center font-semibold text-[20px] py-4">
        My Account - username: {username}
      </h3>
      <div className="w-full items-center mx-auto flex flex-col">
        <div className="py-10">
          <h3 className="font-semibold">
            Balance:{" "}
            {loading ? (
              <div>Loading...</div>
            ) : (
              <span> balance here: {balance} SEK</span>
            )}
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-semibold">Deposit money</h3>
            <input
              onChange={(e) => setDepositAmount(e.target.value)}
              pattern="[0-9]*"
              type="text"
              value={depositAmount}
              className="border border-slate-500 px-2 py-1 dark:bg-[#414142]"
            />
            <button
              onClick={handleDeposit}
              className="w-[104px] py-1.5 text-white hover:font-semibold tracking-wider ml-3 dark:bg-[#414142]"
            >
              <p className=" w-fit mx-auto hover:border-b hover:border-white">
                Deposit
              </p>
            </button>
          </div>
          <div>
            <h3 className="font-semibold">Withdraw money</h3>
            <input
              onChange={(e) => setWithdrawAmount(e.target.value)}
              pattern="[0-9]*"
              type="text"
              value={withdrawAmount}
              className="border border-slate-500 px-2 py-1 dark:bg-[#414142]"
            />
            <button
              onClick={handleWithdraw}
              className="w-[104px] py-1.5 text-white hover:font-semibold tracking-wider ml-3 dark:bg-[#414142]"
            >
              <p className=" w-fit mx-auto hover:border-b hover:border-white">
                Withdraw
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
