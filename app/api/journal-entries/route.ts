/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
	try {
		const { date, memo, lines } = await request.json();

		const journalEntry = await prisma.journalEntry.create({
			data: {
				date: new Date(date),
				memo,
				lines: {
					create: lines.map((line: any) => ({
						accountId: line.accountId,
						debit: line.debit || 0,
						credit: line.credit || 0,
					})),
				},
			},
			include: {
				lines: {
					include: {
						account: true,
					},
				},
			},
		});

		return NextResponse.json(journalEntry);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Failed to create journal entry" },
			{ status: 500 }
		);
	}
}
