// src/routes/DashboardRoutes.jsx
import {
  Route
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import AppLayout from "@/layout/AppLayout";
import Home from "@/pages/Dashboard/Home";
import UserProfiles from "@/pages/UserProfiles";
import Blank from "@/pages/Blank";
import BasicTables from "@/pages/Tables/BasicTables";
import AdDetails from "@/pages/Dashboard/AdDetails";
import Campaign from "@/pages/Forms/campaign-form/Campaign";

import CampaignCard from "@/pages/advertisement/CampaignCard";
import CampaignDetails from "@/pages/advertisement/CampaignDetails";
import DistributorDashboard from "@/components/distributor/DistributorDashboard";
import UserCampaigns from "@/pages/advertisement/UserCampaigns";

export const dashboardRoutes = [
  <Route
    key="layout"
    element={
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    }
  >
    <Route index path="/" element={<Home />} />
    <Route path="/profile" element={<UserProfiles />} />
    <Route path="/blank" element={<Blank />} />
    <Route path="/basic-tables" element={<BasicTables />} />
    <Route path="/addetails" element={<AdDetails />} />
    <Route path="/campaign/create-campaign" element={<Campaign />} />
    <Route path="/created-campaigns" element={<UserCampaigns />} />
    <Route path="/campaigns" element={<CampaignCard />} />
    <Route path="/campaign/:id" element={<CampaignDetails />} />
    <Route path="/distributor" element={<DistributorDashboard />} />
  </Route>,
];
