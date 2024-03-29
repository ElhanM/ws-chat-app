"use client";
import { LOGIN_MUTATION } from "@/graphql/mutations/loginMutation";
import { LoginFormData } from "@/types/login";
import { loginSchema } from "@/validation/login";
import Link from "next/link";
import Form from "../templates/Form";
import AuthWrapper from "../templates/AuthWrapper";

const Login = () => {
  return (
    <AuthWrapper>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
        Sign in to your account
      </h1>
      <Form<LoginFormData>
        fields={[
          {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "john.doe",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "••••••••",
          },
        ]}
        mutation={LOGIN_MUTATION}
        validationSchema={loginSchema}
        buttonText="Sign in"
        mutationName="login"
      />
      <p className="text-sm font-light text-gray-400 !mt-3">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-primary-500 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthWrapper>
  );
};

export default Login;
