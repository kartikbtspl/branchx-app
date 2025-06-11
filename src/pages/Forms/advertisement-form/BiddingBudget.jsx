import { useFormContext } from "react-hook-form";



const BiddingBudget = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-lg font-semibold mb-4">Bid and Budget</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Base Bid
          </label>
          <input
            type="number"
            {...register("baseBid", { required: "Base Bid is required" })}
            defaultValue={20}
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
            Budget Limit
          </label>
          <input
            type="number"
            {...register("budgetLimit", {
              required: "Budget Limit is required",
            })}
            defaultValue={5000}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.budgetLimit && (
            <p className="text-red-500 text-sm mt-1">
              {errors.budgetLimit.message}
            </p>
          )}
        </div>

        {/* Max Bid Cap */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Bid Cap
          </label>
          <input
            type="number"
            {...register("maxBidCap", {
              required: "Max Bid Cap is required",
            })}
            defaultValue={100}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.maxBidCap && (
            <p className="text-red-500 text-sm mt-1">
              {errors.maxBidCap.message}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default BiddingBudget;

