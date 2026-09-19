"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
    const router = useRouter();

    function handleSignout() {
        localStorage.removeItem("token");
        router.push("/login");
    }

    return (
        <button
            onClick={handleSignout}
            className="
                fixed top-5 right-5
                flex items-center gap-2
                px-4 py-2
                rounded-lg
                border border-[#E8E8E8]
                bg-[#FAFAF7]
                text-[#111111]
                text-sm
                shadow-sm
                hover:bg-[#F3F4F6]
                transition
            "
        >
            <LogOut size={16} className="text-[#000000]" />
            Sign out
        </button>
    );
}