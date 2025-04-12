
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Clock, ShieldCheck, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

interface EscrowCardProps {
  id: string;
  amount: number;
  serviceName: string;
  providerName: string;
  providerImage: string;
  clientName?: string;
  clientImage?: string;
  status: 'pending' | 'active' | 'completed' | 'disputed' | 'refunded';
  createdAt: string;
  expiresAt: string;
  isProvider?: boolean;
}

export function EscrowCard({
  id,
  amount,
  serviceName,
  providerName,
  providerImage,
  clientName,
  clientImage,
  status,
  createdAt,
  expiresAt,
  isProvider = false
}: EscrowCardProps) {
  const [isReleaseDialogOpen, setIsReleaseDialogOpen] = useState(false);
  const [isDisputeDialogOpen, setIsDisputeDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReleasePayment = () => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      setIsReleaseDialogOpen(false);
      toast.success("Payment released successfully", {
        description: `$${amount} has been sent to the service provider.`,
      });
    }, 1500);
  };

  const handleDispute = () => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      setIsDisputeDialogOpen(false);
      toast.info("Dispute has been filed", {
        description: "Our team will review your case and contact you within 48 hours.",
      });
    }, 1500);
  };

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20">
            <Clock size={12} className="mr-1" /> Pending
          </Badge>
        );
      case "active":
        return (
          <Badge className="bg-blue-500 text-white">
            <ShieldCheck size={12} className="mr-1" /> In Escrow
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle2 size={12} className="mr-1" /> Completed
          </Badge>
        );
      case "disputed":
        return (
          <Badge className="bg-orange-500 text-white">
            <AlertCircle size={12} className="mr-1" /> Disputed
          </Badge>
        );
      case "refunded":
        return (
          <Badge variant="outline" className="text-slate-600 border-slate-300 bg-slate-50 dark:bg-slate-900/20">
            Refunded
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-medium">{serviceName}</CardTitle>
              <CardDescription>Escrow ID: {id.substring(0, 8)}</CardDescription>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="text-sm text-muted-foreground">Amount in escrow</div>
            <div className="text-xl font-bold text-foreground">${amount.toFixed(2)}</div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <img src={providerImage} alt={providerName} />
              </Avatar>
              <div>
                <p className="text-sm font-medium">{providerName}</p>
                <p className="text-xs text-muted-foreground">Provider</p>
              </div>
            </div>
            
            {clientName && clientImage && (
              <div className="flex items-center">
                <div className="text-right mr-2">
                  <p className="text-sm font-medium">{clientName}</p>
                  <p className="text-xs text-muted-foreground">Client</p>
                </div>
                <Avatar className="h-8 w-8">
                  <img src={clientImage} alt={clientName} />
                </Avatar>
              </div>
            )}
          </div>
          
          <div className="text-sm space-y-1 bg-muted/50 p-3 rounded-md border border-border">
            <div className="flex justify-between">
              <span>Created:</span>
              <span>{createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span>Expires:</span>
              <span>{expiresAt}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-0">
          {status === 'active' && !isProvider && (
            <>
              <Button 
                variant="outline" 
                className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
                onClick={() => setIsDisputeDialogOpen(true)}
              >
                File Dispute
              </Button>
              <Button 
                className="bg-taplocal-purple hover:bg-taplocal-purple/90"
                onClick={() => setIsReleaseDialogOpen(true)}
              >
                Release Payment
              </Button>
            </>
          )}
          
          {status === 'active' && isProvider && (
            <>
              <Button 
                variant="outline" 
                className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
                onClick={() => setIsDisputeDialogOpen(true)}
              >
                File Dispute
              </Button>
              <Button variant="outline">Contact Client</Button>
            </>
          )}
          
          {status === 'completed' && (
            <Button variant="outline" className="w-full">View Details</Button>
          )}
          
          {status === 'disputed' && (
            <Button variant="outline" className="w-full">View Dispute Details</Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Release Payment Dialog */}
      <AlertDialog open={isReleaseDialogOpen} onOpenChange={setIsReleaseDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Release Payment</AlertDialogTitle>
            <AlertDialogDescription>
              You're about to release ${amount.toFixed(2)} to {providerName} for {serviceName}. This action cannot be reversed.
              Only release the payment if you're satisfied with the service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleReleasePayment();
              }}
              className="bg-taplocal-purple hover:bg-taplocal-purple/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Release Payment"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Dispute Dialog */}
      <AlertDialog open={isDisputeDialogOpen} onOpenChange={setIsDisputeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>File a Dispute</AlertDialogTitle>
            <AlertDialogDescription>
              Filing a dispute will freeze the escrow amount of ${amount.toFixed(2)} and our team will review your case.
              This process can take up to 5 business days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDispute();
              }}
              className="bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "File Dispute"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default EscrowCard;
