import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
export default function LeadDetails() {
  const { id } = useParams();

  const token = localStorage.getItem("token");
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const [followUpText, setFollowUpText] = useState("");

  const [followUps, setFollowUps] = useState([]);

  const [applicationStatus, setApplicationStatus] = useState("Not Applied");

  const [university, setUniversity] = useState("");

  const [country, setCountry] = useState("");

  const [tuitionFee, setTuitionFee] = useState("");

  const [commissionPercent, setCommissionPercent] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("Pending");

  //useeffect
  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/contact/admin/contacts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const leadData = res.data.contact;

      setLead(leadData);

      setNotes(leadData.notes || "");

      setFollowUps(leadData.followUps || []);

      setApplicationStatus(leadData.applicationStatus || "Not Applied");

      setUniversity(leadData.university || "");

      setCountry(leadData.country || "");

      setTuitionFee(leadData.tuitionFee || "");

      setCommissionPercent(leadData.commissionPercent || "");

      setPaymentStatus(leadData.paymentStatus || "Pending");

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);

      toast.error("Lead not found");
    }
  };

  const saveNotes = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/contact/admin/contacts/${id}`,
        {
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Notes Saved Successfully");

      fetchLead();
    } catch (error) {
      console.log(error);

      toast.error("Failed to save notes");
    }
  };

  const addFollowUp = async () => {
    if (!followUpText.trim()) {
      toast.error("Please enter follow up");

      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/api/v1/contact/admin/contacts/${id}`,
        {
          followUps: [
            ...followUps,
            {
              text: followUpText,
              date: new Date(),
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFollowUpText("");

      toast.success("Follow Up Added");

      fetchLead();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add follow up");
    }
  };

  const saveApplicationStatus = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/contact/admin/contacts/${id}`,
        {
          applicationStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Application Status Updated");

      fetchLead();
    } catch (error) {
      console.log(error);

      toast.error("Failed to update");
    }
  };

  const saveCommissionDetails = async () => {
    try {
      const commissionAmount =
        (Number(tuitionFee) * Number(commissionPercent)) / 100;

      await axios.put(
        `http://localhost:8000/api/v1/contact/admin/contacts/${id}`,
        {
          university,
          country,
          tuitionFee,
          commissionPercent,
          commissionAmount,
          paymentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Commission Saved");

      fetchLead();
    } catch (error) {
      console.log(error);

      toast.error("Failed to save");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!lead) {
    return (
      <div className="p-8">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Lead Not Found</h2>

          <p className="text-gray-500">The requested lead does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Lead Details</h1>

        <span className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-medium">
          #{lead.id || lead._id || "N/A"}
        </span>
      </div>

      {/* Lead Information */}

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg rounded-3xl p-8">
        <div className="grid md:grid-cols-2 gap-6">
          <InfoField label="Full Name" value={lead.username || "-"} />

          <InfoField label="Email" value={lead.email || "-"} />

          <InfoField label="Phone" value={lead.phoneNumber || "-"} />

          <InfoField label="Course" value={lead.interestedCourse || "-"} />

          <InfoField label="Status" value={lead.status || "New"} />

          <InfoField
            label="Assigned Counsellor"
            value={lead.assignedTo?.name || "Not Assigned"}
          />

          <InfoField label="Source" value={lead.source || "-"} />

          <InfoField
            label="Created At"
            value={
              lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "-"
            }
          />
        </div>
      </div>

      {/* Notes Section */}

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg rounded-3xl p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Notes</h2>

        <textarea
          rows={6}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes here..."
          className="
            w-full
            p-4
            rounded-xl
            border
            border-gray-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
          "
        />

        <button
          onClick={saveNotes}
          className="
            mt-4
            bg-cyan-500
            hover:bg-cyan-600
            text-white
            px-6
            py-3
            rounded-xl
            transition
          "
        >
          Save Notes
        </button>
      </div>
      {/* Follow Up History */}

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg rounded-3xl p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">Follow Up History</h2>

        <div className="space-y-4 mb-6">
          {followUps.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No Follow Ups Yet
            </p>
          ) : (
            followUps
              .slice()
              .reverse()
              .map((item) => (
                <div
                  key={item.id}
                  className="
                    border-l-4
                    border-cyan-500
                    pl-4
                    py-3
                    bg-gray-50
                    dark:bg-slate-800
                    rounded-r-xl
                  "
                >
                  <p className="font-medium">{item.text}</p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.date}
                  </p>
                </div>
              ))
          )}
        </div>

        <textarea
          rows={4}
          value={followUpText}
          onChange={(e) => setFollowUpText(e.target.value)}
          placeholder="Add Follow Up..."
          className="
            w-full
            p-4
            rounded-xl
            border
            border-gray-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />

        <button
          onClick={addFollowUp}
          className="
            mt-4
            bg-green-500
            hover:bg-green-600
            text-white
            px-6
            py-3
            rounded-xl
            transition
          "
        >
          Add Follow Up
        </button>
      </div>

      {/* activityTimeline */}
      <div className="mt-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Activity Timeline</h2>

        <div className="space-y-4">
          {lead.activityTimeline?.map((item, index) => (
            <div
              key={index}
              className="
          border-l-4
          border-cyan-500
          pl-4
          "
            >
              <h3 className="font-semibold">{item.type}</h3>

              <p>{item.description}</p>

              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Status History */}

      <div className="mt-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Status History</h2>

        {lead.statusHistory?.map((item, index) => (
          <div
            key={index}
            className="
        flex
        justify-between
        border-b
        py-3
        "
          >
            <span>{item.status}</span>

            <span>{item.date}</span>
          </div>
        ))}
      </div>

      {/* University Application */}

      {lead.status === "Converted" ? (
        <div className="mt-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">University Application</h2>

          <select
            value={applicationStatus}
            onChange={(e) => setApplicationStatus(e.target.value)}
            className="
    w-full
    p-4
    rounded-xl
    border
    border-gray-300
    dark:border-slate-700
    bg-white
    dark:bg-slate-800
  "
          >
            <option value="Not Applied">Not Applied</option>

            <option value="Application Started">Application Started</option>

            <option value="Documents Pending">Documents Pending</option>

            <option value="Submitted">Submitted</option>

            <option value="Offer Received">Offer Received</option>

            <option value="Enrolled">Enrolled</option>

            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={saveApplicationStatus}
            className="
    mt-4
    bg-blue-500
    hover:bg-blue-600
    text-white
    px-6
    py-3
    rounded-xl
  "
          >
            Save Application Status
          </button>

          <div className="mt-4">
            <span
              className="
      inline-block
      px-4
      py-2
      rounded-xl
      bg-green-500/20
      text-green-600
      font-medium
    "
            >
              Current Status: {lead.applicationStatus || "Not Applied"}
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-8 bg-yellow-100 text-yellow-800 p-6 rounded-xl">
          Lead must be Converted before University Application can be submitted.
        </div>
      )}

      {lead.applicationStatus === "Enrolled" ? (
        <div className="mt-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Commission Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="University"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="p-4 rounded-xl border"
            />

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-4 rounded-xl border"
            />

            <input
              type="number"
              placeholder="Tuition Fee"
              value={tuitionFee}
              onChange={(e) => setTuitionFee(e.target.value)}
              className="p-4 rounded-xl border"
            />

            <input
              type="number"
              placeholder="Commission %"
              value={commissionPercent}
              onChange={(e) => setCommissionPercent(e.target.value)}
              className="p-4 rounded-xl border"
            />

            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="p-4 rounded-xl border"
            >
              <option>Pending</option>

              <option>Paid</option>
            </select>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold">
              Commission Amount : ₹
              {(Number(tuitionFee) * Number(commissionPercent)) / 100}
            </h3>
          </div>

          <button
            onClick={saveCommissionDetails}
            className="
    mt-6
    bg-green-500
    text-white
    px-6
    py-3
    rounded-xl
  "
          >
            Save Commission
          </button>
        </div>
      ) : (
        <div className="mt-8 bg-blue-100 text-blue-800 p-6 rounded-xl">
          Commission Details will be available after student enrollment.
        </div>
      )}

      {/* Assignment History */}

      <div className="mt-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Assignment History</h2>

        {lead.assignmentHistory?.map((item, index) => (
          <div
            key={index}
            className="
        flex
        justify-between
        border-b
        py-3
        "
          >
            <span>{item.counsellor}</span>

            <span>{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Reusable Field Component */

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>

      <h3 className="text-lg font-semibold break-words">{value}</h3>
    </div>
  );
}
