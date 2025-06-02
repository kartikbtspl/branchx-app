import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import MediaPlayer from "../video/MediaPlayer";

import {
  fetchCampaigns,
  toggleCampaignStatus,
} from "../../redux/slices/campaignSlice";

const AdvertisementTable = () => {
  const dispatch = useDispatch();
  const { campaigns, loading } = useSelector((state) => state.campaign);
  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleStatusToggle = (id, currentStatus) => {
    dispatch(toggleCampaignStatus({ id, status: !currentStatus }));
  };

  const handlePayment = (id) => {
    console.log(id);
    
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">
          Loading advertisements...
        </p>
      </div>
    );
  }

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
          {campaigns?.map((ad) => (
            <TableRow key={ad.id}>
              <TableCell className="px-5 py-4 w-[30%] sm:px-6 text-start">
                <MediaPlayer src={ad.creativeFile} />
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-800 font-medium text-theme-sm dark:text-white/90">
                {ad.campaignName} - {ad.campaignObjective}
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {ad.scheduleDate} | {ad.timeSlot}
              </TableCell>
              <TableCell className="px-4 py-3 text-theme-sm">
                {ad.isApproved === "PENDING" ? (
                  <span className="text-yellow-600 font-semibold">
                    Waiting for Approval
                  </span>
                ) : ad.isApproved === "REJECT" ? (
                  <span className="text-red-600 font-semibold">Rejected</span>
                ) : ad.isApproved === "APPROVED" && !ad.isPayment ? (
                  <button
                    onClick={() => handlePayment(ad.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Make Payment
                  </button>
                ) : ad.isApproved === "APPROVED" && ad.isPayment ? (
                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={ad.status}
                      onChange={() => handleStatusToggle(ad.id, ad.status)}
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
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdvertisementTable;
