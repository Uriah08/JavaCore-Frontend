import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(5),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be 8 characters long",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters long",
    })
    .max(30, {
      message: "Username must be at most 30 characters long",
    }),
  email: z.string().email().min(5).max(50),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const symbols = [
  {
    image: "N",
    label: "Normal",
  },
  {
    image: "M",
    label: "Moderate",
  },
  {
    image: "S",
    label: "Severe",
  },
  {
    image: "C",
    label: "Critical",
  },
  {
    image: "X",
    label: "Missed Points",
  },
];

export const routeComponentCommentSchema = z.object({
  routeComponentId: z.string(),
  severity: z.string().min(1, "Severity is required"),
  comment: z.string().min(1, "Comment is required"),
});

export const routeComponentRecommendationSchema = z.object({
  routeComponentId: z.string(),
  priority: z.string().min(1, "Priority is required"),
  recommendation: z.string().min(1, "Recommendation is required"),
});

export const routeComponentTemperatureSchema = z.object({
  routeComponentId: z.string(),
  temperature: z
    .number()
    .min(-100, { message: "Temperature cannot be below -100°C" })
    .max(1000, { message: "Temperature cannot exceed 1000°C" }),
});

export const routeComponentOilAnalysisSchema = z.object({
  routeComponentId: z.string(),
  analysis: z
    .enum(["Normal", "Moderate", "Severe", "Critical", "Missed Points"])
    .describe("Choose a valid oil state!"),
});

export const jobSchema = z.object({
  client: z.string().min(1, { message: "Client is required" }),
  area: z.string().min(1, { message: "Area is required" }),
  dateSurveyed: z
    .date()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "A date surveyed is required.",
    }),
  jobNo: z.string().min(1, { message: "Job number is required" }),
  poNo: z.string().min(1, { message: "PO number is required" }),
  woNo: z.string().min(1, { message: "WO number is required" }),
  reportNo: z.string().min(1, { message: "Report number is required" }),
  jobDescription: z.string().min(1, { message: "Job description is required" }),
  method: z.string().min(1, { message: "Method is required" }),
  inspector: z.string().min(1, { message: "Inspector is required" }),
  inspectionRoute: z
    .string()
    .min(1, { message: "Inspection route is required" }),
  equipmentUse: z.string().min(1, { message: "Equipment use is required" }),
  dateRegistered: z
    .date()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "A date of register is required.",
    }),
  yearWeekNo: z.string().min(1, { message: "Year week number is required" }),
});
