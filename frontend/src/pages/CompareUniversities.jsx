import {
  useCompare,
} from "../context/CompareContext";

export default function CompareUniversities() {
  const {
    compareItems,
    removeFromCompare,
    clearCompare,
  } = useCompare();

  if (compareItems.length === 0) {
    return (
      <section className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Compare Universities
          </h1>

          <p className="text-gray-400">
            No universities selected
            for comparison.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-bold">
            Compare Universities
          </h1>

          <button
            onClick={clearCompare}
            className="
            bg-red-500
            hover:bg-red-600
            px-5
            py-3
            rounded-xl
            "
          >
            Clear All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table
            className="
            w-full
            glass
            rounded-3xl
            overflow-hidden
            "
          >

            <thead>

              <tr className="border-b border-white/10">

                <th className="p-5 text-left">
                  Feature
                </th>

                {compareItems.map(
                  (university) => (
                    <th
                      key={university._id}
                      className="p-5 text-center"
                    >
                      <div>

                        <img
                          src={
                            university.image
                          }
                          alt={
                            university.name
                          }
                          className="
                          w-28
                          h-20
                          object-cover
                          rounded-xl
                          mx-auto
                          mb-3
                          "
                        />

                        <h3 className="font-bold">
                          {university.name}
                        </h3>

                        <button
                          onClick={() =>
                            removeFromCompare(
                              university._id
                            )
                          }
                          className="
                          text-red-400
                          text-sm
                          mt-2
                          "
                        >
                          Remove
                        </button>

                      </div>
                    </th>
                  )
                )}

              </tr>

            </thead>

            <tbody>

              <tr className="border-b border-white/10">
                <td className="p-5">
                  Location
                </td>

                {compareItems.map(
                  (u) => (
                    <td
                      key={u._id}
                      className="p-5 text-center"
                    >
                      {u.location}
                    </td>
                  )
                )}
              </tr>

              <tr className="border-b border-white/10">
                <td className="p-5">
                  Rating
                </td>

                {compareItems.map(
                  (u) => (
                    <td
                      key={u._id}
                      className="p-5 text-center"
                    >
                      ⭐ {u.rating}
                    </td>
                  )
                )}
              </tr>

              <tr className="border-b border-white/10">
                <td className="p-5">
                  Fees
                </td>

                {compareItems.map(
                  (u) => (
                    <td
                      key={u._id}
                      className="p-5 text-center"
                    >
                      ₹{" "}
                      {Number(
                        u.fees
                      ).toLocaleString()}
                    </td>
                  )
                )}
              </tr>

              <tr className="border-b border-white/10">
                <td className="p-5">
                  Approvals
                </td>

                {compareItems.map(
                  (u) => (
                    <td
                      key={u._id}
                      className="p-5 text-center"
                    >
                      {u.approvals?.join(
                        ", "
                      )}
                    </td>
                  )
                )}
              </tr>

              <tr>
                <td className="p-5">
                  Courses
                </td>

                {compareItems.map(
                  (u) => (
                    <td
                      key={u._id}
                      className="p-5 text-center"
                    >
                      {
                        u.courses
                          ?.length
                      }{" "}
                      Courses
                    </td>
                  )
                )}
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </section>
  );
}