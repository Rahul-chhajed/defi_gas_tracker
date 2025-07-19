import React, { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SimulationTable() {
  const [ethAmount, setEthAmount] = useState(0.5);

  const chains = useAppStore((s) => s.chains);
  const usdPrice = useAppStore((s) => s.usdPrice);

  const GAS_LIMIT = 21000;

  const rows = Object.entries(chains).map(([name, { baseFee, priorityFee }]) => {
    const gasFeeEth = ((baseFee + priorityFee) * GAS_LIMIT) / 1e9;
    const costUSD = gasFeeEth * usdPrice;

    return {
      chain: name,
      baseFee,
      priorityFee,
      gasFeeEth,
      costUSD,
    };
  });

  return (
    <div className="px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-700 drop-shadow-md mb-6 text-center">
        🔮 Cross-Chain Gas Simulation
      </h1>

      <Card className="w-full max-w-3xl bg-white border border-purple-500 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-transform hover:scale-[1.01]">
        <CardContent className="p-6">
          <Label className="mb-2 block text-lg font-semibold text-purple-700">
            ETH Transfer Amount
          </Label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={ethAmount}
            onChange={(e) => setEthAmount(Number(e.target.value))}
            className="mb-6 bg-white text-purple-700 border border-purple-400 focus:ring-purple-500"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-purple-300 rounded-md text-sm text-purple-700 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              <thead>
                <tr className="bg-purple-100 text-purple-800">
                  <th className="p-2">Chain</th>
                  <th className="p-2">Base Fee (Gwei)</th>
                  <th className="p-2">Priority Fee (Gwei)</th>
                  <th className="p-2">Gas Fee (ETH)</th>
                  <th className="p-2">Est. Cost (USD)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.chain}
                    className="border-t border-purple-200 hover:bg-purple-50 transition"
                  >
                    <td className="p-2 capitalize">{row.chain}</td>
                    <td className="p-2">{row.baseFee.toFixed(2)}</td>
                    <td className="p-2">{row.priorityFee.toFixed(2)}</td>
                    <td className="p-2">{row.gasFeeEth.toExponential(4)}</td>
                    <td className="p-2">${row.costUSD.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
