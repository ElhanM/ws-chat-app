"use client";
import { LOGIN_MUTATION } from "@/graphql/loginMutation";
import useMutation from "@/hooks/useCustomMutation";
import { LoginFormData } from "@/types/login";
import { loginSchema } from "@/validation/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import ControlledInput from "../molecules/ControlledInput";
import FormWrapper from "../organisms/FormWrapper";
import { ToastContainer, toast } from "react-toastify";

type Props = {};

const LoginForm = (props: Props) => {
  const methods = useForm<LoginFormData>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log({ data });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login({ variables: { input: data } });
  };

  if (loading) {
    console.log("Loading...");
  }

  if (error) {
    console.log({ error });
  }

  return (
    <FormWrapper<LoginFormData> methods={methods} onSubmit={onSubmit}>
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
    </FormWrapper>
  );
};

export default LoginForm;
