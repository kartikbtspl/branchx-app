import React from "react";
import { useFormContext } from "react-hook-form";
import FormDatePicker from "../formDatePicker/FormDatePicker";
import FormFileUpload from "../formFileUpload/FormFileUpload";
import FormInput from "../formInput/FormInput";
import FormSelect from "../formSelect/FormSelect";
import FormLabel from "../formLabel/FormLabel";
import FormRadioGroup from "../formRadioGroup/FormRadioGroup";
import TargetingOptions from "./TargetingOptions";
import FormTimeSlotPicker from "../formTimeSlotPicker/FormTimeSlotPicker";

const componentMap = {
  FormInput,
  FormSelect,
  FormDatePicker,
  FormFileUpload,
  FormRadioGroup,
  TargetingOptions,
  FormTimeSlotPicker
};

const FormBuilder = ({ fields }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => {
        const Component = componentMap[field.component];
        if (!Component) return null;

        const fieldError = errors?.[field.name];

        return (
          <div key={field.name} className={`col-span-${field.colSpan || 1}`}>
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default FormBuilder;
