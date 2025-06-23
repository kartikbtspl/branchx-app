import useEstimatePrice from "../../../hooks/useEstimatePrice";
import { campaignFormSchema } from "./campaignFormSchema";
import FormSection from "./FormSection";

const InnerForm = ({ isEdit }) => {
  useEstimatePrice(); 

  return (
    <>
      {campaignFormSchema.map((section) => (
        <FormSection
          key={section.title}
          title={section.title}
          fields={section.fields}
        />
      ))}
    </>
  );
};

export default InnerForm;
