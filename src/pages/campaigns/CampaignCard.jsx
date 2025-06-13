import { ExternalLink, Settings2 } from "lucide-react";
import MediaPlayer from "../../components/video/MediaPlayer";
import { Link } from "react-router";

const CampaignCard = ({
  id,
  campaignCode,
  campaignName,
  isApproved,
  isPayment,
  status,
  scheduleDate,
  timeSlot,
  creativeFile,
  onToggle,
  onReconfigure,
}) => {
  const isVideo = creativeFile?.toLowerCase().endsWith(".mp4");
  const canToggle = isApproved === "APPROVED" && isPayment;

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg px-5 py-4 flex flex-col gap-4">
      {/* Top Section: Code + Image + Info */}
      <div className="flex items-start gap-4">
   
        <div className="flex flex-col items-start gap-2 min-w-[100px]">
          <p className="text-sm font-semibold text-gray-800">{campaignCode}</p>
          <div className="w-full h-fit rounded-lg overflow-hidden ">
            {isVideo ? (
              <MediaPlayer src={creativeFile} previewOnly />
            ) : (
              <img
                src={creativeFile}
                alt="Creative"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1 space-y-1">
          <Link to={`/campaign/${id}`}>
            <div className="flex items-center justify-between">
              <div className="text-md font-semibold text-gray-900">
                {campaignName}
              </div>
              <ExternalLink
                size={18}
                className="text-gray-400 hover:text-blue-500"
              />
            </div>
          </Link>

          <div className="text-sm text-gray-600 flex items-center gap-1">
            Approval Status:
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                isApproved === "APPROVED"
                  ? "bg-green-200 text-green-800"
                  : isApproved === "REJECTED"
                  ? "bg-red-200 text-red-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {isApproved}
            </span>
          </div>

          <div className="text-sm text-gray-600">
            Scheduled:{" "}
            <span className="text-gray-800 font-medium">{scheduleDate}</span> (
            {timeSlot})
          </div>
        </div>
      </div>

      {/* Bottom Row: Reconfigure + Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReconfigure}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 border border-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-50 transition"
        >
          <Settings2 size={16} />
          Reconfigure
        </button>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={status}
            onChange={canToggle ? onToggle : () => {}}
            disabled={!canToggle}
          />
          <div
            className={`w-11 h-6 rounded-full transition-colors relative ${
              !canToggle
                ? "bg-gray-300"
                : status
                ? "bg-green-500"
                : "bg-red-500"
            } peer-focus:outline-none peer-disabled:opacity-50`}
          >
            <div
              className={`absolute top-[3px] left-[3px] bg-white rounded-full h-4 w-4 transition-transform ${
                status ? "translate-x-5" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default CampaignCard;
