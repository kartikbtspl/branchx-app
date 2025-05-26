import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import CreateAd from "../../components/dashboard-components/CreateAd";
import NotificationPanel from "../../components/dashboard-components/NotificationPanel";

export default function Home() {
  return (
    <>
      <CreateAd />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* <EcommerceMetrics /> */}
            <RecentOrders />
          
          {/* <MonthlySalesChart /> */}
        </div>

        <div className="col-span-12 xl:col-span-5">
          {/* <MonthlyTarget /> */}
          
            <NotificationPanel/>
         
        </div>

        <div className="col-span-12">
          {/* <StatisticsChart /> */}
        </div>

        <div className="col-span-12 xl:col-span-5">
          {/* <DemographicCard /> */}
        </div>

        <div className="col-span-12 xl:col-span-7">
         
        </div>
      </div>
    </>
  );
}
