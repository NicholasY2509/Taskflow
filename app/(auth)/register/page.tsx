"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeClosed,
  Lock,
  Mail,
  User,
  Loader2,
} from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import GithubButton from "@/components/pages/auth/github-button";
import GoogleButton from "@/components/pages/auth/google-button";
import { useSignUpForm } from "@/hooks/useAuthForm";

export default function SignupPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { register, errors, isSubmitting, onSubmit, handleSubmit } =
    useSignUpForm();

  return (
    <div>
      <div className="flex flex-col mb-7">
        <h1 className="text-4xl font-semibold">Create an Account</h1>
        <p className="text-sm text-gray-600">
          Let’s get you started with your new workspace
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FloatingInput
          label="Full Name"
          type="text"
          leftItem={<User className="w-4 h-4" />}
          {...register("name")}
          error={errors?.name?.message}
        />

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

        <FloatingInput
          label="Confirm Password"
          type={confirmPasswordVisible ? "text" : "password"}
          {...register("confirmPassword")}
          leftItem={<Lock className="w-4 h-4" />}
          rightItem={
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="text-gray-500 hover:text-gray-700"
            >
              {confirmPasswordVisible ? (
                <EyeClosed className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
          error={errors?.confirmPassword?.message}
        />

        <Button
          className="w-full rounded-full mt-4"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="sr-only">Signing You Up...</span>
            </>
          ) : (
            <>
              Sign Up <ArrowRight className="w-4 h-4 ml-2" />
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
