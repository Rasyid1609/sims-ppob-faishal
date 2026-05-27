import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../../features/balance/balanceSlice";
import bgSaldo from "../../assets/bg-saldo.png";

export default function BalanceCard() {
    const dispatch = useDispatch();

    const [showBalance, setShowBalance] =
        useState(false);

    const { data } = useSelector(
        (state) => state.balance
    );

    useEffect(() => {
        dispatch(getBalance());
    }, [dispatch]);
  return (
    <div className="bg-red-500 rounded-2xl p-6 text-white bg-img" style={{ backgroundImage: `url(${bgSaldo})` }}>
      <p>Saldo anda</p>

      <h2 className="text-3xl font-bold mt-4">
        {showBalance
          ? `Rp ${data?.balance?.toLocaleString()}`
          : "Rp ••••••••"}
      </h2>

      <button
        onClick={() =>
          setShowBalance(!showBalance)
        }
        className="mt-4 text-sm"
      >
        {showBalance
          ? "Sembunyikan Saldo"
          : "Lihat Saldo"}
      </button>
    </div>
  );
}
