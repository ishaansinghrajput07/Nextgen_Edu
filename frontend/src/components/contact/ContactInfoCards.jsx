// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { GraduationCap, ArrowRight } from "lucide-react";

// export default function CourseCard({ course, onApply }) {
//   // Safe extraction of title
//   const rawName = course?.courseName || "Course";
//   const displayTitle = rawName.toLowerCase().startsWith("online")
//     ? rawName
//     : `Online ${rawName}`;

//   // Color options for top-left square box
//   const iconColors = [
//     "bg-sky-500",
//     "bg-rose-500",
//     "bg-emerald-500",
//     "bg-indigo-500",
//     "bg-amber-500",
//     "bg-cyan-500",
//   ];
  
//   // Pick deterministic color based on course title
//   const colorIndex =
//     Math.abs(
//       displayTitle
//         .split("")
//         .reduce((acc, char) => acc + char.charCodeAt(0), 0)
//     ) % iconColors.length;

//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       transition={{ duration: 0.2 }}
//       className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-sky-300 hover:shadow-md"
//     >
//       <div>
//         {/* Top Bar: Icon Box & Badge */}
//         <div className="flex items-start justify-between gap-2">
//           <div
//             className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${iconColors[colorIndex]}`}
//           >
//             {course?.university?.universityLogo ? (
//               <img
//                 src={course.university.universityLogo}
//                 alt={course.university?.universityName || "University"}
//                 className="h-7 w-7 object-contain rounded"
//               />
//             ) : (
//               <GraduationCap size={26} />
//             )}
//           </div>

//           <span className="rounded-full bg-orange-100/90 px-3 py-1 text-xs font-bold text-orange-700">
//             High Demand
//           </span>
//         </div>

//         {/* Titles */}
//         <div className="mt-3">
//           <h3 className="text-base font-bold text-blue-700 line-clamp-1 group-hover:text-blue-800">
//             {displayTitle}
//           </h3>
//           <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">
//             {course?.university?.universityName || "Degree Program"}
//           </p>
//         </div>

//         {/* Course Mode / Category line */}
//         <p className="mt-2 text-xs font-medium text-slate-500 line-clamp-1">
//           {course?.courseMode || "Online & Distance Learning"} Mode
//         </p>
//       </div>

//       {/* Middle/Bottom Metadata Pills */}
//       <div className="mt-4 flex flex-wrap items-center gap-1.5">
//         <span className="rounded-md bg-slate-100/80 px-2.5 py-1 text-[11px] font-medium text-slate-700">
//           Duration: {course?.duration || "N/A"}
//         </span>
//         <span className="rounded-md bg-slate-100/80 px-2.5 py-1 text-[11px] font-medium text-slate-700">
//           Fees: ₹{Number(course?.fees || 0).toLocaleString("en-IN")}
//         </span>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
//         <button
//           onClick={onApply}
//           className="flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:shadow-md"
//         >
//           Apply Now
//           <ArrowRight size={13} />
//         </button>

//         <Link
//           to={`/courses/${course?.slug || ""}`}
//           className="flex items-center justify-center gap-1 rounded-xl border border-sky-200 bg-sky-50/50 px-3 py-2 text-xs font-bold text-sky-700 transition hover:bg-sky-100/50"
//         >
//           Details
//           <ArrowRight size={13} />
//         </Link>
//       </div>
//     </motion.div>
//   );
// }