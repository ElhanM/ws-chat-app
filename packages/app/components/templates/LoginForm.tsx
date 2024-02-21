"use client";
import { LOGIN_MUTATION } from "@/graphql/loginMutation";
import useMutation from "@/hooks/useCustomMutation";
import {
  addTokenToLocalStorage,
  setCurrentUser,
} from "@/lib/features/users/currentUserSlice";
import { useAppDispatch } from "@/lib/hooks";
import { LoginFormData } from "@/types/login";
import { loginSchema } from "@/validation/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthUser } from "@ws-chat-app/shared";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import ControlledInput from "../molecules/ControlledInput";
import FormWrapper from "../organisms/FormWrapper";
import Loader from "../atoms/Loader";

type Props = {};

const LoginForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const methods = useForm<LoginFormData>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const [login, { data, loading, error }] = useMutation<{
    login: AuthUser;
  }>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      dispatch(setCurrentUser(data.login));
      dispatch(addTokenToLocalStorage(data.login.accessToken));
      // https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#redirect-function
      /* 
        There are four ways to navigate between routes in Next.js:
        Using the <Link> Component
        Using the useRouter hook (Client Components)
        Using the redirect function (Server Components)
        Using the native History API
      */
      router.push("/chats");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login({ variables: { input: data } });
  };

  if (loading) {
    return <Loader />;
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
