"use client";

import axios from "axios";
import React, { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";
import { GraphPaperBackground } from "@/app/_components/GraphPaperBackground";
import { Logo } from "@/app/_components/NavBar";

const ACCENT = "#2563EB";
const TEXT = "#111111";
const MUTED = "#6B7280";
const BORDER = "#E8E8E8";
const BG = "#FAFAF7";



export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
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
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const signupResp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`,
        form
      );


      if (
        signupResp.status === 200 ||
        signupResp.status === 201
      ) {
        setSuccess("Account created successfully!");
      } else {
        setError("Something went wrong.");
      }

    } catch (err) {
      setError("Unable to create account. Try again.");
      console.log(err);

    } finally {
      setLoading(false);
    }
  };


  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundColor: BG,
        color: TEXT,
      }}
    >

      <GraphPaperBackground />


      <header
        className="relative z-10 px-6 lg:px-10 h-16 flex items-center justify-between border-b"
        style={{
          borderColor: BORDER,
        }}
      >

        <Logo />


        <a
          href="/"
          className="flex items-center gap-2 text-sm font-medium hover:opacity-70"
          style={{
            color: TEXT,
          }}
        >
          Back home
          <ArrowRight size={15}/>
        </a>

      </header>



      <div className="relative z-10 flex-1 flex items-center justify-center px-6">

        <motion.div
          initial={{
            opacity:0,
            y:20
          }}
          animate={{
            opacity:1,
            y:0
          }}
          transition={{
            duration:.5
          }}
          className="w-full max-w-sm"
        >

          <h1
            className="text-3xl font-semibold tracking-tight mb-2"
            style={{
              color:TEXT
            }}
          >
            Create your account
          </h1>


          <p
            className="text-sm mb-8"
            style={{
              color:MUTED
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold hover:underline"
              style={{
                color:ACCENT
              }}
            >
              Sign in
            </a>
          </p>



          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >


            {/* Username */}

            <div>

              <label
                className="block text-xs font-semibold mb-1.5"
                style={{
                  color:TEXT
                }}
              >
                Username
              </label>


              <div className="relative">

                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{
                    color:MUTED
                  }}
                />


                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="unique-username"
                  className="
                  w-full pl-10 pr-4 py-2.5 rounded-lg
                  border bg-white text-sm outline-none
                  focus:ring-2
                  "
                  style={{
                    borderColor:BORDER,
                    color:TEXT
                  }}
                />

              </div>

            </div>



            {/* Email */}

            <div>

              <label
                className="block text-xs font-semibold mb-1.5"
                style={{
                  color:TEXT
                }}
              >
                Email
              </label>


              <div className="relative">

                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{
                    color:MUTED
                  }}
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="
                  w-full pl-10 pr-4 py-2.5 rounded-lg
                  border bg-white text-sm outline-none
                  focus:ring-2
                  "
                  style={{
                    borderColor:BORDER,
                    color:TEXT
                  }}
                />

              </div>

            </div>




            {/* Password */}

            <div>

              <label
                className="block text-xs font-semibold mb-1.5"
                style={{
                  color:TEXT
                }}
              >
                Password
              </label>


              <div className="relative">

                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{
                    color:MUTED
                  }}
                />


                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="
                  w-full pl-10 pr-4 py-2.5 rounded-lg
                  border bg-white text-sm outline-none
                  focus:ring-2
                  "
                  style={{
                    borderColor:BORDER,
                    color:TEXT
                  }}
                />

              </div>

            </div>




            <AnimatePresence>

              {error && (

                <motion.div
                  initial={{
                    opacity:0,
                    height:0
                  }}
                  animate={{
                    opacity:1,
                    height:"auto"
                  }}
                  className="
                  flex gap-2 items-start
                  px-3 py-2.5 rounded-lg text-xs
                  "
                  style={{
                    backgroundColor:"#FEF2F2",
                    color:"#991B1B"
                  }}
                >

                  <AlertCircle size={15}/>
                  {error}

                </motion.div>

              )}



              {success && (

                <motion.div
                  initial={{
                    opacity:0,
                    height:0
                  }}
                  animate={{
                    opacity:1,
                    height:"auto"
                  }}
                  className="
                  flex gap-2 items-start
                  px-3 py-2.5 rounded-lg text-xs
                  "
                  style={{
                    backgroundColor:"#F0FDF4",
                    color:"#166534"
                  }}
                >

                  <Check size={15}/>
                  {success}

                </motion.div>

              )}

            </AnimatePresence>




            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{
                y:-2
              }}
              whileTap={{
                scale:.97
              }}
              className="
              w-full flex items-center justify-center gap-2
              px-5 py-3 rounded-xl text-sm font-semibold
              text-white disabled:opacity-60
              "
              style={{
                backgroundColor:ACCENT,
                boxShadow:"0 4px 14px rgba(37,99,235,.25)"
              }}
            >

              {
                loading
                ?
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                :
                <>
                  Create account
                  <ArrowRight size={16}/>
                </>
              }

            </motion.button>


          </form>


          <p
            className="mt-6 text-xs text-center"
            style={{
              color:MUTED
            }}
          >
            By continuing, you agree to our{" "}
            <a className="underline">
              Terms
            </a>{" "}
            and{" "}
            <a className="underline">
              Privacy Policy
            </a>.
          </p>


        </motion.div>

      </div>

    </main>
  );
}