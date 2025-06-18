import React from "react";
import FormBuilder from "./FormBuilder";

const SectionForm = ({ title, fields }) => (
  <div className="bg-white rounded p-6 shadow mb-6">
    <h3 className="text-xl font-bold mb-5">{title}</h3>
    <FormBuilder fields={fields} />
  </div>
);

export default SectionForm;
