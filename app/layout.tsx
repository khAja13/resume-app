import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import dotenv from "dotenv";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/ui/Theme";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Resume checker",
    description: "Resume checker",
};

export default async function RootLayout({
    children,
}: React.PropsWithChildren) {
    const session = await auth();

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className="flex h-full min-h-screen w-full flex-col justify-between bg-background"
                suppressHydrationWarning
            >
                <NextUIProvider>
                    <NextThemesProvider attribute="class" defaultTheme="dark">
                        <SessionProvider session={session} basePath="/auth">
                            <Header />
                            {children}
                        </SessionProvider>
                    </NextThemesProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
