export const submitLead = (leadData) => {
  const existingLeads =
    JSON.parse(
      localStorage.getItem("leads")
    ) || [];

  const now =
    new Date().toLocaleString();

  const newLead = {
    id: Date.now(),

    ...leadData,

    status: "New",

    assignedTo: "",

    createdAt: now,

    notes: "",

    followUps: [],

    activityTimeline: [
      {
        type: "Lead Created",
        description:
          "Lead submitted from Contact Form",
        date: now,
      },
    ],

    assignmentHistory: [],

    statusHistory: [
      {
        status: "New",
        date: now,
      },
    ],
  };

  existingLeads.push(newLead);

  localStorage.setItem(
    "leads",
    JSON.stringify(existingLeads)
  );

  return {
    success: true,
  };
};