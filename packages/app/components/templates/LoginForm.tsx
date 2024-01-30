"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { loginSchema } from "@/validation/login";
import { LoginFormData } from "@/types/login";

type Props = {};

const LoginForm = (props: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
        <span className="text-sm text-red-500">
          {errors.email.message.charAt(0).toUpperCase() +
            errors.email.message.slice(1)}
        </span>
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
        <span className="text-sm text-red-500">
          {errors.password.message.charAt(0).toUpperCase() +
            errors.password.message.slice(1)}
        </span>
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
  );
};

export default LoginForm;
