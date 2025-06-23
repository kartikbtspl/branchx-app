import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { estimatePrice } from "../api/campaign-api/targetingOptionService";

const useEstimatePrice = () => {
  const { setValue, control } = useFormContext();
  const targetRegions = useWatch({ control, name: "targetRegions" });
  const productType = useWatch({ control, name: "productType" });
  const adDevices = useWatch({ control, name: "adDevices" });

  useEffect(() => {
    const shouldEstimate =
      targetRegions?.length > 0 && productType?.name && adDevices?.length > 0;

    if (!shouldEstimate) return;

    const payload = {
      targetRegions: targetRegions.map((r) => r.name),
      productType: productType.name,
      adDevices: adDevices.map((d) => d.name),
    };

    const fetchEstimate = async () => {
      try {
        const estimatedPrice  = await estimatePrice(payload);
        setValue("estimatedPrice", estimatedPrice.data.baseCost);
        setValue("baseCost", estimatedPrice.data.baseCost);
        
      } catch (err) {
        console.error("Estimation failed:", err);
      }
    };

    fetchEstimate();
  }, [targetRegions, productType, adDevices, setValue]);
};

export default useEstimatePrice;
