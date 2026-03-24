import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function VerifyEmailForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { logout, resendEmailVerification } = useAuth({
        middleware: "auth",
        redirectIfAuthenticated: "/dashboard",
    });

    const [status, setStatus] = useState(null);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Verify your email</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 text-sm text-primary">
                        Thanks for signing up! Before getting started, could you
                        verify your email address by clicking on the link we
                        just emailed to you? If you didn't receive the email, we
                        will gladly send you another.
                    </div>

                    {status === "verification-link-sent" && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            A new verification link has been sent to the email
                            address you provided during registration.
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
                        <Button
                            className="w-full md:w-max"
                            onClick={() =>
                                resendEmailVerification({ setStatus })
                            }
                        >
                            Resend Verification Email
                        </Button>

                        <Button
                            variant={"outline"}
                            className="hover:underline underline-offset-4 cursor-pointer text-sm w-full md:w-max"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                    href="/terms-of-service"
                    className="underline underline-offset-4 cursor-pointer hover:text-primary"
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    href="/privacy-policy"
                    className="underline underline-offset-4 cursor-pointer hover:text-primary"
                >
                    Privacy Policy
                </Link>
                .
            </div>
        </div>
    );
}
