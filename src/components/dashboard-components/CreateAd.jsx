import { Link } from "react-router-dom";

const CreateAd = () => {
  return (
    <div className="w-fill flex rounded-2xl justify-between p-[20px] bg-[#E3E8EF]">
      <div className="flex items-center gap-3 w-full">
        <span>Create new campaign here</span>
      </div>
      <div className="w-full flex justify-end">
        <Link to="/campaign/create-campaign">
          <button className="bg-[#526e95] p-2 rounded-xl text-white">Create Campaign</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateAd;
