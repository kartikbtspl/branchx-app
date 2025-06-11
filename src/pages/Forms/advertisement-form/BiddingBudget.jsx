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
        {/* Base Bid */}
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

        {/* Budget Limit */}
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

        {/* Slope Preference Type */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slope Preference Type
          </label>
          <select
            {...register("slopePreference", {
              required: "Slope Preference is required",
            })}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            defaultValue=""
          >
            <option value="" disabled>
              Select Slope Preference
            </option>
            {slopeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.slopePreference && (
            <p className="text-red-500 text-sm mt-1">
              {errors.slopePreference.message}
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default BiddingBudget;


// import { useFormContext } from "react-hook-form";

// const BiddingBudget = () => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="w-full bg-white p-6 rounded-lg shadow-md">
//       <h1 className="text-lg font-semibold mb-4">Bid and Budget</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
//         <div>
//           {/* Base Bid per Sec */}
//           <label className="block text-sm font-medium">Base Bid per Sec</label>
//           <input
//             className="w-full border px-2 py-1 rounded mt-1"
//             type="number"
//             {...register("baseBid")}
//             defaultValue={20}
//           />
//           {errors.baseBid && (
//             <span className="text-red-500 text-sm mt-1">
//               Base Bid is required
//             </span>
//           )}

//           {/* Budget Limit */}
//           <label className="block text-sm font-medium mt-2">Budget Limit</label>
//           <input
//             className="w-full border px-2 py-1 rounded mt-1"
//             type="number"
//             {...register("budgetLimit")}
//             defaultValue={5000}
//           />
//           {errors.budgetLimit && (
//             <span className="text-red-500 text-sm mt-1">
//               Budget Limit is required
//             </span>
//           )}

//           {/* Estimated Reach */}
//           <label className="block text-sm font-medium mt-2">
//             Estimated Reach
//           </label>
//           <input
//             className="w-full border px-2 py-1 rounded mt-1"
//             type="number"
//             {...register("estimatedReach")}
//             defaultValue={20000}
//           />
//           {errors.estimatedReach && (
//             <span className="text-red-500 text-sm mt-1">
//               Estimated Reach is required
//             </span>
//           )}
//         </div>

     
//       </div>
//     </div>
//   );
// };

// export default BiddingBudget;
