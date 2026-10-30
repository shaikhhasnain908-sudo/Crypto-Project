document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pnlForm');
  const resetBtn = document.getElementById('resetBtn');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  const currencySelect = document.getElementById('currencySelect');
  const currencySymbols = document.querySelectorAll('.currency-symbol');

  // Input elements
  const coinQtyInput = document.getElementById('coinQuantity');
  const buyPriceInput = document.getElementById('buyPrice');
  const sellPriceInput = document.getElementById('sellPrice');
  const buyFeeInput = document.getElementById('buyFee');
  const sellFeeInput = document.getElementById('sellFee');
  const buyFeeHint = document.getElementById('buyFeeHint');
  const sellFeeHint = document.getElementById('sellFeeHint');
  const sellTdsInput = document.getElementById('sellTds');
  const sellTdsLabel = document.getElementById('sellTdsLabel');
  const sellTdsHint = document.getElementById('sellTdsHint');
  const profitTaxInput = document.getElementById('profitTax');
  const profitTaxLabel = document.getElementById('profitTaxLabel');
  const profitTaxHint = document.getElementById('profitTaxHint');
  const includeProfitTax = document.getElementById('includeProfitTax');

  // Result display elements
  const statusBadge = document.getElementById('statusBadge');
  const pbtHighlightDisplay = document.getElementById('pbtHighlightDisplay');
  const taxHighlightDisplay = document.getElementById('taxHighlightDisplay');
  const taxBoxLabel = document.getElementById('taxBoxLabel');
  const taxBoxSub = document.getElementById('taxBoxSub');
  const patHighlightDisplay = document.getElementById('patHighlightDisplay');
  const roiSubDisplay = document.getElementById('roiSubDisplay');

  // TDS settlement card elements
  const tdsPillBadge = document.getElementById('tdsPillBadge');
  const settlementTaxLabel = document.getElementById('settlementTaxLabel');
  const settlementTaxDisplay = document.getElementById('settlementTaxDisplay');
  const settlementTdsDisplay = document.getElementById('settlementTdsDisplay');
  const settlementRemainingLabel = document.getElementById('settlementRemainingLabel');
  const settlementRemainingDisplay = document.getElementById('settlementRemainingDisplay');
  const immediateCashDisplay = document.getElementById('immediateCashDisplay');
  const tdsAlertText = document.getElementById('tdsAlertText');

  // Detailed breakdown elements
  const totalInvestmentDisplay = document.getElementById('totalInvestmentDisplay');
  const totalExitDisplay = document.getElementById('totalExitDisplay');
  const totalFeeDisplay = document.getElementById('totalFeeDisplay');
  const preTaxProfitDisplay = document.getElementById('preTaxProfitDisplay');
  const profitTaxDisplay = document.getElementById('profitTaxDisplay');
  const profitTaxBreakdownLabel = document.getElementById('profitTaxBreakdownLabel');
  const tdsDisplay = document.getElementById('tdsDisplay');
  const tdsBreakdownLabel = document.getElementById('tdsBreakdownLabel');
  const finalNetProfitDisplay = document.getElementById('finalNetProfitDisplay');
  const historyTableBody = document.getElementById('historyTableBody');

  // Genuine regional fees and tax presets
  const countryTaxAndFeePresets = {
    INR: {
      country: '🇮🇳 India',
      symbol: '₹',
      locale: 'en-IN',
      buyFee: 0.20,
      sellFee: 0.20,
      sellTds: 1.0,
      profitTax: 30.0,
      buyFeeHint: 'CoinDCX / WazirX spot fee: 0.20%',
      sellFeeHint: 'CoinDCX / WazirX spot fee: 0.20%',
      sellTdsLabel: 'Sell TDS (Sec 194S) (%)',
      sellTdsHint: 'Section 194S: 1.0% TDS deducted at source by Indian exchanges on every sell order.',
      profitTaxLabel: 'Flat VDA Profit Tax (%)',
      profitTaxHint: 'Section 115BBH: 30% flat income tax on net cryptocurrency profits.',
      taxBoxLabel: 'Estimated Indian Tax (30%)',
      taxBoxSub: 'Sec 115BBH flat 30% tax liability',
      tdsPill: '1% TDS (Sec 194S)',
      tdsAlert: 'The 1% TDS (Sec 194S) is already deducted at source by Indian crypto exchanges on your sell order and remitted to the Income Tax Dept against your PAN. It acts as an advance tax credit that reduces your final 30% tax liability during annual ITR filing. You do NOT pay 30% + 1%.'
    },
    USD: {
      country: '🇺🇸 USA',
      symbol: '$',
      locale: 'en-US',
      buyFee: 0.10,
      sellFee: 0.10,
      sellTds: 0.0,
      profitTax: 15.0,
      buyFeeHint: 'Binance.US / Coinbase spot fee: 0.10%',
      sellFeeHint: 'Binance.US / Coinbase spot fee: 0.10%',
      sellTdsLabel: 'Trade Withholding (%)',
      sellTdsHint: 'US exchanges do not withhold tax at trade execution.',
      profitTaxLabel: 'Est. Capital Gains Tax (%)',
      profitTaxHint: 'Estimated Federal Capital Gains Tax (short/long-term rate).',
      taxBoxLabel: 'Estimated CGT (15%)',
      taxBoxSub: 'Federal capital gains tax liability',
      tdsPill: 'Trade Withholding (0%)',
      tdsAlert: 'US exchanges do not deduct taxes at the time of trade. You report and settle your capital gains tax directly with the IRS during annual tax filing.'
    },
    EUR: {
      country: '🇪🇺 Europe',
      symbol: '€',
      locale: 'de-DE',
      buyFee: 0.15,
      sellFee: 0.15,
      sellTds: 0.0,
      profitTax: 30.0,
      buyFeeHint: 'Bitvavo / Kraken EU spot fee: 0.15%',
      sellFeeHint: 'Bitvavo / Kraken EU spot fee: 0.15%',
      sellTdsLabel: 'Trade Withholding (%)',
      sellTdsHint: 'European exchanges do not withhold tax at trade execution.',
      profitTaxLabel: 'Est. Flat / CGT Tax (%)',
      profitTaxHint: 'Standard European flat capital gains tax on realized crypto gains.',
      taxBoxLabel: 'Estimated Flat Tax (30%)',
      taxBoxSub: 'Standard European capital gains rate',
      tdsPill: 'Trade Withholding (0%)',
      tdsAlert: 'European exchanges do not withhold taxes at the transaction level. You declare and settle crypto profits directly with your local tax authority.'
    },
    GBP: {
      country: '🇬🇧 UK',
      symbol: '£',
      locale: 'en-GB',
      buyFee: 0.20,
      sellFee: 0.20,
      sellTds: 0.0,
      profitTax: 20.0,
      buyFeeHint: 'Coinbase UK / CoinJar spot fee: 0.20%',
      sellFeeHint: 'Coinbase UK / CoinJar spot fee: 0.20%',
      sellTdsLabel: 'HMRC Withholding (%)',
      sellTdsHint: 'UK brokers do not withhold tax at trade execution.',
      profitTaxLabel: 'HMRC Capital Gains Tax (%)',
      profitTaxHint: 'HMRC 20% higher-rate capital gains tax on crypto gains above allowance.',
      taxBoxLabel: 'HMRC CGT (20%)',
      taxBoxSub: 'HMRC higher-rate capital gains tax',
      tdsPill: 'HMRC Withholding (0%)',
      tdsAlert: 'UK brokers do not withhold taxes at trade execution. Capital gains tax is declared and settled with HMRC during annual self-assessment.'
    }
  };

  let currentCode = 'INR';
  let currentSymbol = '₹';
  let currentLocale = 'en-IN';
  let historyLogs = [];

  function formatMoney(amount, currencySym = currentSymbol, locale = currentLocale) {
    const formattedNum = Math.abs(amount).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${currencySym}${formattedNum}`;
  }

  // Smooth number counter animation
  function animateValue(element, start, end, duration, prefix = '', suffix = '') {
    if (!element) return;
    let startTimestamp = null;
    const isNegative = end < 0;
    const absEnd = Math.abs(end);
    const absStart = Math.abs(start);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = absStart + (absEnd - absStart) * easeProgress;
      const sign = end === 0 ? '' : isNegative ? '-' : '+';

      element.textContent = `${sign}${prefix}${current.toLocaleString(currentLocale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  function triggerPopAnimation(element) {
    if (!element) return;
    element.classList.remove('pop-animation');
    void element.offsetWidth;
    element.classList.add('pop-animation');
  }

  function flashFieldUpdate(element) {
    if (!element) return;
    element.classList.remove('fee-auto-updated');
    void element.offsetWidth;
    element.classList.add('fee-auto-updated');
    setTimeout(() => {
      element.classList.remove('fee-auto-updated');
    }, 700);
  }

  // Apply genuine country presets for fee and tax rules
  function applyCountryTaxDefaults(countryKey, recalculate = true) {
    const preset = countryTaxAndFeePresets[countryKey] || countryTaxAndFeePresets.INR;
    currentCode = countryKey;
    currentSymbol = preset.symbol;
    currentLocale = preset.locale;

    // Update currency symbols in inputs
    currencySymbols.forEach((el) => {
      el.textContent = currentSymbol;
    });

    // Auto-set fee values and hints
    buyFeeInput.value = preset.buyFee;
    sellFeeInput.value = preset.sellFee;
    if (buyFeeHint) buyFeeHint.textContent = preset.buyFeeHint;
    if (sellFeeHint) sellFeeHint.textContent = preset.sellFeeHint;

    // Auto-set genuine tax values and legal text
    sellTdsInput.value = preset.sellTds;
    if (sellTdsLabel) sellTdsLabel.textContent = preset.sellTdsLabel;
    if (sellTdsHint) sellTdsHint.textContent = preset.sellTdsHint;

    profitTaxInput.value = preset.profitTax;
    if (profitTaxLabel) profitTaxLabel.textContent = preset.profitTaxLabel;
    if (profitTaxHint) profitTaxHint.textContent = preset.profitTaxHint;

    // Update tax box titles & alerts
    if (taxBoxLabel) taxBoxLabel.textContent = preset.taxBoxLabel;
    if (taxBoxSub) taxBoxSub.textContent = preset.taxBoxSub;
    if (tdsPillBadge) tdsPillBadge.textContent = preset.tdsPill;
    if (tdsAlertText) tdsAlertText.textContent = preset.tdsAlert;
    if (settlementTaxLabel) settlementTaxLabel.textContent = `Estimated Tax (${preset.profitTax}%)`;

    if (tdsBreakdownLabel) {
      tdsBreakdownLabel.textContent = countryKey === 'INR' ? '1% TDS Advance Credit (Sec 194S)' : 'Trade Withholding';
    }
    if (profitTaxBreakdownLabel) {
      profitTaxBreakdownLabel.textContent = countryKey === 'INR' ? '30% VDA Tax (Sec 115BBH)' : `${preset.profitTax}% Capital Gains Tax`;
    }

    flashFieldUpdate(buyFeeInput);
    flashFieldUpdate(sellFeeInput);
    flashFieldUpdate(sellTdsInput);
    flashFieldUpdate(profitTaxInput);

    if (recalculate) {
      calculatePnL(false);
    }
  }

  // Country select listener
  currencySelect.addEventListener('change', (e) => {
    applyCountryTaxDefaults(e.target.value, true);
  });

  // Toggle profit tax checkbox listener
  includeProfitTax.addEventListener('change', () => {
    profitTaxInput.disabled = !includeProfitTax.checked;
    profitTaxInput.style.opacity = includeProfitTax.checked ? '1' : '0.5';
    calculatePnL(false);
  });

  // Main calculation logic
  function calculatePnL(recordHistory = true) {
    const qty = parseFloat(coinQtyInput.value);
    const buyPrice = parseFloat(buyPriceInput.value);
    const sellPrice = parseFloat(sellPriceInput.value);
    const buyFeePct = parseFloat(buyFeeInput.value) || 0;
    const sellFeePct = parseFloat(sellFeeInput.value) || 0;
    const sellTdsPct = parseFloat(sellTdsInput.value) || 0;
    const profitTaxPct = includeProfitTax.checked ? (parseFloat(profitTaxInput.value) || 0) : 0;

    if (isNaN(qty) || isNaN(buyPrice) || isNaN(sellPrice) || qty <= 0 || buyPrice <= 0 || sellPrice <= 0) {
      return;
    }

    // 1. Initial Investment & Buying Fee
    const initialCapital = qty * buyPrice;
    const buyFeeAmount = (initialCapital * buyFeePct) / 100;
    const totalInvested = initialCapital + buyFeeAmount;

    // 2. Gross Exit & Selling Fee
    const grossExit = qty * sellPrice;
    const sellFeeAmount = (grossExit * sellFeePct) / 100;
    const totalFees = buyFeeAmount + sellFeeAmount;

    // 3. Profit Before Tax (PBT) = Net Exit consideration minus total invested
    const netExitConsideration = grossExit - sellFeeAmount;
    const preTaxProfit = netExitConsideration - totalInvested;

    // 4. Estimated Tax Liability (Section 115BBH for India)
    // Applies strictly to positive profits; losses have 0 tax liability
    let estimatedTaxAmount = 0;
    if (preTaxProfit > 0 && profitTaxPct > 0) {
      estimatedTaxAmount = (preTaxProfit * profitTaxPct) / 100;
    }

    // 5. Genuine TDS Deducted at Source by Exchange (Section 194S)
    const sellTdsAmount = (grossExit * sellTdsPct) / 100;

    // 6. TDS & Tax Settlement Reconciliation (TDS is NOT an extra tax)
    let remainingTaxToPay = 0;
    let excessTdsRefund = 0;
    let profitAfterTax = 0;

    if (preTaxProfit > 0) {
      if (estimatedTaxAmount >= sellTdsAmount) {
        remainingTaxToPay = estimatedTaxAmount - sellTdsAmount;
        settlementRemainingLabel.textContent = 'Net Tax Remaining to Pay at ITR';
        settlementRemainingDisplay.textContent = formatMoney(remainingTaxToPay);
        settlementRemainingDisplay.className = 'item-value tax-highlight';
      } else {
        excessTdsRefund = sellTdsAmount - estimatedTaxAmount;
        settlementRemainingLabel.textContent = 'Refundable Excess TDS in ITR';
        settlementRemainingDisplay.textContent = `+ ${formatMoney(excessTdsRefund)}`;
        settlementRemainingDisplay.className = 'item-value text-cash';
      }
      profitAfterTax = preTaxProfit - estimatedTaxAmount;
    } else {
      // In case of a loss, income tax is 0.
      // The 1% TDS deducted by the exchange can be claimed back as refund in the annual ITR
      remainingTaxToPay = 0;
      excessTdsRefund = sellTdsAmount;
      settlementRemainingLabel.textContent = 'Refundable TDS in ITR (On Loss)';
      settlementRemainingDisplay.textContent = `+ ${formatMoney(excessTdsRefund)}`;
      settlementRemainingDisplay.className = 'item-value text-cash';
      profitAfterTax = preTaxProfit;
    }

    // 7. Immediate Cash In-Hand at Exit (Wallet balance right at sale)
    const immediateCashAtSale = (netExitConsideration - sellTdsAmount) - totalInvested;

    // 8. Net Return on Investment (ROI)
    const roi = (profitAfterTax / totalInvested) * 100;

    // Render detailed breakdown
    totalInvestmentDisplay.textContent = formatMoney(totalInvested);
    totalExitDisplay.textContent = formatMoney(grossExit);
    totalFeeDisplay.textContent = formatMoney(totalFees);

    const pbtSign = preTaxProfit >= 0 ? '+' : '-';
    preTaxProfitDisplay.textContent = `${pbtSign}${formatMoney(preTaxProfit)}`;
    profitTaxDisplay.textContent = formatMoney(estimatedTaxAmount);
    tdsDisplay.textContent = formatMoney(sellTdsAmount);

    const patSign = profitAfterTax >= 0 ? '+' : '-';
    finalNetProfitDisplay.textContent = `${patSign}${formatMoney(profitAfterTax)}`;

    // Render 3 Key Summary Cards
    animateValue(pbtHighlightDisplay, 0, preTaxProfit, 450, currentSymbol, '');
    animateValue(taxHighlightDisplay, 0, estimatedTaxAmount, 450, currentSymbol, '');
    animateValue(patHighlightDisplay, 0, profitAfterTax, 450, currentSymbol, '');

    roiSubDisplay.textContent = `${patSign}${Math.abs(roi).toFixed(2)}% Net ROI`;

    // Render TDS Settlement Card
    settlementTaxDisplay.textContent = formatMoney(estimatedTaxAmount);
    settlementTdsDisplay.textContent = `- ${formatMoney(sellTdsAmount)}`;

    const cashSign = immediateCashAtSale >= 0 ? '+' : '-';
    immediateCashDisplay.textContent = `${cashSign}${formatMoney(immediateCashAtSale)}`;

    // Styling states for high-level cards
    pbtHighlightDisplay.className = `tax-box-value ${preTaxProfit > 0 ? 'profit' : preTaxProfit < 0 ? 'loss' : 'neutral'}`;
    patHighlightDisplay.className = `tax-box-value ${profitAfterTax > 0 ? 'profit' : profitAfterTax < 0 ? 'loss' : 'neutral'}`;

    triggerPopAnimation(patHighlightDisplay);
    triggerPopAnimation(statusBadge);

    // Status Badge styling
    if (profitAfterTax > 0) {
      statusBadge.textContent = 'Net Profit After Tax';
      statusBadge.className = 'status-badge profit';
    } else if (profitAfterTax < 0) {
      statusBadge.textContent = 'Net Loss';
      statusBadge.className = 'status-badge loss';
    } else {
      statusBadge.textContent = 'Break Even';
      statusBadge.className = 'status-badge neutral';
    }

    // Save to calculation audit history
    if (recordHistory) {
      const formattedROI = `${patSign}${Math.abs(roi).toFixed(2)}% ROI`;
      const preset = countryTaxAndFeePresets[currentCode] || countryTaxAndFeePresets.INR;

      addHistoryRecord({
        country: preset.country,
        qty,
        buyPrice: formatMoney(buyPrice),
        sellPrice: formatMoney(sellPrice),
        pbt: `${pbtSign}${formatMoney(preTaxProfit)}`,
        tax: formatMoney(estimatedTaxAmount),
        tds: formatMoney(sellTdsAmount),
        pat: `${patSign}${formatMoney(profitAfterTax)}`,
        roi: formattedROI,
        isProfit: profitAfterTax >= 0
      });
    }
  }

  function addHistoryRecord(record) {
    historyLogs.unshift(record);
    if (historyLogs.length > 5) {
      historyLogs.pop();
    }
    renderHistory(true);
  }

  function renderHistory(animateFirst = false) {
    if (historyLogs.length === 0) {
      historyTableBody.innerHTML = `
        <tr>
          <td colspan="9" class="empty-state">No calculations saved yet. Enter trade numbers above and click Calculate.</td>
        </tr>
      `;
      return;
    }

    historyTableBody.innerHTML = historyLogs
      .map((item, index) => `
        <tr class="${animateFirst && index === 0 ? 'new-history-row' : ''}">
          <td><strong>${item.country}</strong></td>
          <td>${item.qty}</td>
          <td>${item.buyPrice}</td>
          <td>${item.sellPrice}</td>
          <td class="${item.pbt.startsWith('+') ? 'text-profit' : 'text-loss'}">${item.pbt}</td>
          <td class="tax-highlight">${item.tax}</td>
          <td class="text-deducted">${item.tds}</td>
          <td class="${item.isProfit ? 'text-profit' : 'text-loss'}"><strong>${item.pat}</strong></td>
          <td class="${item.isProfit ? 'text-profit' : 'text-loss'}">${item.roi}</td>
        </tr>
      `)
      .join('');
  }

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculatePnL(true);
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    form.reset();
    applyCountryTaxDefaults(currencySelect.value, false);

    pbtHighlightDisplay.textContent = `${currentSymbol}0.00`;
    pbtHighlightDisplay.className = 'tax-box-value neutral';
    taxHighlightDisplay.textContent = `${currentSymbol}0.00`;
    patHighlightDisplay.textContent = `${currentSymbol}0.00`;
    patHighlightDisplay.className = 'tax-box-value neutral';
    roiSubDisplay.textContent = '0.00% Net ROI';

    settlementTaxDisplay.textContent = `${currentSymbol}0.00`;
    settlementTdsDisplay.textContent = `- ${currentSymbol}0.00`;
    settlementRemainingLabel.textContent = 'Net Tax Remaining to Pay at ITR';
    settlementRemainingDisplay.textContent = `${currentSymbol}0.00`;
    settlementRemainingDisplay.className = 'item-value';
    immediateCashDisplay.textContent = `${currentSymbol}0.00`;

    totalInvestmentDisplay.textContent = `${currentSymbol}0.00`;
    totalExitDisplay.textContent = `${currentSymbol}0.00`;
    totalFeeDisplay.textContent = `${currentSymbol}0.00`;
    preTaxProfitDisplay.textContent = `${currentSymbol}0.00`;
    profitTaxDisplay.textContent = `${currentSymbol}0.00`;
    tdsDisplay.textContent = `${currentSymbol}0.00`;
    finalNetProfitDisplay.textContent = `${currentSymbol}0.00`;

    statusBadge.textContent = 'Awaiting Input';
    statusBadge.className = 'status-badge neutral';
  });

  clearHistoryBtn.addEventListener('click', () => {
    historyLogs = [];
    renderHistory(false);
  });

  // Initialize with selected country defaults
  applyCountryTaxDefaults(currencySelect.value, false);
});
