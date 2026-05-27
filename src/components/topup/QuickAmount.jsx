import React from 'react'

export default function QuickAmount({
    amount,
    onClick,
}) {
  return (
    <button
      onClick={() => onClick(amount)}
      className="
        border
        rounded-md
        p-3
        hover:border-red-500
      "
    >
      Rp {amount.toLocaleString("id-ID")}
    </button>
  );
}
