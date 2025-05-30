import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AdDetails from "./pages/Dashboard/AdDetails";
import Login from "./components/form/Login";
import ContactForm from "./components/others/ContactForm";
// import ContactUs from "./pages/Others/ContactUs";
import CreateAdForm from "./components/form/advertisement-form/CreateAdForm";
import ViewAdvertisement from "./components/advertisement/ViewAdvertisement";
import { ToastContainer } from 'react-toastify';
import AdvertisementTable from "./components/advertisement/AdvertisementTable";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />

          {/* Other Routes */}
          <Route path="addetails" element={<AdDetails />} />
        
            <Route path="/advertisement/create-ad" element = {<CreateAdForm />} />
            <Route path="/advertisement/view-ad" element = {<ViewAdvertisement />} />
            <Route path="/created-advertisements" element = {<AdvertisementTable/> }  />

                

          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact-us" element={<ContactForm/>} />

      

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
          <Route path="log" element={<Login />} />

        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
