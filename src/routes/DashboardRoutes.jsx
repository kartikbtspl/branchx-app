import {
  Route
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import AppLayout from "@/layout/AppLayout";
import Home from "@/pages/Dashboard/Home";
import UserProfiles from "@/pages/UserProfiles";
import Blank from "@/pages/Blank";
import Campaign from "@/pages/Forms/campaign-form/Campaign";
import AdvertisementTable from "@/pages/advertisement/AdvertisementTable";
import CampaignCard from "@/pages/advertisement/CampaignCard";
import CampaignDetails from "@/pages/advertisement/CampaignDetails";
import DistributorDashboard from "@/components/distributor/DistributorDashboard";

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
    <Route path="/campaign/create-campaign" element={<Campaign />} />
    <Route path="/created-campaigns" element={<AdvertisementTable />} />
    <Route path="/campaigns" element={<CampaignCard />} />
    <Route path="/campaign/:id" element={<CampaignDetails />} />
    <Route path="/distributor" element={<DistributorDashboard />} />
  </Route>,
];
