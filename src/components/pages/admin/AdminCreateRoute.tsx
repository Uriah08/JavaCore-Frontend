import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SidebarLayout from "./SidebarLayout";

// dummy na zod schema
const formSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  areaId: z.string().min(1, "Area is required"),
  routeName: z.string().min(2, "Route name must be at least 2 characters"),
  equipmentNames: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AdminCreateRoute = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: "",
      areaId: "",
      routeName: "",
      equipmentNames: [],
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Dummy submit:", values);
  };

  return (
    <SidebarLayout>
      <div className="w-full p-3 sm:p-5 flex">
        <div className="w-full h-full p-5 bg-white rounded-xl">
          <h1 className="text-xl sm:text-2xl font-bold">Create Route</h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-3 mt-5 flex flex-col"
            >
              {/* Client + Button Row */}
              <div className="flex md:flex-row flex-col gap-3 w-full">
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/3">
                      <FormLabel className="text-lg font-semibold">
                        Client
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a client" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <SelectItem value="client1">Client 1</SelectItem>
                          <SelectItem value="client2">Client 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div className="flex-grow flex justify-end">
                  <Button
                    type="submit"
                    className=" bg-red-700 hover:bg-red-300 text-white mt-8 py-2 rounded-md"
                  >
                    Create
                  </Button>
                </div>
              </div>

              <hr className="my-0 border-t border-gray-300 w-full" />

              {/* Body */}
              <div className="flex md:flex-row flex-col gap-5 w-full">
                {/* Left - drag area */}
                <div className="w-full md:w-2/5 flex flex-col h-[calc(100vh-14rem)]">
                  <h2 className="text-lg font-semibold mb-3">Machine List</h2>
                  <div className="font-base flex flex-col flex-grow min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500">
                    <div className="p-2 border rounded mb-2 cursor-pointer hover:bg-gray-50">
                      Machine A
                    </div>
                    <div className="p-2 border rounded mb-2 cursor-pointer hover:bg-gray-50">
                      Machine B
                    </div>
                    <div className="p-2 border rounded mb-2 cursor-pointer hover:bg-gray-50">
                      Machine C
                    </div>
                  </div>
                </div>

                <hr className="h-auto border-l border-gray-300 mx-4 -mt-3" />

                {/* Right - Form */}
                <div className="w-full md:w-4/6">
                  <div className="flex md:flex-row flex-col gap-5 w-full">
                    <div className="w-full md:w-1/2">
                      <FormField
                        control={form.control}
                        name="areaId"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Area
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an Area" />
                                </SelectTrigger>
                              </FormControl>
                              <FormMessage />
                              <SelectContent>
                                <SelectItem value="area1">Area 1</SelectItem>
                                <SelectItem value="area2">Area 2</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-full md:w-1/2">
                      <FormField
                        control={form.control}
                        name="routeName"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Create Route
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter route name..."
                                className="text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <hr className="h-auto border-l border-gray-300 mt-3 w-full" />

                  {/* drop section */}
                  <div className="flex-1 overflow-auto mt-4">
                    <FormField
                      control={form.control}
                      name="equipmentNames"
                      render={() => (
                        <FormItem className="h-full">
                          <FormControl>
                            <div className="h-[calc(100vh-20rem)] overflow-auto border p-3 rounded">
                              <p className="text-sm text-gray-600">
                                Equipment Selector Placeholder
                              </p>
                              <div className="p-2 border rounded mb-2 cursor-pointer hover:bg-gray-50">
                                Equipment 1
                              </div>
                              <div className="p-2 border rounded mb-2 cursor-pointer hover:bg-gray-50">
                                Equipment 2
                              </div>
                            </div>
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
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AdminCreateRoute;
