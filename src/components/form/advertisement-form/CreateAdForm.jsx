import React from "react";
import CampaignForm from "./CampaignForm";
import UploadCreatives from "./UploadCreatives";
import TargetingOptions from "./TargetingOptions";
import AdScheduling from "./AdScheduling";
import BiddingBudget from "./BiddingBudget";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CreateAdForm = () => {
  const navigate = useNavigate();
  const methods = useForm();

  const onSubmit = async (data) => {
    console.log("Form data before sending:", data);
    const formData = new FormData();

    try {
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value instanceof FileList) {
          Array.from(value).forEach((file) => formData.append(key, file));
        } else if (
          value instanceof Date ||
          (typeof value === "object" && value?.$d)
        ) {
          const isoDate = new Date(value.$d || value).toISOString();
          formData.append(key, isoDate);
        } else if (Array.isArray(value)) {
          if (key === "targetRegions") {
            const regionNames = value.map((region) => region.name);
            formData.append(key, JSON.stringify(regionNames));
          } else {
            formData.append(key, JSON.stringify(value));
          }
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      for (let [key, val] of formData.entries()) {
        console.log(`${key}:`, val);
      }

      const response = await axios.post(
        "https://0637-2409-4081-2d18-d7cc-fc1d-9ac7-f9da-2341.ngrok-free.app/api/v1/campaign/createCampaign",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            
          },
        }
      );

      if (response.data.status === 200) {
        toast.success("Campaign created successfully!");
        methods.reset();
        navigate("/");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "An error occurred while creating the campaign."
      );
    }
  };

  return (
    <div>
      <div className="bg-white border w-full p-2">
        <h1 className="font-bold text-2xl">Create Ad Campaign</h1>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="bg-white p-2 mt-2"
        >
          <div className="flex bg-gray-100 items-center justify-center">
            <CampaignForm />
          </div>
          <UploadCreatives />
          <TargetingOptions />
          <AdScheduling />
          <BiddingBudget />
          <div className="flex justify-end mt-2 gap-3">
            <button
              type="button"
              className="bg-white border border-red-500 text-red-500 px-4 py-2"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2"
              disabled={methods.formState.isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateAdForm;

// import React from "react";
// import CampaignForm from "./CampaignForm";
// import UploadCreatives from "./UploadCreatives";
// import TargetingOptions from "./TargetingOptions";
// import AdScheduling from "./AdScheduling";
// import BiddingBudget from "./BiddingBudget";
// import { useForm, FormProvider } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";

// const CreateAdForm = () => {
//   const navigate = useNavigate();

//   const methods = useForm();

//   const onSubmit = async (data) => {
//     console.log("Form data before sending:", data);

//     try {
//       const formData = new FormData();

//       Object.entries(data).forEach(([key, value]) => {
//         if (value instanceof File) {
//           formData.append(key, value);
//         } else if (value instanceof FileList) {
//           Array.from(value).forEach((file) => formData.append(key, file));
//         } else if (
//           value instanceof Date ||
//           (typeof value === "object" && "$d" in value)
//         ) {

//           formData.append(key, new Date(value.$d).toISOString());
//         } else if (Array.isArray(value) || typeof value === "object") {
//           formData.append(key, JSON.stringify(value));
//         } else if (value !== undefined && value !== null) {
//           formData.append(key, value.toString());
//         }
//       });

//       console.log("Form data after processing:", formData);
//       const response = await axios.post(
//         "https://ff5a-203-192-220-137.ngrok-free.app/api/v1/campaign/createCampaign",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Accept: "application/json",
//           },
//         }
//       );

//       if (response.data.status === 200) {
//         toast.success("Campaign created successfully!");
//         methods.reset();
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error(
//         error.response?.data?.errors?.[0]?.message ||
//           error.response?.data?.message ||
//           "An error occurred while creating the campaign."
//       );
//     }
//   };

//   return (
//     <div>
//       <div className="bg-white border w-full p-2">
//         <h1 className="font-bold text-2xl">Create Ad Campaign</h1>
//       </div>
//       <FormProvider {...methods}>
//         <form
//           onSubmit={methods.handleSubmit(onSubmit)}
//           className="bg-white p-2 mt-2"
//         >
//           <div className="flex bg-gray-100 items-center justify-center">
//             <CampaignForm />
//           </div>
//           <div>
//             <UploadCreatives />
//           </div>
//           <div className="w-full">
//             <TargetingOptions />
//           </div>
//           <div>
//             <AdScheduling />
//           </div>
//           <div>
//             <BiddingBudget />
//           </div>
//           <div className="flex justify-end mt-2 gap-3">
//             <button
//               type="button"
//               className="bg-white border border-red-500 text-red-500 px-4 py-2"
//             >
//               Save as Draft
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2"
//               disabled={methods.formState.isSubmitting}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </FormProvider>
//     </div>
//   );
// };

// export default CreateAdForm;

// import React from "react";
// import CampaignForm from "./CampaignForm";
// import UploadCreatives from "./UploadCreatives";
// import TargetingOptions from "./TargetingOptions";
// import AdScheduling from "./AdScheduling";
// import BiddingBudget from "./BiddingBudget";
// import { useForm, FormProvider } from "react-hook-form";
// import axios from "axios";
// import { campaignSchema } from "../../../utils/validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";

// const CreateAdForm = () => {
//   //  const methods = useForm({
//   //   resolver: zodResolver(campaignSchema),
//   //   defaultValues: {
//   //     selectedDays: [],
//   //     timeSlot: '',
//   //     ageGroups: [],
//   //     cities: [],
//   //     regions: [],
//   //     targetRegions: [],
//   //   },
//   // });
//   const navigate = useNavigate();
//   const methods = useForm();
//   const onSubmit = async (data) => {
//     console.log("Form data:", data);

//     try {
//       const formData = new FormData();
//       Object.entries(data).forEach(([key, value]) => {
//         formData.append(key, value);
//       });
//       const response = await axios.post(
//         "https://ff5a-203-192-220-137.ngrok-free.app/api/v1/campaign/createCampaign",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Accept: "application/json",
//           },
//         }
//       );
//       console.log("Submission response:", response.data.status);
//       if (response.data.status === 200) {
//         console.log("Campaign created successfully:", response.data);
//         toast.success("Campaign created successfully!");
//         methods.reset();
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       if (error.response && error.response.data) {
//         console.log(error.response.data.message);
//         toast.error(
//           error.response?.data?.errors?.[0]?.message ||
//             error.response?.data?.message ||
//             "An error occurred while creating the campaign."
//         );
//       }
//     }
//   };
//   return (
//     <div>
//       <div className="bg-white border w-full p-2">
//         <h1 className="font-bold text-2xl">Create Ad Campaign</h1>
//       </div>
//       <FormProvider {...methods}>
//         <form
//           onSubmit={methods.handleSubmit(onSubmit)}
//           className=" bg-white p-2 mt-2"
//         >
//           <div className="flex bg-gray-100 items-center justify-center">
//             <CampaignForm />
//           </div>
//           <div>
//             <UploadCreatives />
//           </div>
//           <div className="w-full">
//             <TargetingOptions />
//           </div>
//           <div>
//             <AdScheduling />
//           </div>
//           <div>
//             <BiddingBudget />
//           </div>
//           <div className="flex justify-end mt-2 gap-3">
//             <button className="bg-white border border-red-500 text-red-500 px-4 py-2 ">
//               Save as Draft
//             </button>
//             <button
//               className="bg-blue-600 text-white px-4 py-2"
//               disabled={methods.formState.isSubmitting}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </FormProvider>
//     </div>
//   );
// };

// export default CreateAdForm;
