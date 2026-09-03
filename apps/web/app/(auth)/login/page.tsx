"use client"
import axios from "axios";
import React,{ useState } from "react";

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "", password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev, [name]: value
        }));
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(form.email.trim() === "" || form.password.trim() === "") {
            alert("Fill all the required fields...");
        } else {
            try {
                const signinResp = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/user/signin`, form);
                if(signinResp.status === 200 || signinResp.status === 201) {
                    const token = signinResp.data.token;
                    localStorage.setItem("token", token);
                    alert(`User logged in successfully...\n ${token}`);
                } else {
                    alert("Something faat gaya...");
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className="flex flex-col flex-1 gap-8 items-center justify-center">
            <h1>Log In Page</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex px-5 py-1 gap-6 border rounded-sm border-white">
                    <label >Email</label>
                    <input className="text-center border-none focus:outline-none" type="email" name="email" value={form.email} onChange={handleChange} placeholder="sam@gmail.com"/>
                </div>

                <div className="flex px-5 py-1 gap-6 border rounded-sm border-white">
                    <label >Password</label>
                    <input className="text-center border-none focus:outline-none" type="password" name="password" value={form.password} onChange={handleChange} placeholder="**********"/>
                </div>

                <button className="text-center px-5 py-1 gap-6 border rounded-sm border-white" type="submit">Log In</button>
            </form>
        </div>
    );
}
