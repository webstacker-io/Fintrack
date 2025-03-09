import { useState } from "react";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react"
import "./Signup.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/Authcontext";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInUser, signUpUser } from "../../services/Api";

// Schema validation using Zod
const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const queryClient = useQueryClient();

  // Form handling for Sign Up
  const {
    watch,
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  // Form handling for Sign In
  const {
    register,
    handleSubmit,
    formState: { errors: errorsSignIn },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  // API Mutation for Sign Up
  const signUpMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data: any) => {
      login(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      alert("Sign up successful! Redirecting...");
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Sign up failed");
    },
  });

  // API Mutation for Sign In
  const signInMutation = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      login(data);
        
      alert("Sign in successful! Redirecting...");
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Invalid credentials");
    },
  });

  return (
    <div className="flex h-screen">
      <div className={`page-container w-1/2 m-auto ${isSignUp ? "right-panel-active" : ""}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container mt-6">
          <form className="space-y-4 md:space-y-6 mt-6"   onSubmit={handleSubmitSignUp((data) => signUpMutation.mutate(data))}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900text-white">Email</label>
              <input type="email" {...registerSignUp("email", { required: true })} name="email" id="signup-email"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400text-whitefocus:ring-blue-500focus:border-blue-500 ${errorsSignUp.email ? '!border-red-500' : ''}`} placeholder="name@company.com" />
              {errorsSignUp.email && <p className="text-red-500">{errorsSignUp.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                {...registerSignUp("password", { required: "Password is required" })}
                id="signup-password"
                placeholder="••••••••"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                ${errorsSignUp.password ? "!border-red-500" : "focus:ring-blue-500 focus:border-blue-500"}`}
              />
              {errorsSignUp.password && <p className="text-red-500">{errorsSignUp.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <input
                type="password"
                {...registerSignUp("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                id="confirm-password"
                placeholder="••••••••"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                ${errorsSignUp.confirmPassword ? "!border-red-500" : "focus:ring-blue-500 focus:border-blue-500"}`}
                        />
              {errorsSignUp.confirmPassword && (
                <p className="text-red-500">{errorsSignUp.confirmPassword.message}</p>
              )}
            </div>


            <button type="submit" className="w-full text-white !bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">Create an account</button>

          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container mt-6">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 mt-6">

            <form className="space-y-4 md:space-y-6 mt-6 p-5" >
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
              </div>

              <button type="button" className="w-full text-white !bg-sky-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ">Sign in</button>

            </form>
          </div>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% text-white-900">
            <div className="overlay-panel overlay-left">
              <h1 className="text-5xl p-6">Welcome Back!</h1>
              <p className="text-2xl">Create your account <br />or Click down here. </p>
              <button type="button" className="ghost mt-6 rounded-full w-1/2 bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm flex items-center justify-center gap-2" onClick={() => setIsSignUp(false)}>
                <ArrowLeftToLine className="w-6 h-6 text-blue-600" />
                <span>Sign In</span>
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-5xl p-6">Hello, Friend!</h1>
              <p className="text-2xl">Click down here to enter your personal details and start your journey with us</p>
              <button type="button" className="ghost mt-6 rounded-full w-1/2 bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-sky-400 shadow-sm flex items-center justify-center gap-2"
                onClick={() => setIsSignUp(true)}>

                <span>Sign Up</span>
                <ArrowRightToLine className="w-6 h-6 text-sky-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
