import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/v1/student/allstudents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStudents(res.data.students);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    getStudents();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-8">Students</h1>

      <div
        className="
  bg-white
  dark:bg-slate-900
  rounded-3xl
  shadow-lg
  overflow-hidden
  flex-1
  min-w-0
  "
      >
        {/* ONLY TABLE SCROLLABLE */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-max">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">Phone</th>

                <th className="p-4 text-left">Course</th>

                <th className="p-4 text-left">Counsellor</th>

                <th className="p-4 text-left">Admission Date</th>

                {/* Commission Module */}

                <th className="p-4 text-left">University</th>

                <th className="p-4 text-left">Country</th>

                <th className="p-4 text-left">Tuition Fee</th>

                <th className="p-4 text-left">Commission %</th>

                <th className="p-4 text-left">Commission Amount</th>

                <th className="p-4 text-left">Payment Status</th>

                <th className="p-4 text-left">Payment Date</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan="14"
                    className="
                    text-center
                    py-8
                    "
                  >
                    No Students Found
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="p-4">{student.studentName}</td>

                    <td className="p-4">{student.email}</td>

                    <td className="p-4">{student.phoneNumber}</td>

                    <td className="p-4">{student.course}</td>

                    <td className="p-4">{student.counsellor?.name || "-"}</td>

                    <td className="p-4">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">{student.university || "-"}</td>

                    <td className="p-4">{student.country || "-"}</td>

                    <td className="p-4">{student.tuitionFee || "-"}</td>

                    <td className="p-4">{student.commissionPercent || "-"}</td>

                    <td className="p-4">{student.commissionAmount || "-"}</td>

                    <td className="p-4">
                      {student.paymentStatus || "Pending"}
                    </td>

                    <td className="p-4">
                      {student.paymentDate
                        ? new Date(student.paymentDate).toLocaleDateString(
                            "en-IN",
                          )
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
