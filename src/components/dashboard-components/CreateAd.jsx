import Button from "@/components/ui/button/Button";
import { Link } from "react-router-dom";

const CreateAd = () => {
  return (
    <div className="w-fill flex rounded-2xl justify-between p-[20px] bg-[#E3E8EF]">
      <div className="flex items-center gap-3 w-full">
        <span>Create new campaign here</span>
      </div>
      <div className="w-full flex justify-end">
        <Link to="/advertisement/create-ad">
          <Button size="cs">Create Campaign</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateAd;
