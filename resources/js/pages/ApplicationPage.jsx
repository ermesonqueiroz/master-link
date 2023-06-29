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
import { AddLinkCollapsible } from "../components/AddLinkCollapsible";

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

    async function handleLinkSubmit(url) {
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
            <div className="max-w-lg mx-auto my-14 w-full flex items-center flex-col px-4 gap-4">
                <AddLinkCollapsible
                    onSubmit={async (url) => handleLinkSubmit(url)}
                />

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