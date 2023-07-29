"use client";
import React from "react";
import FormBox from "./formbox";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen">
      <Image
        src="/images/logo.png"
        width={100}
        height={70}
        className="rounded-xl mt-10 ml-10"
        alt="Software Logo"
      />
      <div className="flex-1">
        <FormBox>
          <form className="flex flex-col space-y-5 py-10">
            <div className=" font-extrabold text-center text-[36px] text-gray-700">
              LOGIN
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="large-input"
                className=" ml-2 block mb-2 text-ssm font-small text-gray-900"
              >
                Email
              </label>
              <input
                type="text"
                id="large-input"
                placeholder="Enter Yout Email"
                className="placeholder:text-ssm block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="large-input"
                className=" ml-2 block mb-2 text-ssm font-small text-gray-900"
              >
                Password
              </label>
              <input
                placeholder="Enter Your Password"
                type="text"
                id="large-input"
                className=" placeholder:text-ssm block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                id="checked-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="checked-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-600 font-small text-ssm"
              >
                Keep me logged in
              </label>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => router.push("/admin/rooms")}
                type="button"
                className="w-full p-4 font-bold text-white bg-blue-800 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-900"
              >
                Continue
              </button>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="w-full p-4 text-gray-600 underline border-gray-300 rounded "
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </FormBox>
      </div>
    </div>
  );
};

export default Login;
