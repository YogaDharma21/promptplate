"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { usePrompt } from "@/hooks/prompt";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/axios";
import { Copy, LucideMessageCircleQuestion, Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";

export default function Page() {
    const { user } = useAuth({ middleware: "auth" });
    const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
    const { toast } = useToast();
    const { prompts, isLoading } = usePrompt({ middleware: "auth" });

    const copyToClipboard = (e: React.MouseEvent, content: string) => {
        e.stopPropagation();
        navigator.clipboard
            .writeText(content)
            .then(() => {
                toast({
                    title: "Prompt copied!",
                    description:
                        "The prompt has been copied to your clipboard.",
                });
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
                toast({
                    title: "Copy failed",
                    description: "There was an error copying the prompt.",
                    variant: "destructive",
                });
            });
    };
    return (
        <div className="container mx-auto p-4">
            {isLoading ? (
                <div className="flex gap-2 flex-col">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div
                            key={index}
                            className="aspect-video h-14 w-full rounded-lg bg-muted/50"
                        />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {prompts.length === 0 ? (
                            <div className="w-full text-center py-8 ">
                                <p className="text-xl text-primary font-bold">
                                    No prompts found
                                </p>
                                <p className="text-base text-primary mt-2 ">
                                    Create your first prompt to get started
                                </p>
                            </div>
                        ) : (
                            prompts.map((prompt: any) => (
                                <Card
                                    key={prompt.id}
                                    className="cursor-pointer hover:shadow-lg transition-shadow"
                                    onClick={() => setSelectedPrompt(prompt)}
                                >
                                    <CardContent className="p-4 h-full flex flex-col max-h-[50vh]">
                                        <div className="flex justify-between items-center mb-2">
                                            <h2 className="text-xl font-semibold truncate">
                                                {prompt.name}
                                            </h2>
                                            <div className="flex gap-2">
                                                {user.id === prompt.user_id && (
                                                    <Link
                                                        href={`/edit-prompt/${prompt.id}`}
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) =>
                                                        copyToClipboard(
                                                            e,
                                                            prompt.content
                                                        )
                                                    }
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                            <p>Created by {prompt.creator}</p>
                                            <span>•</span>
                                            <p>{prompt.tag_name}</p>
                                        </div>
                                        <div className="flex-grow overflow-y-auto text-sm">
                                            <p className="whitespace-pre-wrap break-words">
                                                {prompt.content}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    <Dialog
                        open={selectedPrompt !== null}
                        onOpenChange={(open) =>
                            !open && setSelectedPrompt(null)
                        }
                    >
                        {selectedPrompt && (
                            <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
                                <DialogHeader>
                                    <DialogTitle>
                                        {selectedPrompt.name}
                                    </DialogTitle>
                                    <DialogDescription className="flex items-center gap-2">
                                        <span>
                                            Created by {selectedPrompt.creator}
                                        </span>
                                        <span>•</span>
                                        <span>{selectedPrompt.tag_name}</span>
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="mt-4 flex-grow overflow-y-auto">
                                    <p className="whitespace-pre-wrap break-words">
                                        {selectedPrompt.content}
                                    </p>
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                    {user.id === selectedPrompt.user_id && (
                                        <Link
                                            href={`/edit-prompt/${selectedPrompt.id}`}
                                        >
                                            <Button variant="ghost">
                                                <Pencil className="h-4 w-4" />
                                                <p>Edit</p>
                                            </Button>
                                        </Link>
                                    )}
                                    <Button
                                        onClick={(e) =>
                                            copyToClipboard(
                                                e,
                                                selectedPrompt.content
                                            )
                                        }
                                    >
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copy Prompt
                                    </Button>
                                </div>
                            </DialogContent>
                        )}
                    </Dialog>
                </>
            )}
        </div>
    );
}
