import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CARDANO_WALLET_ENDPOINT } from "@/consts";

interface Wallet {
  id: string;
  name: string;
  balance: {
    total: {
      quantity: number;
      unit: string;
    };
  };
}

interface WalletListProps {
  onWalletSelect: (wallet: Wallet) => void;
  selectedWalletId?: string;
}

export const WalletList = ({
  onWalletSelect,
  selectedWalletId,
}: WalletListProps) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const response = await fetch(`${CARDANO_WALLET_ENDPOINT}/wallets`);
      if (!response.ok) {
        throw new Error("Failed to fetch wallets");
      }
      const data = await response.json();
      setWallets(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch wallets",
        variant: "destructive",
      });
      console.error("Error fetching wallets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBalance = (quantity: number, unit: string) => {
    if (unit === "lovelace") {
      return `${(quantity / 1000000).toFixed(2)} ADA`;
    }
    return `${quantity} ${unit}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wallets</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading wallets...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallets</CardTitle>
      </CardHeader>
      <CardContent>
        {wallets.length === 0 ? (
          <p className="text-muted-foreground">No wallets found</p>
        ) : (
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                onClick={() => onWalletSelect(wallet)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                  selectedWalletId === wallet.id
                    ? "bg-accent border-primary"
                    : "bg-background"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{wallet.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {wallet.id.slice(0, 10)}...{wallet.id.slice(-10)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatBalance(
                        wallet.balance.total.quantity,
                        wallet.balance.total.unit
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
