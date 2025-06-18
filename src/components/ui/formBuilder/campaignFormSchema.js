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
          { label: "Video", value: "video" },
          { label: "Image", value: "image" },
        ],
        component: "FormRadioGroup",
      },
    ],
  },
  {
    title: "Targeting Options",
    fields: [
      {
        component: "TargetingOptions",
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
        label: "Days of the Week",
        required: true,
        component: "FormMultiSelect",
        customCss: "mb-4",
        options: [
          { label: "Monday", value: "monday" },
          { label: "Tuesday", value: "tuesday" },
          { label: "Wednesday", value: "wednesday" },
          { label: "Thursday", value: "thursday" },
          { label: "Friday", value: "friday" },
          { label: "Saturday", value: "saturday" },
          { label: "Sunday", value: "sunday" },
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
];
