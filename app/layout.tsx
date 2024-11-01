import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import dotenv from 'dotenv';
dotenv.config()

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Resume checker",
  description:
    "Resume checker",
}

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const session = await auth();
  return (
    <SessionProvider session={session}  basePath={"/auth"}>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex h-full min-h-screen w-full flex-col justify-between">
            <Header />
            <main className="mx-auto w-full max-w-3xl flex-auto px-4 py-4 sm:px-6 md:py-6">
              {children}
            </main>
          </div>
        </body>
      </html>
    </SessionProvider>

  )
}
