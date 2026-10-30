# Crypto Profit After Tax Calculator

A sleek, responsive, and legally accurate cryptocurrency profit and tax calculator designed to let users select their **tax-residence country** and **tax year** to compute **Profit Before Tax (PBT)**, **Estimated Tax Liability**, and final **Take-Home Profit After Tax (PAT)**.

---

## 🌍 Global Tax-Residence Country Selector & Regional Tabs

Quick-filter tabs allow effortless switching across international jurisdictions:
- **All Regions (Global)**
- **Asia & Middle East**:
  - 🇮🇳 **India (INR ₹)**: Flat 30% VDA Tax (Section 115BBH) + 1% TDS advance credit (Section 194S) + 0.20% exchange fee.
  - 🇦🇪 **United Arab Emirates (AED د.إ)**: **0% Tax (Tax-Free)** personal crypto haven. 100% take-home returns.
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

## 📅 Tax Year & Holding Period Selector
- **Tax Year / Assessment Year**: Toggle between **FY 2026-27 (Current)**, **FY 2025-26**, **FY 2024-25**, and **FY 2023-24**.
- **Holding Period Classification**: Toggle between **Long-Term (> 1 Year)** and **Short-Term (≤ 1 Year)** to dynamically unlock tax exemptions (e.g. Germany 1-year tax-free rule, Australia 50% CGT discount, US long-term rate).

---

## 🇮🇳 Indian Tax & TDS Advance Credit Separation
TDS is clearly separated so users do not mistake it for an extra tax:
- **TDS (1%)** is withheld at source by exchanges as an advance tax credit.
- **Set-off**: Credited against your 30% tax bill at annual ITR filing.
- **Refund**: On net loss trades, the 1% TDS is fully refundable in your ITR.

---

## Setup & Running
1. **Local Server (Active)**:
   ```bash
   node server.js
   ```
   Open **http://localhost:3000** in your browser.
2. **Direct Browser**: Open `index.html` directly in any web browser.
