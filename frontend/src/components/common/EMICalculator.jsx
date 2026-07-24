import { useState } from "react";

export default function EMICalculator() {
  const [fees, setFees] = useState("");
  const [months, setMonths] = useState("");

  const emi =
    fees && months
      ? Math.round(fees / months)
      : 0;

  return (
    <div className="glass p-8 rounded-3xl">

      <h2 className="text-3xl font-bold mb-6">
        EMI Calculator
      </h2>

      <input
        type="number"
        placeholder="Course Fees"
        value={fees}
        onChange={(e) =>
          setFees(e.target.value)
        }
        className="
        w-full
        p-4
        rounded-xl
        bg-black/20
        mb-4
        "
      />

      <input
        type="number"
        placeholder="Months"
        value={months}
        onChange={(e) =>
          setMonths(e.target.value)
        }
        className="
        w-full
        p-4
        rounded-xl
        bg-black/20
        mb-6
        "
      />

      <div className="text-2xl font-bold">
        Monthly EMI: ₹{emi}
      </div>

    </div>
  );
}