import {
  scholarships,
} from "../data/scholarships";

export default function Scholarships() {
  return (
    <section className="pt-32 pb-20">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Scholarships
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {scholarships.map((item) => (
            <div
              key={item.id}
              className="
              glass
              p-6
              rounded-3xl
              "
            >
              <h2 className="text-2xl font-bold">
                {item.title}
              </h2>

              <p className="mt-4 text-cyan-400">
                {item.amount}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}