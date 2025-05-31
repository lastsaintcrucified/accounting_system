/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	try {
		await prisma.account.delete({
			where: { id },
		});
		return NextResponse.json({ success: true });
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Failed to delete account" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	try {
		const { name, type } = await request.json();

		const account = await prisma.account.update({
			where: { id },
			data: { name, type },
		});

		return NextResponse.json(account);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Failed to update account" },
			{ status: 500 }
		);
	}
}
