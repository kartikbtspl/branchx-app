export const campaignFormSchema = [
  {
    title: "Campaign Details",
    fields: [
      {
        type: "text",
        name: "campaignName",
        label: "Campaign Name",
        required: true,
        placeholder: "Write your campaign name",
        component: "FormInput",
      },
      {
        type: "text",
        name: "campaignDescription",
        label: "Campaign Description",
        required: true,
        placeholder: "Optional description for internal tracking",
        component: "FormInput",
      },
      {
        name: "campaignObjective",
        label: "Campaign Objective",
        required: true,
        options: [
          { label: "Brand Awareness", value: "brand-awareness" },
          { label: "Sales", value: "sales" },
        ],
        component: "FormSelect",
      },
      {
        name: "campaignType",
        label: "Campaign Type",
        required: true,
        options: [
          { label: "Video Ad", value: "video" },
          { label: "Image Ad", value: "image" },
        ],
        component: "FormSelect",
      },
    ],
  },
  {
    title: "Upload Creatives",
    fields: [
      {
        type: "text",
        name: "duration",
        label: "Duration (seconds)",
        required: true,
        placeholder: "Enter duration",
        component: "FormInput",
      },
      {
        type: "text",
        name: "interval",
        label: "Interval (seconds)",
        required: true,
        placeholder: "Enter interval",
        component: "FormInput",
      },
      {
        name: "creativeFile",
        label: "Upload File",
        accept: "image/*,video/*",
        component: "FormFileUpload",
      },
      {
        name: "creativeType",
        label: "Creative Type",
        required: true,
        options: [
          { label: "Interactive", value: "Interactive" },
          { label: "Informational", value: "Informational" },
          { label: "Visual", value: "Visual" },
        ],
        component: "FormRadioGroup",
      },
    ],
  },
  {
    title: "Targeting Options",
    fields: [
      {
        name: "targetRegions",
        component: "TargetRegionsSelect",
      },

      {
        name: "adDevices",
        component: "AdDevicesSelect",
      },
      {
        name: "productType",
        component: "ProductTypeSelect",
      },
      {
        name: "demographic",
        component: "DemographicSelect",
      },
    ],
  },
  {
    title: "Ad Scheduling",
    fields: [
      {
        name: "startDate",
        label: "Start Date",
        required: true,
        component: "FormDatePicker",
      },
      {
        name: "endDate",
        label: "End Date",
        component: "FormDatePicker",
      },
      {
        name: "daysOfWeek",
        required: true,
        component: "FormDaysOfWeek",
        options: [
          { label: "Mon", value: "monday" },
          { label: "Tue", value: "tuesday" },
          { label: "Wed", value: "wednesday" },
          { label: "Thu", value: "thursday" },
          { label: "Fri", value: "friday" },
          { label: "Sat", value: "saturday" },
          { label: "Sun", value: "sunday" },
        ],
      },
      {
        name: "timeSlots",
        label: "Time Slots",
        required: true,
        component: "FormTimeSlotPicker",
        customCss: "mb-4",
        inputProps: {
          size: "small",
          variant: "outlined",
        },
      },
    ],
  },
  {
    title: "Bid and Budget",
    fields: [
      {
        type: "number",
        name: "baseCost",
        label: "Base Cost",
        required: true,
        placeholder: "Enter base cost",
        component: "FormInput",
      },
      {
        type: "number",
        name: "estimatedPrice",
        label: "Estimated Price",
        required: true,
        placeholder: "Enter estimated price",
        component: "FormInput",
      },
      {
        type: "number",
        name: "minBid",
        label: "Min Bid",
        required: true,
        placeholder: "Enter minimum bid",
        component: "FormInput",
      },
      {
        type: "number",
        name: "maxBid",
        label: "Max Bid",
        required: true,
        placeholder: "Enter maximum bid",
        component: "FormInput",
      },
    ],
  },
];
