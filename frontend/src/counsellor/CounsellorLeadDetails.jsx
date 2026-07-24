import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CounsellorLeadDetails() {
  console.log("CounsellorLeadDetails Rendered");
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [status, setStatus] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLead();
  }, [id]);


  const updateStatus = async () => {
  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/contact/my-lead/${id}`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLead(data.contact);

    toast.success("Status Updated");
  } catch (error) {
    console.log(error);
    toast.error("Failed");
  }
};



const fetchLead = async () => {
  try {

    console.log(id);

    const { data } = await axios.get(
      `http://localhost:8000/api/v1/contact/my-lead/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(data);

    setLead(data.contact);
    setNotes(data.contact.notes || "");
    setStatus(data.contact.status || "");

  } catch (error) {

    console.log(error.response?.data);
    console.log(error.response?.status);
    console.log(error);

  }
};

  // =========================
  // Save Notes
  // =========================

  const saveNotes = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/contact/my-lead/${id}`,
        {
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       console.log(data); // Ye print karo

      setLead(data.contact);

      toast.success("Notes Saved");
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  // =========================
  // Add Follow Up
  // =========================

  const addFollowUp = async () => {
    if (!followUp.trim()) return;

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/contact/my-lead/${id}`,
        {
          followUps: [
            ...(lead.followUps || []),
            {
              text: followUp,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       console.log(data); // Ye print karo

      setLead(data.contact);

      setFollowUp("");

      toast.success("Follow Up Added");
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  if (!lead) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        {lead.username}
      </h1>

      <div className="glass p-6 rounded-3xl mb-8">
        <p>
          <b>Email:</b> {lead.email}
        </p>

        <p>
          <b>Phone:</b> {lead.phoneNumber}
        </p>

        <p>
          <b>Course:</b> {lead.interestedCourse}
        </p>

        <p>
          <b>Status:</b> {lead.status}
        </p>


        <div className="mt-4">
  <label className="block mb-2 font-semibold">
    Status
  </label>

  <div className="flex gap-3">

    <select
      value={status}
      onChange={(e) =>
        setStatus(e.target.value)
      }
      className="bg-black/20 p-3 rounded-xl"
    >
      <option value="New">New</option>
      <option value="Contacted">
        Contacted
      </option>
      <option value="Interested">
        Interested
      </option>
      <option value="Follow Up">
        Follow Up
      </option>
      <option value="Converted">
        Converted
      </option>
      <option value="Closed">
        Closed
      </option>
    </select>

    <button
      onClick={updateStatus}
      className="bg-yellow-500 px-5 rounded-xl"
    >
      Update
    </button>

  </div>
</div>
      </div>

      <div className="glass p-6 rounded-3xl mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Notes
        </h2>

        <textarea
          rows="5"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-black/20"
        />

        <button
          onClick={saveNotes}
          className="mt-4 bg-cyan-500 px-6 py-3 rounded-xl"
        >
          Save Notes
        </button>
      </div>

      <div className="glass p-6 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">
          Follow Ups
        </h2>

        {lead.followUps?.length > 0 &&
          lead.followUps.map((item) => (
            <div
              key={item._id}
              className="mb-3 p-3 rounded-xl bg-black/20"
            >
              <p>{item.text}</p>

              <small>
                {new Date(
                  item.date
                ).toLocaleString()}
              </small>
            </div>
          ))}

        <textarea
          rows="3"
          value={followUp}
          onChange={(e) =>
            setFollowUp(e.target.value)
          }
          placeholder="Add Follow Up"
          className="w-full p-4 rounded-xl bg-black/20 mt-4"
        />

        <button
          onClick={addFollowUp}
          className="mt-4 bg-green-500 px-6 py-3 rounded-xl"
        >
          Add Follow Up
        </button>
      </div>
    </div>
  );
}