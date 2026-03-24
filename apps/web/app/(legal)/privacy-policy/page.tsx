import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link
                href="/"
                className="flex items-center gap-2 self-center font-medium cursor-pointer justify-center pb-6"
            >
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                </div>
                Prompt Plate
            </Link>
            <div className="space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-muted-foreground">
                        Welcome to Prompt Plate. We value your privacy and are
                        committed to protecting your personal information. This
                        Privacy Policy outlines how we collect, use, and
                        safeguard your data when you use our website.
                    </p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Information We Collect
                    </h2>
                    <p className="text-muted-foreground">
                        We may collect the following types of information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>
                            Personal identification information (Name, email
                            address, phone number, etc.)
                        </li>
                        <li>
                            Usage data (pages visited, time spent on the site,
                            etc.)
                        </li>
                        <li>Cookies and tracking technologies</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        How We Use Your Information
                    </h2>
                    <p className="text-muted-foreground">
                        We use the collected information for various purposes,
                        including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>To provide and maintain our service</li>
                        <li>To notify you about changes to our service</li>
                        <li>To provide customer support</li>
                        <li>
                            To gather analysis or valuable information so that
                            we can improve our service
                        </li>
                        <li>To monitor the usage of our service</li>
                        <li>
                            To detect, prevent, and address technical issues
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Security of Your Information
                    </h2>
                    <p className="text-muted-foreground">
                        We take the security of your personal information
                        seriously and use reasonable measures to protect it.
                        However, no method of transmission over the internet or
                        method of electronic storage is 100% secure, and we
                        cannot guarantee its absolute security.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Changes to This Privacy Policy
                    </h2>
                    <p className="text-muted-foreground">
                        We may update our Privacy Policy from time to time. We
                        will notify you of any changes by posting the new
                        Privacy Policy on this page. You are advised to review
                        this Privacy Policy periodically for any changes.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Contact Us</h2>
                    <p className="text-muted-foreground">
                        If you have any questions about this Privacy Policy,
                        please contact us at{" "}
                        <a
                            href="mailto:support@promptplate.com"
                            className="text-primary hover:underline"
                        >
                            support@promptplate.com
                        </a>
                        .
                    </p>
                </section>
            </div>
        </div>
    );
}
