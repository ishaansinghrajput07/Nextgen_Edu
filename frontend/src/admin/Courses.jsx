import { Plus, Pencil, Trash2, GraduationCap, Clock } from "lucide-react";

import { useState } from "react";

export default function CoursesAdmin() {
  const [courses] = useState([
    {
      id: 1,
      name: "MBA",
      duration: "2 Years",
    },

    {
      id: 2,
      name: "BCA",
      duration: "3 Years",
    },

    {
      id: 3,
      name: "MCA",
      duration: "2 Years",
    },

    {
      id: 4,
      name: "BBA",
      duration: "3 Years",
    },
  ]);

  return (
    <div
      className="
relative
min-h-screen
space-y-8
"
    >
      {/* Background Glow */}

      <div
        className="
absolute
-top-40
-left-40

w-[450px]
h-[450px]

rounded-full

bg-cyan-200/30

blur-[120px]

pointer-events-none
"
      />

      <div
        className="
absolute
right-0
top-40

w-[400px]
h-[400px]

rounded-full

bg-blue-200/20

blur-[120px]

pointer-events-none
"
      />

      {/* Header */}

      <div
        className="
relative
z-10

flex

flex-col

md:flex-row

md:items-center

md:justify-between

gap-5
"
      >
        <div>
          <h1
            className="
text-3xl

font-extrabold

bg-gradient-to-r

from-cyan-500

to-sky-600

bg-clip-text

text-transparent
"
          >
            Courses Management
          </h1>

          <p
            className="
text-slate-500

mt-2
"
          >
            Manage all available courses
          </p>
        </div>

        <button
          className="
flex

items-center

justify-center

gap-2


px-6

py-3


rounded-2xl


bg-gradient-to-r

from-cyan-500

to-sky-600


text-white


font-semibold


shadow-lg

shadow-cyan-200


hover:scale-105


transition-all

duration-300
"
        >
          <Plus size={20} />
          Add Course
        </button>
      </div>

      {/* Course Cards */}

      <div
        className="
relative
z-10

grid

sm:grid-cols-2

xl:grid-cols-4

gap-6
"
      >
        {courses.map((course) => (
          <div
            key={course.id}
            className="
bg-white/70

backdrop-blur-xl

border

border-white/80


rounded-[32px]


p-6


shadow-[0_20px_60px_rgba(14,165,233,.12)]


hover:-translate-y-2


transition-all

duration-300
"
          >
            <div
              className="
flex

items-center

justify-between
"
            >
              <div
                className="
h-14

w-14


rounded-2xl


bg-gradient-to-br

from-cyan-500

to-sky-600


flex

items-center

justify-center
"
              >
                <GraduationCap
                  className="
text-white
"
                />
              </div>

              <span
                className="
px-3

py-1


rounded-full


bg-cyan-100


text-cyan-700


text-xs


font-semibold
"
              >
                Active
              </span>
            </div>

            <h2
              className="
mt-6

text-xl

font-bold

text-slate-800
"
            >
              {course.name}
            </h2>

            <div
              className="
flex

items-center

gap-2

mt-3

text-slate-500
"
            >
              <Clock size={16} />

              <span>{course.duration}</span>
            </div>
            {/* Actions */}

            <div
              className="
flex

gap-3

mt-6
"
            >
              <button
                className="
flex-1

flex

items-center

justify-center

gap-2


py-2.5


rounded-xl


bg-yellow-50


text-yellow-600


border

border-yellow-100


hover:bg-yellow-100


transition
"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                className="
flex-1

flex

items-center

justify-center

gap-2


py-2.5


rounded-xl


bg-red-50


text-red-600


border

border-red-100


hover:bg-red-100


transition
"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}

      <div
        className="
relative

z-10

hidden

lg:block

bg-white/70

backdrop-blur-2xl

border

border-white/80

rounded-[36px]

p-8

shadow-[0_25px_80px_rgba(14,165,233,.12)]
"
      >
        <div
          className="
flex

items-center

justify-between

mb-6
"
        >
          <h2
            className="
text-2xl

font-bold

text-slate-800
"
          >
            Course List
          </h2>

          <span
            className="
px-4

py-2

rounded-full

bg-cyan-100

text-cyan-700

font-semibold

text-sm
"
          >
            {courses.length} Courses
          </span>
        </div>

        <table
          className="
w-full
"
        >
          <thead>
            <tr
              className="
bg-sky-50

text-slate-600
"
            >
              <th
                className="
text-left

p-5

rounded-l-2xl
"
              >
                Course
              </th>

              <th
                className="
text-left

p-5
"
              >
                Duration
              </th>

              <th
                className="
text-left

p-5

rounded-r-2xl
"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                className="
border-b

border-slate-100

hover:bg-cyan-50/50

transition
"
              >
                <td
                  className="
p-5

font-semibold

text-slate-800
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
h-10

w-10


rounded-xl


bg-cyan-100


flex

items-center

justify-center
"
                    >
                      <GraduationCap
                        size={20}
                        className="
text-cyan-600
"
                      />
                    </div>

                    {course.name}
                  </div>
                </td>

                <td
                  className="
p-5
"
                >
                  <span
                    className="
px-4

py-2


rounded-full


bg-sky-100


text-sky-700


text-sm


font-medium
"
                  >
                    {course.duration}
                  </span>
                </td>

                <td
                  className="
p-5
"
                >
                  <div
                    className="
flex

gap-3
"
                  >
                    <button
                      className="
p-3

rounded-xl


bg-yellow-50


text-yellow-600


hover:bg-yellow-100


transition
"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="
p-3

rounded-xl


bg-red-50


text-red-600


hover:bg-red-100


transition
"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Empty Safe */}

      {courses.length === 0 && (
        <div
          className="
relative

z-10

bg-white/70

backdrop-blur-xl

rounded-3xl

p-10

text-center

shadow-lg
"
        >
          <GraduationCap
            size={45}
            className="
mx-auto

text-cyan-500
"
          />

          <h2
            className="
mt-4

text-xl

font-bold

text-slate-700
"
          >
            No Courses Found
          </h2>

          <p
            className="
text-slate-500

mt-2
"
          >
            Add your first course
          </p>
        </div>
      )}
    </div>
  );
}
