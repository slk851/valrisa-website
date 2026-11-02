/* Educational scenario models. All rates are user assumptions, not market data. */
(function(root){'use strict';
const finite=(v,min=0,max=1e15)=>{if(!Number.isFinite(v)||v<min||v>max)throw new RangeError('Invalid input');return v;};
function income({monthly,yieldRate,tax}){finite(monthly);finite(yieldRate,0.000001,100);finite(tax,0,99.99);const annual=monthly*12,gross=annual/(1-tax/100),capital=gross/(yieldRate/100);return {annual,gross,capital,taxAmount:gross-annual,scenarios:[.75,1,1.25].map(k=>({yieldRate:yieldRate*k,capital:gross/(yieldRate*k/100)}))};}
function dividends({principal,monthly,years,yieldRate,priceGrowth,tax}){finite(principal,0,1e12);finite(monthly,0,1e9);finite(years,1,100);if(!Number.isInteger(years))throw new RangeError('Whole years');finite(yieldRate,0,100);finite(priceGrowth,-99.99,100);finite(tax,0,100);const r=Math.expm1(Math.log1p(priceGrowth/100)/12),y=yieldRate/1200*(1-tax/100);let reinvest=principal,cashPortfolio=principal,cash=0,reinvestIncome=0,contributed=principal;const rows=[{year:0,reinvest,cashPortfolio,cash,reinvestIncome,contributed}];for(let m=1;m<=years*12;m++){const ri=reinvest*y,ci=cashPortfolio*y;reinvest=reinvest*(1+r)+ri+monthly;cashPortfolio=cashPortfolio*(1+r)+monthly;cash+=ci;reinvestIncome+=ri;contributed+=monthly;if(!Number.isFinite(reinvest))throw new RangeError('Too large');if(m%12===0)rows.push({year:m/12,reinvest,cashPortfolio,cash,reinvestIncome,contributed});}return rows;}
function currency({amount,currentRate,futureRate}){finite(amount,0,1e12);finite(currentRate,.00000001,1e8);finite(futureRate,.00000001,1e8);const current=amount*currentRate,future=amount*futureRate;return {current,future,change:future-current,percent:(futureRate/currentRate-1)*100};}
function options({strategy,strike,upperStrike,premium,shareCost,contracts,fees,spot}){finite(strike,.01,1e7);finite(premium,0,1e7);finite(contracts,1,100000);if(!Number.isInteger(contracts))throw new RangeError('Whole contracts');finite(fees,0,1e9);finite(spot,0,1e8);const q=100*contracts,f=fees/q;let payoff,maxProfit,maxLoss,be;
 const call=s=>Math.max(s-strike,0),put=s=>Math.max(strike-s,0);
 if(strategy==='longCall'){payoff=s=>(call(s)-premium)*q-fees;maxProfit=null;maxLoss=premium*q+fees;be=strike+premium+f;}
 else if(strategy==='longPut'){payoff=s=>(put(s)-premium)*q-fees;maxProfit=(strike-premium)*q-fees;maxLoss=premium*q+fees;be=strike-premium-f;}
 else if(strategy==='cashPut'){payoff=s=>(premium-put(s))*q-fees;maxProfit=premium*q-fees;maxLoss=(strike-premium)*q+fees;be=strike-premium+f;}
 else if(strategy==='coveredCall'){finite(shareCost,.01,1e7);payoff=s=>(s-shareCost+premium-call(s))*q-fees;maxProfit=(strike-shareCost+premium)*q-fees;maxLoss=(shareCost-premium)*q+fees;be=shareCost-premium+f;}
 else if(['bullCall','bearPut','bullPut','bearCall'].includes(strategy)){finite(upperStrike,strike+.000001,1e7);const w=upperStrike-strike;if(premium>w)throw new RangeError('Premium exceeds spread width');
 if(strategy==='bullCall'){payoff=s=>(Math.max(s-strike,0)-Math.max(s-upperStrike,0)-premium)*q-fees;maxProfit=(w-premium)*q-fees;maxLoss=premium*q+fees;be=strike+premium+f;}
 if(strategy==='bearPut'){payoff=s=>(Math.max(upperStrike-s,0)-Math.max(strike-s,0)-premium)*q-fees;maxProfit=(w-premium)*q-fees;maxLoss=premium*q+fees;be=upperStrike-premium-f;}
 if(strategy==='bullPut'){payoff=s=>(premium-Math.max(upperStrike-s,0)+Math.max(strike-s,0))*q-fees;maxProfit=premium*q-fees;maxLoss=(w-premium)*q+fees;be=upperStrike-premium+f;}
 if(strategy==='bearCall'){payoff=s=>(premium-Math.max(s-strike,0)+Math.max(s-upperStrike,0))*q-fees;maxProfit=premium*q-fees;maxLoss=(w-premium)*q+fees;be=strike+premium-f;}}
 else throw new RangeError('Invalid strategy');
 if(be<0||Math.abs(payoff(be))>1e-5)be=null;
 const high=Math.max(strike,upperStrike||0,spot,shareCost||0,(be||strike))*1.5;const prices=[0,strike,spot,high,...(upperStrike?[upperStrike]:[]),...(be!==null?[be]:[])];for(let i=1;i<31;i++)prices.push(high*i/31);prices.sort((a,b)=>a-b);return {maxProfit,maxLoss,be,profit:payoff(spot),quantity:q,points:[...new Set(prices)].map(price=>({price,profit:payoff(price)}))};}
const api={income,dividends,currency,options};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ValrisaCalculators=api;
})(typeof window!=='undefined'?window:globalThis);
