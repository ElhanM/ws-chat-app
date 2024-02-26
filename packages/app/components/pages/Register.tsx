"use client";
import { REGISTER_MUTATION } from "@/graphql/mutations/registerMutation";
import { LoginFormData } from "@/types/login";
import { registerSchema } from "@/validation/register";
import Link from "next/link";
import Form from "../templates/Form";
import AuthWrapper from "../templates/AuthWrapper";

const Register = () => {
  return (
    <AuthWrapper>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
        Register an account
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
        mutation={REGISTER_MUTATION}
        validationSchema={registerSchema}
        buttonText="Register"
        mutationName="signUp"
      />
      <p className="text-sm font-light text-gray-400 !mt-3">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary-500 hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthWrapper>
  );
};

export default Register;
