
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownLeft, Clock, Filter } from "lucide-react";
import { toast } from "sonner";
import { EscrowCard } from "@/components/escrow/EscrowCard";

// Mock data for wallet
const walletData = {
  balance: 2450.75,
  pendingEscrow: 850.00,
  totalEarned: 15750.25,
};

// Mock data for transactions
const transactions = [
  {
    id: "t1",
    type: "withdrawal",
    amount: 500,
    status: "completed",
    date: "Apr 10, 2025",
    description: "Bank transfer",
  },
  {
    id: "t2",
    type: "deposit",
    amount: 350.75,
    status: "completed",
    date: "Apr 8, 2025",
    description: "Service payment - Haircut & Styling",
  },
  {
    id: "t3",
    type: "deposit",
    amount: 125.00,
    status: "completed",
    date: "Apr 5, 2025",
    description: "Service payment - Men's Haircut",
  },
  {
    id: "t4",
    type: "withdrawal",
    amount: 1000.00,
    status: "processing",
    date: "Apr 3, 2025",
    description: "Bank transfer",
  },
  {
    id: "t5",
    type: "deposit",
    amount: 200.00,
    status: "completed",
    date: "Apr 1, 2025",
    description: "Service payment - Hair Coloring",
  },
];

// Mock data for escrow
const escrowTransactions = [
  {
    id: "esc1",
    amount: 250.00,
    serviceName: "Women's Haircut & Styling",
    providerName: "Sarah Johnson",
    providerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    clientName: "Emma Wilson",
    clientImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    status: "active",
    createdAt: "Apr 12, 2025",
    expiresAt: "Apr 19, 2025",
  },
  {
    id: "esc2",
    amount: 450.00,
    serviceName: "Full Balayage & Cut",
    providerName: "Sarah Johnson",
    providerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    clientName: "John Davis",
    clientImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    status: "completed",
    createdAt: "Apr 5, 2025",
    expiresAt: "Apr 12, 2025",
  },
  {
    id: "esc3",
    amount: 150.00,
    serviceName: "Men's Haircut",
    providerName: "Sarah Johnson",
    providerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    clientName: "Michael Smith",
    clientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    status: "disputed",
    createdAt: "Apr 2, 2025",
    expiresAt: "Apr 9, 2025",
  },
];

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  
  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (amount > walletData.balance) {
      toast.error("Insufficient balance");
      return;
    }
    
    toast.success("Withdrawal initiated", {
      description: `$${amount.toFixed(2)} will be transferred to your bank account in 1-3 business days.`,
    });
    
    setWithdrawAmount("");
  };

  return (
    <div className="container-app max-w-6xl pb-20 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Wallet & Payments</h1>
        <p className="text-muted-foreground">Manage your earnings and transactions</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-scale-in">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="escrow">Escrow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Available Balance</CardTitle>
                <DollarSign className="w-5 h-5 text-taplocal-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${walletData.balance.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Available for withdrawal
                </p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">In Escrow</CardTitle>
                <Clock className="w-5 h-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${walletData.pendingEscrow.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pending completion
                </p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Earned</CardTitle>
                <CreditCard className="w-5 h-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${walletData.totalEarned.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Lifetime earnings
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
              <CardDescription>Transfer your available balance to your bank account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="amount"
                      placeholder="0.00"
                      className="pl-9"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Available balance: ${walletData.balance.toFixed(2)}
                  </p>
                </div>
                
                <Button
                  className="w-full bg-taplocal-purple hover:bg-taplocal-purple/90"
                  onClick={handleWithdrawal}
                >
                  Withdraw to Bank Account
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Withdrawals typically process in 1-3 business days
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("transactions")}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2 animate-fade-in">
                    <div className="flex items-center">
                      <div className={`
                        h-10 w-10 rounded-full flex items-center justify-center mr-3
                        ${transaction.type === 'deposit' 
                          ? 'bg-green-100 dark:bg-green-900/20' 
                          : 'bg-blue-100 dark:bg-blue-900/20'
                        }
                      `}>
                        {transaction.type === 'deposit' ? (
                          <ArrowDownLeft className={`h-5 w-5 text-green-600 dark:text-green-400`} />
                        ) : (
                          <ArrowUpRight className={`h-5 w-5 text-blue-600 dark:text-blue-400`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs uppercase text-muted-foreground">{transaction.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Transactions</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <CardDescription>
                View your complete transaction history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between py-3 border-b border-border last:border-0 animate-fade-in"
                  >
                    <div className="flex items-center">
                      <div className={`
                        h-10 w-10 rounded-full flex items-center justify-center mr-3
                        ${transaction.type === 'deposit' 
                          ? 'bg-green-100 dark:bg-green-900/20' 
                          : 'bg-blue-100 dark:bg-blue-900/20'
                        }
                      `}>
                        {transaction.type === 'deposit' ? (
                          <ArrowDownLeft className={`h-5 w-5 text-green-600 dark:text-green-400`} />
                        ) : (
                          <ArrowUpRight className={`h-5 w-5 text-blue-600 dark:text-blue-400`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="escrow" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Escrow Transactions</CardTitle>
              <CardDescription>
                Secure payments held in escrow until service completion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {escrowTransactions.map((escrow) => (
                <EscrowCard
                  key={escrow.id}
                  id={escrow.id}
                  amount={escrow.amount}
                  serviceName={escrow.serviceName}
                  providerName={escrow.providerName}
                  providerImage={escrow.providerImage}
                  clientName={escrow.clientName}
                  clientImage={escrow.clientImage}
                  status={escrow.status}
                  createdAt={escrow.createdAt}
                  expiresAt={escrow.expiresAt}
                  isProvider={true}
                />
              ))}
              
              {escrowTransactions.length === 0 && (
                <div className="text-center py-10">
                  <Clock className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-1">No escrow transactions</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    When clients book your services, the payments will be held in escrow until the job is complete.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WalletPage;
