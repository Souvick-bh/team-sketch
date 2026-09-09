"use client";

import axios from "axios";
import React, { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Logo } from "@/app/_components/NavBar";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !form.username.trim() ||
            !form.email.trim() ||
            !form.password.trim()
        ) {
            setError("Please fill all fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`,
                form
            );

            if(response.status === 200 || response.status === 201){
                setSuccess("Account created successfully.");
            }

        } catch {
            setError("Unable to create account.");
        } finally {
            setLoading(false);
            router.push("/login")
        }
    };


    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-900">

            <div className="absolute top-5 left-5">
                <Logo />
            </div>


            <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6">


                <div className="mb-12 text-center">

                    <h1 className="text-3xl font-semibold tracking-tight">
                        Create an account
                    </h1>

                    <p className="mt-3 text-sm text-neutral-500">
                        Join and start collaborating with others.
                    </p>

                </div>



                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-sm flex-col gap-4"
                >

                    <input className="rounded-xl border border-neutral-200 bg-white
                        px-4 py-3 text-smoutline-none transition-all duration-300 placeholder:text-neutral-400
                        focus:border-neutral-400" name="username" value={form.username} onChange={handleChange}
                        placeholder="Username"
                    />

                    <input
                        className="
                        rounded-xl
                        border border-neutral-200
                        bg-white
                        px-4 py-3
                        text-sm
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-neutral-400
                        focus:border-neutral-400
                        "
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />


                    <input className=" rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm
                        outline-none transition-all duration-300 placeholder:text-neutral-400
                        focus:border-neutral-400" type="password" name="password"
                        value={form.password} onChange={handleChange} placeholder="Password"
                    />



                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}


                    {success && (
                        <p className="text-sm text-green-600">
                            {success}
                        </p>
                    )}



                    <button disabled={loading} className=" mt-2 flex
                        items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3
                        text-sm font-medium  text-white  transition-all duration-300
                        hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-60
                        "
                    >

                        {loading && (
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        )}

                        {loading ? "Creating..." : "Create account"}

                    </button>


                </form>


                <p className="mt-8 text-sm text-neutral-500">
                    Already have an account?{" "}
                    <a href="/login" className="font-bold text-neutral-900 hover:underline"
                    >
                        Sign in
                    </a>
                </p>


            </div>

        </main>
    );
}