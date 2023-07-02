import React, { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "@phosphor-icons/react";
import { useCookies } from "react-cookie";
import { jwtVerify } from "jose";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingUser, setIsFetchingUser] = useState(true);
    const [cookies, setCookie] = useCookies(["authorization"]);
    const [user, setUser] = useState(null);

    function updateAccessToken(newAccessToken) {
        setIsAuthenticated(!!newAccessToken);
        setAccessToken(newAccessToken);
        setCookie("authorization", newAccessToken);
    }

    useEffect(() => {
        setAccessToken(cookies.authorization);
        setIsAuthenticated(!!cookies.authorization);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        async function execute() {
            const secret = new TextEncoder().encode("shhhhhhh");

            const { payload: data } = await jwtVerify(accessToken, secret);

            setUser(data);

            if (!data) {
                setAccessToken(null);
                setCookie("authorization", null);
            }

            setIsFetchingUser(false);
        }

        execute();
    }, [accessToken]);

    return (
        <AuthContext.Provider
            value={{
                updateAccessToken,
                accessToken,
                isAuthenticated,
                user,
            }}
        >
            {(isAuthenticated ? !isFetchingUser && !isLoading : !isLoading) ? (
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

AuthProvider.propTypes = {
    children: PropTypes.node,
};

AuthProvider.defaultProps = {
    children: null,
};
