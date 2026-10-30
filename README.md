# Crypto Profit & Loss Calculator

A sleek, responsive, and legally accurate web application designed to compute cryptocurrency profits, losses, ROI percentages, exchange fees, country-specific TDS, and capital gains taxes.

## Features
- **Accurate Real-World Calculations**: Computes total invested capital, gross exit value, exchange fees, regional trade withholding (TDS), capital gains taxes, and in-hand net return.
- **Genuine Regional Tax & Fee Defaults**:
  - 🇮🇳 **India (INR)**: 0.20% spot trading fee (CoinDCX/WazirX) + **1.0% TDS (Section 194S)** + **30% Flat VDA Profit Tax (Section 115BBH)**.
  - 🇺🇸 **USA (USD)**: 0.10% spot fee (Binance.US/Coinbase) + 0% withholding + **15% Estimated Federal Capital Gains Tax**.
  - 🇪🇺 **Europe (EUR)**: 0.15% spot fee (Bitvavo/Kraken EU) + 0% withholding + **30% Flat Capital Gains Tax**.
  - 🇬🇧 **United Kingdom (GBP)**: 0.20% spot fee (Coinbase UK/CoinJar) + 0% withholding + **20% HMRC Capital Gains Tax**.
- **Interactive Tax Toggle**: Toggle the Capital Gains Tax on/off with one click to compare pre-tax vs. in-hand post-tax net profit.
- **Micro-Interactions**: Smooth number counter animations, field flash indicators on country change, and animated history audit rows.
- **Session History Audit**: Keeps track of recent trades and regional breakdowns.

## Setup & Running
1. **Local Server (Active now)**:
   ```bash
   node server.js
   ```
   Open **http://localhost:3000** in your browser.
2. **Direct Browser**: Open `index.html` directly in any web browser.
