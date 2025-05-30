import { MoveLeft } from "lucide-react";
import { Link } from "react-router";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TargetAudience from "./TargetAudience";
import InvestmentSliderWithoutReset from "./InvestmentSliderWithoutReset";
import MediaUploader from "./MediaUploader";
import AdCirculationDateTimePicker from "../common/AdCirculationDateTimePicker";
const ViewAdvertisement = () => {
  return (
    <div className="">
      <div className="flex justify-between mb-5">
        <div>
          <Link to="/">
            <button>
              <span className="flex gap-2">
                <MoveLeft /> Back to Home
              </span>
            </button>
          </Link>
        </div>
        <div className="flex gap-2">
          <button className="py-[9px] px-12 border border-[#C15360] bg-white text-[#C15360] rounded-lg">
            Delete Ad
          </button>
          <button className="py-[9px] px-12 text-white bg-[#445E94] rounded-lg">
            Update Ad
          </button>
        </div>
      </div>
      <form className="px-[24px] py-[32px] rounded-xl border bg-[#FFFFFF]">
        <div>
          <h1 className="text-[#555555] font-[500] mb-2">Title</h1>
          <div className="bg-[#F7F7F7] ">
            <Input
              className="w-full  p-2 "
              placeholder="Write the heading of your ad here"
              value={"all the dummy value we can enter here"}
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
              value={
                "all the dummy description we can enter here so we can see that i don't know"
              }
            />
          </div>
        </div>
        <div>
          <AdCirculationDateTimePicker
            initialStartDate={dayjs()}
            initialStartTime={dayjs()}
            initialEndDate={dayjs()}
            initialEndTime={dayjs()}
            onChange={(data) => console.log("Update", data.startDate.format("DD-MMMM-YYYY"))}
          />
        </div>
        <div>
          <TargetAudience />
        </div>
        <div className="mt-2">
          <InvestmentSliderWithoutReset />
        </div>
        <div className="mt-2">
          <MediaUploader
            initialMediaUrl="/images/dummy.mp4"
            onUpload={(file) => {
              // Upload to backend here using fetch or Axios
              console.log("Uploading file:", file);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default ViewAdvertisement;
