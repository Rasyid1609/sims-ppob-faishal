import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Navbar from "../components/layout/Navbar";

import ProfileCard from "../components/profile/ProfileCard";
import BalanceCard from "../components/profile/BalanceCard";

import TransactionItem from "../components/transaction/TransactionItem";

import {
  getTransactionHistory,
  resetHistories,
} from "../features/transaction/transactionSlice";

export default function TransactionPage() {
  const dispatch = useDispatch();

  const [offset, setOffset] =
    useState(0);

  const {
    histories,
    loading,
  } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(resetHistories());

    dispatch(
      getTransactionHistory(0)
    );
  }, [dispatch]);

  useEffect(() => {
    if (offset !== 0) {
      dispatch(
        getTransactionHistory(offset)
      );
    }
  }, [dispatch, offset]);

  const handleShowMore = () => {
    setOffset((prev) => prev + 5);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8">
          <ProfileCard />
          <BalanceCard />
        </div>

        {/* History */}
        <div className="mt-12">
          <h1 className="text-2xl font-bold mb-6">
            Semua Transaksi
          </h1>

          {histories?.map(
            (item, index) => (
              <TransactionItem
                key={index}
                item={item}
              />
            )
          )}

          {/* Show More */}
          <div className="text-center mt-8">
            <button
              onClick={handleShowMore}
              disabled={loading}
              className="
                text-red-500
                font-semibold
              "
            >
              {loading
                ? "Loading..."
                : "Show More"}
            </button>
          </div>
        </div>
        </div>
      </div>

    </>
  );
}