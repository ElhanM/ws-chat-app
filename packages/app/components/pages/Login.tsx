import React from "react";
import LoginForm from "../templates/LoginForm";

const Login = () => {
  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
