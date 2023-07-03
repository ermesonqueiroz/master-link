import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/Auth";
import { api } from "../services/api";
import { ShareButton, AddLinkCollapsible, EditableLink } from "../components";

export function ApplicationPage() {
    const { isAuthenticated, user, accessToken } = useAuth();
    const [data, setData] = useState([]);

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

    function onUpdateLink(link) {
        const filteredLinks = data.filter(({ id }) => link.id !== id);

        setData([...filteredLinks, link]);
    }

    function onDeleteLink(link) {
        setData([...data.filter(({ id }) => link.id !== id)]);
    }

    const changeActiveLinkMutation = useMutation({
        mutationFn: async (link) => {
            await api.put(
                `/link/${link.id}`,
                { ...link },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        },
    });

    function handleActiveChange(linkToUpdate, active) {
        changeActiveLinkMutation.mutate({ ...linkToUpdate, active });
        setData([
            ...data.map((link) => {
                if (link.id === linkToUpdate.id) {
                    return {
                        ...link,
                        active,
                    };
                }

                return link;
            }),
        ]);
    }

    useEffect(() => {
        async function execute() {
            const { data: response } = await api.get(`/link/${user?.id}`);
            setData([...response.data]);
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
                        <EditableLink
                            link={link}
                            onDelete={() => onDeleteLink(link)}
                            onUpdate={(link) => onUpdateLink(link)}
                            active={link?.active}
                            onActiveChange={(active) =>
                                handleActiveChange(link, active)
                            }
                        />
                    ))}
            </div>
        </>
    );
}
