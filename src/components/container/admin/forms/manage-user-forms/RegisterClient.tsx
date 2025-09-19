import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { registerSchema } from "@/schema"; 
import { useCreateUserMutation } from "@/store/user-api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const RegisterClient: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, {isLoading}] = useCreateUserMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit =  async (values: z.infer<typeof registerSchema>) => {
    try {
      console.log(values);
      
      const response = await createUser(values).unwrap();
      toast(response.message);
      form.reset();
    } catch (error) {
      console.log('ERROR:', error);
      
      const apiError = error as { data?: { error?: string } };
      const errorMsg = apiError?.data?.error ?? "An unexpected error occurred";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-3 flex flex-col"
      >
        {/* Username */}
        <div className="w-full relative group">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter the username"
            className="w-full border rounded px-3 py-2 text-sm"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="w-full relative group">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter the email"
            className="w-full border rounded px-3 py-2 text-sm"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="w-full relative group">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter the password"
              className="w-full border rounded px-3 py-2 text-sm"
              {...form.register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 group-hover:flex hidden items-center"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-zinc-400" />
              ) : (
                <Eye className="w-5 h-5 text-zinc-400" />
              )}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="w-full relative group">
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter the password again"
              className="w-full border rounded px-3 py-2 text-sm"
              {...form.register("confirmPassword")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 group-hover:flex hidden items-center"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-zinc-400" />
              ) : (
                <Eye className="w-5 h-5 text-zinc-400" />
              )}
            </button>
          </div>
          {form.formState.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
        disabled={isLoading}
          type="submit"
          className="bg-main hover:bg-follow duration-200 transition-all text-white rounded-lg cursor-pointer"
        >
          {isLoading ? "Registering..." : "Register Client"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterClient;
