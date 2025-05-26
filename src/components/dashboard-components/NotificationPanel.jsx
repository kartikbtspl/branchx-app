import React from 'react';

const notifications = [
  { type: "Ad Alert", message: "Request Proposal for Ad #452 got", status: "rejected" },
  { type: "Ad Alert", message: "Ongoing Ad #452 received", status: "Complain Mail" },
  { type: "Notification", message: "Ad #452", status: "crossed target margin" },
  { type: "Ad Alert", message: "Ongoing Ad #452 received", status: "Complain Mail" },
  { type: "Ad Alert", message: "Ongoing Ad #452 received", status: "Complain Mail" },
  { type: "Ad Alert", message: "Ongoing Ad #452 received", status: "Complain Mail" },
  { type: "Notification", message: "Ad #452", status: "crossed target margin" },
  { type: "Ad Alert", message: "", status: "" }, // Last empty notification
];

const NotificationPanel = () => {
  return (
    <div className="max-w-md mt-4 w-full mx-auto bg-white rounded-xl shadow-md p-4 space-y-4">
      <h2 className="text-lg font-semibold">Notifications for today</h2>
      <div className="space-y-3">
        {notifications.map((note, index) => (
          <div key={index} className="flex items-start space-x-2">
            <span className="text-xl mt-1">
              {note.type === "Notification" ? "😅" : "📌"}
            </span>
            <div>
              <div className="text-sm font-medium text-gray-700">{note.type}</div>
              <div className="text-sm">
                {note.message}
                {note.status && (
                  <span
                    className={
                      note.status.toLowerCase().includes("rejected") ||
                      note.status.toLowerCase().includes("complain")
                        ? "text-red-500 font-semibold ml-1"
                        : "text-green-500 font-semibold ml-1"
                    }
                  >
                    {note.status}.
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
