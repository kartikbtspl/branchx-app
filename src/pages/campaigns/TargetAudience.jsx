import Input from "../../components/form/input/InputField";

const TargetAudience = () => {
  return (
    <div className="w-full mt-6">
      <h2 className="text-[#333333]  mb-4">Target Audience</h2>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* By Location */}
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-600 mb-1">By Location</label>
          <div className="bg-[#F7F7F7]">
            <Input
              type="text"
              placeholder="Karnataka"
              className="border rounded-md px-3 py-2 text-sm bg-[#F7F7F7]"
            />
          </div>
        </div>

        {/* By Number */}
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-600 mb-1">By Number</label>
          <div className="bg-[#F7F7F7]">
            <Input
              type="text"
              placeholder="2,00,000"
              className="border rounded-md px-3 py-2 text-sm "
            />
          </div>
        </div>

        {/* By Preference (optional) */}
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-600 mb-1">
            By preference{" "}
            <span className="text-xs text-gray-400">(optional)</span>
          </label>
          <div className="bg-[#F7F7F7]">
            <Input
              type="text"
              placeholder="Family"
              className="border  bg-[#F7F7F7] rounded-md px-3 py-2 text-sm outline-none "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetAudience;
