import { ethers, WebSocketProvider } from "ethers";
import { useAppStore } from "../store/useAppStore";

// ✅ Uniswap V3 ETH/USDC pool (Mainnet)
const UNISWAP_POOL = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";

// ✅ ABI Fragment: Only the "Swap" event and "slot0" function
const UNISWAP_ABI = [
  "event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)",
  "function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16, uint16, uint16, uint8, bool)"
];

// 🔁 Start ETH/USD price listener
export const startEthUsdListener = () => {
  const provider = new WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/UvWnSfrl7kM3buZRsg1d2");
  const contract = new ethers.Contract(UNISWAP_POOL, UNISWAP_ABI, provider);
  const updateUsdPrice = useAppStore.getState().updateUsdPrice;

const fetchPriceFromSlot0 = async () => {
  try {
    const [sqrtPriceX96] = await contract.slot0();

    const numerator = 2n ** 192n * 10n ** 12n;
    const denominator = BigInt(sqrtPriceX96) ** 2n;

    const rawPrice = numerator * 1_000_000n / denominator; // scale by 1e6 to preserve precision
    const floatPrice = Number(rawPrice) / 1e6;

    updateUsdPrice(parseFloat(floatPrice.toFixed(6)));
  } catch (err) {
    console.error("Failed to fetch ETH/USD price from slot0:", err);
  }
};


contract.removeAllListeners("Swap");
  // 🔁 React to every Swap for updates
  contract.on("Swap", async () => {
    await fetchPriceFromSlot0(); // Update price on every swap
  });

  // 🔁 Poll once every 10s (in case of inactivity)
  setInterval(fetchPriceFromSlot0, 10000);
};
