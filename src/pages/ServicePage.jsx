import { useParams } from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import Navbar from "../components/layout/Navbar";
import ProfileCard from "../components/profile/ProfileCard";
import BalanceCard from "../components/profile/BalanceCard";

import { serviceIcons } from "../constants/serviceIcons";

import {
  createTransaction,
} from "../features/transaction/transactionSlice";

import {
  getBalance,
} from "../features/balance/balanceSlice";

export default function ServicePage() {
  const { serviceCode } = useParams();

  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.transaction
  );

  const services = useSelector(
    (state) => state.service.data
  );

  const service = services.find(
    (item) =>
      item.service_code === serviceCode
  );

  const handlePayment = async () => {
    const result = await dispatch(
      createTransaction(serviceCode)
    );

    if (
      result.meta.requestStatus ===
      "fulfilled"
    ) {
      dispatch(getBalance());

      alert("Pembayaran berhasil");
    }
  };

  if (!service) {
    return (
      <div className="p-10">
        Service tidak ditemukan
      </div>
    );
  }

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

        {/* Payment */}
        <div className="mt-12">
          <p className="text-gray-500">
            Pembayaran
          </p>

          {/* Service Info */}
          <div className="flex items-center gap-3 mt-2">
            <img
              src={
                serviceIcons[
                  service.service_code
                ]
              }
              alt={service.service_name}
              className="w-10 h-10"
            />

            <h1 className="text-3xl font-bold">
              {service.service_name}
            </h1>
          </div>

          {/* Nominal */}
          <input
            disabled
            value={`Rp ${service.service_tariff.toLocaleString(
              "id-ID"
            )}`}
            className="
              w-full
              mt-8
              border
              rounded-md
              p-4
              font-semibold
            "
          />

          {/* Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`
              w-full
              mt-4
              py-3
              rounded-md
              text-white
              transition

              ${
                loading
                  ? "bg-gray-400"
                  : "bg-red-500 hover:bg-red-600"
              }
            `}
          >
            {loading
              ? "Memproses..."
              : "Bayar"}
          </button>
        </div>
        </div>
      </div>

      
    </>
  );
}