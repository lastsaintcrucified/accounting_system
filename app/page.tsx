import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, PlusCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Accounting System</h1>
        <p className="text-xl text-muted-foreground">Manage your financial records with ease</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Chart of Accounts
            </CardTitle>
            <CardDescription>Manage your account structure and categories</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/accounts">View Accounts</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PlusCircle className="w-5 h-5 mr-2" />
              Journal Entries
            </CardTitle>
            <CardDescription>Create and manage journal entries for transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/journal-entries">Create Entry</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
