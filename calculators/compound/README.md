# Valrisa compound growth calculator

Public route: https://valrisa.com/calculators/compound/

Static HTML/CSS/JavaScript; deployed by the existing GitHub Pages branch pipeline. No service, credentials, analytics or personal-data endpoint is added.

## Model
Effective annual total return converted with `expm1(log1p(rate/100)/12)`. Monthly recurrence, fixed contributions at start or end of month, no intermediate rounding. Comparison changes annual return only. Contribution totals include starting capital. Negative returns are supported above -100%. No taxes, fees, inflation, withdrawals or exchange conversion. Currency selection only changes formatting.

## Verification
From repository root: `node tests/compound.test.cjs`. Independent closed-form checks cover principal growth, ordinary/annuity-due contributions, zero/negative returns, extreme horizons, invalid inputs and complete translation keys for EN/JA/ES/FR/DE/IT/ZH.

Inputs are recalculated locally. CSV contains the current valid scenario assumptions and annual values, with UTF-8 BOM and quoted fields. Invalid inputs hide previous results and disable export. No input values are persisted.
