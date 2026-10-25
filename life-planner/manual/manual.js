(()=>{
  const supported=['en','ja','es','fr','de','it','zh','hi'];
  const root='/life-planner/manual/';
  const language=document.documentElement.lang;
  const select=document.getElementById('manual-language');
  const read=()=>{try{return localStorage.getItem('valrisa-language')}catch{return null}};
  const save=value=>{try{localStorage.setItem('valrisa-language',value)}catch{}};
  // Preserve the site's previous language when arriving at the English entry URL.
  const explicit=new URLSearchParams(location.search).get('lang');
  const saved=read();
  if(location.pathname===root && explicit!=='en' && supported.includes(saved) && saved!=='en'){
    location.replace(root+saved+'/'+location.hash);return;
  }
  save(language);
  select?.addEventListener('change',()=>{
    const next=select.value;if(!supported.includes(next))return;
    save(next);
    location.href=root+(next==='en'?'?lang=en':next+'/')+location.hash;
  });
})();
