import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const SignInForm = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post("https://branchx-backend-api-4.onrender.com/api/v1/user/createUser", data, {withCredentials: true});
      alert("Form submitted!");
      reset();
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Submission failed.");
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
        <h1 className="text-4xl font-bold mb-6">Expand Fast<br />Sell Globally</h1>
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">📦</div>
            <div>
              <p className="font-semibold">Seamless Selling</p>
              <p className="text-sm">Effortlessly expand to European & UK marketplaces.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🎯</div>
            <div>
              <p className="font-semibold">Smart Logistics & Analytics</p>
              <p className="text-sm">Optimize inventory, track orders & gain powerful insights.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💰</div>
            <div>
              <p className="font-semibold">Cross-Border Made Easy</p>
              <p className="text-sm">Simplified compliance, invoicing & fulfillment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-[65%] justify-center items-center px-8 py-12">
        <img src="/images/logo/bx-logo.svg" alt="Xpandifi Logo" className="h-12 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome Back to Branch-X</h2>
        <p className="text-sm text-gray-500 mb-6">Log in to manage your global retail operations.</p>

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
            className="bg-blue-600 text-white py-2 px-6 w-full hover:bg-teal-700 mt-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;


// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

// export default function ContactForm() {
//   const { register, handleSubmit, watch, reset } = useForm();
//   const selectedRole = watch("role");

//   const onSubmit = async (data) => {
//     console.log(data);
//     try {
//       await axios.post("http://192.168.1.36:3000/api/v1/user/createUser", data);
//       alert("Form submitted!");
//       reset();
//     } catch (err) {
//       alert("Submission failed.");
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

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#bdc3c7] to-[#2c3e50)] px-4 py-8">
//       <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg p-6 lg:p-12 gap-10 lg:gap-20 w-full max-w-5xl">
//         {/* Left Section */}
//         <div className="lg:w-1/2 space-y-3">
//           <h2 className="text-4xl font-bold text-green-700">Say Hello</h2>
//           <p className="text-gray-700">
//             We would love to hear from you. As an agency or a brand, you can be
//             ahead of the curve to take full advantage of the DOOH opportunities.
//             As a Inventory space provider, you can unlock additional revenue
//             opportunities.
//           </p>
//           <div>
//             <h4 className="font-bold">Phone</h4>
//             <p>+91 720 777 9800</p>
//           </div>
//           <div>
//             <h4 className="font-bold">Email</h4>
//             <p>branchx@gmail.com</p>
//           </div>
//           <div>
//             <h4 className="font-bold">Social Media</h4>
//             <div className="flex space-x-4 mt-2 text-black text-xl">
//               <i className="fab fa-facebook-f"><Facebook /></i>
//               <i className="fab fa-linkedin-in"><Linkedin /></i>
//               <i className="fab fa-twitter"><Twitter /></i>
//               <i className="fab fa-instagram"><Instagram/></i>
//               <i className="fab fa-youtube"><Youtube/></i>
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
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
//             className="bg-blue-600 text-white py-2 px-6 w-full hover:bg-teal-700 mt-2"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
