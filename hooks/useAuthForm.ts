import { createClient } from "@/lib/supabase/client";
import { LoginFormData, loginSchema, RegisterFormData, registerSchema } from "@/modules/auth/auth.scema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { signupAction } from "@/modules/auth/auth.action";

const useLoginForm = () => {
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (validatedData: LoginFormData) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        toast.error(error.message);
        setError("root", {
          type: "manual",
          message: error.message,
        });
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again later.");
      setError("root", {
        type: "manual",
        message: "Login failed. Please try again later.",
      });
    }
  };

  return { register, errors, isSubmitting, onSubmit, handleSubmit };
}

const useSignUpForm = () => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: RegisterFormData) => {
    const result = await signupAction(formData);

    if (result?.error) {
      Object.entries(result.error).forEach(([key, value]) => {
        setError(key as any, { type: "server", message: String(value) });
      });

      return;
    }

    toast.success("Signup successful! Check your email to verify.");
    router.push("/dashboard");
  };

  return {
    register,
    errors,
    isSubmitting,
    handleSubmit,
    onSubmit,
    success,
  };
};

export { useSignUpForm, useLoginForm };
