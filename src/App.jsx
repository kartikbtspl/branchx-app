import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import BasicTables from "./pages/Tables/BasicTables"
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import AdDetails from "./pages/Dashboard/AdDetails";
import Login from "./components/form/Login";
import ContactForm from "./components/others/ContactForm";
import CreateAdForm from "./components/form/advertisement-form/CreateAdForm";
import { ToastContainer } from "react-toastify";
import AdvertisementTable from "./components/advertisement/AdvertisementTable";
import CampaignCard from "./components/advertisement/CampaignCard";
import DistributorDashboard from "./components/distributor/DistributorDashboard";
import CampaignDetails from "./components/advertisement/CampaignDetails";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/blank" element={<Blank />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Other Routes */}
            <Route path="addetails" element={<AdDetails />} />

            <Route path="/advertisement/create-ad" element={<CreateAdForm />} />
            <Route
              path="/created-advertisements"
              element={<AdvertisementTable />}
            />
            <Route path="/campaigns" element={<CampaignCard />} />
            <Route path = "/campaign/:id" element={<CampaignDetails />} />

            {/* Distributor */}
            <Route path="/distributor" element={<DistributorDashboard/>} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contact-us" element={<ContactForm />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
          <Route path="log" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
