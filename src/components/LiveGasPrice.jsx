import { useEffect } from "react";
import { startGasListeners } from "../utils/gasListeners";
import { useAppStore } from "../store/useAppStore";
import { Card, CardContent } from "@/components/ui/card";


export default function LiveGasPrice() {
  const chains = useAppStore((state) => state.chains);

  useEffect(() => {
    startGasListeners();
  }, []);

  return (
  <div className="p-6 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-purple-700 drop-shadow-md">
        🔗 Web3 Real-Time Gas Tracker
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(chains).map(([chain, { baseFee, priorityFee }]) => (
          <Card
            key={chain}
            className="bg-white border border-purple-300 shadow-[0_0_20px_2px_rgba(168,85,247,0.4)] rounded-2xl transition-transform hover:scale-[1.02]"
          >
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-semibold capitalize text-purple-700">{chain}</h2>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Base Fee Per Gas:</span>{" "}
                {baseFee.toFixed(9)} Gwei
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Max Priority Fee Per Gas:</span>{" "}
                {priorityFee.toFixed(9)} Gwei
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
