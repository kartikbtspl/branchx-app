export const CampaignFormfields = [
  {
    name: "campaignName",
    label: "Campaign Name",
    type: "text",
    placeholder: "write your campaign name",
    required: { value: true, message: "Campaign Name is required" },
  },
  {
    name: "campaignDescription",
    label: "Campaign Description",
    type: "text",
    placeholder: "Optional description for internal tracking",
    required: { value: true, message: "Campaign Description is required" },
  },
  {
    name: "campaignObjective",
    label: "Campaign Objective",
    type: "select",
    options: [
      { label: "Brand Awareness", value: "Brand Awareness" },
      { label: "Lead Generation", value: "Lead Generation" },
      { label: "Sales Promotion", value: "Sales Promotion" },
    ],
  },
  {
    name: "campaignType",
    label: "Campaign Type",
    type: "select",
    options: [
      { label: "Video Ad", value: "Video Ad" },
      { label: "Image Ad", value: "Image Ad" },
    ],
  },

];