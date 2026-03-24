import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6 my-4">
            <div>
                <Link
                    href="/"
                    className="flex items-center gap-2 self-center font-medium cursor-pointer justify-center"
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Prompt Plate
                </Link>
            </div>
            <h1 className="text-4xl font-bold text-center">Terms of Service</h1>
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">1. Introduction</h2>
                <p className="text-muted-foreground">
                    Welcome to PromptPlate, a platform for discovering, sharing,
                    and collaborating on AI prompts. By accessing our service,
                    you agree to these terms governing the use of prompts,
                    community interactions, and content ownership.
                </p>
            </section>
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    2. User Responsibilities
                </h2>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                    <li>
                        You retain ownership of prompts you create but grant
                        PromptPlate a worldwide license to host and distribute
                        your content
                    </li>
                    <li>
                        Properly attribute original authors when modifying or
                        repurposing prompts
                    </li>
                    <li>
                        Ensure prompts comply with AI model providers' terms of
                        use (e.g. OpenAI, Anthropic)
                    </li>
                    <li>
                        Do not share prompts containing harmful, illegal, or
                        discriminatory content
                    </li>
                </ul>
            </section>
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">3. Prohibited Uses</h2>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                    <li>Reverse engineering or scraping platform content</li>
                    <li>
                        Misrepresenting ownership of others' prompt creations
                    </li>
                    <li>
                        Automated prompt generation at scale without permission
                    </li>
                    <li>
                        Sharing prompts designed to bypass AI safety measures
                    </li>
                </ul>
            </section>
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    4. Content Disclaimer
                </h2>
                <p className="text-muted-foreground">
                    PromptPlate does not guarantee prompt effectiveness or AI
                    output quality. Users are responsible for verifying prompt
                    results and complying with AI providers' terms. We reserve
                    the right to remove any content violating our policies.
                </p>
            </section>
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    5. Liability Limitations
                </h2>
                <p className="text-muted-foreground">
                    We are not responsible for any damages resulting from prompt
                    usage. AI outputs are not controlled by PromptPlate and
                    should not be considered professional advice.
                </p>
            </section>
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Termination</h2>
                <p className="text-muted-foreground">
                    Accounts may be suspended for violations of these terms.
                    Repeated infringements may result in permanent bans from the
                    platform.
                </p>
            </section>
            <div className="pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                    Last updated: {new Date().getFullYear()}. Contact us at
                    legal@promptplate.com with questions.
                </p>
            </div>
        </div>
    );
}
