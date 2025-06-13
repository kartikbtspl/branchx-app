import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampaigns,
  toggleCampaignStatus,
} from "../../redux/slices/campaignSlice";
import CampaignCard from "./CampaignCard";
import MoonLoader from "react-spinners/MoonLoader";


const AdvertisementTable = () => {
  const dispatch = useDispatch();
  const { campaigns, loading } = useSelector((state) => state.campaign);
  console.log("Campaigns data:", campaigns);
  console.log("Loading state:", loading);

  useEffect(() => {
    if (!campaigns || campaigns.length === 0) {
      dispatch(fetchCampaigns());
    }
  }, [campaigns, dispatch]);

  const handleToggle = (id, currentStatus) => {
    dispatch(toggleCampaignStatus({ id, status: !currentStatus }));
  };

  const handleReconfigure = (id) => {
    console.log("Reconfigure clicked for campaign ID:", id);
    
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-blue-500 text-3xl dark:text-gray-400">
          Loading Campaigns...
        </p>
        <div className="flex justify-center items-center h-64">
          
          <MoonLoader
            color="#5F7C95"
            size={100}
            speedMultiplier={1}
            className="flex justify-center items-center mt-4"
          />
        </div>
      </div>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">No campaigns found.</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p className="font-bold text-2xl mb-4">Campaigns</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {campaigns?.data?.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            campaignName={campaign.campaignName}
            creativeFile={campaign.creativeFile}
            campaignObjective={campaign.campaignObjective}
            isApproved={campaign.isApproved}
            isPayment={campaign.isPayment}
            status={campaign.status}
            scheduleDate={campaign.scheduleDate}
            timeSlot={campaign.timeSlot}
            onToggle={() => handleToggle(campaign.id, campaign.status)}
            onReconfigure={() => handleReconfigure(campaign.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementTable;
