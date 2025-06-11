import { ExternalLink, RefreshCw, Settings2 } from "lucide-react";
import MediaPlayer from "../../components/video/MediaPlayer";
import { Link } from "react-router";

const CampaignCard = ({
  id,
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
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg px-5 py-2 flex flex-col gap-5">

      <div className="flex items-start gap-6 ">
  
        <div className="w-56 h-36 rounded-lg overflow-hidden flex items-center justify-center">
          {isVideo ? (
            <MediaPlayer src={creativeFile}  previewOnly />
          ) : (
            <img
              src={creativeFile}
              alt="Creative"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-1 ">
          <Link to = {`/campaign/${id}`}>
          <div className="flex items-center justify-between">
            <div className="text-md font-semibold text-gray-900">{campaignName}</div>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} className="text-gray-400 hover:text-blue-500" />
            </a>
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
            <span className="text-gray-800 font-medium">{scheduleDate}</span> ({timeSlot})
          </div>

          {/* <div className="text-sm text-blue-600 mt-1 flex items-center gap-1">
            <RefreshCw size={14} />
            {campaignObjective}
          </div> */}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between ">
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
            className={`w-11 h-6 rounded-full transition-colors relative
              ${!canToggle ? "bg-gray-300" : status ? "bg-green-500" : "bg-red-500"}
              peer-focus:outline-none peer-disabled:opacity-50`}
          >
            <div
              className={`absolute top-[3px] left-[3px] bg-white rounded-full h-4 w-4 transition-transform
                ${status ? "translate-x-5" : ""}
              `}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default CampaignCard;



// import { ExternalLink, RefreshCw, Settings2 } from "lucide-react";
// import MediaPlayer from "../video/MediaPlayer"

// const CampaignCard = ({
//   campaignName,
//   campaignObjective,
//   isApproved,
//   status,
//   scheduleDate,
//   timeSlot,
//   creativeFile,
//   onToggle,
//   onReconfigure,
// }) => {
//   const isVideo = creativeFile?.toLowerCase().endsWith(".mp4");

//   return (
//     <div className="w-full  bg-white rounded-xl shadow p-4 flex flex-col gap-4">
//       {/* Header Row */}
//       <div className="flex items-start gap-4">
//         {/* Logo */}
//         <div className="w-30 h-30 rounded-md  flex items-center justify-center">
//            <div className="w-full mt-1">
//         {isVideo ? (
//           <MediaPlayer src={creativeFile} previewOnly />
//         ) : (
//           <img
//             src={creativeFile}
//             alt="Creative"
//             className="w-full h-48 object-cover rounded-md"
//           />
//         )}
//       </div>
//         </div>

//         {/* Info */}
//         <div className="flex-1">
//           {/* Title Row */}
//           <div className="flex items-center justify-between w-full">
//             <div className="font-semibold text-gray-900">{campaignName}</div>
//             <a href="#" target="_blank" rel="noopener noreferrer">
//               <ExternalLink size={16} className="text-gray-400 hover:text-blue-500" />
//             </a>
//           </div>

//           <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
//             Approval Status:{" "}
//             <span
//               className={`text-xs font-medium px-2 py-0.5 rounded ${
//                 isApproved === "APPROVED"
//                   ? "bg-green-200 text-green-800"
//                   : isApproved === "REJECTED"
//                   ? "bg-red-200 text-red-800"
//                   : "bg-yellow-200 text-yellow-800"
//               }`}
//             >
//               {isApproved}
//             </span>
//           </div>

//           {/* Schedule Info */}
//           <div className="text-sm text-gray-600 mt-0.5 flex">
//             Scheduled: <span className="text-gray-800 font-medium">{scheduleDate}</span> ({timeSlot})
//           </div>

//           {/* Objective */}
//           <div className="text-xs text-blue-600 mt-2 flex items-center gap-1">
//             <RefreshCw size={12} />
//             {campaignObjective}
//           </div>
//         </div>
//       </div>

   
    


//       <div className="flex items-center justify-between mt-2">
//         {/* Reconfigure Button */}
//         <button
//           onClick={onReconfigure}
//           className="flex items-center gap-1 text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded-full hover:bg-blue-50 transition"
//         >
//           <Settings2 size={14} />
//           Reconfigure
//         </button>

//         {/* Toggle Switch */}
//         <label className="relative inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             className="sr-only peer"
//             checked={status}
//             onChange={onToggle}
//           />
//           <div className="w-10 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-500 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default CampaignCard;
