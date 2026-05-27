export default function TransactionItem({
  item,
}) {
  const isTopUp =
    item.transaction_type === "TOPUP";

  return (
    <div
      className="
        border
        rounded-xl
        p-4
        mb-4
      "
    >
      <div className="flex justify-between items-start">
        {/* Left */}
        <div>
          <h2
            className={`
              text-2xl
              font-bold

              ${
                isTopUp
                  ? "text-green-500"
                  : "text-red-500"
              }
            `}
          >
            {isTopUp ? "+" : "-"} Rp{" "}
            {item.total_amount.toLocaleString(
              "id-ID"
            )}
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            {new Date(
              item.created_on
            ).toLocaleString("id-ID")}
          </p>
        </div>

        {/* Right */}
        <p className="text-sm text-gray-500">
          {item.description}
        </p>
      </div>
    </div>
  );
}