import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/Auth";
import { api } from "../services/api";
import { ShareButton, AddLinkCollapsible } from "../components";
import { DraggableLinksContainer } from "../components/DraggabeLinksContainer";

export function ApplicationPage() {
    const { isAuthenticated, accessToken, user } = useAuth();
    const [data, setData] = useState([]);

    const linkMutation = useMutation({
        mutationFn: async (link) => {
            const { data: newLink } = await api.post("/link", link, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setData([...data, newLink]);
        },
    });

    const updateLinkMutation = useMutation({
        mutationFn: async (link) => {
            await api.put(`/link/${link.id}`, link, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        },
    });

    const deleteLinkMutation = useMutation({
        mutationFn: async (id) => {
            await api.delete(`/link/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        },
    });

    function onActiveChange(linkToUpdate, active) {
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

    function onUpdateLink(link) {
        updateLinkMutation.mutate(link);
        const filteredLinks = data.filter(({ id }) => link.id !== id);
        setData([...filteredLinks, link]);
    }

    function onDeleteLink(link) {
        deleteLinkMutation.mutate(link.id);
        setData([...data.filter(({ id }) => link.id !== id)]);
    }

    function onOrderChange(result) {
        if (!result.destination) return;

        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setData(items.map((link, index) => ({ ...link, index })));

        items.forEach((item, index) =>
            updateLinkMutation.mutate({ ...item, index })
        );
    }

    useEffect(() => {
        async function execute() {
            const { data: response } = await api.get(`/link/${user?.id}`);
            setData([...response.data]);
        }

        execute();
    }, []);

    async function handleLinkSubmit(url) {
        linkMutation.mutate({
            title: url.replace(/^https?:\/\//, ""),
            url,
            index: data.length,
        });
    }

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
                <AddLinkCollapsible onSubmit={handleLinkSubmit} />

                <DraggableLinksContainer
                    links={data?.sort(({ index: a }, { index: b }) => a - b)}
                    onActiveChange={onActiveChange}
                    onDelete={onDeleteLink}
                    onUpdate={onUpdateLink}
                    onOrderChange={onOrderChange}
                />
            </div>
        </>
    );
}
