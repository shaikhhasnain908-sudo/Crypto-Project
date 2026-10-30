# Crypto Profit After Indian Tax Calculator

A sleek, responsive, and legally accurate cryptocurrency profit and tax calculator designed to compute **Profit Before Tax**, **Estimated Indian Tax (Section 115BBH)**, **TDS Advance Tax Credit (Section 194S)**, and final **Profit After Tax**.

---

## 🇮🇳 Indian Crypto Tax & TDS Breakdown

Many Indian crypto traders mistake **1% TDS** for an additional surcharge on top of the **30% Flat Tax**. This calculator resolves that confusion by separating TDS as an advance tax credit:

1. **Profit Before Tax (PBT)**:
   - Your gross crypto trading gain after deducting exchange buy/sell fees (`Gross Exit - Fees - Invested Capital`).
2. **Estimated Indian Tax (30% under Section 115BBH)**:
   - Flat 30% tax applied to your net positive crypto gains. (0% tax liability on losses; crypto losses cannot be set off against other income in India).
3. **TDS Already Deducted (1% under Section 194S)**:
   - Deducted upfront at source by Indian crypto exchanges (CoinDCX, WazirX, CoinSwitch) on every sell order and deposited with the Govt under your PAN.
   - **NOT an extra tax**: When filing your annual ITR, this 1% TDS is **credited / set off against your 30% tax liability**.
4. **Net Tax Remaining to Pay at ITR**:
   - `Estimated Tax (30%) - TDS Already Deducted (1%)`.
   - In case of a loss, the entire 1% TDS deducted can be claimed as an **ITR refund**.
5. **Profit After Tax (PAT)**:
   - Your true bottom-line in-hand profit after all legal tax obligations are settled.
6. **Immediate Cash at Sale**:
   - The actual money deposited into your exchange wallet at the moment of exit (`Gross Exit - Sell Fee - 1% TDS`).

---

## 🌍 Multi-Country Support
- 🇮🇳 **India (INR)**: 0.20% exchange fee + 1.0% TDS (Sec 194S) + 30% Flat VDA Profit Tax (Sec 115BBH).
- 🇺🇸 **USA (USD)**: 0.10% exchange fee + 0% withholding + 15% Federal Capital Gains Tax.
- 🇪🇺 **Europe (EUR)**: 0.15% exchange fee + 0% withholding + 30% Flat Capital Gains Tax.
- 🇬🇧 **United Kingdom (GBP)**: 0.20% exchange fee + 0% withholding + 20% HMRC Capital Gains Tax.

---

## Setup & Running
1. **Local Server (Active)**:
   ```bash
   node server.js
   ```
   Open **http://localhost:3000** in your browser.
2. **Direct Browser**: Open `index.html` directly in any web browser.
