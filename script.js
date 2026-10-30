document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pnlForm');
  const resetBtn = document.getElementById('resetBtn');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  const currencySelect = document.getElementById('currencySelect');
  const taxYearSelect = document.getElementById('taxYearSelect');
  const taxYearHint = document.getElementById('taxYearHint');
  const holdingPeriodSelect = document.getElementById('holdingPeriodSelect');
  const holdingPeriodHint = document.getElementById('holdingPeriodHint');
  const regionTabs = document.querySelectorAll('.region-tab');
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
  const sellTdsBadge = document.getElementById('sellTdsBadge');
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
  const settlementTag = document.getElementById('settlementTag');
  const settlementTaxLabel = document.getElementById('settlementTaxLabel');
  const settlementTaxDisplay = document.getElementById('settlementTaxDisplay');
  const settlementTdsTitle = document.getElementById('settlementTdsTitle');
  const settlementAdvanceTag = document.getElementById('settlementAdvanceTag');
  const settlementTdsDisplay = document.getElementById('settlementTdsDisplay');
  const settlementRemainingLabel = document.getElementById('settlementRemainingLabel');
  const settlementRemainingDisplay = document.getElementById('settlementRemainingDisplay');
  const immediateCashDisplay = document.getElementById('immediateCashDisplay');
  const tdsAlertTitle = document.getElementById('tdsAlertTitle');
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

  // Multi-Country Tax Residence Presets
  const countryTaxAndFeePresets = {
    INR: {
      country: '🇮🇳 India',
      symbol: '₹',
      locale: 'en-IN',
      region: 'asia',
      buyFee: 0.20,
      sellFee: 0.20,
      sellTds: 1.0,
      profitTaxLong: 30.0,
      profitTaxShort: 30.0,
      buyFeeHint: 'CoinDCX / WazirX spot fee: 0.20%',
      sellFeeHint: 'CoinDCX / WazirX spot fee: 0.20%',
      sellTdsLabel: 'Sell TDS (Sec 194S) (%)',
      sellTdsHint: 'Section 194S: 1.0% TDS deducted at source by Indian exchanges on every sell order.',
      profitTaxLabel: 'Flat VDA Profit Tax (%)',
      profitTaxHint: 'Section 115BBH: 30% flat income tax on net cryptocurrency profits.',
      taxBoxLabel: 'Estimated Indian Tax (30%)',
      taxBoxSub: 'Sec 115BBH flat 30% tax liability',
      tdsPill: '1% TDS (Sec 194S)',
      settlementTag: 'Not an Extra Tax',
      tdsAlertTitle: 'Why TDS is not an extra tax:',
      tdsAlert: 'The 1% TDS (Sec 194S) is already deducted at source by Indian crypto exchanges on your sell order and deposited with the Income Tax Dept against your PAN. It acts as an advance tax credit that reduces your final 30% tax liability during annual ITR filing. You do NOT pay 30% + 1%.',
      holdingHint: 'In India, Section 115BBH applies a flat 30% rate regardless of holding duration (no long-term discount).'
    },
    AED: {
      country: '🇦🇪 UAE',
      symbol: 'AED',
      locale: 'en-AE',
      region: 'asia',
      buyFee: 0.10,
      sellFee: 0.10,
      sellTds: 0.0,
      profitTaxLong: 0.0,
      profitTaxShort: 0.0,
      buyFeeHint: 'BitOasis / Binance UAE spot fee: 0.10%',
      sellFeeHint: 'BitOasis / Binance UAE spot fee: 0.10%',
      sellTdsLabel: 'Trade Withholding (%)',
      sellTdsHint: 'Zero withholding tax in UAE free zones and mainland for individual traders.',
      profitTaxLabel: 'Personal Crypto Tax (%)',
      profitTaxHint: 'UAE levies 0% personal income and capital gains tax on crypto trading.',
      taxBoxLabel: 'Estimated UAE Tax (0%)',
      taxBoxSub: 'Tax-free crypto jurisdiction',
      tdsPill: 'Tax-Free Regime (0%)',
      settlementTag: '100% Take-Home',
      tdsAlertTitle: 'Tax-Exempt Crypto Haven:',
      tdsAlert: 'The United Arab Emirates (Dubai / Abu Dhabi) imposes 0% personal capital gains tax on cryptocurrency investments. Your take-home profit is 100% of your pre-tax trading gain.',
      holdingHint: 'Holding duration does not affect tax; individual crypto profits are completely tax-free in the UAE.'
    },
    SGD: {
      country: '🇸🇬 Singapore',
      symbol: 'S$',
      locale: 'en-SG',
      region: 'asia',
      buyFee: 0.10,
      sellFee: 0.10,
      sellTds: 0.0,
      profitTaxLong: 0.0,
      profitTaxShort: 0.0,
      buyFeeHint: 'Coinhako / Gemini SG spot fee: 0.10%',
      sellFeeHint: 'Coinhako / Gemini SG spot fee: 0.10%',
      sellTdsLabel: 'Trade Withholding (%)',
      sellTdsHint: 'No withholding tax deducted on crypto transactions in Singapore.',
      profitTaxLabel: 'Capital Gains Tax (%)',
      profitTaxHint: 'IRAS Singapore: No capital gains tax for individual crypto investors.',
      taxBoxLabel: 'Estimated IRAS Tax (0%)',
      taxBoxSub: 'Tax-exempt capital gains',
      tdsPill: 'Tax-Free CGT (0%)',
      settlementTag: '100% Take-Home',
      tdsAlertTitle: 'Singapore IRAS Tax Exemption:',
      tdsAlert: 'Under Singapore Inland Revenue (IRAS) guidelines, personal investments in cryptocurrency are categorized as capital assets and are completely exempt from Capital Gains Tax.',
      holdingHint: 'Personal investments held by individuals are exempt from capital gains tax regardless of holding duration.'
    },
    USD: {
      country: '🇺🇸 USA',
      symbol: '$',
      locale: 'en-US',
      region: 'americas',
      buyFee: 0.10,
      sellFee: 0.10,
      sellTds: 0.0,
      profitTaxLong: 15.0,
      profitTaxShort: 24.0,
      buyFeeHint: 'Binance.US / Coinbase spot fee: 0.10%',
      sellFeeHint: 'Binance.US / Coinbase spot fee: 0.10%',
      sellTdsLabel: 'Trade Withholding (%)',
      sellTdsHint: 'US exchanges do not withhold tax at trade execution.',
      profitTaxLabel: 'Federal CGT Rate (%)',
      profitTaxHint: 'IRS Capital Gains: 15% Long-Term (> 1 yr) or ordinary income bracket for Short-Term.',
      taxBoxLabel: 'Estimated Federal CGT',
      taxBoxSub: 'IRS capital gains tax liability',
      tdsPill: 'Trade Withholding (0%)',
      settlementTag: 'Direct Settlement',
      tdsAlertTitle: 'IRS Reporting Settlement:',
      tdsAlert: 'US exchanges do not deduct taxes at the time of trade. You report your gains on IRS Form 8949 / Schedule D and settle your tax liability directly during annual tax filing.',
      holdingHint: 'Assets held > 1 year qualify for lower long-term rates (0%, 15%, 20%) instead of higher short-term ordinary income rates.'
    },
    CAD: {
      country: '🇨🇦 Canada',
      symbol: 'C$',
      locale: 'en-CA',
      region: 'americas',
      buyFee: 0.10,
      sellFee: 0.10,
      sellTds: 0.0,
      profitTaxLong: 20.0,
      profitTaxShort: 25.0,
      buyFeeHint: 'NDAX / Kraken Canada spot fee: 0.10%',
      sellFeeHint: 'NDAX / Kraken Canada spot fee: 0.10%',
      sellTdsLabel: 'Trade Withholding (%)',
      sellTdsHint: 'No withholding tax at execution on Canadian regulated platforms.',
      profitTaxLabel: 'Effective CGT Rate (%)',
      profitTaxHint: 'CRA: 50% capital gains inclusion rate taxed at your marginal income tax bracket.',
      taxBoxLabel: 'Estimated CRA CGT (~20%)',
      taxBoxSub: '50% inclusion rate marginal tax',
      tdsPill: 'Trade Withholding (0%)',
      settlementTag: 'Direct Settlement',
      tdsAlertTitle: 'CRA Capital Gains Inclusion:',
      tdsAlert: 'In Canada, 50% of your realized crypto profit is added to your taxable income and taxed at your marginal bracket. No tax is withheld at the time of trade by the exchange.',
      holdingHint: 'Personal crypto investments qualify as capital gains; frequent day-trading may be classed as business income by CRA.'
    },
    GBP: {
      country: '🇬🇧 UK',
      symbol: '£',
      locale: 'en-GB',
      region: 'europe',
      buyFee: 0.20,
      sellFee: 0.20,
      sellTds: 0.0,
      profitTaxLong: 20.0,
      profitTaxShort: 20.0,
      buyFeeHint: 'Coinbase UK / CoinJar spot fee: 0.20%',
      sellFeeHint: 'Coinbase UK / CoinJar spot fee: 0.20%',
      sellTdsLabel: 'HMRC Withholding (%)',
      sellTdsHint: 'UK brokers do not withhold tax at trade execution.',
      profitTaxLabel: 'HMRC CGT Rate (%)',
      profitTaxHint: 'HMRC: 20% higher rate (or 10% basic rate) on crypto gains exceeding the annual allowance.',
      taxBoxLabel: 'HMRC CGT (20%)',
      taxBoxSub: 'HMRC higher-rate capital gains tax',
      tdsPill: 'HMRC Withholding (0%)',
      settlementTag: 'Direct Settlement',
      tdsAlertTitle: 'HMRC Self-Assessment:',
      tdsAlert: 'UK brokers do not withhold taxes at trade execution. Capital gains tax is declared and settled with HMRC during your annual self-assessment tax return.',
      holdingHint: 'UK applies standard Capital Gains Tax rates above your annual tax-free allowance (£3,000).'
    },
    EUR_DE: {
      country: '🇩🇪 Germany',
      symbol: '€',
      locale: 'de-DE',
      region: 'europe',
      buyFee: 0.15,
      sellFee: 0.15,
      sellTds: 0.0,
      profitTaxLong: 0.0,
      profitTaxShort: 26.38,
      buyFeeHint: 'Bison / Kraken EU spot fee: 0.15%',
      sellFeeHint: 'Bison / Kraken EU spot fee: 0.15%',
      sellTdsLabel: 'Trade Withholding (%)',
      sellTdsHint: 'German exchanges do not deduct withholding tax on private crypto trades.',
      profitTaxLabel: 'German Tax Rate (§ 23 EStG) (%)',
      profitTaxHint: '§ 23 EStG: 0% completely tax-free if held > 1 year; standard income tax if held <= 1 year.',
      taxBoxLabel: 'German Tax (§ 23 EStG)',
      taxBoxSub: '0% tax-free if held > 1 year',
      tdsPill: '1-Year Rule (§ 23)',
      settlementTag: 'Holding Rule',
      tdsAlertTitle: 'German 1-Year Tax Exemption Rule:',
      tdsAlert: 'Under § 23 EStG, cryptocurrency is treated as private money. If you hold your coins for more than 365 days before selling, the ENTIRE profit is 100% tax-free! Only short-term sales are taxable.',
      holdingHint: 'Crucial: Holding > 1 year makes all profit 100% TAX-FREE under German tax law! Short-term trades are taxed at income rate.'
    },
    EUR: {
      country: '🇪🇺 Europe',
      symbol: '€',
      locale: 'de-DE',
      region: 'europe',
      buyFee: 0.15,
      sellFee: 0.15,
      sellTds: 0.0,
      profitTaxLong: 30.0,
      profitTaxShort: 30.0,
      buyFeeHint: 'Bitvavo / Kraken EU spot fee: 0.15%',
      sellFeeHint: 'Bitvavo / Kraken EU spot fee: 0.15%',
      sellTdsLabel: 'Trade Withholding (%)',
      sellTdsHint: 'European exchanges do not withhold tax at trade execution.',
      profitTaxLabel: 'Flat / CGT Rate (%)',
      profitTaxHint: 'Standard European flat capital gains tax (e.g., France PFU 30%).',
      taxBoxLabel: 'Estimated Flat CGT (30%)',
      taxBoxSub: 'Standard European capital gains rate',
      tdsPill: 'Trade Withholding (0%)',
      settlementTag: 'Direct Settlement',
      tdsAlertTitle: 'European Tax Declaration:',
      tdsAlert: 'European exchanges do not withhold taxes at the transaction level. You declare and settle crypto profits directly with your local national tax authority during your annual tax return.',
      holdingHint: 'Flat capital gains tax provisions apply; check local member state rules for specific allowances.'
    },
    AUD: {
      country: '🇦🇺 Australia',
      symbol: 'A$',
      locale: 'en-AU',
      region: 'oceania',
      buyFee: 0.10,
      sellFee: 0.10,
      sellTds: 0.0,
      profitTaxLong: 18.5,
      profitTaxShort: 37.0,
      buyFeeHint: 'CoinSpot / Swyftx spot fee: 0.10%',
      sellFeeHint: 'CoinSpot / Swyftx spot fee: 0.10%',
      sellTdsLabel: 'Trade Withholding (%)',
      sellTdsHint: 'No withholding tax deducted at sale on Australian registered exchanges.',
      profitTaxLabel: 'Effective ATO CGT Rate (%)',
      profitTaxHint: 'ATO: 50% CGT discount for assets held > 12 months (~18.5% effective); full marginal rate for short-term.',
      taxBoxLabel: 'Estimated ATO CGT',
      taxBoxSub: '50% discount if held > 12 months',
      tdsPill: '50% CGT Discount',
      settlementTag: 'ATO Settlement',
      tdsAlertTitle: 'Australian 50% CGT Discount:',
      tdsAlert: 'The ATO provides a 50% Capital Gains Tax discount on crypto held for over 12 months, cutting your taxable gain in half. Australian exchanges do not withhold tax at execution.',
      holdingHint: 'Holding for more than 12 months entitles you to a 50% Capital Gains discount under ATO tax rules.'
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
    const cleanSym = currencySym ? currencySym.trim() : '';
    const needsSpace = cleanSym.length > 1 && !cleanSym.endsWith('$');
    return `${cleanSym}${needsSpace ? ' ' : ''}${formattedNum}`;
  }

  // Smooth number counter animation
  function animateValue(element, start, end, duration, prefix = '', suffix = '') {
    if (!element) return;
    let startTimestamp = null;
    const isNegative = end < 0;
    const absEnd = Math.abs(end);
    const absStart = Math.abs(start);
    const cleanPrefix = prefix ? prefix.trim() : '';
    const needsSpace = cleanPrefix.length > 1 && !cleanPrefix.endsWith('$');
    const displayPrefix = cleanPrefix ? `${cleanPrefix}${needsSpace ? ' ' : ''}` : '';

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = absStart + (absEnd - absStart) * easeProgress;
      const sign = end === 0 ? '' : isNegative ? '-' : '+';

      element.textContent = `${sign}${displayPrefix}${current.toLocaleString(currentLocale, {
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

  // Region Filter Tabs Handling
  regionTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      regionTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const selectedRegion = tab.dataset.region;

      const optgroups = currencySelect.querySelectorAll('optgroup');
      let firstVisibleValue = null;
      let currentStillVisible = false;

      optgroups.forEach((group) => {
        const groupRegion = group.dataset.region;
        const matches = selectedRegion === 'all' || groupRegion === selectedRegion;
        group.style.display = matches ? '' : 'none';

        if (matches) {
          const options = group.querySelectorAll('option');
          options.forEach((opt) => {
            if (!firstVisibleValue) firstVisibleValue = opt.value;
            if (opt.value === currencySelect.value) currentStillVisible = true;
          });
        }
      });

      if (!currentStillVisible && firstVisibleValue) {
        currencySelect.value = firstVisibleValue;
        applyCountryTaxDefaults(firstVisibleValue, true);
      }
    });
  });

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

    // Determine tax rate based on holding duration
    const isLongTerm = holdingPeriodSelect.value === 'long';
    const applicableTaxRate = isLongTerm ? preset.profitTaxLong : preset.profitTaxShort;

    // Auto-set fee values and hints
    buyFeeInput.value = preset.buyFee;
    sellFeeInput.value = preset.sellFee;
    if (buyFeeHint) buyFeeHint.textContent = preset.buyFeeHint;
    if (sellFeeHint) sellFeeHint.textContent = preset.sellFeeHint;

    // Auto-set genuine tax values and legal text
    sellTdsInput.value = preset.sellTds;
    if (sellTdsLabel) sellTdsLabel.textContent = preset.sellTdsLabel;
    if (sellTdsHint) sellTdsHint.textContent = preset.sellTdsHint;

    profitTaxInput.value = applicableTaxRate;
    if (profitTaxLabel) profitTaxLabel.textContent = preset.profitTaxLabel;
    if (profitTaxHint) profitTaxHint.textContent = preset.profitTaxHint;
    if (holdingPeriodHint) holdingPeriodHint.textContent = preset.holdingHint;

    // Update tax year hint
    const yearVal = taxYearSelect.value;
    if (taxYearHint) {
      if (countryKey === 'INR') {
        taxYearHint.textContent = `India Financial Year ${yearVal}-${parseInt(yearVal, 10) + 1} (AY ${parseInt(yearVal, 10) + 1}-${parseInt(yearVal, 10) + 2}) Section 115BBH rules`;
      } else {
        taxYearHint.textContent = `${preset.country} tax rules and allowances active for Tax Year ${yearVal}`;
      }
    }

    // Update tax box titles & alerts
    if (taxBoxLabel) taxBoxLabel.textContent = `${preset.taxBoxLabel} (${applicableTaxRate}%)`;
    if (taxBoxSub) taxBoxSub.textContent = preset.taxBoxSub;
    if (tdsPillBadge) tdsPillBadge.textContent = preset.tdsPill;
    if (settlementTag) settlementTag.textContent = preset.settlementTag;
    if (tdsAlertTitle) tdsAlertTitle.textContent = preset.tdsAlertTitle;
    if (tdsAlertText) tdsAlertText.textContent = preset.tdsAlert;
    if (settlementTaxLabel) settlementTaxLabel.textContent = `Estimated Tax (${applicableTaxRate}%)`;

    if (sellTdsBadge) {
      sellTdsBadge.textContent = countryKey === 'INR' ? 'Advance Tax' : 'Direct Tax';
    }

    if (tdsBreakdownLabel) {
      tdsBreakdownLabel.textContent = countryKey === 'INR' ? '1% TDS Advance Credit (Sec 194S)' : 'Trade Withholding';
    }
    if (profitTaxBreakdownLabel) {
      profitTaxBreakdownLabel.textContent = countryKey === 'INR' ? '30% VDA Tax (Sec 115BBH)' : `${applicableTaxRate}% Capital Gains Tax`;
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

  // Tax year listener
  taxYearSelect.addEventListener('change', () => {
    applyCountryTaxDefaults(currencySelect.value, true);
  });

  // Holding period listener
  holdingPeriodSelect.addEventListener('change', () => {
    applyCountryTaxDefaults(currencySelect.value, true);
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

    // 4. Estimated Tax Liability
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

    if (currentCode === 'INR') {
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
        // In case of an Indian loss, tax is 0. 1% TDS can be claimed back in annual ITR
        remainingTaxToPay = 0;
        excessTdsRefund = sellTdsAmount;
        settlementRemainingLabel.textContent = 'Refundable TDS in ITR (On Loss)';
        settlementRemainingDisplay.textContent = `+ ${formatMoney(excessTdsRefund)}`;
        settlementRemainingDisplay.className = 'item-value text-cash';
        profitAfterTax = preTaxProfit;
      }
    } else {
      // Non-Indian jurisdictions (US, UK, Germany, UAE, Singapore, Canada, Australia)
      if (profitTaxPct === 0) {
        settlementRemainingLabel.textContent = 'Tax Obligation';
        settlementRemainingDisplay.textContent = '0.00 (Tax-Free)';
        settlementRemainingDisplay.className = 'item-value text-cash';
        profitAfterTax = preTaxProfit;
      } else {
        settlementRemainingLabel.textContent = 'Direct Tax Due to Tax Authority';
        settlementRemainingDisplay.textContent = formatMoney(estimatedTaxAmount);
        settlementRemainingDisplay.className = 'item-value tax-highlight';
        profitAfterTax = preTaxProfit - estimatedTaxAmount;
      }
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
      const yearLabel = taxYearSelect.value;

      addHistoryRecord({
        country: `${preset.country} (${yearLabel})`,
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

  // ==========================================
  // CRYPTO-TO-MONEY CONVERTER MODULE
  // ==========================================
  const converterCoinSelect = document.getElementById('converterCoinSelect');
  const converterFiatSelect = document.getElementById('converterFiatSelect');
  const converterCryptoAmount = document.getElementById('converterCryptoAmount');
  const converterFiatAmount = document.getElementById('converterFiatAmount');
  const converterCryptoUnit = document.getElementById('converterCryptoUnit');
  const converterFiatSymbol = document.getElementById('converterFiatSymbol');
  const converterFiatCode = document.getElementById('converterFiatCode');
  const rateCoinCode = document.getElementById('rateCoinCode');
  const rateUnitSym = document.getElementById('rateUnitSym');
  const converterCustomRate = document.getElementById('converterCustomRate');
  const convHeadlineFrom = document.getElementById('convHeadlineFrom');
  const convHeadlineTo = document.getElementById('convHeadlineTo');
  const rateStatusBadge = document.getElementById('rateStatusBadge');
  const refreshRateBtn = document.getElementById('refreshRateBtn');
  const swapConverterBtn = document.getElementById('swapConverterBtn');
  const applyToCalcBtn = document.getElementById('applyToCalcBtn');
  const cryptoPresetChips = document.getElementById('cryptoPresetChips');
  const fiatPresetChips = document.getElementById('fiatPresetChips');
  const navCalcBtn = document.getElementById('navCalcBtn');
  const navConvBtn = document.getElementById('navConvBtn');

  // Benchmark exchange rates
  const cryptoBenchmarkRates = {
    bitcoin: {
      symbol: 'BTC',
      name: 'Bitcoin',
      inr: 7600000,
      usd: 90000,
      gbp: 70000,
      eur: 83000,
      aed: 330000,
      aud: 138000,
      cad: 126000,
      sgd: 120000
    },
    ethereum: {
      symbol: 'ETH',
      name: 'Ethereum',
      inr: 224000,
      usd: 2650,
      gbp: 2080,
      eur: 2450,
      aed: 9730,
      aud: 4080,
      cad: 3710,
      sgd: 3550
    },
    solana: {
      symbol: 'SOL',
      name: 'Solana',
      inr: 14800,
      usd: 175,
      gbp: 138,
      eur: 162,
      aed: 642,
      aud: 270,
      cad: 245,
      sgd: 235
    },
    tether: {
      symbol: 'USDT',
      name: 'Tether',
      inr: 84.50,
      usd: 1.00,
      gbp: 0.78,
      eur: 0.92,
      aed: 3.67,
      aud: 1.54,
      cad: 1.40,
      sgd: 1.34
    },
    binancecoin: {
      symbol: 'BNB',
      name: 'Binance Coin',
      inr: 50700,
      usd: 600,
      gbp: 470,
      eur: 555,
      aed: 2200,
      aud: 924,
      cad: 840,
      sgd: 804
    },
    ripple: {
      symbol: 'XRP',
      name: 'XRP',
      inr: 46.50,
      usd: 0.55,
      gbp: 0.43,
      eur: 0.51,
      aed: 2.02,
      aud: 0.85,
      cad: 0.77,
      sgd: 0.74
    },
    cardano: {
      symbol: 'ADA',
      name: 'Cardano',
      inr: 29.60,
      usd: 0.35,
      gbp: 0.27,
      eur: 0.32,
      aed: 1.28,
      aud: 0.54,
      cad: 0.49,
      sgd: 0.47
    },
    dogecoin: {
      symbol: 'DOGE',
      name: 'Dogecoin',
      inr: 12.70,
      usd: 0.15,
      gbp: 0.12,
      eur: 0.14,
      aed: 0.55,
      aud: 0.23,
      cad: 0.21,
      sgd: 0.20
    }
  };

  const fiatConfig = {
    inr: { symbol: '₹', code: 'INR', locale: 'en-IN', presets: [5000, 25000, 50000, 100000, 500000] },
    usd: { symbol: '$', code: 'USD', locale: 'en-US', presets: [100, 500, 1000, 5000, 10000] },
    gbp: { symbol: '£', code: 'GBP', locale: 'en-GB', presets: [100, 500, 1000, 2500, 5000] },
    eur: { symbol: '€', code: 'EUR', locale: 'de-DE', presets: [100, 500, 1000, 5000, 10000] },
    aed: { symbol: 'AED', code: 'AED', locale: 'en-AE', presets: [500, 2500, 5000, 10000, 50000] },
    aud: { symbol: 'A$', code: 'AUD', locale: 'en-AU', presets: [100, 500, 1000, 5000, 10000] },
    cad: { symbol: 'C$', code: 'CAD', locale: 'en-CA', presets: [100, 500, 1000, 5000, 10000] },
    sgd: { symbol: 'S$', code: 'SGD', locale: 'en-SG', presets: [100, 500, 1000, 5000, 10000] }
  };

  let currentActiveInput = 'crypto'; // 'crypto' or 'fiat'

  function getActiveCoinRate(coinId, fiatCode) {
    const coin = cryptoBenchmarkRates[coinId];
    if (coin && coin[fiatCode] !== undefined) {
      return coin[fiatCode];
    }
    return 1;
  }

  function updateFiatPresetChips() {
    if (!fiatPresetChips) return;
    const fiatKey = converterFiatSelect.value;
    const conf = fiatConfig[fiatKey] || fiatConfig.inr;
    fiatPresetChips.innerHTML = conf.presets
      .map((val) => `<button type="button" class="preset-chip" data-fiat-val="${val}">${conf.symbol}${val.toLocaleString(conf.locale)}</button>`)
      .join('');

    fiatPresetChips.querySelectorAll('.preset-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        fiatPresetChips.querySelectorAll('.preset-chip').forEach((b) => b.classList.remove('active'));
        if (cryptoPresetChips) cryptoPresetChips.querySelectorAll('.preset-chip').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        converterFiatAmount.value = btn.dataset.fiatVal;
        currentActiveInput = 'fiat';
        recalcConversion('fiat');
      });
    });
  }

  function updateConverterLabels() {
    const coinOption = converterCoinSelect.selectedOptions[0];
    const coinSymbol = coinOption ? coinOption.dataset.symbol : 'BTC';
    const fiatKey = converterFiatSelect.value;
    const fiat = fiatConfig[fiatKey] || fiatConfig.inr;

    if (converterCryptoUnit) converterCryptoUnit.textContent = coinSymbol;
    if (rateCoinCode) rateCoinCode.textContent = coinSymbol;
    if (converterFiatSymbol) converterFiatSymbol.textContent = fiat.symbol;
    if (converterFiatCode) converterFiatCode.textContent = fiat.code;
    if (rateUnitSym) rateUnitSym.textContent = fiat.symbol;

    updateFiatPresetChips();
  }

  function syncUnitRateFromMarket() {
    const coinId = converterCoinSelect.value;
    const fiatCode = converterFiatSelect.value;
    const unitPrice = getActiveCoinRate(coinId, fiatCode);
    converterCustomRate.value = unitPrice;
    return unitPrice;
  }

  function recalcConversion(trigger = currentActiveInput) {
    const unitRate = parseFloat(converterCustomRate.value) || 0;
    const coinOption = converterCoinSelect.selectedOptions[0];
    const coinSymbol = coinOption ? coinOption.dataset.symbol : 'BTC';
    const fiatKey = converterFiatSelect.value;
    const fiat = fiatConfig[fiatKey] || fiatConfig.inr;

    if (unitRate <= 0) return;

    if (trigger === 'crypto') {
      const cryptoQty = parseFloat(converterCryptoAmount.value) || 0;
      const cashVal = cryptoQty * unitRate;
      converterFiatAmount.value = cashVal > 0 ? (cashVal % 1 === 0 ? cashVal : parseFloat(cashVal.toFixed(2))) : '';

      convHeadlineFrom.textContent = `${cryptoQty} ${coinSymbol}`;
      convHeadlineTo.textContent = `${fiat.symbol}${cashVal.toLocaleString(fiat.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${fiat.code}`;
    } else {
      const cashVal = parseFloat(converterFiatAmount.value) || 0;
      const cryptoQty = cashVal / unitRate;
      // Precision formatting for crypto (up to 8 decimal places, trimming trailing zeros)
      converterCryptoAmount.value = cryptoQty > 0 ? parseFloat(cryptoQty.toFixed(8)) : '';

      convHeadlineFrom.textContent = `${fiat.symbol}${cashVal.toLocaleString(fiat.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${fiat.code}`;
      convHeadlineTo.textContent = `~ ${parseFloat(cryptoQty.toFixed(8))} ${coinSymbol}`;
    }
  }

  // Event Listeners for Converter
  if (converterCryptoAmount) {
    converterCryptoAmount.addEventListener('input', () => {
      currentActiveInput = 'crypto';
      recalcConversion('crypto');
      if (cryptoPresetChips) {
        cryptoPresetChips.querySelectorAll('.preset-chip').forEach((b) => {
          b.classList.toggle('active', parseFloat(b.dataset.value) === parseFloat(converterCryptoAmount.value));
        });
      }
    });
  }

  if (converterFiatAmount) {
    converterFiatAmount.addEventListener('input', () => {
      currentActiveInput = 'fiat';
      recalcConversion('fiat');
      if (fiatPresetChips) {
        fiatPresetChips.querySelectorAll('.preset-chip').forEach((b) => {
          b.classList.toggle('active', parseFloat(b.dataset.fiatVal) === parseFloat(converterFiatAmount.value));
        });
      }
    });
  }

  if (converterCoinSelect) {
    converterCoinSelect.addEventListener('change', () => {
      updateConverterLabels();
      syncUnitRateFromMarket();
      recalcConversion('crypto');
    });
  }

  if (converterFiatSelect) {
    converterFiatSelect.addEventListener('change', () => {
      updateConverterLabels();
      syncUnitRateFromMarket();
      recalcConversion('crypto');
    });
  }

  if (converterCustomRate) {
    converterCustomRate.addEventListener('input', () => {
      recalcConversion(currentActiveInput);
    });
  }

  if (swapConverterBtn) {
    swapConverterBtn.addEventListener('click', () => {
      if (currentActiveInput === 'crypto') {
        currentActiveInput = 'fiat';
        converterFiatAmount.focus();
        converterFiatAmount.select();
      } else {
        currentActiveInput = 'crypto';
        converterCryptoAmount.focus();
        converterCryptoAmount.select();
      }
      recalcConversion(currentActiveInput);
    });
  }

  // Crypto preset chips
  if (cryptoPresetChips) {
    cryptoPresetChips.querySelectorAll('.preset-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        cryptoPresetChips.querySelectorAll('.preset-chip').forEach((b) => b.classList.remove('active'));
        if (fiatPresetChips) fiatPresetChips.querySelectorAll('.preset-chip').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        converterCryptoAmount.value = btn.dataset.value;
        currentActiveInput = 'crypto';
        recalcConversion('crypto');
      });
    });
  }

  // Live Rates Fetcher (CoinGecko API with fallback)
  async function fetchLiveCoinGeckoRates() {
    if (!rateStatusBadge) return;
    rateStatusBadge.textContent = '⟳ Fetching Live Rates...';
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether,binancecoin,ripple,cardano,dogecoin&vs_currencies=inr,usd,eur,gbp,aed,aud,cad,sgd'
      );
      if (!response.ok) throw new Error('API response not ok');
      const data = await response.json();

      Object.keys(data).forEach((coinId) => {
        if (cryptoBenchmarkRates[coinId]) {
          Object.assign(cryptoBenchmarkRates[coinId], data[coinId]);
        }
      });

      rateStatusBadge.textContent = '● Live CoinGecko Rates';
      rateStatusBadge.style.color = '#15803d';
      rateStatusBadge.style.backgroundColor = '#dcfce7';
      rateStatusBadge.style.borderColor = '#86efac';

      syncUnitRateFromMarket();
      recalcConversion(currentActiveInput);
    } catch (err) {
      rateStatusBadge.textContent = '● Benchmark Market Rates';
      rateStatusBadge.style.color = '#0369a1';
      rateStatusBadge.style.backgroundColor = '#f0f9ff';
      rateStatusBadge.style.borderColor = '#bae6fd';
    }
  }

  if (refreshRateBtn) {
    refreshRateBtn.addEventListener('click', () => {
      fetchLiveCoinGeckoRates();
    });
  }

  // Bridge: Apply to P&L Calculator
  if (applyToCalcBtn) {
    applyToCalcBtn.addEventListener('click', () => {
      const cryptoQty = parseFloat(converterCryptoAmount.value) || 1;
      const unitRate = parseFloat(converterCustomRate.value) || 0;

      if (coinQtyInput) coinQtyInput.value = cryptoQty;
      if (buyPriceInput) buyPriceInput.value = unitRate;

      // Scroll smoothly to calculator section
      const calcSection = document.getElementById('calculatorSection');
      if (calcSection) {
        calcSection.scrollIntoView({ behavior: 'smooth' });
      }

      flashFieldUpdate(coinQtyInput);
      flashFieldUpdate(buyPriceInput);

      if (navCalcBtn && navConvBtn) {
        navCalcBtn.classList.add('active');
        navConvBtn.classList.remove('active');
      }

      calculatePnL(false);
    });
  }

  // Tool Navigation Scroll Sync
  if (navCalcBtn && navConvBtn) {
    navCalcBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navCalcBtn.classList.add('active');
      navConvBtn.classList.remove('active');
      document.getElementById('calculatorSection')?.scrollIntoView({ behavior: 'smooth' });
    });

    navConvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navConvBtn.classList.add('active');
      navCalcBtn.classList.remove('active');
      document.getElementById('converterSection')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Initialize Converter on load
  updateConverterLabels();
  syncUnitRateFromMarket();
  recalcConversion('crypto');
  // Attempt background live rate fetch
  fetchLiveCoinGeckoRates();

  // Ensure clicking the wrapper focuses the input
  document.querySelectorAll('.input-addon-wrap').forEach((wrap) => {
    wrap.addEventListener('click', () => {
      wrap.querySelector('input')?.focus();
    });
  });

  // Initialize with selected country defaults
  applyCountryTaxDefaults(currencySelect.value, false);
});
