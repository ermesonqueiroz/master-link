import React, { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "@phosphor-icons/react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cookies, setCookie] = useCookies(["authorization"]);
    const [isLoading, setIsLoading] = useState(true);
    const queryClient = useQueryClient();
    const [avatar, setAvatar] = useState();

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await api.get("/user");

            if (!response.data.id) {
                setIsAuthenticated(false);
                setCookie("authorization", null);
            }

            setIsAuthenticated(true);
            setIsLoading(false);

            return response.data;
        },
        initialData: {},
        enabled: isAuthenticated,
        staleTime: Infinity,
    });

    const updateUserMutation = useMutation({
        mutationFn: async ({ username, displayName }) => {
            await api.put(`/user`, {
                username,
                display_name: displayName,
            });
        },
        onMutate: (newUser) => {
            const previousUser = queryClient.getQueryData(["user"]);

            queryClient.setQueryData(["user"], (oldUser) => ({
                ...oldUser,
                ...newUser,
            }));

            return { previousUser };
        },
        onError: (err, newUser, context) => {
            queryClient.setQueryData(["user"], context.previousUser);
        },
    });

    function updateAccessToken(newAccessToken) {
        queryClient.invalidateQueries(["user"]);
        setCookie("authorization", newAccessToken);
    }

    function updateUser(newUser) {
        updateUserMutation.mutate(newUser);
    }

    useEffect(() => {
        if (!cookies.authorization) {
            setIsLoading(false);
            setIsAuthenticated(false);
            return;
        }

        setIsAuthenticated(true);

        api.defaults.headers.common.Authorization = `Bearer ${cookies.authorization}`;
        queryClient.invalidateQueries(["user"]);
    }, [cookies.authorization]);

    return (
        <AuthContext.Provider
            value={{
                updateAccessToken,
                isAuthenticated,
                user,
                updateUser,
                avatar,
                setAvatar,
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
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
