import { createClient } from "@/lib/supabase/client";
import { RegisterFormData, registerSchema } from "@/modules/auth/auth.scema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const useSignUpForm = () => {
  const router = useRouter();
  const supabase = createClient();

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
          data: { name: validatedData.name },
        },
      });

      if (error) {
        setError("root", {
          type: "manual",
          message: error.message,
        });
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Sign up error:", error);
      setError("root", {
        type: "manual",
        message: "Sign up failed. Please try again later.",
      });
    }
  };

  return { register, errors, isSubmitting, onSubmit, handleSubmit };
};

export { useSignUpForm };
