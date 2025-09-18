import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { registerSchema } from "@/schema"; 

const RegisterClient: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log("Register form submitted:", values);
    form.reset();
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
            {...form.register("username")}
          />
          {form.formState.errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.username.message}
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
        <button
          type="submit"
          className="bg-main hover:bg-follow duration-200 transition-all text-white px-4 py-2 rounded-lg"
        >
          Create Client
        </button>
      </form>
    </div>
  );
};

export default RegisterClient;
