"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { error } from "console";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Textarea } from "./ui/textarea";
import { usePrompt } from "@/hooks/prompt";
import Loading from "@/app/Loading";
import { useTag } from "@/hooks/tag";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    tag: z.number({
        required_error: "Please select a tag.",
    }),
    content: z.string().min(1, {
        message: "Content is required.",
    }),
});

interface Tag {
    id: number;
    name: string;
}
export default function EditPromptForm({ slug }: { slug: string }) {
    const [prompt, setPrompt] = useState<any>(null);
    const [errors, setErrors] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { tags } = useTag({ middleware: "auth" });

    const { user } = useAuth({ middleware: "auth" });
    const { updatePrompt } = usePrompt({});
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            content: "",
        },
    });

    useEffect(() => {
        axios.get(`/api/prompt/${slug}`).then((res) => {
            setPrompt(res.data);
            form.reset({
                name: res.data.name,
                content: res.data.content,
                tag: res.data.tag_id,
            });
        });
    }, [slug, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setErrors([]);
        try {
            const response = await updatePrompt({
                name: values.name,
                content: values.content,
                tag_id: values.tag,
                id: prompt.id,
                setErrors,
            });
            if (response?.success) {
                router.push("/dashboard");
                toast({
                    title: "Success",
                    description:
                        "Creating prompt successful! Redirecting to your dashboard.",
                    variant: "default",
                });
            } else {
                toast({
                    title: "Error",
                    description: response?.error.response.data.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("An error occurred: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    if (!prompt) {
        return (
            <div className="flex flex-col gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-[250px] lg:h-[350px] w-full" />
                <Skeleton className="h-10 w-24 self-end" />
            </div>
        );
    }

    if (!user || user.id !== prompt.user_id) {
        return <div>You are not authorized to edit this prompt</div>;
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-end gap-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tag"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Tag</FormLabel>
                                <Popover>
                                    <FormControl>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? tags.find(
                                                          (tag: any) =>
                                                              tag.id ===
                                                              field.value
                                                      )?.name
                                                    : "Select tag"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                    </FormControl>
                                    <PopoverContent className="md:w-[400px] lg:w-[700px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search language..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    No language found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {tags.map((tag: any) => (
                                                        <CommandItem
                                                            value={tag.name}
                                                            key={tag.id}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "tag",
                                                                    tag.id
                                                                );
                                                            }}
                                                        >
                                                            {tag.name}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    tag.id ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="h-[250px] lg:h-[350px]"
                                        placeholder="Enter your content"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="border transition-colors text-primary-foreground font-bold px-6"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="mr-2 h-4 w-4 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Loading...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
