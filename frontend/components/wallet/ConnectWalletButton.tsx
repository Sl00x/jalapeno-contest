import { Button } from "@/components/ui/button";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

export const ConnectWalletButton = () => {
  const { address, isConnected } = useAppKitAccount();
  const { open: openWallet } = useAppKit();

  return (
    <Button onClick={() => openWallet()}>
      {isConnected && address
        ? address.substring(0, 7) +
          "..." +
          address.substring(address.length - 4)
        : "Connect Wallet"}
    </Button>
  );
};
