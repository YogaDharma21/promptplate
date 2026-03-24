import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

export const usePrompt = ({ middleware, redirectTo }: any) => {
    const router = useRouter();

    const {
        data: prompts,
        error,
        mutate,
    } = useSWR("/api/prompt", () =>
        axios
            .get("/api/prompt")
            .then((res) => res.data)
            .catch((error) => {
                throw error;
            })
    );

    const createPrompt = async ({ setErrors, ...formData }: any) => {
        setErrors([]);
        try {
            const response = await axios.post("/api/prompt", formData);
            await mutate();
            return { success: true, data: response.data };
        } catch (error: any) {
            setErrors(error.response.data.errors);
            return { success: false, error };
        }
    };

    const updatePrompt = async ({ setErrors, ...formData }: any) => {
        setErrors([]);
        try {
            const response = await axios.put(`/api/prompt/${formData.id}`, {
                ...formData,
            });
            await mutate();
            return { success: true, data: response.data };
        } catch (error: any) {
            setErrors(error.response.data.errors);
            return { success: false, error };
        }
    };

    useEffect(() => {
        if (middleware == "auth" && redirectTo) {
            router.push(redirectTo);
        }
    }, [middleware, redirectTo]);

    return {
        prompts,
        error,
        isLoading: !error && !prompts,
        createPrompt,
        updatePrompt,
    };
};
