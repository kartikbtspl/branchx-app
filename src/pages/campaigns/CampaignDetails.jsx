import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Campaign from "../Forms/campaign-form/Campaign";
import Loader from "../../components/loader/Loader";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
const CampaignDetails = () => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get(
          `https://branchx-backend-api-4.onrender.com/api/v1/campaign/${id}/getCampaign`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCampaign(response?.data?.data);
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

  if (!campaign) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

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
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              campaign.isApproved
            )}`}
          >
            {campaign.isApproved}
          </span>

          <div className="flex gap-2">
            <Link to={`/campaign/edit/${campaign.id}`}>
              <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
                Update
              </Button>
            </Link>

            <Button
              onClick={() => console.log("Delete clicked")}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
            >
              Delete
            </Button>
          </div>
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
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
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
                    {campaign.Devices?.map((d) => d.deviceType).join(", ") ||
                      "N/A"}
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
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
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
                    {campaign.Locations?.map((l) => l.city).join(", ") || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time Slot</p>
                  <p className="font-medium">{campaign.startTime} {campaign.endTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Selected Days</p>
                  <p className="font-medium">
                    {parseArray(campaign.daysOfWeek).join(", ") || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Budget
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Base cost</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(campaign.baseCost)}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600">Estimated cost</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(campaign.baseCost)}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600">Max bid cost</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(campaign.maxBid)}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600">Min bid cost</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(campaign.minBid)}
                  </p>
                </div>
              </div>
            </div>

            {/* Creative Preview */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
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

          {/* Right Column - Timeline & Status */}
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Campaign Timeline
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">
                    {formatDate(campaign.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">
                    {formatDate(campaign.endDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interval</p>
                  <p className="font-medium">{campaign.interval} Times</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
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
