import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import InnerForm from "./InnerForm";
import { createCampaign } from "../../../redux/slices/campaignSlice";
import { updateCampaign } from "../../../redux/slices/campaignDetailSlice";

const CampaignFormWrapper = ({ campaignData = {}, isEdit = false }) => {
  const methods = useForm({
    defaultValues: campaignData,
  });

  const { handleSubmit, reset } = methods;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const { loading } = useSelector((state) => state.campaign);

  useEffect(() => {
    if (isEdit && campaignData) {
      const parsedData = {
        ...campaignData,
        daysOfWeek:
          typeof campaignData.daysOfWeek === "string"
            ? JSON.parse(campaignData.daysOfWeek || "[]")
            : campaignData.daysOfWeek || [],
      };

      reset(parsedData);
    }
  }, [isEdit, campaignData, reset]);

  const onSubmit = async (formData) => {
    try {
      let result;
      if (isEdit) {
        result = await dispatch(updateCampaign({ id, data: formData }));
      } else {
        
        result = await dispatch(createCampaign(formData));
      }

      if (
        (!isEdit && createCampaign.fulfilled.match(result)) 
        || (isEdit && updateCampaign.fulfilled.match(result))
      ) {
        reset();
        navigate("/"); 
      } else {
        alert("Something went wrong.");
        console.error("Error:", result.payload || result.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error occurred.");
    }
  };

  return (
    <div className="w-full bg-gray-100 rounded p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Campaign" : "Create Campaign"}
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InnerForm isEdit={isEdit} />
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update Campaign"
                : "Create Campaign"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CampaignFormWrapper;
