import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

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
        setCampaign(response.data.campaign);
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
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
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
    <div className="max-w-6xl mx-auto px-4 py-8">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
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
                  <p className="font-medium">{campaign.adDeviceShow}</p>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
                Targeting Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Demographic</p>
                  <p className="font-medium">{campaign.demographic}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age Groups</p>
                  <p className="font-medium">
                    {parseArray(campaign.ageGroups).join(", ") || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Regions</p>
                  <p className="font-medium">
                    {parseArray(campaign.targetRegions).join(", ") || "N/A"}
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

            {/* Budget & Bidding */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path />
                  <path fillRule="evenodd" clipRule="evenodd" />
                </svg>
                Budget & Bidding
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Base Bid</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(campaign.baseBid)}
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-indigo-600">Max Bid Cap</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(campaign.maxBidCap)}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600">Budget Limit</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(campaign.budgetLimit)}
                  </p>
                </div>
              </div>
            </div>

            {/* Creative Preview */}
            {/* <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Creative Preview
              </h2>
              <div className="mt-4 flex justify-center">
                <video
                  src={campaign.creativeFile}
                  controls
                  className="w-full max-w-lg rounded-lg shadow-md border"
                />
              </div>
            </div> */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
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

            {/* Actions */}
            {/* <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleApproval("APPROVE")}
                  disabled={loading || isActionTaken || campaign?.isApproved === "APPROVED" || campaign?.isApproved === "REJECTED"}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-lg text-white shadow-md transition ${
                    loading || isActionTaken || campaign?.isApproved === "APPROVED" || campaign?.isApproved === "REJECTED"
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {loading ? "Processing..." : "Approve Campaign"}
                </button>
                
                <button
                  onClick={() => handleApproval("REJECT")}
                  disabled={loading || isActionTaken || campaign?.isApproved === "APPROVED" || campaign?.isApproved === "REJECTED"}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-lg text-white shadow-md transition ${
                    loading || isActionTaken ||  campaign?.isApproved === "APPROVED" || campaign?.isApproved === "REJECTED"
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                  {loading ? "Processing..." : "Reject Campaign"}
                </button>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                {isActionTaken ? "Approval action has already been taken" : "Pending your approval"}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
