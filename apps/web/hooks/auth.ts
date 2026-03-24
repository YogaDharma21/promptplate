"use client";

import useSWR, { mutate } from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: {
    middleware?: string;
    redirectIfAuthenticated?: string;
}) => {
    const router = useRouter();
    const params = useParams();

    const {
        data: user,
        error,
        mutate,
    } = useSWR("/api/user", () =>
        axios
            .get("/api/user")
            .then((res) => res.data)
            .catch((error) => {
                throw error;
            })
    );
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const register = async ({
        setErrors,
        ...props
    }: {
        setErrors: any;
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }) => {
        await csrf();

        setErrors([]);
        try {
            await axios.post("/register", props).then(() => mutate());
            return { success: true };
        } catch (error: any) {
            setErrors(error.response.data.errors);
            return { success: false, error };
        }
    };

    const login = async ({
        setErrors,
        ...props
    }: {
        setErrors: any;
        email: string;
        password: string;
    }) => {
        await csrf();
        setErrors([]);
        try {
            await axios.post("/login", props).then(() => mutate());
            return { success: true };
        } catch (error: any) {
            setErrors(error.response.data.errors);
            return { success: false, error };
        }
    };

    const forgotPassword = async ({
        setErrors,
        setStatus,
        email,
    }: {
        setErrors: any;
        setStatus: any;
        email: any;
    }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post("/forgot-password", { email })
            .then((response) => setStatus(response.data.status))
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({
        setErrors,
        setStatus,
        ...props
    }: {
        setErrors: any;
        setStatus: any;
        props: any;
    }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post("/reset-password", { token: params.token, ...props })
            .then((response) =>
                router.push("/login?reset=" + btoa(response.data.status))
            )
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({ setStatus }: { setStatus: any }) => {
        axios
            .post("/email/verification-notification")
            .then((response) => setStatus(response.data.status));
    };

    const logout = async () => {
        if (!error) {
            await axios.post("/logout").then(() => mutate());
            return { success: true };
        }
        return { success: false };
    };

    useEffect(() => {
        if (middleware === "auth" && error?.response?.status === 401) {
            logout();
            router.push("/login");
            return;
        }

        // if (middleware === "auth" && !user?.email_verified_at) {
        //     router.push("/verify-email");
        //     return;
        // }

        if (middleware === "guest" && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated);
            return;
        }

        // if (
        //     window.location.pathname === "/verify-email" &&
        //     user?.email_verified_at &&
        //     redirectIfAuthenticated
        // ) {
        //     router.push(redirectIfAuthenticated);
        //     return;
        // }
    }, [user, error, middleware, redirectIfAuthenticated]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    };
};
