import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import { api } from "../services/api";
import { useAuth } from "./Auth";

const LinkContext = createContext();

export function LinkProvider({ children }) {
    const { user, accessToken } = useAuth();
    const queryClient = useQueryClient();

    const { data: links } = useQuery({
        queryKey: ["links"],
        queryFn: async () => {
            const response = await api.get(`/link/${user?.id}`);
            return response.data.data;
        },
        initialData: [],
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
    });

    const addLinkMutation = useMutation({
        mutationFn: async (link) => {
            const response = await api.post("/link", link, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        },
        onSuccess: async (newLink) => {
            await queryClient.cancelQueries({ queryKey: ["links"] });
            queryClient.setQueryData(["links"], (oldLinks) => [
                ...oldLinks,
                newLink,
            ]);
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
        onMutate: async (newLink) => {
            await queryClient.cancelQueries(["links"]);
            const previousLinks = queryClient.getQueryData(["links"]);

            queryClient.setQueryData(["links"], (oldLinks) => [
                ...oldLinks.filter(({ id }) => newLink.id !== id),
                newLink,
            ]);

            return { previousLinks };
        },
        onError: (err, newLink, context) => {
            queryClient.setQueryData(["links"], context.previousLinks);
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
        onMutate: async (deletedLinkId) => {
            await queryClient.cancelQueries({ queryKey: ["links"] });
            const previousLinks = queryClient.getQueryData(["links"]);

            queryClient.setQueryData(["links"], (oldLinks) =>
                oldLinks.filter(({ id }) => deletedLinkId !== id)
            );

            return { previousLinks };
        },
        onError: (err, deletedLinkId, context) => {
            queryClient.setQueryData(["links"], context.previousLinks);
        },
    });

    function addLink(link) {
        addLinkMutation.mutate(link);
    }

    function updateLink(link) {
        updateLinkMutation.mutate(link);
    }

    function deleteLink(linkId) {
        deleteLinkMutation.mutate(linkId);
    }

    return (
        <LinkContext.Provider
            value={{
                links,
                addLink,
                updateLink,
                deleteLink,
            }}
        >
            {children}
        </LinkContext.Provider>
    );
}

export const useLink = () => useContext(LinkContext);
