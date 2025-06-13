import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Campaign from "../Forms/campaign-form/Campaign";
import Loader from "../../components/loader/Loader";

const CampaignDetails = () => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(
          `https://branchx-backend-api-4.onrender.com/api/v1/campaign/${id}/getCampaign`,
          { withCredentials: true }
        );
        console.log("Campaign data fetched successfully:", response);
        setCampaign(response.data.data);
      } catch (error) {
        console.error("Failed to fetch campaign:", error);
      }
    };

    fetchCampaign();
  }, [id]);

  const parseArray = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  };

  const handleApproval = async (status) => {
    setLoading(true);
    setActionStatus("");
    try {
      const response = await axios.put(
        `http://192.168.1.36:3001/api/v1/campaigns/${id}/campaignApproval`,
        { isApproved: status },
        { withCredentials: true }
      );
      setActionStatus(`Campaign ${status.toLowerCase()}d successfully!`);
      setCampaign((prev) => ({ ...prev, isApproved: status }));
    } catch (error) {
      console.error("Action failed:", error);
      setActionStatus("Failed to update approval status.");
    } finally {
      setLoading(false);
    }
  };

  const isActionTaken =
    campaign?.isApproved === "APPROVE" || campaign?.isApproved === "REJECT";

  if (!campaign) {
    return (
      <div className="flex justify-center items-center min-h-screen">
      <Loader />
      </div>
    );
  }

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVE":
        return "bg-green-100 text-green-800";
      case "REJECT":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {campaign.campaignName}
          </h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            {campaign.campaignDescription}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              campaign.isApproved
            )}`}
          >
            {campaign.isApproved}
          </span>
        </div>
      </div>

      {actionStatus && (
        <div
          className={`mb-6 p-3 rounded-lg text-center ${
            actionStatus.includes("successfully")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {actionStatus}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
          {/* Left Column - Campaign Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Info */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                {/* Removed SVG */}
                Campaign Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Objective</p>
                  <p className="font-medium">{campaign.campaignObjective}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{campaign.campaignType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Creative Type</p>
                  <p className="font-medium">{campaign.creativeType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Device</p>
                  <p className="font-medium">
                    {campaign.Devices?.map((device) => device.deviceType).join(
                      ", "
                    ) || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{campaign.duration} seconds</p>
                </div>
              </div>
            </div>

            {/* Targeting */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                {/* Removed SVG */}
                Targeting Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Demographic</p>
                  <p className="font-medium">{campaign.demographic}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Regions</p>
                  <p className="font-medium">
                    {campaign.Locations?.map((location) => location.city).join(
                      ", "
                    ) || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Time Slot</p>
                  <p className="font-medium">{campaign.timeSlot}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Selected Days</p>
                  <p className="font-medium">
                    {parseArray(campaign.selectedDays).join(", ") || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                Budget
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Base cost</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(campaign.baseBid)}
                  </p>
                </div>
                {/* Removed Max Bid Cap */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600">Estimated cost</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(campaign.budgetLimit)}
                  </p>
                </div>
              </div>
            </div>

            {/* Creative Preview */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                {/* Removed SVG */}
                Creative Preview
              </h2>

              <div className="mt-4 flex justify-center">
                {campaign.creativeFile?.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                  <img
                    src={campaign.creativeFile}
                    alt="Creative Preview"
                    className="w-full max-w-lg rounded-lg shadow-md border"
                  />
                ) : (
                  <video
                    src={campaign.creativeFile}
                    controls
                    className="w-full max-w-lg rounded-lg shadow-md border"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Timeline & Actions */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                {/* Removed SVG */}
                Campaign Timeline
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">
                    {formatDate(campaign.scheduleDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">
                    {formatDate(campaign.scheduleEndDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interval</p>
                  <p className="font-medium">{campaign.interval} Times</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                {/* Removed SVG */}
                Campaign Status
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Active Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {campaign.status ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Payment Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.isPayment
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {campaign.isPayment ? "Completed" : "Pending"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Approval Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      campaign.isApproved
                    )}`}
                  >
                    {campaign.isApproved}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
