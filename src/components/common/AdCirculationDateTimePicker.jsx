import React, { useState, useEffect } from "react";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const AdCirculationDateTimePicker = ({
  initialStartDate,
  initialStartTime,
  initialEndDate,
  initialEndTime,
  onChange,
}) => {
  const [startDate, setStartDate] = useState(initialStartDate || dayjs());
  const [startTime, setStartTime] = useState(initialStartTime || dayjs());
  const [endDate, setEndDate] = useState(initialEndDate || dayjs());
  const [endTime, setEndTime] = useState(initialEndTime || dayjs());

  useEffect(() => {
    if (onChange) {
      onChange({ startDate, startTime, endDate, endTime });
    }
  }, [startDate, startTime, endDate, endTime]);

  return (
    <div className="mt-2 w-full">
      <h2 className="text-[#555555] font-[500] mb-4">
        Ad Circulation Date & Time
      </h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex items-start gap-4 flex-wrap">
          {/* Starts On */}
          <div className="w-[450px]">
            <p className="text-xs text-gray-600 mb-1">Starts On</p>
            <div className="flex gap-2">
              <DatePicker
                value={startDate}
                onChange={(newValue) => newValue && setStartDate(newValue)}
                format="DD-MMMM-YYYY"
                slotProps={{ textField: { size: "small" } }}
              />
              <TimePicker
                value={startTime}
                onChange={(newValue) => newValue && setStartTime(newValue)}
                format="hh:mm A"
                ampm
                slotProps={{ textField: { size: "small" } }}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="flex items-center h-full pt-6 text-2xl text-gray-400 font-light select-none">
            &ndash;
          </div>

          {/* Ends On */}
          <div className="w-[450px]">
            <p className="text-xs text-gray-600 mb-1">Ends On</p>
            <div className="flex gap-2">
              <DatePicker
                value={endDate}
                onChange={(newValue) => newValue && setEndDate(newValue)}
                format="DD-MMMM-YYYY"
                slotProps={{ textField: { size: "small" } }}
              />
              <TimePicker
                value={endTime}
                onChange={(newValue) => newValue && setEndTime(newValue)}
                format="hh:mm A"
                ampm
                slotProps={{ textField: { size: "small" } }}
              />
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default AdCirculationDateTimePicker;
