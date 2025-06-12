import { useFormContext, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const AdScheduling = () => {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const timeSlot = watch("timeSlot") || "6–9 AM";
  const selectedDays = watch("selectedDays") || [];
  const scheduleStart = watch("scheduleDate");
  const today = dayjs().startOf("day");

  const timeSlots = [
    "12 AM - 1 AM", "1 AM - 2 AM", "2 AM - 3 AM", "3 AM - 4 AM",
    "4 AM - 5 AM", "5 AM - 6 AM", "6 AM - 7 AM", "7 AM - 8 AM",
    "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM", "11 AM - 12 PM",
    "12 PM - 1 PM", "1 PM - 2 PM", "2 PM - 3 PM", "3 PM - 4 PM",
    "4 PM - 5 PM", "5 PM - 6 PM", "6 PM - 7 PM", "7 PM - 8 PM",
    "8 PM - 9 PM", "9 PM - 10 PM", "10 PM - 11 PM", "11 PM - 12 AM"
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setValue(
        "selectedDays",
        selectedDays.filter((d) => d !== day)
      );
    } else {
      setValue("selectedDays", [...selectedDays, day]);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Ad Scheduling</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Time Slot Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Slot(s)
          </label>
          <select
            {...register("timeSlot")}
            value={timeSlot}
            onChange={(e) => setValue("timeSlot", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Days of Week */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Days of Week
          </label>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <label
                key={day}
                className={`px-3 py-1 rounded border cursor-pointer ${
                  selectedDays.includes(day)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  value={day}
                  checked={selectedDays.includes(day)}
                  onChange={() => toggleDay(day)}
                  className="hidden"
                />
                {day}
              </label>
            ))}
            {errors.selectedDays && (
              <span className="text-red-500 text-sm mt-1 block">
                Select at least one day
              </span>
            )}
          </div>
        </div>

        {/* Schedule Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Schedule Start Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="scheduleDate"
              control={control}
              defaultValue={null}
              rules={{
                required: "Schedule start date is required",
                validate: (value) =>
                  value && dayjs(value).isBefore(today, "day")
                    ? "Start date cannot be in the past"
                    : true,
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value || null}
                  onChange={(date) => field.onChange(date)}
                  format="DD/MM/YYYY"
                  minDate={today}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      error: !!errors.scheduleDate,
                      helperText: errors.scheduleDate?.message,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>

        {/* Schedule End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Schedule End Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="scheduleEndDate"
              control={control}
              defaultValue={null}
              rules={{
                required: "Schedule end date is required",
                validate: (value) => {
                  if (!value) return "End date is required";
                  if (dayjs(value).isBefore(today, "day")) {
                    return "End date cannot be in the past";
                  }
                  if (scheduleStart && dayjs(value).isBefore(dayjs(scheduleStart))) {
                    return "End date cannot be before start date";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value || null}
                  onChange={(date) => field.onChange(date)}
                  format="DD/MM/YYYY"
                  minDate={today}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      error: !!errors.scheduleEndDate,
                      helperText: errors.scheduleEndDate?.message,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default AdScheduling;

