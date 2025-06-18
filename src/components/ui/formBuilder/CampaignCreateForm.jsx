import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import SectionForm from "./SectionForm";
import { campaignFormSchema } from "./campaignFormSchema";

const CampaignCreateForm = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="w-full  bg-gray-100 rounded">
      <h1 className="text-2xl font-bold mb-6">Create Campaign</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {campaignFormSchema.map((section) => (
            <SectionForm
              key={section.title}
              title={section.title}
              fields={section.fields}
            />
          ))}
          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CampaignCreateForm;
