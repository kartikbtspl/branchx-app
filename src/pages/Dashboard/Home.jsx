import RecentOrders from "../../components/ecommerce/RecentOrders";
import CreateAd from "../../components/dashboard-components/CreateAd";
import NotificationPanel from "../../components/dashboard-components/NotificationPanel";

export default function Home() {
  return (
    <>
      <CreateAd />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <RecentOrders />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <NotificationPanel />
        </div>
      </div>
    </>
  );
}
