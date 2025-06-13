import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { estimatePrice } from "../../../api/campaign-api/targetingOptionService";

let debounceTimeout;

const BiddingBudget = () => {
  const {
    register,
    setValue,
    formState: { errors },
    control,
  } = useFormContext();

  const targetRegions = useWatch({ control, name: "targetRegions" }) || [];
  const adDeviceShow = useWatch({ control, name: "adDeviceShow" }) || [];
  const productType = useWatch({ control, name: "productType" });

  const [estimatedPrice, setEstimatedPrice] = useState(0);

  useEffect(() => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
      try {
        const response = await estimatePrice({
          targetRegions: targetRegions.map((r) => (r.name ? r.name : r)),
          adDevices: adDeviceShow.map((d) => (d.name ? d.name : d)),
          productType: productType.name || productType,
        });

        const cost = response?.data?.baseCost || 0;
        console.log("Estimated Price:", cost);

        setEstimatedPrice(cost);
        setValue("baseBid", cost);
        setValue("budgetLimit", cost);
        setValue("estimatedPrice", cost);
      } catch (err) {
        console.error("Failed to fetch estimated price:", err);
      }
    }, 500); // Delay in ms (500ms debounce)

    // Cleanup on unmount or next call
    return () => clearTimeout(debounceTimeout);
  }, [
    JSON.stringify(targetRegions),
    JSON.stringify(adDeviceShow),
    JSON.stringify(productType),
    setValue,
  ]);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-lg font-semibold mb-4">Budget</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Base Cost
          </label>
          <input
            type="number"
            {...register("baseCost", { required: "Base cost is required" })}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.baseBid && (
            <p className="text-red-500 text-sm mt-1">
              {errors.baseBid.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Price
          </label>
          <div className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-800">
            ₹ {estimatedPrice.toLocaleString()}
          </div>
          <input type="hidden" {...register("estimatedPrice")} />
        </div>
      </div>
    </div>
  );
};

export default BiddingBudget;

