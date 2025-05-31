/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	try {
		const accounts = await prisma.account.findMany({
			orderBy: { name: "asc" },
		});
		return NextResponse.json(accounts);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Failed to fetch accounts" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const { name, type } = await request.json();

		const account = await prisma.account.create({
			data: { name, type },
		});

		return NextResponse.json(account);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Failed to create account" },
			{ status: 500 }
		);
	}
}
