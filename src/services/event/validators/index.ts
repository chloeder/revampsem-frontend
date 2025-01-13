import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(3).max(255),
  event_date_from: z.date(),
  event_date_to: z.date(),
  profit_center: z.any().optional(),
  file: z.any().optional(),
});

export const createAttendanceSchema = z.object({
  event_id: z.string(),
  file: z.any(),
});
