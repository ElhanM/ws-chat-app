"use client";
import { LOGIN_MUTATION } from "@/graphql/loginMutation";
import useMutation from "@/hooks/useCustomMutation";
import {
  addTokenToLocalStorage,
  setCurrentUser,
} from "@/lib/features/users/currentUserSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LoginFormData } from "@/types/login";
import { loginSchema } from "@/validation/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthUser } from "@ws-chat-app/shared";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import ControlledInput from "../molecules/ControlledInput";
import FormWrapper from "../organisms/FormWrapper";

type Props = {};

const LoginForm = (props: Props) => {
  const dispatch = useAppDispatch();

  const methods = useForm<LoginFormData>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const [login, { data, loading, error }] = useMutation<{
    login: AuthUser;
  }>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log({ data });
      dispatch(setCurrentUser(data.login));
      dispatch(addTokenToLocalStorage(data.login.accessToken));
      // we can not use redirect here either
      // this probably happens since i made a custom wrapper for useMutation
      window.location.href = "/chats";
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
    </FormWrapper>
  );
};

export default LoginForm;
