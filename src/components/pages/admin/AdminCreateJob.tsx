// src/pages/admin/AdminCreateJob.tsx
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import SidebarLayout from "./SidebarLayout";

// dummy schema 
const jobSchema = z.object({
  client: z.string().min(1, "Client is required"),
  area: z.string().min(1, "Area is required"),
  dateSurveyed: z.date(),
  jobNo: z.string(),
  poNo: z.string(),
  woNo: z.string(),
  reportNo: z.string(),
  jobDescription: z.string(),
  method: z.string(),
  inspector: z.string(),
  inspectionRoute: z.string(),
  equipmentUse: z.string(),
  dateRegistered: z.date(),
  yearWeekNo: z.string(),
});

const AdminCreateJob: React.FC = () => {
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      client: "",
      area: "",
      dateSurveyed: new Date(),
      jobNo: "",
      poNo: "",
      woNo: "",
      reportNo: "",
      jobDescription: "",
      method: "",
      inspector: "",
      inspectionRoute: "",
      equipmentUse: "",
      dateRegistered: new Date(),
      yearWeekNo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof jobSchema>) => {
    console.log("Form submitted:", values);
    alert("✅ Job created successfully (static demo)");
    form.reset();
  };

  return (
    <SidebarLayout>
      <div className="w-full p-3 sm:p-5 flex">
        <div className="w-full h-full p-5 bg-white rounded-xl">
          <h1 className="text-xl sm:text-2xl font-bold">Create a Job</h1>
          <div className="flex-col flex mt-5">
            <h1 className="text-base sm:text-xl font-semibold">
              New Job Record
            </h1>
            <h1 className="text-xs sm:text-sm text-zinc-700">
              Tell us about your job information.
            </h1>
          </div>
          <div className="w-full mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="gap-5 flex flex-col"
              >
                {/* Client at Area */}
                <div className="flex md:flex-row flex-col gap-3 w-full">
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel>Client</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a client" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Client A</SelectItem>
                            <SelectItem value="2">Client B</SelectItem>
                            <SelectItem value="3">Client C</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel>Area</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select an area" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Area 1">Area 1</SelectItem>
                            <SelectItem value="Area 2">Area 2</SelectItem>
                            <SelectItem value="Area 3">Area 3</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date Surveyed */}
                <FormField
                  control={form.control}
                  name="dateSurveyed"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full md:w-1/2">
                      <FormLabel>Date Surveyed</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Job numbers */}
                <div className="flex md:flex-row flex-col gap-3 w-full">
                  <FormField
                    control={form.control}
                    name="jobNo"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel>Job Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job number..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="poNo"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel>PO Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter PO number..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Job Description */}
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your job description"
                          {...field}
                          className="resize-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Method at Inspector */}
                <div className="flex md:flex-row flex-col gap-3 w-full">
                  <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel>Method</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Method 1">Method 1</SelectItem>
                            <SelectItem value="Method 2">Method 2</SelectItem>
                            <SelectItem value="Method 3">Method 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inspector"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel>Inspector</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select inspector" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Inspector 1">
                              Inspector 1
                            </SelectItem>
                            <SelectItem value="Inspector 2">
                              Inspector 2
                            </SelectItem>
                            <SelectItem value="Inspector 3">
                              Inspector 3
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date Registered */}
                <FormField
                  control={form.control}
                  name="dateRegistered"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full md:w-1/2">
                      <FormLabel>Date Registered</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Year/Week */}
                <FormField
                  control={form.control}
                  name="yearWeekNo"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Year & Week Number</FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY-WW" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  className="w-fit bg-main mt-5 hover:bg-follow"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AdminCreateJob;
