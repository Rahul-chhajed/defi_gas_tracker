import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import { Card, CardContent } from "@/components/ui/card";
import { startEthUsdListener } from "../utils/startEthUsdListener";
export default function UsdPricing() {
  const usdPrice = useAppStore((state) => state.usdPrice);

  useEffect(() => {
    console.log("👂 Starting ETH/USD listener...");
    startEthUsdListener();
  }, []);

  return (
    <div className="px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-700 drop-shadow-md mb-6 text-center">
        💰 Ethereum USD Price Tracker
      </h1>

      <Card className="w-full max-w-md bg-white border border-purple-300 shadow-[0_0_20px_2px_rgba(168,85,247,0.4)] rounded-2xl transition-transform hover:scale-[1.02]">
        <CardContent className="p-6 space-y-2">
          <h2 className="text-xl font-semibold text-purple-700">Current ETH Price</h2>
          <p className="text-sm">
            <span className="font-medium text-gray-700">USD Price:</span> ${usdPrice.toFixed(6)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
