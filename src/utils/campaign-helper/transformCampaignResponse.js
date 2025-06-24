import dayjs from "dayjs";

export const transformCampaignResponse = (data) => {
  const updated = { ...data };

  updated.startDate = data.startDate ? new Date(data.startDate) : null;
  updated.endDate = data.endDate ? new Date(data.endDate) : null;

  if (data.startDate && data.startTime) {
    const start = new Date(data.startDate);
    const [h, m, s] = data.startTime.split(":");
    start.setHours(h, m, s || 0);
    updated.startTime = start;
  }

  if (data.endDate && data.endTime) {
    const end = new Date(data.endDate);
    const [h, m, s] = data.endTime.split(":");
    end.setHours(h, m, s || 0);
    updated.endTime = end;
  }

  return updated;
};
