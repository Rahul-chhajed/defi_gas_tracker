// ✅ Polling Utils - startGasListeners.js
import { JsonRpcProvider } from "ethers";
import { useAppStore } from "../store/useAppStore";

export const RPCS = {
  ethereum: import.meta.env.VITE_ALCHEMY_ETHEREUM,
  polygon: import.meta.env.VITE_ALCHEMY_POLYGON,
  arbitrum: import.meta.env.VITE_ALCHEMY_ARBITRUM,
};


const POLL_INTERVAL = 6000;
const SAMPLE_INTERVAL = 60000;

export const startGasListeners = () => {
  console.log("⛽ Starting gas polling...");
  const updateChain = useAppStore.getState().updateChain;
  const lastBaseFees = {};

  Object.entries(RPCS).forEach(([chain, rpcUrl]) => {
    const provider = new JsonRpcProvider(rpcUrl);

    const poll = async () => {
      try {
        const block = await provider.getBlock("latest");
        const feeData = await provider.getFeeData();

        const baseFee = block.baseFeePerGas ? Number(block.baseFeePerGas) / 1e9 : 0;
        const priorityFee = feeData?.maxPriorityFeePerGas
          ? Number(feeData.maxPriorityFeePerGas) / 1e9
          : 1.5;

        lastBaseFees[chain] = baseFee;
        updateChain(chain, {
          baseFee: parseFloat(baseFee.toFixed(9)),
          priorityFee: parseFloat(priorityFee.toFixed(9)),
        });
      } catch (err) {
        console.error(`❌ Error polling ${chain}:`, err);
      }
    };

    poll();
    setInterval(poll, POLL_INTERVAL);

    setInterval(() => {
      updateChain(chain, { baseFee: lastBaseFees[chain] });
    }, SAMPLE_INTERVAL);
  });
};