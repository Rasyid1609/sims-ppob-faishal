import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";

import Navbar from "../components/layout/Navbar";
import ProfileCard from "../components/profile/ProfileCard";
import BalanceCard from "../components/profile/BalanceCard";

import QuickAmount from "../components/topup/QuickAmount";

import { topUpBalance } from "../features/balance/balanceSlice";

export default function TopUpPage() {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const isValidAmount =
  Number(amount) >= 10000 &&
  Number(amount) <= 1000000;

  const nominals = [
    10000,
    20000,
    50000,
    100000,
    250000,
    500000,
  ];

  const handleTopUp = async () => {
    if (!amount) return;

    await dispatch(
      topUpBalance(Number(amount))
    );

    alert("Top Up berhasil");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid lg:grid-cols-2 gap-8">
                <ProfileCard />
                <BalanceCard />
            </div>

            <div className="mt-12">
                <p className="text-gray-500">
                    Silahkan masukkan
                </p>

                <h1 className="text-3xl font-bold">
                    Nominal Top Up
                </h1>

            <div className="grid lg:grid-cols-2 gap-5 mt-8">
                {/* Input */}
                <div>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Masukkan nominal Top Up"
                        className="
                            w-full
                            border
                            rounded-md
                            p-4
                            outline-none"
                    />

                    <button
                        onClick={handleTopUp}
                        disabled={!isValidAmount}
                        className={`
                            w-full
                            mt-4
                            py-3
                            rounded-md
                            text-white
                            transition

                            ${
                            isValidAmount
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-gray-300 cursor-not-allowed"
                            }
                        `}
                        >
                            Top Up
                    </button>
                </div>

                {/* Quick Nominal */}
                <div className="grid grid-cols-3 gap-3">
                    {nominals.map((nominal) => (
                        <QuickAmount
                            key={nominal}
                            amount={nominal}
                            onClick={(value) =>
                                setAmount(value.toString())
                            }
                        />
                    ))}
                </div>
            </div>
            </div>
        </div>
      </div>

      
    </>
  );
}
