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
  const netProfitDisplay = document.getElementById('netProfitDisplay');
  const roiDisplay = document.getElementById('roiDisplay');
  const heroSubtext = document.getElementById('heroSubtext');
  const totalInvestmentDisplay = document.getElementById('totalInvestmentDisplay');
  const totalExitDisplay = document.getElementById('totalExitDisplay');
  const totalFeeDisplay = document.getElementById('totalFeeDisplay');
  const tdsDisplay = document.getElementById('tdsDisplay');
  const tdsBreakdownLabel = document.getElementById('tdsBreakdownLabel');
  const profitTaxDisplay = document.getElementById('profitTaxDisplay');
  const profitTaxBreakdownLabel = document.getElementById('profitTaxBreakdownLabel');
  const preTaxProfitDisplay = document.getElementById('preTaxProfitDisplay');
  const totalDeductionsDisplay = document.getElementById('totalDeductionsDisplay');
  const historyTableBody = document.getElementById('historyTableBody');

  // Genuine regional fees and tax provisions
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
      profitTaxHint: 'Section 115BBH: 30% flat income tax on net cryptocurrency profits.'
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
      profitTaxHint: 'Estimated Federal Capital Gains Tax (short/long-term rate).'
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
      profitTaxHint: 'Standard European flat capital gains tax on realized crypto gains.'
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
      profitTaxHint: 'HMRC 20% higher-rate capital gains tax on crypto gains above allowance.'
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
    let startTimestamp = null;
    const isNegative = end < 0;
    const absEnd = Math.abs(end);
    const absStart = Math.abs(start);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
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

    // Update symbols in inputs
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

    // Update breakdown labels
    if (tdsBreakdownLabel) {
      tdsBreakdownLabel.textContent = countryKey === 'INR' ? '1% TDS Tax (Sec 194S)' : 'Trade Withholding';
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

  // Currency / Country change listener
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

    // 3. Genuine Trade TDS / Withholding (Deducted at source on sell value)
    const sellTdsAmount = (grossExit * sellTdsPct) / 100;

    // 4. Pre-Tax Profit (Gross profit after exchange fees)
    const preTaxProfit = (grossExit - sellFeeAmount) - totalInvested;

    // 5. Capital Gains / Profit Tax (Applies to net positive gains)
    let profitTaxAmount = 0;
    if (preTaxProfit > 0 && profitTaxPct > 0) {
      profitTaxAmount = (preTaxProfit * profitTaxPct) / 100;
    }

    // 6. Net In-Hand Profit / Loss
    // In tax law, TDS is an advance credit adjusted against final capital gains tax.
    // In-hand cash right at sale = grossExit - sellFeeAmount - sellTdsAmount - initialCapital - buyFeeAmount
    // Final post-tax profit accounts for remaining capital gains tax if higher than TDS.
    let netInHandPnL;
    if (preTaxProfit > 0) {
      const totalTaxLiability = Math.max(profitTaxAmount, sellTdsAmount);
      netInHandPnL = preTaxProfit - totalTaxLiability;
    } else {
      // On loss, TDS is deducted at sale in India (can be claimed as refund in ITR), but no profit tax
      netInHandPnL = preTaxProfit - sellTdsAmount;
    }

    const totalDeductions = totalFees + sellTdsAmount + (profitTaxAmount > sellTdsAmount ? profitTaxAmount - sellTdsAmount : 0);
    const roi = (netInHandPnL / totalInvested) * 100;

    // Render metrics
    totalInvestmentDisplay.textContent = formatMoney(totalInvested);
    totalExitDisplay.textContent = formatMoney(grossExit);
    totalFeeDisplay.textContent = formatMoney(totalFees);
    tdsDisplay.textContent = formatMoney(sellTdsAmount);
    profitTaxDisplay.textContent = formatMoney(profitTaxAmount);

    const preTaxSign = preTaxProfit >= 0 ? '+' : '-';
    preTaxProfitDisplay.textContent = `${preTaxSign}${formatMoney(preTaxProfit)}`;
    totalDeductionsDisplay.textContent = formatMoney(totalDeductions);

    // Hero displays
    animateValue(netProfitDisplay, 0, netInHandPnL, 450, currentSymbol, '');
    animateValue(roiDisplay, 0, roi, 450, '', '% ROI');

    if (includeProfitTax.checked) {
      heroSubtext.textContent = `Net in hand after exchange fees, ${currentCode === 'INR' ? '1% TDS' : 'withholding'}, and capital gains tax`;
    } else {
      heroSubtext.textContent = `Pre-tax in hand after exchange trading fees & trade withholding`;
    }

    triggerPopAnimation(netProfitDisplay);
    triggerPopAnimation(statusBadge);

    // Status styling
    if (netInHandPnL > 0) {
      statusBadge.textContent = 'Net Profit';
      statusBadge.className = 'status-badge profit';
      netProfitDisplay.className = 'metric-value profit';
      roiDisplay.className = 'roi-badge profit';
    } else if (netInHandPnL < 0) {
      statusBadge.textContent = 'Net Loss';
      statusBadge.className = 'status-badge loss';
      netProfitDisplay.className = 'metric-value loss';
      roiDisplay.className = 'roi-badge loss';
    } else {
      statusBadge.textContent = 'Break Even';
      statusBadge.className = 'status-badge neutral';
      netProfitDisplay.className = 'metric-value neutral';
      roiDisplay.className = 'roi-badge neutral';
    }

    if (recordHistory) {
      const sign = netInHandPnL >= 0 ? '+' : '-';
      const formattedPnL = `${sign}${formatMoney(netInHandPnL)}`;
      const formattedROI = `${sign}${Math.abs(roi).toFixed(2)}% ROI`;
      const preset = countryTaxAndFeePresets[currentCode] || countryTaxAndFeePresets.INR;

      addHistoryRecord({
        country: preset.country,
        qty,
        buyPrice: formatMoney(buyPrice),
        sellPrice: formatMoney(sellPrice),
        totalInvested: formatMoney(totalInvested),
        totalDeductions: formatMoney(totalDeductions),
        netPnL: formattedPnL,
        roi: formattedROI,
        isProfit: netInHandPnL >= 0
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
          <td colspan="8" class="empty-state">No calculations saved yet. Enter trade numbers above and click Calculate.</td>
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
          <td>${item.totalInvested}</td>
          <td class="fee-highlight">${item.totalDeductions}</td>
          <td class="${item.isProfit ? 'text-profit' : 'text-loss'}">${item.netPnL}</td>
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

    totalInvestmentDisplay.textContent = `${currentSymbol}0.00`;
    totalExitDisplay.textContent = `${currentSymbol}0.00`;
    totalFeeDisplay.textContent = `${currentSymbol}0.00`;
    tdsDisplay.textContent = `${currentSymbol}0.00`;
    profitTaxDisplay.textContent = `${currentSymbol}0.00`;
    preTaxProfitDisplay.textContent = `${currentSymbol}0.00`;
    totalDeductionsDisplay.textContent = `${currentSymbol}0.00`;
    netProfitDisplay.textContent = `${currentSymbol}0.00`;
    roiDisplay.textContent = '0.00% ROI';

    statusBadge.textContent = 'Awaiting Input';
    statusBadge.className = 'status-badge neutral';
    netProfitDisplay.className = 'metric-value neutral';
    roiDisplay.className = 'roi-badge neutral';
  });

  clearHistoryBtn.addEventListener('click', () => {
    historyLogs = [];
    renderHistory(false);
  });

  // Initialize with selected country defaults
  applyCountryTaxDefaults(currencySelect.value, false);
});
