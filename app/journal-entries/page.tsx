/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Account {
	id: string;
	name: string;
	type: string;
}

interface JournalLine {
	id: string;
	accountId: string;
	type: "debit" | "credit";
	amount: number;
}

export default function JournalEntriesPage() {
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
	const [memo, setMemo] = useState("");
	const [lines, setLines] = useState<JournalLine[]>([
		{ id: "1", accountId: "", type: "debit", amount: 0 },
		{ id: "2", accountId: "", type: "credit", amount: 0 },
	]);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	useEffect(() => {
		fetchAccounts();
	}, []);

	const fetchAccounts = async () => {
		try {
			const response = await fetch("/api/accounts");
			const data = await response.json();
			setAccounts(data);
		} catch (error: any) {
			toast({
				title: error.message || "Error",
				description: "Failed to fetch accounts",
				variant: "destructive",
			});
		}
	};

	const addLine = () => {
		const newLine: JournalLine = {
			id: Date.now().toString(),
			accountId: "",
			type: "debit",
			amount: 0,
		};
		setLines([...lines, newLine]);
	};

	const removeLine = (id: string) => {
		if (lines.length > 2) {
			setLines(lines.filter((line) => line.id !== id));
		}
	};

	const updateLine = (id: string, field: keyof JournalLine, value: any) => {
		setLines(
			lines.map((line) => (line.id === id ? { ...line, [field]: value } : line))
		);
	};

	const calculateTotals = () => {
		const debitTotal = lines
			.filter((line) => line.type === "debit")
			.reduce((sum, line) => sum + (line.amount || 0), 0);

		const creditTotal = lines
			.filter((line) => line.type === "credit")
			.reduce((sum, line) => sum + (line.amount || 0), 0);

		return { debitTotal, creditTotal };
	};

	const { debitTotal, creditTotal } = calculateTotals();
	const isBalanced = debitTotal === creditTotal && debitTotal > 0;
	const canSubmit =
		isBalanced && lines.every((line) => line.accountId && line.amount > 0);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!canSubmit) return;

		setLoading(true);

		try {
			const journalEntryData = {
				date,
				memo,
				lines: lines.map((line) => ({
					accountId: line.accountId,
					debit: line.type === "debit" ? line.amount : 0,
					credit: line.type === "credit" ? line.amount : 0,
				})),
			};

			const response = await fetch("/api/journal-entries", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(journalEntryData),
			});

			if (response.ok) {
				toast({
					title: "Success",
					description: "Journal entry created successfully",
				});
				// Reset form
				setDate(new Date().toISOString().split("T")[0]);
				setMemo("");
				setLines([
					{ id: "1", accountId: "", type: "debit", amount: 0 },
					{ id: "2", accountId: "", type: "credit", amount: 0 },
				]);
			}
		} catch (error: any) {
			toast({
				title: error.message || "Error",
				description: "Failed to create journal entry",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='container mx-auto p-6 space-y-6'>
			<div>
				<h1 className='text-3xl font-bold'>Journal Entry</h1>
				<p className='text-muted-foreground'>Create a new journal entry</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className='space-y-6'
			>
				<Card>
					<CardHeader>
						<CardTitle>Entry Details</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='date'>Date</Label>
								<Input
									id='date'
									type='date'
									value={date}
									onChange={(e) => setDate(e.target.value)}
									required
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='memo'>Description</Label>
							<Textarea
								id='memo'
								value={memo}
								onChange={(e) => setMemo(e.target.value)}
								placeholder='Enter journal entry description'
								rows={3}
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between'>
						<CardTitle>Line Items</CardTitle>
						<Button
							type='button'
							variant='outline'
							onClick={addLine}
						>
							<Plus className='w-4 h-4 mr-2' />
							Add Line
						</Button>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{lines.map((line, index) => (
								<div
									key={line.id}
									className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg'
								>
									<div className='space-y-2'>
										<Label>Account</Label>
										<Select
											value={line.accountId}
											onValueChange={(value) =>
												updateLine(line.id, "accountId", value)
											}
										>
											<SelectTrigger>
												<SelectValue placeholder='Select account' />
											</SelectTrigger>
											<SelectContent>
												{accounts.map((account) => (
													<SelectItem
														key={account.id}
														value={account.id}
													>
														{account.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className='space-y-2'>
										<Label>Type</Label>
										<Select
											value={line.type}
											onValueChange={(value: "debit" | "credit") =>
												updateLine(line.id, "type", value)
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='debit'>Debit</SelectItem>
												<SelectItem value='credit'>Credit</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className='space-y-2'>
										<Label>Amount</Label>
										<Input
											type='number'
											step='0.01'
											min='0'
											value={line.amount || ""}
											onChange={(e) =>
												updateLine(
													line.id,
													"amount",
													Number.parseFloat(e.target.value) || 0
												)
											}
											placeholder='0.00'
										/>
									</div>
									<div className='flex items-end'>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() => removeLine(line.id)}
											disabled={lines.length <= 2}
										>
											<Trash2 className='w-4 h-4' />
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className='pt-6'>
						<div className='flex justify-between items-center mb-4'>
							<div className='space-y-2'>
								<div className='flex justify-between'>
									<span>Total Debits:</span>
									<span className='font-mono'>${debitTotal.toFixed(2)}</span>
								</div>
								<div className='flex justify-between'>
									<span>Total Credits:</span>
									<span className='font-mono'>${creditTotal.toFixed(2)}</span>
								</div>
								<div className='flex justify-between font-bold border-t pt-2'>
									<span>Difference:</span>
									<span
										className={`font-mono ${
											isBalanced ? "text-green-600" : "text-red-600"
										}`}
									>
										${Math.abs(debitTotal - creditTotal).toFixed(2)}
									</span>
								</div>
							</div>
						</div>

						{!isBalanced && debitTotal + creditTotal > 0 && (
							<div className='mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md'>
								<p className='text-sm text-yellow-800'>
									Entry is not balanced. Debits must equal credits.
								</p>
							</div>
						)}

						<Button
							type='submit'
							disabled={!canSubmit || loading}
							className='w-full'
						>
							{loading ? "Creating Entry..." : "Create Journal Entry"}
						</Button>
					</CardContent>
				</Card>
			</form>
		</div>
	);
}
