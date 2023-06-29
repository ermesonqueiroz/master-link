import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
    ArrowSquareOut,
    Globe,
    Plus,
    ShareNetwork,
    Trash,
    X,
} from "@phosphor-icons/react";
import { ShareButton } from "../components";

export function ApplicationPage() {
    const [url, setURL] = useState("");

    const { isAuthenticated, user, accessToken } = useAuth();
    const [data, setData] = useState([]);

    const [linkFormIsVisible, setLinkFormIsVisible] = useState(false);
    const [shareIsVisible, setShareIsVisible] = useState(true);

    const linkMutation = useMutation({
        mutationFn: async (link) => {
            await api.post("/link", link, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setData([...data, link]);
        },
    });

    async function handleLinkSubmit(e) {
        e.preventDefault();

        linkMutation.mutate({
            title: url.replace(/^https?:\/\//, ""),
            url,
        });
    }

    function showLinkForm() {
        setLinkFormIsVisible(true);
    }

    useEffect(() => {
        async function execute() {
            const {
                data: { data },
            } = await api.get(`/link/${user?.id}`);
            setData([...data]);
        }

        execute();
    }, []);

    if (!isAuthenticated) return <Navigate to="/signin" />;
    return (
        <>
            <header className="flex px-8 py-4 justify-between items-center">
                <Link
                    to="/"
                    className="font-bold text-zinc-900 text-2xl tracking-tight"
                >
                    unilink
                </Link>

                <ShareButton />
            </header>
            <div className="max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-start flex-col px-4 gap-4">
                {!linkFormIsVisible ? (
                    <button
                        onClick={showLinkForm}
                        className="bg-zinc-900 w-full h-10 flex items-center justify-center gap-1 leading-none font-medium rounded-full"
                    >
                        {!linkMutation.isLoading ? (
                            <>
                                <Plus
                                    className="text-zinc-400"
                                    size={16}
                                    weight="bold"
                                />{" "}
                                Add link
                            </>
                        ) : (
                            <Spinner
                                className="text-zinc-200 animate-spin"
                                size={18}
                                weight="bold"
                            />
                        )}
                    </button>
                ) : (
                    <form
                        className="bg-white border-zinc-400 border w-full rounded-xl py-6 px-6"
                        onSubmit={async (e) => await handleLinkSubmit(e)}
                    >
                        <div className="flex items-center justify-between pb-4">
                            <h1 className="text-zinc-800 text-lg font-bold">
                                Enter URL
                            </h1>

                            <X
                                size={16}
                                className="text-zinc-600"
                                weight="bold"
                            />
                        </div>

                        <div className="flex gap-3">
                            <input
                                className="px-4 w-full rounded-lg h-10 bg-zinc-100 text-zinc-800 placeholder:text-zinc-500"
                                type="url"
                                placeholder="URL"
                                onChange={(e) => setURL(e.target.value)}
                            />

                            <button className="text-zinc-200 font-medium tracking-tight h-10 px-5 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
                                Add
                            </button>
                        </div>
                    </form>
                )}

                {data.length > 0 &&
                    data.map((link) => (
                        <div className="bg-white border-zinc-400 border w-full rounded-xl py-4 px-6">
                            <div className="flex items-center justify-between">
                                <h1 className="text-lg text-zinc-800 font-bold">
                                    {link?.title}
                                </h1>

                                <button>
                                    <Trash
                                        className="text-zinc-800"
                                        size={20}
                                    />
                                </button>
                            </div>

                            <p className="text-zinc-800">{link?.url}</p>
                        </div>
                    ))}
            </div>
        </>
    );
}
