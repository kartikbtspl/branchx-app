
import { useFormContext } from "react-hook-form";
import FormDatePicker from "../formDatePicker/FormDatePicker";
import FormFileUpload from "../formFileUpload/FormFileUpload";
import FormInput from "../formInput/FormInput";
import FormSelect from "../formSelect/FormSelect";
import FormLabel from "../formLabel/FormLabel";
import FormRadioGroup from "../formRadioGroup/FormRadioGroup";
import TargetingOptions from "./TargetingOptions";
import FormTimeSlotPicker from "../formTimeSlotPicker/FormTimeSlotPicker";
import FormDaysOfWeek from "../formDaysOfWeeks/FormDaysOfWeek";
import AdDevicesSelect from "./targetingOptions/AdDevicesSelect";
import DemographicSelect from "./targetingOptions/DemographicSelect";
import ProductTypeSelect from "./targetingOptions/ProductTypeSelect";
import TargetRegionsSelect from "./targetingOptions/TargetRegionsSelect";


const componentMap = {
  FormInput,
  FormSelect,
  FormDatePicker,
  FormFileUpload,
  FormRadioGroup,
  TargetingOptions,
  FormTimeSlotPicker,
  FormDaysOfWeek,
  AdDevicesSelect , 
  DemographicSelect,
  ProductTypeSelect,
  TargetRegionsSelect
};

const FormBuilder = ({ fields }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
const readOnlyFields = ["estimatedPrice", "baseCost"];

  return (
     <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
    {fields.map((field) => {
      const Component = componentMap[field.component];
      if (!Component) return null;

      const isReadOnly = readOnlyFields.includes(field.name);
      const fieldError = errors?.[field.name];

      return (
        <div key={field.name} className={`col-span-${field.colSpan || 1} w-full`}>
          {field.label && (
            <FormLabel
              htmlFor={field.name}
              text={field.label}
              required={field.required}
            />
          )}
          <Component
            name={field.name}
            register={register}
            control={control}
            error={fieldError}
            required={field.required}
            options={field.options}
            accept={field.accept}
            placeholder={field.placeholder}
            type={field.type}
            inputProps={field.inputProps}
            customSx={field.customSx}
            readOnly={isReadOnly} 
          />
        </div>
      );
    })}
  </div>
  );
};

export default FormBuilder;
