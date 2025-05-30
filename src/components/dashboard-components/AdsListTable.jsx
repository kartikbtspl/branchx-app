import React, { useState } from "react";
import { Eye, Search } from "lucide-react";

const adsData = [
  {
    title: "Hello Holidays",
    start: "April 1, 2024",
    end: "April 28, 2024",
    conversion: "6.08%",
    engagement: 2300,
    budget: "Rs 1 Lac",
    status: "Ongoing",
  },
  {
    title: "SpringSpecial",
    start: "Mar 1, 2024",
    end: "April 1, 2024",
    conversion: "1.02%",
    engagement: 2300,
    budget: "Rs 3.5 Lac",
    status: "Completed",
  },
  {
    title: "Limited Special offer",
    start: "Mar 1, 2024",
    end: "Mar 15, 2024",
    conversion: "6.05%",
    engagement: 2300,
    budget: "Rs 2.8 Lac",
    status: "Completed",
  },
  {
    title: "Vaisakhi Happiness",
    start: "Feb 1, 2024",
    end: "Feb 29, 2024",
    conversion: "7.02%",
    engagement: 2300,
    budget: "Rs 80K",
    status: "Ongoing",
  },
  {
    title: "Republic Day Offer",
    start: "Jan 20, 2024",
    end: "Jan 28, 2024",
    conversion: "1.04%",
    engagement: 2300,
    budget: "Rs 5.5 Lac",
    status: "Ongoing",
  },
  {
    title: "Republic Day Offer",
    start: "Jan 20, 2024",
    end: "Jan 28, 2024",
    conversion: "6.08%",
    engagement: 2300,
    budget: "Rs 4.2 Lac",
    status: "Completed",
  },
  {
    title: "Republic Day Offer",
    start: "Jan 20, 2024",
    end: "Jan 28, 2024",
    conversion: "2.05%",
    engagement: 2300,
    budget: "Rs 2.5 Lac",
    status: "Completed",
  },
  {
    title: "Republic Day Offer",
    start: "Jan 20, 2024",
    end: "Jan 28, 2024",
    conversion: "9.02%",
    engagement: 2300,
    budget: "Rs 1.5 Lac",
    status: "Cancelled",
  },
  {
    title: "Republic Day Offer",
    start: "Jan 20, 2024",
    end: "Jan 28, 2024",
    conversion: "8.08%",
    engagement: 2300,
    budget: "Rs 60K",
    status: "Ongoing",
  },
  {
    title: "Republic Day Offer",
    start: "Jan 20, 2024",
    end: "Jan 28, 2024",
    conversion: "2.06%",
    engagement: 2300,
    budget: "Rs 2.5 Lac",
    status: "Ongoing",
  },
  {
    title: "Republic Day Offer",
    start: "Jan 20, 2024",
    end: "Jan 28, 2024",
    conversion: "1.04%",
    engagement: 2300,
    budget: "Rs 1.7 Lac",
    status: "Ongoing",
  },
  {
    title: "Bumper Christmas Offer",
    start: "Dec 1, 2024",
    end: "Jan 7, 2024",
    conversion: "9.04%",
    engagement: 2300,
    budget: "Rs 2.2 Lac",
    status: "Completed",
  },
];

const statusStyles = {
  Ongoing: "bg-[#EEAB2B1F] text-[#EEAB2B]",
  Completed: "bg-[#7BA16F1F] text-[#4DB920]",
  Cancelled: "bg-[#F168781F] text-[#F16878]",
};

export default function AdsListTable() {
  const [search, setSearch] = useState("");

  const filteredData = adsData.filter((ad) =>
    ad.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 w-full">
      <div className="flex flex-row justify-between items-center mb-4 gap-2">
        <div className="flex items-center justify-between width-full gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold mb-4">All Ads List</h2>
          </div>
          <div className="flex flex-row items-center gap-2 bg-white rounded">
            <Search />
            <input
              type="text"
              placeholder="Search Ad by name"
              className="w-full outline-none px-4 py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <button className="border px-4 py-2 rounded-md border-[#445E94] text-[#445E94] flex items-center gap-2">
          Filter
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full text-center text-sm">
          <thead className="bg-[#E3E8F3] text-gray-700">
            <tr className=" text-center text-[#445E94]">
              <th className="px-6 py-3 font-medium">Ad Title</th>
              <th className="px-6 py-3 font-medium">Start Date</th>
              <th className="px-6 py-3 font-medium">End Date</th>
              <th className="px-6 py-3 font-medium">Conversion %</th>
              <th className="px-6 py-3 font-medium">Engagement</th>
              <th className="px-6 py-3 font-medium">Budget</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((ad, index) => (
              <tr key={index} className="border-b bg-white">
                <td className="px-6 py-4 whitespace-nowrap">{ad.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ad.start}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ad.end}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ad.conversion}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-1">
                  <Eye size={16} /> {ad.engagement}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{ad.budget}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      statusStyles[ad.status]
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td className="px-9 py-4">
                  <Eye className="text-gray-600 cursor-pointer" size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
