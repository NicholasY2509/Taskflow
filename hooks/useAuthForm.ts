import { createClient } from "@/lib/supabase/client";
import { LoginFormData, loginSchema, RegisterFormData, registerSchema } from "@/modules/auth/auth.scema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

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
  const router = useRouter();
  const supabase = createClient();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (validatedData: RegisterFormData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          data: { name: validatedData.name, confirmation_sent_at: Date.now(), confirmed_at: Date.now() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError("root", {
          type: "manual",
          message: error.message,
        });
        return;
      }

      setSuccess(true);
    } catch (error) {
      console.error("Sign up error:", error);
      setError("root", {
        type: "manual",
        message: "Sign up failed. Please try again later.",
      });
    }
  };

  return { register, errors, isSubmitting, onSubmit, handleSubmit, success };
};

export { useSignUpForm, useLoginForm };
