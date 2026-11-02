# Valrisa calculators

Public hub: https://valrisa.com/calculators/

Five static, browser-local calculators, deployed using the website's existing GitHub Pages branch pipeline. Seven complete UI dictionaries: English, Japanese, Spanish, French, German, Italian, simplified Chinese. Language preference uses the existing `valrisa-language` setting. No financial input is stored or sent to a backend; no live exchange rate or price feed is used.

## Routes and conventions
- `compound/`: effective annual total return converted to monthly compounding; optional rate comparison; see its README.
- `income-goal/`: net monthly target annualized and grossed up for a user-assumed flat distribution tax, divided by assumed distribution yield. Sensitivity uses 75%, 100%, 125% of input yield. No capital withdrawals assumed.
- `dividend-reinvestment/`: monthly distribution = opening portfolio × nominal annual distribution yield / 12, reduced by assumed tax. Effective annual price growth is converted to monthly price growth separately. Distribution reinvestment and contributions at month end; cash has no return. Compare the reinvested portfolio with the other portfolio plus cumulative cash, not with the other portfolio alone.
- `options/`: expiration intrinsic payoffs, fixed multiplier 100, integer contracts, per-share net debit/credit, total fees subtracted once. Eight strategies; lower/upper strike leg directions are explicitly stated. Covered call includes share cost and share position. All legs same expiration. No early assignment, margin, taxes, dividends or option pricing model. Best/worst outcomes are signed P/L values, including fees. A break-even outside attainable payoff range is reported as absent.
- `currency/`: manually assumed target units per source unit; source amount fixed; no investment returns or fees. Same-currency selection rejected.

All tools provide detailed result tables and UTF-8 CSV exports containing their input assumptions. Invalid inputs hide previous results and prevent exporting stale results. Charts are SVG with text alternatives; exact values are in the table.

## Verification
Run from repository root:

```
node tests/compound.test.cjs
node tests/calculators.test.cjs
node --check calculators/calculators.js
```

Tests cover independent known-value checks, contribution timing, reinvested versus cash distributions, taxes, negative price growth, currency direction, all eight strategies, covered-call assignment cap, fees, breakevens, invalid inputs and complete language keys.
