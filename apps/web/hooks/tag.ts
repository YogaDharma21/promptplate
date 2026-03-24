import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

export const useTag = ({ middleware, redirectTo }: any) => {
    const router = useRouter();

    const {
        data: tags,
        error,
        mutate,
    } = useSWR(
        "/api/tag",
        () =>
            axios
                .get("/api/tag")
                .then((res) => res.data)
                .catch((error) => {
                    throw error;
                }),
        {
            refreshInterval: 30000,
            revalidateOnFocus: true,
        }
    );

    useEffect(() => {
        if (middleware == "auth" && redirectTo) {
            router.push(redirectTo);
        }
    }, [middleware, redirectTo]);

    return {
        tags,
        error,
        isLoading: !error && !tags,
        mutate,
    };
};
