import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async(data) => {
    setLoading(true)
    try{
      const response = await dispatch(loginUser(data));
      console.log("Login response:", response?.payload?.data?.token);
      if (response?.payload?.data?.token) {
        localStorage.setItem("token", response?.payload?.data?.token);
      }
      console.log(response);
      navigate("/");
    }
    catch(error) {
      console.error("Login error:", error);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="bg-gradient-to-br from-[#445E94] to-[#5F7C95] text-white w-[35%] p-10 flex flex-col justify-center">
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
        <img src="/images/logo/bx-logo.svg" alt="Xpandifi Logo" className="h-12 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome Back to Branch-X
        </h2>
        {/* <p className="text-sm text-gray-500 mb-6">
          Log in to manage your global retail operations.
        </p> */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4"
          noValidate
        >
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password must be at least 3 characters",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Role Dropdown Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="">Select your role</option>
              <option value="Retailer">Retailer</option>
              <option value="Distributor">Distributor</option>
              <option value="Advertiser">Advertiser</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className={`w-full py-2 flex justify-center items-center gap-2 text-white rounded-full transition ${
              isSubmitting || loading
                ? "bg-[#5F7C95] cursor-not-allowed"
                : "bg-[#5F7C95] hover:bg-[#445E94]"
            }`}
          >
            {isSubmitting || loading ? <Spinner /> : null}
            {isSubmitting || loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>

        <p className="text-sm text-gray-500 mt-8">
          Don't have a Branch-X account?{" "}
          <Link to="/contact-us" className="text-blue-600 hover:underline">
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;



// import React from "react";
// import { useForm } from "react-hook-form";
// import { loginUser } from "../../redux/slices/authSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";

// const SignInForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     dispatch(loginUser(data))
//       .unwrap()
//       .then((res) => {
//         console.log("Login response:", res);
//         if (res?.data?.token) {
//           localStorage.setItem("token", res?.data?.token);
//         }
//         navigate("/");
//       })
//       .catch(() => {
//         console.log("Login failed");
        
//       });
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Section */}
//       <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white w-[35%] p-10 flex flex-col justify-center">
//         <h1 className="text-4xl font-bold mb-6">Expand Fast<br />Sell Globally</h1>
//         <div className="space-y-6">
//           <div className="flex items-start space-x-3">
//             <div className="text-2xl">📦</div>
//             <div>
//               <p className="font-semibold">Seamless Selling</p>
//               <p className="text-sm">Effortlessly expand to European & UK marketplaces.</p>
//             </div>
//           </div>
//           <div className="flex items-start space-x-3">
//             <div className="text-2xl">🎯</div>
//             <div>
//               <p className="font-semibold">Smart Logistics & Analytics</p>
//               <p className="text-sm">Optimize inventory, track orders & gain powerful insights.</p>
//             </div>
//           </div>
//           <div className="flex items-start space-x-3">
//             <div className="text-2xl">💰</div>
//             <div>
//               <p className="font-semibold">Cross-Border Made Easy</p>
//               <p className="text-sm">Simplified compliance, invoicing & fulfillment.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex flex-col w-[65%] justify-center items-center px-8 py-12">
//         <img src="/images/logo/bx-logo.svg" alt="Xpandifi Logo" className="h-12 mb-4" />
//         <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome Back to Branch-X</h2>
//         <p className="text-sm text-gray-500 mb-6">Log in to manage your global retail operations.</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4" noValidate>
//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//             <input
//               type="email"
//               placeholder="Enter your email address"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Enter a valid email",
//                 },
//               })}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//             />
//             {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 3,
//                   message: "Password must be at least 3 characters",
//                 },
//               })}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//             />
//             {errors.password && (
//               <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Role Dropdown Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
//             <select
//               {...register("role", { required: "Role is required" })}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//             >
//               <option value="">Select your role</option>
//               <option value="Retailer">Retailer</option>
//               <option value="Distributor">Distributor</option>
//               <option value="Advertiser">Advertiser</option>
//             </select>
//             {errors.role && (
//               <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
//           >
//             Login
//           </button>

//           <div className="text-right">
//             <a href="#" className="text-sm text-blue-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>
//         </form>

//         <p className="text-sm text-gray-500 mt-8">
//           Don't have an Branch-x account?{" "}
//           <a href="#" className="text-blue-600 hover:underline">Contact Us</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignInForm;