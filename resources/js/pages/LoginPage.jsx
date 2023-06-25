import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
        <div>
            <header className="absolute px-4 md:px-8 mt-8 top-0">
                <a className="text-zinc-700 font-bold flex items-center gap-1 text-lg hover:text-zinc-900 transition-colors" href="/">
                    <CaretLeft size={16} weight="bold" /> Home
                </a>
            </header>

            <form className="max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-start flex-col px-4">
                <h1 className="text-zinc-900 font-bold text-2xl tracking-tight">
                    Log in to unilink
                </h1>
                <p className="text-zinc-500 text-lg pb-4">
                    Don't have an account yet? <Link to="/signup" className="text-blue-400">Sign Up</Link>
                </p>

                <div className="flex flex-col gap-1 w-full pb-2">
                    <p className="text-zinc-700">Email</p>
                    <input
                        className="border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-500"
                        type="text"
                        placeholder="john.doe@example.com"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full pb-3">
                    <span className="flex justify-between">
                        <p className="text-zinc-700">Password</p>
                        <a className="text-zinc-500">Forgot your password?</a>
                    </span>
                    <input
                        className="border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-500"
                        type="password"
                        placeholder="••••••••"
                    />
                </div>

                <a href="/app" className="bg-zinc-900 w-full h-10 rounded-md flex items-center justify-center gap-1 leading-none font-medium" type="submit">
                    Continue <CaretRight className="text-zinc-400" size={16} weight="bold" />
                </a>

                <p className="text-zinc-500 text-sm mt-4">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
            </form>
        </div>
    );
}
