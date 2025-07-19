# 🔥 DeFi Gas Tracker

A sleek and modern decentralized finance (DeFi) dashboard that displays **real-time Ethereum gas prices**, **historical candlestick charts**, and a **simulation mode** with USD pricing estimates. Built with **React**, **Zustand**, **Ethers.js**, and **Tailwind CSS**, the app features a purplish glowing UI with mode-based rendering and state management.

🌐 **Live Demo**: [https://defi-gas-tracker.netlify.app/](https://defi-gas-tracker.netlify.app/)

---

## 🚀 Features

- 🎯 **Live Mode**
  - Real-time Ethereum gas price tracking using `ethers.WebSocketProvider`
  - Interactive candlestick chart for fee history

- 🧪 **Simulation Mode**
  - Custom gas/priority fee entry
  - Instant USD cost estimation
  - Comparison table for different scenarios

- 🌌 **Modern UI**
  - Purple-glow animated theme
  - Fully responsive design
  - Zustand-based global state switch between live/simulation

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Zustand
- **Web3**: Ethers.js
- **Charting**: Lightweight custom candlestick logic (extendable)
- **Styling**: Tailwind CSS with glowing border animation

---

## 📦 Installation

```bash
git clone https://github.com/rahulchhajed01/defi-gas-tracker.git
cd defi-gas-tracker
npm install
npm run dev
```
## env file

```bash
VITE_ALCHEMY_ETHEREUM=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
VITE_ALCHEMY_POLYGON=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
VITE_ALCHEMY_ARBITRUM=https://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```