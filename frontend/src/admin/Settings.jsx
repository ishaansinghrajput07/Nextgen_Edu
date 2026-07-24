import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SettingsAdmin() {
  const token = localStorage.getItem("token");

  const [website, setWebsite] = useState({
    websiteName: "",
    supportEmail: "",
    supportPhone: "",
  });

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchSettings();
    fetchProfile();
  }, []);

  // ===============================
  // Website Settings
  // ===============================

  const fetchSettings = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/superadmin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setWebsite(data.settings);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Unable to load settings");
    }
  };

  // ===============================
  // Admin Profile
  // ===============================

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAdmin({
        name: data.user.name,
        email: data.user.email,
        password: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Unable to load profile");
    }
  };

  // ===============================
  // Save Website Settings
  // ===============================

  const saveWebsiteSettings = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:8000/api/v1/superadmin",
        website,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ===============================
  // Update Admin
  // ===============================

  const updateAdmin = async () => {
    try {
      const payload = {
        name: admin.name,
        email: admin.email,
      };

      if (admin.password.trim() !== "") {
        payload.password = admin.password;
      }

      const { data } = await axios.put(
        "http://localhost:8000/api/v1/superadmin/admin-profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);

      setAdmin((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-3xl">
          <h2 className="text-2xl font-semibold mb-6">Website Settings</h2>

          <div className="space-y-4">
            <input
              type="text"
              value={website.websiteName}
              placeholder="Website Name"
              onChange={(e) =>
                setWebsite({
                  ...website,
                  websiteName: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black/20"
            />

            <input
              type="email"
              value={website.supportEmail}
              placeholder="Support Email"
              onChange={(e) =>
                setWebsite({
                  ...website,
                  supportEmail: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black/20"
            />

            <input
              type="text"
              value={website.supportPhone}
              placeholder="Support Phone"
              onChange={(e) =>
                setWebsite({
                  ...website,
                  supportPhone: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black/20"
            />

            <button
              onClick={saveWebsiteSettings}
              className="bg-cyan-500 px-6 py-3 rounded-xl"
            >
              Save Settings
            </button>
          </div>
        </div>

        <div className="glass p-6 rounded-3xl">
          <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>

          <div className="space-y-4">
            <input
              type="text"
              value={admin.name}
              placeholder="Admin Name"
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  name: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black/20"
            />

            <input
              type="email"
              value={admin.email}
              placeholder="Admin Email"
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  email: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black/20"
            />

            <input
              type="password"
              value={admin.password}
              placeholder="New Password"
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  password: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-black/20"
            />

            <button
              onClick={updateAdmin}
              className="bg-green-500 px-6 py-3 rounded-xl"
            >
              Update Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
