import React from "react";
import LoginForm from "../templates/LoginForm";

const Login = () => {
  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-gray-800 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Sign in to your account
            </h1>
            <LoginForm />
            <p className="text-sm font-light text-gray-400 !mt-3">
              Don&apos;t have an account yet?{" "}
              <a
                href="#"
                className="font-medium text-primary-500 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
