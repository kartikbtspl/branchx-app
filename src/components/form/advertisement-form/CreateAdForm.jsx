import React from "react";
import CampaignForm from "./CampaignForm";
import UploadCreatives from "./UploadCreatives";
import TargetingOptions from "./TargetingOptions";
import AdScheduling from "./AdScheduling";
import BiddingBudget from "./BiddingBudget";
import { useForm, FormProvider } from "react-hook-form";
import MoonLoader from "react-spinners/MoonLoader";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../redux/slices/campaignSlice";

const CreateAdForm = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.campaign);
  const onSubmit = async (data) => {
    console.log("Form data before sending:", data);
    const result = await dispatch(createCampaign(data));

    if (createCampaign.fulfilled.match(result)) {
      methods.reset();
      navigate("/");
    }
  };
  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-blue-500 text-3xl dark:text-gray-400">
          Creating Campaign...
        </p>
        <div className="flex justify-center items-center h-64">
          {/* <RingLoader
          color="#1d2189"
          cssOverride={{}}
          size={200}
          speedMultiplier={1}
          className="flex justify-center items-center mt-4"
        /> */}
          <MoonLoader
            color="#5F7C95"
            size={100}
            speedMultiplier={1}
            className="flex justify-center items-center mt-4"
          />
        </div>
      </div>
    );
  }

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
              className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-md"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              disabled={methods.formState.isSubmitting}
            >
              Submit For Approval
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateAdForm;
