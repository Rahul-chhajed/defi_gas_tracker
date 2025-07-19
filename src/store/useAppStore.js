import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      mode: "live",
      setMode: (mode) => set({ mode }),

      chains: {
        ethereum: { baseFee: 0, priorityFee: 0, history: [] },
        polygon: { baseFee: 0, priorityFee: 0, history: [] },
        arbitrum: { baseFee: 0, priorityFee: 0, history: [] },
      },

      updateChain: (chain, data) =>
        set((state) => {
          const prev = state.chains[chain];
          let updatedHistory = prev.history || [];

          if (data.baseFee !== undefined) {
            const now = Date.now();
            updatedHistory = [...updatedHistory, { time: now, value: Number(data.baseFee) }];
            const cutoff = now - 8 * 60 * 60 * 1000;
            updatedHistory = updatedHistory.filter((pt) => pt.time >= cutoff);
          }

          return {
            chains: {
              ...state.chains,
              [chain]: {
                ...prev,
                ...data,
                history: updatedHistory,
              },
            },
          };
        }),

      usdPrice: 0,
      updateUsdPrice: (price) => set(() => ({ usdPrice: price })),
    }),
    {
      name: "app-storage", // key in localStorage
      partialize: (state) => ({
        mode: state.mode,
        chains: state.chains,
        usdPrice: state.usdPrice,
      }),
    }
  )
);
