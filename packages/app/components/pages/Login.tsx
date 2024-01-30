"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { loginSchema } from "@/validation/login";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    label="Your email"
                    type="email"
                    id="email"
                    placeholder="name@email.com"
                    {...field}
                  />
                )}
              />
              {errors.email && errors.email.message && (
                <p className="text-sm text-red-500">
                  {errors.email.message.charAt(0).toUpperCase() +
                    errors.email.message.slice(1)}
                </p>
              )}
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    {...field}
                  />
                )}
              />
              {errors.password && errors.password.message && (
                <p className="text-sm text-red-500">
                  {errors.password.message.charAt(0).toUpperCase() +
                    errors.password.message.slice(1)}
                </p>
              )}
              <Button text="Sign in" type="submit" />
              <p className="text-sm font-light dark:text-gray-400">
                Don&apos;t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium dark:text-primary-500 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
