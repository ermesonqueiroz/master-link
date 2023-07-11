import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@phosphor-icons/react";
import { useAuth } from "./Auth";
import { api } from "../services/api";

const AppearanceContext = createContext();

export function AppearanceProvider({ children }) {
    const { user, isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [localAppearance, setLocalAppearance] = useState([]);
    const queryClient = useQueryClient();

    const { data: appearance } = useQuery({
        queryKey: ["appearance"],
        queryFn: async () => {
            const response = await api.get(`/appearance/${user?.id}`);

            return response.data;
        },
        initialData: null,
        enabled: isAuthenticated,
        staleTime: Infinity,
    });

    const updateAppearanceMutation = useMutation({
        mutationFn: async (appearance) => {
            await api.put("/appearance", appearance);
        },
        onMutate: (newAppearance) => {
            const previousAppearance = queryClient.getQueryData(["appearance"]);

            queryClient.setQueryData(["appearance"], (oldAppearance) => ({
                ...oldAppearance,
                ...newAppearance,
            }));

            return { previousAppearance };
        },
        onError: (err, newAppearance, context) => {
            queryClient.setQueryData(
                ["appearance"],
                context.previousAppearance
            );
        },
    });

    function updateLocalAppearance(newLocalAppearance) {
        setLocalAppearance(newLocalAppearance);
    }

    function updateAppearance(newAppearance) {
        updateAppearanceMutation.mutate(newAppearance);
    }

    useEffect(() => {
        if (!isAuthenticated) {
            setIsLoading(false);
            return;
        }

        queryClient.invalidateQueries(["appearance"]);
    }, []);

    useEffect(() => {
        if (appearance) setIsLoading(false);
        setLocalAppearance(appearance);
    }, [appearance]);

    return (
        <AppearanceContext.Provider
            value={{
                appearance,
                updateAppearance,
                localAppearance,
                updateLocalAppearance,
            }}
        >
            {!isLoading ? (
                children
            ) : (
                <div className="flex w-screen h-screen items-center justify-center">
                    <Spinner
                        className="text-zinc-900 animate-spin"
                        size={24}
                        weight="bold"
                    />
                </div>
            )}
        </AppearanceContext.Provider>
    );
}

export const useAppearance = () => useContext(AppearanceContext);
