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
import { useCreateJobMutation } from "@/store/job-api";
import { jobSchema } from "@/schema";
import { toast } from "sonner";

const CreateJobForm: React.FC = () => {
  const form = useForm<z.infer<typeof jobSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(jobSchema) as any,
    defaultValues: {
      client: "cmfmcd1e10000jok00jggjmcr",
      area: "Area 1",
      dateSurveyed: new Date("2025-09-17"),
      jobNo: "JOB-123",
      poNo: "PO-456",
      woNo: "WO-789",
      reportNo: "REP-001",
      jobDescription: "This is a test job description.",
      method: "Method 1",
      inspector: "Inspector 1",
      inspectionRoute: "route1",
      equipmentUse: "equipment1",
      dateRegistered: new Date("2025-09-17"),
      yearWeekNo: "2025-38",
    },
    mode: "onBlur",
    shouldUnregister: true,
  });

  const [createJob] = useCreateJobMutation();

  async function onSubmit(values: z.infer<typeof jobSchema>) {
    console.log("Form submitted:", values);

    try {
      const response = await createJob(values).unwrap();
      toast(response.message);
    } catch (error) {
      const apiError = error as { data?: { error?: string } };
      const errorMsg = apiError?.data?.error ?? "An unexpected error occurred";
      toast.error(errorMsg);
    }
  }

  return (
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
                <Select onValueChange={field.onChange} value={field.value}>
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
                <Select onValueChange={field.onChange} value={field.value}>
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
        <h1 className="my-5 text-sm text-zinc-700">
          Enter the following information
        </h1>
        <div className="flex md:flex-row flex-col gap-3 w-full">
          <FormField
            control={form.control}
            name="jobNo"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Job Number</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Enter your job number..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  <Input
                    className="text-sm"
                    placeholder="Enter your PO number..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-3 w-full">
          <FormField
            control={form.control}
            name="woNo"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>WO Number</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Enter your WO number..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reportNo"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Report Number</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Enter your report number..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
        <h1 className="text-sm text-zinc-700 my-5">Important Information</h1>
        <div className="flex md:flex-row flex-col gap-3 w-full">
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Method</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select inspector" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Inspector 1">Inspector 1</SelectItem>
                    <SelectItem value="Inspector 2">Inspector 2</SelectItem>
                    <SelectItem value="Inspector 3">Inspector 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        {/* Dummy Form Fields */}
        <div className="flex md:flex-row flex-col gap-3 w-full">
          <FormField
            control={form.control}
            name="inspectionRoute"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Inspection Route</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a route" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="route1">Route A</SelectItem>
                    <SelectItem value="route2">Route B</SelectItem>
                    <SelectItem value="route3">Route C</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="equipmentUse"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Equipment Use</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="equipment1">Equipment 1</SelectItem>
                    <SelectItem value="equipment2">Equipment 2</SelectItem>
                    <SelectItem value="equipment3">Equipment 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* Date Registered */}
        <div className="flex md:flex-row flex-col gap-3 w-full">
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
        </div>

        {/* Submit */}
        <Button className="w-fit bg-main mt-5 hover:bg-follow" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateJobForm;
