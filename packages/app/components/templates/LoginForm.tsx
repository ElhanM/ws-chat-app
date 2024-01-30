"use client";
import { LoginFormData } from "@/types/login";
import { loginSchema } from "@/validation/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../atoms/Button";
import ControlledInput from "../molecules/ControlledInput";

type Props = {};

const LoginForm = (props: Props) => {
  const methods = useForm<LoginFormData>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControlledInput<LoginFormData>
          name="username"
          label="Username"
          type="text"
          placeholder="john.doe"
        />
        <ControlledInput<LoginFormData>
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />
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
    </FormProvider>
  );
};

export default LoginForm;
