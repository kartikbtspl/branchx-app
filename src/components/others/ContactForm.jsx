import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

// Spinner Component
const Spinner = ({ size = "sm", className = "" }) => (
  <svg
    className={`animate-spin ${size === "sm" ? "w-4 h-4" : "w-6 h-6"} text-white ${className}`}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8z"
    ></path>
  </svg>
);

const SignInForm = () => {
  const { register, handleSubmit, watch, reset, formState } = useForm();
  const selectedRole = watch("role");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(
        "https://branchx-backend-api-4.onrender.com/api/v1/user/createUser",
        data,
        { withCredentials: true }
      );
      toast.success("Form submitted successfully!");
      reset();
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderAdditionalInput = () => {
    switch (selectedRole) {
      case "Advertiser":
        return (
          <div className="space-y-1">
            <label className="block">Business Name</label>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Enter your company name"
              {...register("businessName")}
            />
          </div>
        );
      case "Distributer":
        return (
          <div className="space-y-1">
            <label className="block">Business Name</label>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Enter the region you cover"
              {...register("businessName")}
            />
          </div>
        );
      case "Retailer":
        return (
          <div className="space-y-1">
            <label className="block">Business Name</label>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Enter your shop name"
              {...register("businessName")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white w-[35%] p-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">
          Expand Fast
          <br />
          Sell Globally
        </h1>
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">📦</div>
            <div>
              <p className="font-semibold">Seamless Selling</p>
              <p className="text-sm">
                Effortlessly expand to European & UK marketplaces.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🎯</div>
            <div>
              <p className="font-semibold">Smart Logistics & Analytics</p>
              <p className="text-sm">
                Optimize inventory, track orders & gain powerful insights.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💰</div>
            <div>
              <p className="font-semibold">Cross-Border Made Easy</p>
              <p className="text-sm">
                Simplified compliance, invoicing & fulfillment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-[65%] justify-center items-center px-8 py-12">
        <img
          src="/images/logo/bx-logo.svg"
          alt="Xpandifi Logo"
          className="h-12 mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Welcome Back to Branch-X
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Log in to manage your global retail operations.
        </p>

        <form
          className="lg:w-1/2 space-y-3"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="border p-2 w-full"
                required
                {...register("fullName", { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm">Phone</label>
              <input
                type="tel"
                placeholder="Phone Number"
                className="border p-2 w-full"
                {...register("phone")}
              />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                placeholder="Email Address"
                className="border p-2 w-full"
                required
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm">Country</label>
              <input
                type="text"
                placeholder="Country"
                className="border p-2 w-full"
                required
                {...register("country", { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm">State</label>
              <input
                type="text"
                placeholder="State"
                className="border p-2 w-full"
                required
                {...register("state", { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm">City</label>
              <input
                type="text"
                placeholder="City"
                className="border p-2 w-full"
                required
                {...register("city", { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm">Role</label>
              <select
                className="border p-2 w-full"
                {...register("role", { required: true })}
              >
                <option value="">Choose</option>
                <option value="Advertiser">Advertiser</option>
                <option value="Distributer">Distributer</option>
                <option value="Retailer">Retailer</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2">
              {renderAdditionalInput()}
            </div>
          </div>
          <label className="block text-sm mt-2">Message</label>
          <textarea
            placeholder="Message"
            className="border p-2 w-full h-20"
            {...register("message")}
          ></textarea>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className={`bg-blue-600 text-white py-2 px-6 w-full mt-2 flex items-center justify-center gap-2 ${
              formState.isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-teal-700"
            }`}
          >
            {formState.isSubmitting && <Spinner size="sm" />}
            {formState.isSubmitting ? "Submitting" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;



// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";

// const SignInForm = () => {
//   const { register, handleSubmit, watch, reset, formState } = useForm();
//   const selectedRole = watch("role");
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       await axios.post(
//         "https://branchx-backend-api-4.onrender.com/api/v1/user/createUser",
//         data,
//         { withCredentials: true }
//       );
//       toast.success("Form submitted successfully!");
//       reset();
//     } catch (err) {
//       console.error("Submission failed:", err);
//       toast.error("Submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderAdditionalInput = () => {
//     switch (selectedRole) {
//       case "Advertiser":
//         return (
//           <div className="space-y-1">
//             <label className="block">Business Name</label>
//             <input
//               type="text"
//               className="border p-2 w-full"
//               placeholder="Enter your company name"
//               {...register("businessName")}
//             />
//           </div>
//         );
//       case "Distributer":
//         return (
//           <div className="space-y-1">
//             <label className="block">Business Name</label>
//             <input
//               type="text"
//               className="border p-2 w-full"
//               placeholder="Enter the region you cover"
//               {...register("businessName")}
//             />
//           </div>
//         );
//       case "Retailer":
//         return (
//           <div className="space-y-1">
//             <label className="block">Business Name</label>
//             <input
//               type="text"
//               className="border p-2 w-full"
//               placeholder="Enter your shop name"
//               {...register("businessName")}
//             />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   // if (loading) {
//   //   return <Spinner />;
//   // }

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Section */}
//       <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white w-[35%] p-10 flex flex-col justify-center">
//         <h1 className="text-4xl font-bold mb-6">
//           Expand Fast
//           <br />
//           Sell Globally
//         </h1>
//         <div className="space-y-6">
//           <div className="flex items-start space-x-3">
//             <div className="text-2xl">📦</div>
//             <div>
//               <p className="font-semibold">Seamless Selling</p>
//               <p className="text-sm">
//                 Effortlessly expand to European & UK marketplaces.
//               </p>
//             </div>
//           </div>
//           <div className="flex items-start space-x-3">
//             <div className="text-2xl">🎯</div>
//             <div>
//               <p className="font-semibold">Smart Logistics & Analytics</p>
//               <p className="text-sm">
//                 Optimize inventory, track orders & gain powerful insights.
//               </p>
//             </div>
//           </div>
//           <div className="flex items-start space-x-3">
//             <div className="text-2xl">💰</div>
//             <div>
//               <p className="font-semibold">Cross-Border Made Easy</p>
//               <p className="text-sm">
//                 Simplified compliance, invoicing & fulfillment.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex flex-col w-[65%] justify-center items-center px-8 py-12">
//         <img
//           src="/images/logo/bx-logo.svg"
//           alt="Xpandifi Logo"
//           className="h-12 mb-4"
//         />
//         <h2 className="text-2xl font-semibold text-gray-800 mb-1">
//           Welcome Back to Branch-X
//         </h2>
//         <p className="text-sm text-gray-500 mb-6">
//           Log in to manage your global retail operations.
//         </p>

//         <form
//           className="lg:w-1/2 space-y-3"
//           onSubmit={handleSubmit(onSubmit)}
//           autoComplete="off"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 className="border p-2 w-full"
//                 required
//                 {...register("fullName", { required: true })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm">Phone</label>
//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 className="border p-2 w-full"
//                 {...register("phone")}
//               />
//             </div>
//             <div>
//               <label className="block text-sm">Email</label>
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="border p-2 w-full"
//                 required
//                 {...register("email", { required: true })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm">Country</label>
//               <input
//                 type="text"
//                 placeholder="Country"
//                 className="border p-2 w-full"
//                 required
//                 {...register("country", { required: true })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm">State</label>
//               <input
//                 type="text"
//                 placeholder="State"
//                 className="border p-2 w-full"
//                 required
//                 {...register("state", { required: true })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm">City</label>
//               <input
//                 type="text"
//                 placeholder="City"
//                 className="border p-2 w-full"
//                 required
//                 {...register("city", { required: true })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm">Role</label>
//               <select
//                 className="border p-2 w-full"
//                 {...register("role", { required: true })}
//               >
//                 <option value="">Choose</option>
//                 <option value="Advertiser">Advertiser</option>
//                 <option value="Distributer">Distributer</option>
//                 <option value="Retailer">Retailer</option>
//               </select>
//             </div>
//             <div className="col-span-1 md:col-span-2">
//               {renderAdditionalInput()}
//             </div>
//           </div>
//           <label className="block text-sm mt-2">Message</label>
//           <textarea
//             placeholder="Message"
//             className="border p-2 w-full h-20"
//             {...register("message")}
//           ></textarea>
//           <button
//             type="submit"
//             disabled={formState.isSubmitting}
//             className={`bg-blue-600 text-white py-2 px-6 w-full mt-2 ${
//               formState.isSubmitting
//                 ? "opacity-50 cursor-not-allowed"
//                 : "hover:bg-teal-700"
//             }`}
//           >
//             {formState.isSubmitting ? "Submitting" : "Send"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInForm;

