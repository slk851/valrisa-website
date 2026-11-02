/* Effective annual return, converted to an equivalent monthly rate.
   Contributions occur at the start or end of each month; no intermediate rounding. */
(function(root){
'use strict';
function project({principal,monthly,years,rate,timing='end'}){
 if (![principal,monthly,years,rate].every(Number.isFinite)||principal<0||principal>1e12||monthly<0||monthly>1e9||!Number.isInteger(years)||years<1||years>100||rate<=-100||rate>100||!['start','end'].includes(timing)) throw new RangeError('Invalid projection inputs');
 const r=Math.expm1(Math.log1p(rate/100)/12);let balance=principal,contributed=principal;
 const rows=[{year:0,balance,contributed,growth:0}];
 for(let m=1;m<=years*12;m++){
  balance=timing==='start'?(balance+monthly)*(1+r):balance*(1+r)+monthly;
  contributed+=monthly;
  if(!Number.isFinite(balance))throw new RangeError('Projection too large');
  if(m%12===0)rows.push({year:m/12,balance,contributed,growth:balance-contributed});
 }
 return rows;
}
if(typeof module!=='undefined'&&module.exports)module.exports={project};else root.ValrisaCompound={project};
})(typeof window!=='undefined'?window:globalThis);
