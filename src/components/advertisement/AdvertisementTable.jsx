import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import MediaPlayer from "../video/MediaPlayer";
import { toast } from "react-toastify";

const AdvertisementTable = () => {
  const [tableData, setTableData] = useState([]);

  const getAdvertisements = async () => {
    try {
      const response = await axios.get(
        "https://0637-2409-4081-2d18-d7cc-fc1d-9ac7-f9da-2341.ngrok-free.app/api/v1/campaign/getCampaigns",
        { withCredentials: true }
      );

      setTableData(response.data);
      console.log("Fetched advertisements:", response.data);
    } catch (error) {
      console.error("Failed to fetch advertisements", error);
    }
  };

  const handleStatusToggle = async (id) => {
    const updatedData = tableData.map((ad) =>
      ad.id === id ? { ...ad, status: !ad.status } : ad
    );
    setTableData(updatedData);

    const updatedAd = updatedData.find((ad) => ad.id === id);

    try {
      console.log("Updating status for ad:", updatedAd.status);
      const response = await axios.put(
        `https://6d22-203-192-220-137.ngrok-free.app/api/v1/campaign/${id}/status`,
        { status: updatedAd.status },
        { withCredentials: true }
      );
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    getAdvertisements();
  }, []);

  return (
    <div className="text-center">
      <Table>
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
          <TableRow>
            <TableCell className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Video
            </TableCell>
            <TableCell className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Brand Advertisement Name
            </TableCell>
            <TableCell className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Date and Time
            </TableCell>
            <TableCell className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Status
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {tableData.map((ad) => (
            <TableRow key={ad.id}>
              <TableCell className="px-5 py-4 w-[30%] sm:px-6 text-start">
                <MediaPlayer src={ad.creativeFile} />
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-800 font-medium text-theme-sm dark:text-white/90">
                {ad.campaignName} {ad.campaignObjective}
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {ad.scheduleDate} {ad.timeSlot}
              </TableCell>
              <TableCell className="px-4 py-3 text-theme-sm">
                <label className="relative inline-flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={ad.status}
                    onChange={() => handleStatusToggle(ad.id)}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-16 h-9 rounded-full transition-colors duration-300 ease-in-out
                    ${ad.status ? "bg-green-500" : "bg-red-500"}
                    peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2
                    peer-focus:ring-green-400 relative shadow-md`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out
                      ${ad.status ? "translate-x-7" : "translate-x-0"}`}
                    />
                  </div>
                  <span
                    className={`ml-3 text-sm font-semibold transition-colors duration-300 ${
                      ad.status
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    {ad.status ? "Active" : "Inactive"}
                  </span>
                </label>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdvertisementTable;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import MediaPlayer from "../video/MediaPlayer";
// import { toast } from "react-toastify";

// const AdvertisementTable = () => {
//   const [tableData, setTableData] = useState([]);

//   const getAdvertisements = async () => {
//     try {
//       const response = await axios.get(
//         "https://6d22-203-192-220-137.ngrok-free.app/api/v1/campaign/getCampaigns",
//         { withCredentials: true }
//       );
//       console.log(response.data);
//       setTableData(response.data);
//     } catch (error) {
//       console.error("Failed to fetch advertisements", error);
//     }
//   };

//   const handleStatusToggle = async (id) => {
//     const updatedData = tableData.map((ad) =>
//       ad.id === id
//         ? { ...ad, status: ad.status === "Active" ? "Inactive" : "Active" }
//         : ad
//     );
//     setTableData(updatedData);

//     const updatedAd = updatedData.find((ad) => ad.id === id);

//     try {
//         console.log("Updating status for ad:", updatedAd.status);
//       const response = await axios.put(
//         `https://6d22-203-192-220-137.ngrok-free.app/api/v1/campaign/${id}/status`,
//         { status: updatedAd.status },
//         { withCredentials: true }
//       );
//         console.log(response.data);
//         toast.success(response.data.message)
//     } catch (error) {
//       console.error("Failed to update status", error);
//     }
//   };

//   useEffect(() => {
//     getAdvertisements();
//   }, []);

//   return (
//     <div className="text-center">
//       <Table>
//         <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//           <TableRow>
//             <TableCell className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
//               Video
//             </TableCell>
//             <TableCell className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
//               Brand Advertisement Name
//             </TableCell>
//             <TableCell className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
//               Date and Time
//             </TableCell>
//             <TableCell className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
//               Status
//             </TableCell>
//           </TableRow>
//         </TableHeader>
//         <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//           {tableData.map((ad) => (
//             <TableRow key={ad.id}>
//               <TableCell className="px-5 py-4 w-[30%] sm:px-6 text-start">
//                 <MediaPlayer src={ad.creativeFile} />
//               </TableCell>
//               <TableCell className="px-4 py-3 text-gray-800 font-medium text-theme-sm dark:text-white/90">
//                 {ad.campaignName} {ad.campaignObjective}
//               </TableCell>
//               <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
//                 {ad.scheduleDate} {ad.timeSlot}
//               </TableCell>
//               <TableCell className="px-4 py-3 text-theme-sm">
//                 <label className="relative inline-flex items-center cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={ad.status === "Active"}
//                     onChange={() => handleStatusToggle(ad.id)}
//                     className="sr-only peer"
//                   />
//                   <div
//                     className={`w-16 h-9 rounded-full transition-colors duration-300 ease-in-out
//                     ${ad.status === "Active" ? "bg-green-500" : "bg-red-500"}
//                     peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2
//                     peer-focus:ring-green-400 relative shadow-md`}
//                   >
//                     <div
//                       className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out
//                       ${ad.status === "Active" ? "translate-x-7" : "translate-x-0"}`}
//                     />
//                   </div>
//                   <span
//                     className={`ml-3 text-sm font-semibold transition-colors duration-300 ${
//                       ad.status === "Active"
//                         ? "text-green-700 dark:text-green-300"
//                         : "text-red-700 dark:text-red-300"
//                     }`}
//                   >
//                     {ad.status}
//                   </span>
//                 </label>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AdvertisementTable;


