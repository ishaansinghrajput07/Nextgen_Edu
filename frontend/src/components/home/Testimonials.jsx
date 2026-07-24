// const reviews = [
//   {
//     name: "Rahul Sharma",
//     course: "Online MBA",
//     text: "The counselling team helped me choose the right university. The admission process was smooth and hassle-free.",
//   },
//   {
//     name: "Priya Singh",
//     course: "BBA",
//     text: "I received complete guidance from course selection to admission confirmation. Highly recommended.",
//   },
//   {
//     name: "Aman Verma",
//     course: "MCA",
//     text: "Professional support and quick responses. The counsellors were extremely helpful throughout the process.",
//   },
// ];

// export default function Testimonials() {
//   return (
//     <section className="py-24">

//       <div className="max-w-7xl mx-auto px-6">

//         <div className="text-center mb-14">

//           <h2 className="text-5xl font-bold">
//             What Students Say
//           </h2>

//           <p className="text-gray-400 mt-4">
//             Success stories from students
//             who secured admissions through
//             NextGenEdu.
//           </p>

//         </div>

//         <div className="grid md:grid-cols-3 gap-6">

//           {reviews.map((item) => (

//             <div
//               key={item.name}
//               className="
//               glass
//               p-8
//               rounded-3xl
//               "
//             >

//               <div className="mb-5">
//                 ⭐⭐⭐⭐⭐
//               </div>

//               <p className="text-gray-300 leading-7">
//                 "{item.text}"
//               </p>

//               <div className="mt-6">

//                 <h3 className="font-bold text-xl">
//                   {item.name}
//                 </h3>

//                 <p className="text-cyan-400">
//                   {item.course}
//                 </p>

//               </div>

//             </div>

//           ))}

//         </div>

//       </div>

//     </section>
//   );
// }