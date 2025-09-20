import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
// import { Skeleton } from "@/components/ui/skeleton"
//  Plus, Trash, View, ImageIcon, Search, from lucide react
import { ChevronLeft, ImageIcon, PanelRight, Plus, Trash, View } from "lucide-react";
import SeverityHistory from "@/components/container/admin/analysis-sections/SeverityHistory";
import Comment from "@/components/container/admin/analysis-sections/Comment";
import Recommendation from "@/components/container/admin/analysis-sections/Recommendation";
import ClientAction from "@/components/container/admin/analysis-sections/ClientAction";
import AnalystNote from "@/components/container/admin/analysis-sections/AnalystNote";
import { EquipmentUpload } from "@/components/container/admin/analysis-sections/EquipmentUpload";
import { EquipmentView } from "@/components/container/admin/analysis-sections/EquipmentView";
import { FigureUpload } from "@/components/container/admin/analysis-sections/FigureUpload";
import { FigureView } from "@/components/container/admin/analysis-sections/FigureView";
import EquipmentDetails from "../../container/admin/analysis-sections/EquipmentDetails";
import Temperature from "@/components/container/admin/analysis-sections/Temperature";
import OilAnalysis from "@/components/container/admin/analysis-sections/OilAnalysis";
import { Link } from "react-router-dom";

// dummy zod schema
const analysisAndReportSchema = z.object({
  client: z.string().optional(),
  area: z.string().optional(),
  jobNo: z.string().min(1, "Job number is required"),
  inspectionRoute: z.string().optional(),
  yearWeekNo: z.string().optional(),
  reviewer: z.string().optional(),
});

type FormData = z.infer<typeof analysisAndReportSchema>;

// dummy data
const dummyJobs = [
  {
    jobNumber: "JOB-001",
    area: "Area A",
    user: { id: "1", name: "Client One" },
    yearWeekNumber: "2025-W37",
    reviewer: "John Reviewer",
    inspectionRoute: "Route Alpha",
    jobDescription: "Test Job 1",
  },
  {
    jobNumber: "JOB-002",
    area: "Area B",
    user: { id: "2", name: "Client Two" },
    yearWeekNumber: "2025-W38",
    reviewer: null,
    inspectionRoute: "Route Beta",
    jobDescription: "Test Job 2",
  },
];

const dummyEquipments = [
  { id: "eq1", name: "Motor Pump A" },
  { id: "eq2", name: "Generator X" },
];

const dummyComponents = [
  { id: "comp1", name: "Bearing" },
  { id: "comp2", name: "Rotor" },
];

// dummy selected component with static comments
const dummySelectedComponent = {
  id: "1",
  routeComponentID: "dummy-rcid",
};

const dummyIsLoading = false;

// ---------------- COMPONENT ----------------
const UserAnalysisAndReportForm = () => {
  const [openExport, setOpenExport] = React.useState(false);
  const [openEditFile, setOpenEditFile] = React.useState(false);

  const [selectedJob, setSelectedJob] = React.useState<
    (typeof dummyJobs)[0] | null
  >(null);
  const [selectedEquipment, setSelectedEquipment] = React.useState<
    (typeof dummyEquipments)[0] | null
  >(null);
  const [selectedComponent, setSelectedComponent] = React.useState<
    (typeof dummyComponents)[0] | null
  >(null);

  const [activeDrawing, setActiveDrawing] = React.useState("view");
  const [activeFigure, setActiveFigure] = React.useState("add");
  const [hideList, setHideList] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(analysisAndReportSchema),
    defaultValues: {
      client: "",
      area: "",
      jobNo: "",
      inspectionRoute: "",
      yearWeekNo: "",
      reviewer: "",
    },
  });

  const onSubmit = (values: FormData) => {
    console.log("Submitted Values:", values);
    alert("Form submitted! (check console)");
    form.reset();
  };

  return (
      <div className="w-full h-full p-3 sm:p-5 flex">
        <div className="w-full flex flex-col gap-3 sm:gap-5">
          {/* ---------------- FORM ---------------- */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-5 mt-0 flex flex-col"
            >
              <div className="w-full h-full bg-white rounded-xl border p-5 shadow-lg">
                <div className="flex flex-col ">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <Link to={"/job-registry"} className="text-zinc-500 hover:text-zinc-700 transition">
                            <ChevronLeft/>
                        </Link>
                        <h1 className="text-xl sm:text-2xl font-bold text-black">
                            Analysis and Reporting
                        </h1>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        className="bg-main hover:bg-follow text-white"
                        onClick={() => setOpenEditFile(!openEditFile)}
                        disabled={!selectedJob}
                      >
                        Edit File
                      </Button>
                      <Dialog
                        open={openEditFile}
                        onOpenChange={setOpenEditFile}
                      ></Dialog>
                      <Button
                        onClick={() => setOpenExport(!openExport)}
                        type="button"
                        className="bg-main hover:bg-follow text-white"
                        disabled={!selectedJob}
                      >
                        Export
                      </Button>
                      <Dialog
                        open={openExport}
                        onOpenChange={setOpenExport}
                      ></Dialog>
                    </div>
                  </div>

                  <h2 className="text-base sm:text-lg font-semibold mb-3 mt-3 text-zinc-700">
                    Information
                  </h2>
                </div>

                {/* ---------------- JOB + ROUTE ---------------- */}
                <div className="flex md:flex-row flex-col gap-3 w-full">
                  <div className="flex-col gap-3 flex md:w-1/3 w-full">
                    <FormField
                      control={form.control}
                      name="jobNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Number</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              const job = dummyJobs.find(
                                (j) => j.jobNumber === value
                              );
                              setSelectedJob(job || null);
                              setSelectedEquipment(null);
                              setSelectedComponent(null);
                              field.onChange(value);
                            }}
                            value={field.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select Job Number" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {dummyJobs.map((job) => (
                                <SelectItem
                                  key={job.jobNumber}
                                  value={job.jobNumber}
                                >
                                  {job.jobNumber}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="inspectionRoute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Route Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Select job number first"
                              {...field}
                              readOnly
                              value={selectedJob?.inspectionRoute || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* ---------------- CLIENT + AREA ---------------- */}
                  <div className="flex-col gap-3 flex md:w-1/3 w-full">
                    <FormField
                      control={form.control}
                      name="client"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Select job number first"
                              {...field}
                              readOnly
                              value={selectedJob?.user?.name || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Select job number first"
                              {...field}
                              readOnly
                              value={selectedJob?.area || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* ---------------- REVIEWER + WEEK ---------------- */}
                  <div className="flex-col gap-3 flex md:w-1/3 w-full">
                    <FormField
                      control={form.control}
                      name="reviewer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reviewed</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Select job number first"
                              {...field}
                              readOnly
                              value={selectedJob?.reviewer || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="yearWeekNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year & Week no.</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Select job number first"
                              {...field}
                              readOnly
                              value={selectedJob?.yearWeekNumber || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Form>

          {/* ---------------- EQUIPMENT LIST ---------------- */}
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 w-full">
            <div
              className={`w-full lg:w-1/3 rounded-xl border bg-white flex flex-col p-5 shadow-lg ${
                hideList && "hidden"
              } lg:sticky lg:top-4 lg:max-h-[96vh] lg:overflow-y-auto`}
            >
              <h2 className="font-bold text-lg">
                {selectedEquipment ? selectedEquipment.name : "Equipment List"}
              </h2>
              {!selectedEquipment ? (
                <ul className="mt-8 space-y-2">
                  {dummyEquipments.map((eq) => (
                    <li
                      key={eq.id}
                      className="cursor-pointer hover:bg-gray-100 p-2 border rounded"
                      onClick={() => setSelectedEquipment(eq)}
                    >
                      {eq.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="mt-2 space-y-2">
                  {dummyComponents.map((comp) => (
                    <li
                      key={comp.id}
                      className={`p-2 border rounded cursor-pointer ${
                        selectedComponent?.id === comp.id
                          ? "bg-red-400 text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedComponent(comp)}
                    >
                      {comp.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div
              className={`w-full rounded-xl border bg-white flex flex-col p-5 shadow-lg ${
                !hideList && "lg:w-2/3"
              }`}
            >
              <div className="flex flex-col mb-3">
                <div className="flex gap-3 items-center mb-3">
                  <PanelRight
                    onClick={() => setHideList(!hideList)}
                    className={`transform cursor-pointer lg:rotate-0 rotate-90 ${
                      hideList ? "text-zinc-700" : "text-zinc-500"
                    }`}
                    size={20}
                  />
                  <h2 className="text-lg font-semibold text-zinc-700">
                    Severity History
                  </h2>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <SeverityHistory
                    isLoading={dummyIsLoading}
                    selectedComponent={dummySelectedComponent}
                    // severityMap={severityMap}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {/* ####################### COMMENTS ######################### */}
                <div className="flex flex-col gap-3 mt-3">
                  <Comment
                    isLoading={dummyIsLoading}
                    selectedComponent={dummySelectedComponent}
                  />
                </div>
                {/* ####################### RECOMMENDATIONS ######################### */}
                <div className="flex flex-col gap-3 mt-3">
                  <Recommendation
                    isLoading={dummyIsLoading}
                    selectedComponent={dummySelectedComponent}
                  />
                </div>
                {/* ####################### CLIENT ACTIONS AND ANALYST NOTE ######################### */}
                <div className="flex flex-col md:flex-row gap-3 mt-3">
                  <div className="flex flex-col gap-3 w-full">
                    <ClientAction
                      isLoading={dummyIsLoading}
                      clientId={selectedJob?.user?.id}
                      componentId={dummySelectedComponent?.id}
                    />
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    <AnalystNote
                      isLoading={dummyIsLoading}
                      clientId={selectedJob?.user?.id}
                      componentId={dummySelectedComponent?.id}
                    />
                  </div>
                </div>
                {/* ####################### EQUIPMENT DRAWING REQUIRED ######################### */}

                <div className="flex flex-col md:flex-row gap-3 mt-3">
                  <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-sm font-medium">
                      Equipment Drawing Photo
                    </h1>
                    <div className="border rounded-lg p-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => setActiveDrawing("upload")}
                          type="button"
                          className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                            activeDrawing === "upload" && "bg-zinc-200"
                          }`}
                        >
                          <ImageIcon className="text-zinc-600" size={15} />
                          <h1 className="text-sm text-zinc-600">Upload</h1>
                        </button>
                        <button
                          onClick={() => setActiveDrawing("delete")}
                          type="button"
                          className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                            activeDrawing === "delete" && "bg-zinc-200"
                          }`}
                        >
                          <Trash className="text-zinc-600" size={15} />
                          <h1 className="text-sm text-zinc-600">Delete</h1>
                        </button>
                        <button
                          onClick={() => setActiveDrawing("view")}
                          type="button"
                          className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                            activeDrawing === "view" && "bg-zinc-200"
                          }`}
                        >
                          <View className="text-zinc-600" size={15} />
                          <h1 className="text-sm text-zinc-600">View</h1>
                        </button>
                      </div>
                      <div className="w-full h-[1px] bg-zinc-200 mt-3" />
                      {activeDrawing === "upload" && <EquipmentUpload />}
                      {(activeDrawing === "view" ||
                        activeDrawing === "delete") && (
                        <EquipmentView isDelete={activeDrawing === "delete"} />
                      )}
                    </div>
                  </div>

                  {/* ####################### REPORT FIGURES ######################### */}

                  <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-sm font-medium">Report Figures</h1>
                    <div className="border rounded-lg p-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => setActiveFigure("add")}
                          type="button"
                          className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                            activeFigure === "add" && "bg-zinc-200"
                          }`}
                        >
                          <Plus className="text-zinc-600" size={15} />
                          <h1 className="text-sm text-zinc-600">Add</h1>
                        </button>
                        <button
                          onClick={() => setActiveFigure("delete")}
                          type="button"
                          className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                            activeFigure === "delete" && "bg-zinc-200"
                          }`}
                        >
                          <Trash className="text-zinc-600" size={15} />
                          <h1 className="text-sm text-zinc-600">Delete</h1>
                        </button>
                        <button
                          onClick={() => setActiveFigure("view")}
                          type="button"
                          className={`flex gap-1 items-center px-2 py-1 rounded-md ${
                            activeFigure === "view" && "bg-zinc-200"
                          }`}
                        >
                          <View className="text-zinc-600" size={15} />
                          <h1 className="text-sm text-zinc-600">View</h1>
                        </button>
                      </div>
                      <div className="w-full h-[1px] bg-zinc-200 mt-3" />
                      {activeFigure === "add" && <FigureUpload />}
                      {(activeFigure === "view" ||
                        activeFigure === "delete") && (
                        <FigureView isDelete={activeFigure === "delete"} />
                      )}
                    </div>
                  </div>
                </div>
                {/* ####################### EQUIPMENT MECHANICAL DETAILS ######################### */}

                <div className="flex flex-col md:flex-row gap-3 mt-3">
                  <EquipmentDetails
                    isLoading={dummyIsLoading}
                    selectedComponent={dummySelectedComponent}
                    selectedJob={selectedJob}
                  />
                  {/* ####################### TEMPARATURE AND OIL ANALYSIS ######################### */}

                  <div className="flex flex-col gap-3 w-full md:w-1/2">
                    <div className="flex flex-col gap-3 w-full">
                      <Temperature
                        isLoading={dummyIsLoading}
                        selectedComponent={dummySelectedComponent}
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      <OilAnalysis
                        isLoading={dummyIsLoading}
                        selectedComponent={dummySelectedComponent}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserAnalysisAndReportForm;
