import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampaigns,
  toggleCampaignStatus,
} from "../../redux/slices/campaignSlice";
import CampaignCard from "./CampaignCard";
import Loader from "../../components/loader/Loader";


const UserCampaigns = () => {
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

         <p className="text-[#526E95] text-center text-3xl dark:text-gray-400">
          Loading Campaigns...
        </p>
        <div className="flex h-64">  
         <Loader />
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
        <h1 className="font-bold  mb-4">Campaigns</h1>
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

export default UserCampaigns;

