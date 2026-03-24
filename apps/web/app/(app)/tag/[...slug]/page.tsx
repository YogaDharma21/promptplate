import TagContent from "@/components/tag-content";
import axios from "@/lib/axios";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    return (
        <>
            <TagContent params={slug} />
        </>
    );
}
