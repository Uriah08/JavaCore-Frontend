import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(5),
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

export const jobSchema = z.object({
  client: z.string().min(1, { message: "Client is required" }),
  area: z.string().min(1, { message: "Area is required" }),
  dateSurveyed: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.instanceof(Date, { message: "A date surveyed is required." })
  ),
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
  dateRegistered: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.instanceof(Date, { message: "A date of register is required." })
  ),
  yearWeekNo: z.string().min(1, { message: "Year week number is required" }),
});
