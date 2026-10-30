# Crypto Profit After Tax Calculator & Crypto-to-Money Converter

A sleek, responsive, and legally accurate crypto utility application featuring:
1. **Crypto-to-Money Converter**: Real-time two-way conversion between Bitcoin / altcoins and fiat money (Rupees, Dollars, Pounds, Euros, Dirhams, etc.) or cash-to-crypto purchasing calculation.
2. **Crypto Profit After Tax Calculator**: Country and tax-year selector to compute **Profit Before Tax (PBT)**, **Estimated Tax Liability**, **TDS Advance Tax Credit (Section 194S)**, and final **Take-Home Profit After Tax (PAT)**.

---

## 💱 Crypto-to-Money Converter Features
- **Bi-Directional Conversion**:
  - **Crypto &rarr; Cash**: Enter any amount of crypto (e.g. 0.5 BTC, 2.5 ETH, 10 SOL) to see how much fiat money it converts into in real-time.
  - **Cash &rarr; Crypto**: Enter a fiat investment amount (e.g. ₹50,000, $1,000, £500) to see how much crypto it buys.
- **Top Cryptocurrencies Supported**:
  - Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Tether (USDT), Binance Coin (BNB), Ripple (XRP), Cardano (ADA), Dogecoin (DOGE).
- **Supported Fiat Currencies**:
  - Indian Rupee (INR ₹), US Dollar (USD $), British Pound (GBP £), Euro (EUR €), UAE Dirham (AED), Australian Dollar (AUD A$), Canadian Dollar (CAD C$), Singapore Dollar (SGD S$).
- **Live Market Rates**:
  - Automatic live rate synchronization from CoinGecko API with fallback to built-in benchmark market rates.
  - **Customizable Unit Rate**: Users can manually tweak the unit price to test hypothetical or future prices.
- **Quick Preset Chips**:
  - Instant crypto chips (`0.01`, `0.1`, `0.5`, `1.0`, `5.0` coins) and localized cash chips (`₹5,000`, `₹25,000`, `₹1,00,000` / `$100`, `$1,000`, `$5,000`).
- **One-Click Bridge to P&L Calculator**:
  - Click **"Apply to P&L Calculator"** to instantly transfer the converted coin quantity and market price directly into the trade parameters above.

---

## 🌍 Global Tax-Residence Country Selector & Regional Tabs
- **Asia & Middle East**:
  - 🇮🇳 **India (INR ₹)**: Flat 30% VDA Tax (Section 115BBH) + 1% TDS advance credit (Section 194S) + 0.20% exchange fee.
  - 🇦🇪 **United Arab Emirates (AED)**: **0% Tax (Tax-Free)** personal crypto haven. 100% take-home returns.
  - 🇸🇬 **Singapore (SGD S$)**: **0% Capital Gains Tax** for individual crypto investors under IRAS guidelines.
- **Americas**:
  - 🇺🇸 **United States (USD $)**: IRS Long-Term Capital Gains Tax (15%) or Short-Term ordinary income bracket.
  - 🇨🇦 **Canada (CAD C$)**: CRA 50% Capital Gains inclusion rate (~20% effective tax).
- **Europe & United Kingdom**:
  - 🇬🇧 **United Kingdom (GBP £)**: HMRC 20% higher-rate (or 10% basic) Capital Gains Tax above annual allowance.
  - 🇩🇪 **Germany (EUR €)**: German § 23 EStG rule — **0% completely tax-free if held > 1 year**; standard rate if sold within 1 year.
  - 🇪🇺 **European Union (EUR €)**: 30% standard flat capital gains tax rate.
- **Oceania**:
  - 🇦🇺 **Australia (AUD A$)**: ATO 50% Capital Gains Tax discount for assets held > 12 months (~18.5% effective).

---

## 🇮🇳 Indian Tax & TDS Advance Credit Separation
- **TDS (1%)** is withheld at source by exchanges as an advance tax credit.
- **Set-off**: Credited against your 30% tax bill at annual ITR filing so users do not mistake it for an extra tax.
- **Refund**: On net loss trades, the 1% TDS is fully refundable in your ITR.

---

## Setup & Running
1. **Local Server (Active)**:
   ```bash
   node server.js
   ```
   Open **http://localhost:3000** in your browser.
2. **Direct Browser**: Open `index.html` directly in any web browser.
