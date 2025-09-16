import React from "react";

type AuthLayoutProps = {
    children: React.ReactNode
}

const AuthLayout = ({  children }: AuthLayoutProps) => {
    return (
        <div className="h-[100dvh] w-full flex justify-center items-center">
            <div className="flex items-center justify-center max-h-[500px] h-full max-w-[800px] w-full shadow-xl rounded-3xl overflow-hidden border border-zinc-200">
                <div className="flex flex-col p-5 h-full w-1/2">
                    <div className="flex gap-3 items-center">
                        <img src="/logo.png" alt="Logo" className="h-[28px] w-[30px] object-cover" />
                        <h1 className="text-sm font-semibold text-zinc-700">JAVA Monitoring</h1>
                    </div>
                    {children}
                </div>
                <img src="/hero.png" alt="Logo" className="h-full w-1/2 object-cover" />
            </div>
        </div>
    )
}

export default AuthLayout;