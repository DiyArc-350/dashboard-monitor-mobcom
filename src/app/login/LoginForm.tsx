"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import {
  UserIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

// SubmitButton function outside LoginForm component
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 border border-black rounded-full w-15 h-15 flex items-center justify-center hover:bg-[#6DE1D2] transition"
      style={{ backgroundColor: '#6DE1D2' }}
    >
      <ArrowRightIcon className="w-10 h-10 text-black" /> {/* Panah lebih besar dan warna jelas */}
    </button>
  );
}

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-700 to-sky-200 relative px-4">

      {/* Welcome kiri atas */}
      <div className="absolute top-20 left-[190px] text-left">
        <div className="relative">
          {/* Teks utama */}
          <h1 className="text-8xl font-serif text-black leading-tight z-10 relative">welcome</h1>
          {/* Bayangan di bawah kanan */}
          <h2 className="text-8xl font-serif text-white absolute top-[15px] left-[6px] opacity-30 select-none">welcome</h2>
        </div>
      </div>

      {/* Form box */}
      <form
        action={loginAction}
        className="bg-[#e0f2f1] p-6 h-[350px] rounded-md shadow-lg w-96 flex flex-col items-center border border-black relative"
      >
        {/* Judul Login */}
        <h2 className="text-xl font-bold mb-4 text-black">login</h2>

        {/* Input section */}
        <div className="bg-[#90caf9] h-[200px] p-4 rounded-2xl w-full flex flex-col gap-3 border border-black">
          {/* Username */}
          <div className="flex items-center bg-white p-2 rounded-md">
            <input
              id="username"
              name="username"
              placeholder="Username"
              className="bg-transparent text-black flex-grow focus:outline-none placeholder-gray-500"
              type="text"
            />
            <UserIcon className="w-5 h-5 text-gray-600" />
          </div>
          {state?.errors?.username && (
            <p className="text-red-500 text-sm">{state.errors.username}</p>
          )}

          {/* Password */}
          <div className="flex items-center bg-white p-2 rounded-md">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="bg-transparent text-black flex-grow focus:outline-none placeholder-gray-500"
            />
            <LockClosedIcon className="w-5 h-5 text-gray-600" />
          </div>
          {state?.errors?.password && (
            <p className="text-red-500 text-sm">{state.errors.password}</p>
          )}
        </div>

        {/* Tombol panah di bawah */}
        <div className="absolute bottom-12 w-full flex justify-center">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
