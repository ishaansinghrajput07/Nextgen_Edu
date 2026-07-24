import axios from "axios";
import {
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

export default function CounsellorLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear Local Storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("counsellor");

      toast.success("Logout Successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);

      // Even if API fails, clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("counsellor");

      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <aside
        className="
        w-72
        bg-black/30
        border-r
        border-white/10
        p-6
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-10
          "
        >
          Counsellor Panel
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            to="/counsellor"
            className="
            p-3
            rounded-xl
            bg-white/5
            hover:bg-white/10
            "
          >
            Dashboard
          </Link>

          <Link
            to="/counsellor/leads"
            className="
            p-3
            rounded-xl
            bg-white/5
            hover:bg-white/10
            "
          >
            My Leads
          </Link>

          <Link
            to="/counsellor/profile"
            className="
            p-3
            rounded-xl
            bg-white/5
            hover:bg-white/10
            "
          >
            Profile
          </Link>

          <button
            onClick={logout}
            className="
            p-3
            rounded-xl
            bg-red-500
            hover:bg-red-600
            text-left
            "
          >
            Logout
          </button>

        </nav>
      </aside>

      {/* Main */}
      <main
        className="
        flex-1
        p-8
        "
      >
        <Outlet />
      </main>

    </div>
  );
}