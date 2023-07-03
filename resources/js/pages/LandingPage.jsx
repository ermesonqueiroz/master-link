import React from "react";
import Balancer from "react-wrap-balancer";
import { CaretRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <>
            <header className="flex px-8 h-20 justify-between items-center">
                <Link
                    to="/"
                    className="font-bold text-zinc-900 text-2xl tracking-tight"
                >
                    unilink
                </Link>

                <div className="flex gap-2 items-center">
                    <Link
                        to="/signin"
                        className="text-zinc-700 font-medium tracking-tight text-lg h-10 px-4 rounded-full hover:bg-neutral-200 transition-colors flex items-center"
                    >
                        Sign in
                    </Link>

                    <Link
                        to="/signup"
                        className="text-zinc-200 font-medium tracking-tight text-lg h-10 px-4 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex gap-2 items-center justify-center"
                    >
                        Get started <CaretRight size={14} />
                    </Link>
                </div>
            </header>

            <main className="h-[calc(100vh_-_80px)] w-[60vw] mx-auto flex gap-20 items-center   justify-between">
                <div className="flex w-fit flex-col -mt-[100px] gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-zinc-900 text-6xl tracking-tight leading-tight">
                            <Balancer>
                                Streamline and{" "}
                                <span className="bg-zinc-900 text-zinc-50 px-3">
                                    boost
                                </span>
                                <br />
                                your online presence
                            </Balancer>
                        </h1>
                        <p className="text-zinc-500 text-xl">
                            <Balancer>
                                Share all your social media profiles with just
                                one link. Simplify and streamline your online
                                presence effortlessly.
                            </Balancer>
                        </p>
                    </div>

                    <form
                        className="flex relative items-center w-full h-16 text-lg font-medium text-zinc-700 rounded-xl shadow-sm shadow-gray-200"
                        action="/signup"
                    >
                        <input
                            className="w-full h-full rounded-xl px-4 outline-none"
                            name="email"
                            placeholder="Enter email address"
                            autoComplete="off"
                            aria-autocomplete="none"
                        />

                        <input
                            type="submit"
                            className="absolute right-2 h-[80%] bg-zinc-800 text-zinc-200 min-w-max px-4 rounded-xl cursor-pointer"
                            value="Register Now"
                        />
                    </form>
                </div>

                <img
                    src="/lp-demo.png"
                    alt="unilink"
                    className="h-[80%] w-auto"
                />
            </main>
        </>
    );
}
