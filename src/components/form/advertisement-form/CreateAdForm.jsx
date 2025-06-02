import React from "react";
import CampaignForm from "./CampaignForm";
import UploadCreatives from "./UploadCreatives";
import TargetingOptions from "./TargetingOptions";
import AdScheduling from "./AdScheduling";
import BiddingBudget from "./BiddingBudget";
import { useForm, FormProvider } from "react-hook-form";

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
        <p className="text-gray-500 dark:text-gray-400">Creating campaign...</p>
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

