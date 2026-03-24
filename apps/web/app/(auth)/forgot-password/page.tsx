"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function ForgotPasswordPage() {
    return (
        <>
            <ForgotPasswordForm />
        </>
    );
}
