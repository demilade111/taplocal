
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Download, Plus } from "lucide-react";

const WalletPage = () => {
  // Mock data for transactions
  const transactions = [
    {
      id: 1,
      type: "payment",
      amount: 75.00,
      service: "Home Cleaning",
      client: "Jane Cooper",
      date: "April 15, 2025",
      status: "completed"
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 150.00,
      date: "April 10, 2025",
      status: "completed"
    },
    {
      id: 3,
      type: "payment",
      amount: 60.00,
      service: "Garden Maintenance",
      client: "Robert Fox",
      date: "April 8, 2025",
      status: "completed"
    },
    {
      id: 4,
      type: "payment",
      amount: 75.00,
      service: "Home Cleaning",
      client: "Leslie Alexander",
      date: "April 3, 2025",
      status: "completed"
    }
  ];
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold font-heading text-taplocal-dark mb-2">Wallet</h1>
      <p className="text-gray-600 mb-8">Track your earnings and manage your payouts</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available Balance</CardDescription>
            <CardTitle className="text-3xl font-bold">$310.00</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button className="w-full bg-taplocal-teal text-white hover:bg-taplocal-teal/90">
              <CreditCard className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Earnings</CardDescription>
            <CardTitle className="text-3xl font-bold">$510.00</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-green-600 text-sm">+$75.00 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Payment Methods</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                <span>Bank Account (****4567)</span>
              </div>
              <Badge variant="outline">Default</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl">Transaction History</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription>View all your transactions</CardDescription>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-0">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === "payment" 
                        ? "bg-green-100" 
                        : "bg-blue-100"
                    }`}>
                      {transaction.type === "payment" ? (
                        <ArrowDown className={`h-5 w-5 text-green-600`} />
                      ) : (
                        <ArrowUp className={`h-5 w-5 text-blue-600`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {transaction.type === "payment" 
                          ? `Payment from ${transaction.client}` 
                          : "Withdrawal"}
                      </p>
                      <div className="text-sm text-gray-500">
                        {transaction.type === "payment" && (
                          <p>{transaction.service}</p>
                        )}
                        <p>{transaction.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`font-medium ${
                    transaction.type === "payment" 
                      ? "text-green-600" 
                      : "text-blue-600"
                  }`}>
                    {transaction.type === "payment" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="payments">
              {transactions
                .filter(t => t.type === "payment")
                .map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between py-3 border-b last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <ArrowDown className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Payment from {transaction.client}</p>
                        <div className="text-sm text-gray-500">
                          <p>{transaction.service}</p>
                          <p>{transaction.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-green-600">
                      +${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
            </TabsContent>
            
            <TabsContent value="withdrawals">
              {transactions
                .filter(t => t.type === "withdrawal")
                .map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between py-3 border-b last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <ArrowUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Withdrawal</p>
                        <div className="text-sm text-gray-500">
                          <p>{transaction.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-blue-600">
                      -${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Need to import Badge
import { Badge } from "@/components/ui/badge";

export default WalletPage;
