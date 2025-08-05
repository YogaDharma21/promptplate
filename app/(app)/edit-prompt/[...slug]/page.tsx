import PromptEditForm from "@/components/prompt-edit-form";
import { use } from "react";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    return (
        <div className="flex flex-1 flex-col gap-4 px-4">
            <PromptEditForm slug={slug} />
        </div>
    );
}
