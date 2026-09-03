"use client"

export default function SettingsPage() {
    const logout = () => {
        localStorage.removeItem("token");
    }
    return (
        <div className="flex flex-col flex-1 gap-8 items-center justify-center">
            <h1>SettingsPage</h1>
            <button className="text-center px-5 py-1 gap-6 border rounded-sm border-white" onClick={logout}>Log Out</button>
        </div>
    );
}
