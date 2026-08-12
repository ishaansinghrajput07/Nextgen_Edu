import { useEffect, useState } from "react";

import { Users, IndianRupee, BadgePercent, GraduationCap } from "lucide-react";

export default function Admissions() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students") || "[]");

    setStudents(data);
  }, []);

  const totalStudents = students.length;

  const totalFees = students.reduce(
    (total, student) => total + Number(student.fee || 0),
    0,
  );

  const totalCommission = students.reduce(
    (total, student) => total + Number(student.commission || 0),
    0,
  );

  return (
    <div
      className="
space-y-8
"
    >
      {/* Page Header */}

      <div>
        <h1
          className="
text-3xl

md:text-4xl

font-extrabold


bg-gradient-to-r

from-cyan-500

to-sky-600


bg-clip-text

text-transparent

"
        >
          Admissions & Commission
        </h1>

        <p
          className="
text-slate-500

mt-2
"
        >
          Manage student admissions, fees and commission tracking
        </p>
      </div>

      {/* Stats Cards */}

      <div
        className="
grid

grid-cols-1

sm:grid-cols-2

xl:grid-cols-4

gap-5

"
      >
        {/* Total Students */}

        <div
          className="
bg-white/70

backdrop-blur-xl


border

border-white/80


rounded-3xl


p-6


shadow-[0_20px_60px_rgba(14,165,233,.12)]


flex

items-center

gap-4


hover:-translate-y-1


transition-all

duration-300

"
        >
          <div
            className="
h-14

w-14


rounded-2xl


bg-cyan-100


flex

items-center

justify-center

"
          >
            <Users className="text-cyan-600" />
          </div>

          <div>
            <p
              className="
text-sm

text-slate-500
"
            >
              Total Students
            </p>

            <h2
              className="
text-2xl

font-bold

text-slate-800

"
            >
              {totalStudents}
            </h2>
          </div>
        </div>

        {/* Total Fees */}

        <div
          className="
bg-white/70

backdrop-blur-xl


border

border-white/80


rounded-3xl


p-6


shadow-[0_20px_60px_rgba(14,165,233,.12)]


flex

items-center

gap-4


hover:-translate-y-1


transition-all

duration-300

"
        >
          <div
            className="
h-14

w-14


rounded-2xl


bg-sky-100


flex

items-center

justify-center

"
          >
            <IndianRupee className="text-sky-600" />
          </div>

          <div>
            <p
              className="
text-sm

text-slate-500
"
            >
              Admission Fees
            </p>

            <h2
              className="
text-2xl

font-bold

text-slate-800

"
            >
              ₹{totalFees}
            </h2>
          </div>
        </div>

        {/* Commission */}

        <div
          className="
bg-white/70

backdrop-blur-xl


border

border-white/80


rounded-3xl


p-6


shadow-[0_20px_60px_rgba(14,165,233,.12)]


flex

items-center

gap-4


hover:-translate-y-1


transition-all

duration-300

"
        >
          <div
            className="
h-14

w-14


rounded-2xl


bg-emerald-100


flex

items-center

justify-center

"
          >
            <BadgePercent className="text-emerald-600" />
          </div>

          <div>
            <p
              className="
text-sm

text-slate-500
"
            >
              Total Commission
            </p>

            <h2
              className="
text-2xl

font-bold

text-slate-800

"
            >
              ₹{totalCommission}
            </h2>
          </div>
        </div>

        {/* Courses */}

        <div
          className="
bg-white/70

backdrop-blur-xl


border

border-white/80


rounded-3xl


p-6


shadow-[0_20px_60px_rgba(14,165,233,.12)]


flex

items-center

gap-4


hover:-translate-y-1


transition-all

duration-300

"
        >
          <div
            className="
h-14

w-14


rounded-2xl


bg-purple-100


flex

items-center

justify-center

"
          >
            <GraduationCap className="text-purple-600" />
          </div>

          <div>
            <p
              className="
text-sm

text-slate-500
"
            >
              Courses
            </p>

            <h2
              className="
text-2xl

font-bold

text-slate-800

"
            >
              {new Set(students.map((item) => item.course)).size}
            </h2>
          </div>
        </div>
      </div>

      {/* Table Card */}

      <div
        className="
bg-white/70


backdrop-blur-2xl


border

border-white/80


rounded-[32px]


shadow-[0_25px_80px_rgba(14,165,233,.12)]


overflow-hidden

"
      >
        <div
          className="
p-6

border-b

border-slate-100

"
        >
          <h2
            className="
text-xl

font-bold

text-slate-800

"
          >
            Admission Records
          </h2>
        </div>

        <div
          className="
overflow-x-auto

"
        >
          <table
            className="
w-full

min-w-[900px]

"
          >
            <thead>
              <tr
                className="
bg-sky-50/70

text-slate-600

"
              >
                <th className="p-5 text-left">Student</th>

                <th className="p-5 text-left">University</th>

                <th className="p-5 text-left">Course</th>

                <th className="p-5 text-left">Fee</th>

                <th className="p-5 text-left">Commission</th>

                <th className="p-5 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="
border-t

border-slate-100


hover:bg-cyan-50/50


transition-all

duration-300

"
                  >
                    {/* Student */}

                    <td
                      className="
p-5

"
                    >
                      <div
                        className="
flex

items-center

gap-3

"
                      >
                        <div
                          className="
h-11

w-11


rounded-full


bg-gradient-to-br

from-cyan-400

to-sky-500


flex

items-center

justify-center


text-white


font-bold

"
                        >
                          {student.name

                            ?.charAt(0)

                            ?.toUpperCase()}
                        </div>

                        <div>
                          <p
                            className="
font-semibold

text-slate-800

"
                          >
                            {student.name}
                          </p>

                          <p
                            className="
text-xs

text-slate-500

"
                          >
                            Student
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* University */}

                    <td
                      className="
p-5

text-slate-700

font-medium

"
                    >
                      {student.university || "-"}
                    </td>

                    {/* Course */}

                    <td
                      className="
p-5

"
                    >
                      <span
                        className="
px-3

py-1.5


rounded-full


bg-sky-100


text-sky-700


text-sm


font-medium

"
                      >
                        {student.course || "-"}
                      </span>
                    </td>

                    {/* Fee */}

                    <td
                      className="
p-5

font-semibold

text-slate-700

"
                    >
                      ₹{student.fee || 0}
                    </td>

                    {/* Commission */}

                    <td
                      className="
p-5

"
                    >
                      <span
                        className="
px-3

py-1.5


rounded-full


bg-emerald-100


text-emerald-700


font-semibold


text-sm

"
                      >
                        ₹{student.commission || 0}
                      </span>
                    </td>

                    {/* Status */}

                    <td
                      className="
p-5

"
                    >
                      <span
                        className={`

px-4

py-1.5


rounded-full


text-sm


font-semibold



${
  student.status === "Approved"
    ? "bg-emerald-100 text-emerald-700"
    : student.status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-slate-100 text-slate-600"
}

`}
                      >
                        {student.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="
p-12

text-center

"
                  >
                    <div
                      className="
flex

flex-col

items-center

gap-3

"
                    >
                      <div
                        className="
h-16

w-16


rounded-2xl


bg-cyan-100


flex

items-center

justify-center

"
                      >
                        <GraduationCap
                          className="
text-cyan-600

"
                          size={30}
                        />
                      </div>

                      <h3
                        className="
text-lg

font-semibold

text-slate-700

"
                      >
                        No Admissions Found
                      </h3>

                      <p
                        className="
text-slate-500

text-sm

"
                      >
                        Student admission records will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
