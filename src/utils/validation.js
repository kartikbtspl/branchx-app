// validationSchema.ts
import { z } from "zod";

export const campaignSchema = z.object({
  campaignName: z.string().min(1, "Campaign Name is required"),
  campaignDescription: z.string().min(1, "Description is required"),
  campaignType: z.string().min(1, "Campaign Type is required"),
  campaignObjective: z.string().min(1, "Objective is required"),
  duration: z.string().min(1, "Duration is required"),
  creativeFile: z.any().refine(file => file?.length, "Creative file is required"),
  demographic: z.string().min(1),
  ageGroups: z.array(z.string()).min(1, "Select at least one age group"),
  cities: z.array(z.string()).min(1, "Select at least one city"),
  regions: z.array(z.string()).min(1, "Select at least one region"),
  targetRegions: z.array(z.string()).min(1),
  timeSlot: z.string().min(1, "Time Slot is required"),
  selectedDays: z.array(z.string()).min(1, "Select at least one day"),
  baseBid: z.string().min(1, "Base bid is required"),
  budgetLimit: z.string().min(1, "Budget is required"),
  estimatedReach: z.string().min(1, "Estimated reach is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});
