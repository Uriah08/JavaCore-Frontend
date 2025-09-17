import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(5)
})

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
