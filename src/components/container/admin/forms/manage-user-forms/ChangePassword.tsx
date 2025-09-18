import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { changePasswordSchema } from "@/schema";

const ChangePassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof changePasswordSchema>) => {
    console.log("Form submitted:", values);
    form.reset();
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-3 flex flex-col"
      >
        {/* Current Password */}
        <div className="w-full lg:w-1/2 relative group">
          <label className="block text-sm font-medium mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your current password"
              className="w-full border rounded px-3 py-2 text-sm"
              {...form.register("currentPassword")}
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
          {form.formState.errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="w-full lg:w-1/2 relative group">
          <label className="block text-sm font-medium mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Set new password"
              className="w-full border rounded px-3 py-2 text-sm"
              {...form.register("newPassword")}
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
          {form.formState.errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="w-full lg:w-1/2 relative group">
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Set your confirm password"
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

        <button
          type="submit"
          className="bg-main hover:bg-follow duration-200 transition-all text-white px-4 py-2 rounded-lg w-fit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
