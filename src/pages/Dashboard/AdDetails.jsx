import React from "react";
import Button from "../../components/ui/button/Button";
import AdSpendsAnalytics from "../../components/dashboard-components/AdSpendAnalytics";

export default function AdDetails() {
  return (
    <div className="p-4  bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold mb-6">Ad Details</h2>
        </div>
        <Button size="cs">Edit Ad</Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Ad Amount Spent", value: "₹1,725,548" },
          { label: "Cost per Conversion", value: "₹725,548" },
          { label: "Ads CTR", value: "8.30%" },
          { label: "Ads Impression", value: "#2,450" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-6 bg-gradient-to-l from-[#5D81E9] to-[#3154BC] text-white rounded-2xl w-267.51px h-140px p-8 shadow-md"
          >
            <p className="text-sm">{item.label}</p>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Advertisement and Distributor Details */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Advertisement Details */}
        <div className="bg-white rounded-2xl shadow-md">
          <div className="bg-[#EAEDF4] rounded-t-2xl">
            <h3 className="text-lg font-semibold mb-4 border-b p-2">
              Advertisement Details:
            </h3>
          </div>
          <div className="grid grid-rows-3 gap-4 text-sm">
            <div className="flex justify-center gap-30">
              <div>
                <div>Ad ID:</div>
                <div>#1232</div>
              </div>
              <div>
                <div>Current Status:</div>
                <div className="text-[#758AC4]">Under Review</div>
              </div>
              <div>
                <div>Target Regions:</div>
                <div>560076, 560024, +12</div>
              </div>
            </div>
            <div className="flex justify-center gap-23">
              <div>
                <div>Audience Size:</div>
                <div>#12,458,12</div>
              </div>
              <div>
                <div>Last Reviewed:</div>
                <div>By Ranjan</div>
              </div>
              <div>
                <div>Proposed Ad Budget:</div>
                <div>₹ 2,00,000.00</div>
              </div>
            </div>
            <div className="flex justify-center gap-30">
              <div>
                <div>Ad Generated On:</div>
                <div>18.04.2024</div>
              </div>
              <div>
                <div>Ad Type:</div>
                <div>Video Ad</div>
              </div>
              <div>
                <div>Ad Length:</div>
                <div>Approx. 40sec</div>
              </div>
            </div>
          </div>
        </div>

        {/* Distributor Details */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">
            Distributor Details:
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Distributor"
              className="rounded-full w-12 h-12 object-cover"
            />
            <div>
              <p className="font-medium">Saurabh Sethi</p>
              <p className="text-sm text-blue-500">BRICAX01W</p>
            </div>
          </div>
          <div className="text-sm space-y-1">
            <p>Location: Varanasi</p>
            <p>Email: sharmapriyank@gmail.com</p>
            <p>Direct Manager: Spurthi</p>
            <p>Mobile: +91 7483736802</p>
          </div>
        </div>
      </div>

      {/* Ad Preview and Review History */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Ad Preview */}
        <img
          src="./images/cards/pizzahut.svg"
          alt="Pizza Hut Ad"
          className="rounded-2xl w-full object-cover mb-4"
        />

        {/* Review History */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">
            Review History:
          </h3>
          <div className="text-sm space-y-2">
            <p className="text-gray-500">YESTERDAY</p>
            <ul className="list-disc ml-5">
              <li>Verified by Ranjan at 11:40am</li>
              <li>Reviewed by Minakshi at 09:34am</li>
            </ul>
            <p className="text-gray-500 mt-4">28-April-2024</p>
            <ul className="list-disc ml-5">
              <li>Verified by Ranjan</li>
            </ul>
          </div>
        </div>
      </div>
      <AdSpendsAnalytics />
    </div>
  );
}
