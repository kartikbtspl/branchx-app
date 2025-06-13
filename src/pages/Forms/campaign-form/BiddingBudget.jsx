import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { estimatePrice } from "../../../api/campaign-api/targetingOptionService";

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
  const numberOfDevices = useWatch({ control, name: "numberOfDevices" }) || 100;

  const [estimatedPrice, setEstimatedPrice] = useState(0);

  useEffect(() => {
    const fetchEstimatedPrice = async () => {
      if (!targetRegions.length || !adDeviceShow.length || !productType) return;

      try {
        const response = await estimatePrice({
          targetRegions,
          adDeviceShow,
          productType,
          numberOfDevices,
        });

        setEstimatedPrice(response.estimatedPrice);
        setValue("baseBid", response.estimatedPrice);
        setValue("budgetLimit", response.estimatedPrice);
        setValue("estimatedPrice", response.estimatedPrice);
      } catch (err) {
        console.error("Failed to fetch estimated price:", err);
      }
    };

    fetchEstimatedPrice();
  }, [targetRegions, adDeviceShow, productType, numberOfDevices, setValue]);

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
            {...register("baseBid", { required: "Base Bid is required" })}
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







