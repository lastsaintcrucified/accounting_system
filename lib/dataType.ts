export const accountTypeColors = {
	ASSET: "bg-green-100 text-green-800",
	LIABILITY: "bg-red-100 text-red-800",
	EQUITY: "bg-blue-100 text-blue-800",
	EXPENSE: "bg-orange-100 text-orange-800",
	REVENUE: "bg-purple-100 text-purple-800",
};

export interface Account {
	id: string;
	name: string;
	type: "ASSET" | "LIABILITY" | "EQUITY" | "EXPENSE" | "REVENUE";
	createdAt: string;
	updatedAt: string;
}
