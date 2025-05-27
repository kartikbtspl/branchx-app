import { MoveLeft, Search } from "lucide-react";
import { Link } from "react-router";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import UploadMediaBox from "./UploadMediaBox";
import InvestmentSliderWithReset from "./InvestmentSliderWithReset";
import AdCirculationDateTimePicker from "../../common/AdCirculationDateTimePicker";


const CreateAdForm = () => {
  return (
    <div>
      <Link to="/">
        <button>
          <span className="flex gap-2">
            <MoveLeft /> Back to Home
          </span>
        </button>
      </Link>
      <form className=" rounded-xl border bg-[#FFFFFF] px-3 py-1 overflow-hidden">
        <h1 className="text-[#404040]">Ad Creation Form</h1>
        <div>
          <h1 className="text-[#555555] font-[500] mb-2 mt-5">Title</h1>
          <div className="bg-[#F7F7F7] ">
            <Input
              className="w-full  p-2 "
              placeholder="Write the heading of your ad here"
            />
          </div>
        </div>
        <div>
          <h1 className="text-[#555555] font-[500] mb-2 mt-5">
            Ad Description
          </h1>
          <div className="bg-[#F7F7F7] ">
            <TextArea
              className="w-full p-2 "
              placeholder="Write a brief description of your ad here"
            />
          </div>
        </div>
        <div>
          <AdCirculationDateTimePicker onChange={(data) => console.log("Create", data)} />

        </div>
        <div className="space-y-2 mt-3 w-full">
          <h2 className="text-[#555555] font-medium">Target Audience</h2>
          <p className="text-sm text-[#7D7D7D]">By Location</p>

          <div className="flex items-center bg-[#F7F7F7] border border-[#EEEEEE] rounded-md px-3 py-2 w-full">
            <Search className="w-4 h-4 text-[#A0A0A0] mr-2" />
            <input
              type="text"
              placeholder="Add a State, region or city"
              className="bg-transparent focus:outline-none w-full text-sm text-[#333333]"
            />
          </div>
        </div>
        <div className="mt-5">
          <InvestmentSliderWithReset  />
        </div>
        <div>
          <UploadMediaBox />
        </div>
        <div className="mt-4">
          <div className="flex justify-end gap-2">
            <button className="bg-amber-50 text-[#445E94] px-8 py-1 rounded-b-md">Save Draft</button>
            <button className="bg-[#445E94] text-white px-8 py-1 rounded-md">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAdForm;
