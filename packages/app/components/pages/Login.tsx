import Image from "next/image";
import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

type Props = {};

const Login = (props: Props) => {
  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <Input
                label="Your email"
                type="email"
                name="email"
                id="email"
                placeholder="name@email.com"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                id="password"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
