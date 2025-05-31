import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Accounting System",
	description: "A clean and minimal accounting system",
	generator: "Towhidul Islam",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<nav className='border-b bg-white'>
					<div className='container mx-auto px-6 py-4'>
						<div className='flex items-center justify-between'>
							<Link
								href='/'
								className='text-xl font-bold'
							>
								Accounting System
							</Link>
							<div className='flex space-x-4'>
								<Button
									variant='ghost'
									asChild
								>
									<Link href='/accounts'>Chart of Accounts</Link>
								</Button>
								<Button
									variant='ghost'
									asChild
								>
									<Link href='/journal-entries'>Journal Entries</Link>
								</Button>
							</div>
						</div>
					</div>
				</nav>
				<main className='min-h-screen bg-gray-50'>{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
