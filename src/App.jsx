import React from "react";
import "./App.css";
import LiveGasPrice from "./components/LiveGasPrice";
import UsdPricing from "./components/UsdPricing";
import StartCandlestickChart from "./components/StartCandlestickChart";
import Navbar from "./components/Navbar";
import { useAppStore } from "./store/useAppStore";
import SimulationTable from "./components/SimulationTable";
import Footer from "./components/Footer";
export default function App() {
  const mode = useAppStore((state) => state.mode);

  return (
    <>
      <Navbar />
  
   
         {mode === "live" && (
        <>
          <LiveGasPrice />
          <StartCandlestickChart />
        </>
      )}

        {mode === "simulation" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UsdPricing />
            <SimulationTable />
          </div>
        )}
    <Footer/>
    </>
  );
}
