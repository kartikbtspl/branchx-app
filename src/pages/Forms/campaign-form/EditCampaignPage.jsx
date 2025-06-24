import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CampaignFormWrapper from "../../../components/ui/formBuilder/CampaignFormWrapper";
import {
  fetchCampaignById,
  clearCampaign,
} from "../../../redux/slices/campaignDetailSlice";
import { transformCampaignResponse } from "../../../utils/campaign-helper/transformCampaignResponse";

const EditCampaignPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { campaign, loading, error } = useSelector(
    (state) => state.campaignDetail
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchCampaignById(id));
    }

    return () => {
      dispatch(clearCampaign());
    };
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading campaign: {error}</div>;
  if (!campaign) return null;
  const transformed = transformCampaignResponse(campaign);

  return <CampaignFormWrapper campaignData={transformed} isEdit={true} />;
};

export default EditCampaignPage;
