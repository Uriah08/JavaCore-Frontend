import {
  BriefcaseBusiness,
  Luggage,
  Route,
  ChartArea,
  User,
  Database,
} from "lucide-react";

export const adminSidebar = [
  {
    title: "Job Registry",
    icon: BriefcaseBusiness,
    link: "/job-registry",
  },
  {
    title: "Create a Job",
    icon: Luggage,
    link: "/create-job",
  },
  {
    title: "Create a Route",
    icon: Route,
    link: "/create-route",
  },
  {
    title: "Analysis/Report",
    icon: ChartArea,
    link: "/analysis-report",
  },
  {
    title: "Users",
    icon: User,
    link: "/users",
  },
  {
    title: "Database",
    icon: Database,
    link: "/machine-list",
  },
];

export const userSidebar = [
  {
    title: "Job Registry",
    icon: BriefcaseBusiness,
    link: "/job-registry",
  },
  {
    title: "Analysis/Report",
    icon: ChartArea,
    link: "/analysis-report",
  },
  {
    title: "Database",
    icon: Database,
    link: "/machine-list",
  },
];