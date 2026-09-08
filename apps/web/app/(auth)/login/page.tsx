"use client";

import axios from "axios";
import React, { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";


const ACCENT = "#2563EB";
const TEXT = "#111111";
const MUTED = "#6B7280";
const BORDER = "#E8E8E8";
const BG = "#FAFAF7";


function GraphPaperBackground({ opacity = 0.35 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{
        opacity,
        backgroundImage: `radial-gradient(circle, ${BORDER} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />
  );
}


function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">

      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M4 20 C 8 24, 14 22, 18 16 S 24 6, 24 4"
          stroke={TEXT}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <circle cx="24" cy="4" r="2.5" fill={ACCENT} />

      </svg>


      <span
        className="text-lg font-semibold tracking-tight"
        style={{
          color: TEXT
        }}
      >
        Canvas
      </span>

    </a>
  );
}



export default function LoginPage() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const {name,value} = e.target;

    setForm((prev)=>({
      ...prev,
      [name]:value
    }));

  };



  const handleSubmit = async(
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    if(
      !form.email.trim() ||
      !form.password.trim()
    ){

      setError("Please fill all required fields.");
      return;

    }



    try {

      setLoading(true);


      const signinResp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signin`,
        form
      );



      if(
        signinResp.status === 200 ||
        signinResp.status === 201
      ){

        const token = signinResp.data.token;

        localStorage.setItem(
          "token",
          token
        );


        setSuccess(
          "Logged in successfully!"
        );


        // router.push("/") can be added here


      }
      else{

        setError(
          "Something went wrong."
        );

      }


    }
    catch(error){

      console.log(error);

      setError(
        "Invalid credentials. Please try again."
      );

    }
    finally{

      setLoading(false);

    }

  };



  return (

    <main
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundColor:BG,
        color:TEXT
      }}
    >

      <GraphPaperBackground />



      <header
        className="relative z-10 px-6 lg:px-10 h-16 flex items-center justify-between border-b"
        style={{
          borderColor:BORDER
        }}
      >

        <Logo />


        <a
          href="/"
          className="flex items-center gap-2 text-sm font-medium hover:opacity-70"
          style={{
            color:TEXT
          }}
        >
          Back home
          <ArrowRight size={15}/>
        </a>


      </header>




      <div
        className="
        relative z-10 flex-1
        flex items-center justify-center
        px-6
        "
      >


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
            className="
            text-3xl font-semibold
            tracking-tight mb-2
            "
            style={{
              color:TEXT
            }}
          >
            Welcome back
          </h1>



          <p
            className="text-sm mb-8"
            style={{
              color:MUTED
            }}
          >

            Don't have an account?{" "}

            <a
              href="/signup"
              className="font-semibold hover:underline"
              style={{
                color:ACCENT
              }}
            >
              Sign up
            </a>

          </p>






          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >



            <div>


              <label
                className="
                block text-xs
                font-semibold mb-1.5
                "
                style={{
                  color:TEXT
                }}
              >
                Email
              </label>



              <div className="relative">


                <Mail

                  size={16}

                  className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  "

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
                  w-full pl-10 pr-4
                  py-2.5 rounded-lg
                  border bg-white
                  text-sm outline-none
                  focus:ring-2
                  "

                  style={{
                    borderColor:BORDER,
                    color:TEXT
                  }}

                />


              </div>


            </div>






            <div>


              <label
                className="
                block text-xs
                font-semibold mb-1.5
                "
                style={{
                  color:TEXT
                }}
              >
                Password
              </label>



              <div className="relative">


                <Lock

                  size={16}

                  className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  "

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
                  w-full pl-10 pr-4
                  py-2.5 rounded-lg
                  border bg-white
                  text-sm outline-none
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


              {
                error &&

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
                  px-3 py-2.5 rounded-lg
                  text-xs
                  "

                  style={{
                    backgroundColor:"#FEF2F2",
                    color:"#991B1B"
                  }}

                >

                  <AlertCircle size={15}/>

                  {error}

                </motion.div>

              }



              {
                success &&

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
                  px-3 py-2.5 rounded-lg
                  text-xs
                  "

                  style={{
                    backgroundColor:"#F0FDF4",
                    color:"#166534"
                  }}

                >

                  <Check size={15}/>

                  {success}

                </motion.div>

              }


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
              w-full flex items-center
              justify-center gap-2
              px-5 py-3 rounded-xl
              font-semibold text-sm
              text-white
              disabled:opacity-60
              "

              style={{
                backgroundColor:ACCENT,
                boxShadow:
                "0 4px 14px rgba(37,99,235,.25)"
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
                  Sign in
                  <ArrowRight size={16}/>
                </>

              }


            </motion.button>



          </form>





          <p
            className="
            mt-6 text-xs
            text-center
            "
            style={{
              color:MUTED
            }}
          >

            By continuing, you agree to our{" "}

            <a className="underline">
              Terms
            </a>

            {" "}and{" "}

            <a className="underline">
              Privacy Policy
            </a>.

          </p>



        </motion.div>


      </div>


    </main>

  );
}