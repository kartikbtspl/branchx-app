import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const BiddingBudget = () => {
  const {
    register,
    setValue,
    formState: { errors },
    control,
  } = useFormContext();

  // Watch necessary fields
  const targetRegions = useWatch({ control, name: "targetRegions" }) || [];
  const productType = useWatch({ control, name: "productType" });
  const numberOfDevices = useWatch({ control, name: "numberOfDevices" }) || 100;

  // Calculate estimated price
  const totalRegionPrice = targetRegions.reduce(
    (sum, region) => sum + (region.price || 0),
    0
  );
  const productPrice = productType?.price || 0;
  const estimatedPrice = totalRegionPrice + productPrice * numberOfDevices;

  // Set baseBid, budgetLimit, and estimatedPrice on form update
  useEffect(() => {
    setValue("baseBid", estimatedPrice);
    setValue("budgetLimit", estimatedPrice);
    setValue("estimatedPrice", estimatedPrice);
  }, [estimatedPrice, setValue]);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-lg font-semibold mb-4">Budget</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Base Bid */}
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

        {/* Number of Devices */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Devices
          </label>
          <input
            type="number"
            {...register("numberOfDevices", {
              required: "Number of Devices is required",
              min: { value: 1, message: "Must be at least 1 device" },
            })}
            defaultValue={100}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.numberOfDevices && (
            <p className="text-red-500 text-sm mt-1">
              {errors.numberOfDevices.message}
            </p>
          )}
        </div>

        {/* Estimated Price */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Price
          </label>
          <div className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-800">
            ₹ {estimatedPrice.toLocaleString()}
          </div>
          {/* Hidden input to send estimated price in form submission */}
          <input type="hidden" {...register("estimatedPrice")} />
        </div>
      </div>
    </div>
  );
};

export default BiddingBudget;

