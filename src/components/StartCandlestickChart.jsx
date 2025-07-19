import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { useAppStore } from "../store/useAppStore";

const chainLabels = {
    ethereum: "Ethereum",
    polygon: "Polygon",
    arbitrum: "Arbitrum",
};

export default function GasCandlestickChart() {
    const chartRef = useRef();
    const [selectedChain, setSelectedChain] = useState("ethereum");
    const history = useAppStore((s) => s.chains[selectedChain]?.history || []);

    useEffect(() => {
        if (!chartRef.current) return;

        // 1. Create chart
        const chart = createChart(chartRef.current, {
            width: chartRef.current.clientWidth || 600,
            height: 300,
            layout: {
                background: { color: "#0d0b1f" },
                textColor: "#ffffff",
            },
            grid: {
                vertLines: { color: "#333" },
                horzLines: { color: "#333" },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                borderVisible: false,
            },
            handleScroll: true,
            handleScale: true,
        });

        // 2. Add candlestick series
        const series = chart.addCandlestickSeries({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
            priceFormat: {
                type: "price",
                precision: 9,
                minMove: 0.000000001, // <-- VERY important for polygon
            },
        });

        // 3. Group and format data (to 1-minute candles)
        const grouped = {};

        history.forEach((point) => {
            const timeInSeconds = Math.floor(point.time / 1000);
            const FIFTEEN_MINUTES = 15 * 60; // in seconds
            const roundedMinute = Math.floor(timeInSeconds / FIFTEEN_MINUTES) * FIFTEEN_MINUTES;

            if (!grouped[roundedMinute]) {
                grouped[roundedMinute] = {
                    time: roundedMinute,
                    open: point.value,
                    high: point.value,
                    low: point.value,
                    close: point.value,
                };
            } else {
                grouped[roundedMinute].high = Math.max(grouped[roundedMinute].high, point.value);
                grouped[roundedMinute].low = Math.min(grouped[roundedMinute].low, point.value);
                grouped[roundedMinute].close = point.value;
            }
        });

        const data = Object.values(grouped).sort((a, b) => a.time - b.time);
        series.setData(data);

        // 4. Responsive resizing
        const resizeObserver = new ResizeObserver(() => {
            chart.applyOptions({ width: chartRef.current.clientWidth });
        });
        resizeObserver.observe(chartRef.current);

        // 5. Auto-scroll to latest candle
        if (data.length > 0) {
            chart.timeScale().scrollToPosition(0, true);
        }

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };
    }, [history, selectedChain]);

    return (
        <div className="p-4">
            <div className="mb-2 flex gap-2">
                {Object.keys(chainLabels).map((chain) => (
                    <button
                        key={chain}
                        onClick={() => setSelectedChain(chain)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${selectedChain === chain
                                ? "bg-purple-600 text-white"
                                : "bg-gray-700 text-gray-300"
                            }`}
                    >
                        {chainLabels[chain]}
                    </button>
                ))}
            </div>
            <div
                ref={chartRef}
                className="w-full"
                style={{
                    minHeight: "300px",
                    borderRadius: "12px",
                    overflow: "hidden",
                }}
            />
        </div>
    );
}
