"use client";
import { GalleryVerticalEnd } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/auth";
import Loading from "@/app/Loading";
import { SearchForm } from "./search-form";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useTag } from "@/hooks/tag";

export function AppSidebar({
    user,
    ...props
}: React.ComponentProps<typeof Sidebar> & { user: any }) {
    const [searchQuery, setSearchQuery] = useState("");
    const { tags, isLoading } = useTag({ middleware: "auth" });

    const filteredNavMain =
        tags?.filter((item: any) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) ?? [];

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="text-lg font-semibold">
                                        Prompt Plate
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SearchForm onSearch={setSearchQuery} />
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="aspect-video h-12 w-full rounded-lg bg-muted/50"
                                />
                            ))
                        ) : filteredNavMain.length === 0 ? (
                            <div className="w-full text-center py-8">
                                <p className="text-xl text-primary font-bold">
                                    No tags found
                                </p>
                            </div>
                        ) : (
                            filteredNavMain.map((item: any) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={`/tag/${item.slug.toLowerCase()}`}
                                            className="font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Link href={"/create-prompt"}>
                    <Button className="w-full transition-colors text-primary-foreground font-bold px-6">
                        Create New Prompt
                    </Button>
                </Link>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
