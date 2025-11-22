"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Eye, EyeClosed, Lock, Mail, Loader2 } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import { useState } from "react";
import GoogleButton from "@/components/pages/auth/google-button";
import GithubButton from "@/components/pages/auth/github-button";
import { useLoginForm } from "@/hooks/useAuthForm";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, errors, isSubmitting, onSubmit, handleSubmit } =
    useLoginForm();


  return (
    <div>
      <div className="flex flex-col mb-7">
        <h1 className="text-4xl font-semibold">Welcome Back!</h1>
        <p className="text-sm text-gray-600">We’re happy to see you again</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FloatingInput
          label="Email Address"
          type="email"
          leftItem={<Mail className="w-4 h-4" />}
          {...register("email")}
          error={errors?.email?.message}
        />

        <FloatingInput
          label="Password"
          type={passwordVisible ? "text" : "password"}
          leftItem={<Lock className="w-4 h-4" />}
          rightItem={
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="text-gray-500 hover:text-gray-700"
            >
              {passwordVisible ? (
                <EyeClosed className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
          {...register("password")}
          error={errors?.password?.message}
        />

        <Button
          className="w-full rounded-full mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              Sign In <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 my-4">or continue with</p>

      <div className="flex flex-col space-y-2">
        <GoogleButton />
        <GithubButton />
      </div>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
