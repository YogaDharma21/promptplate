"use client";
import PromptCreateForm from "@/components/prompt-create-form";

export default function page() {
    return (
        <div className="flex flex-1 flex-col gap-4 px-4">
            <PromptCreateForm />
        </div>
    );
}
