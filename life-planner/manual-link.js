(()=>{
  const labels={en:'User Manual',ja:'ユーザーマニュアル',es:'Manual de usuario',fr:'Manuel d’utilisation',de:'Benutzerhandbuch',it:'Manuale utente',zh:'用户手册',hi:'उपयोगकर्ता मार्गदर्शिका'};
  let saved;try{saved=localStorage.getItem('valrisa-language')}catch{}
  const candidate=window.ValrisaI18n?.active||saved||document.documentElement.lang;
  const language=Object.hasOwn(labels,candidate)?candidate:'en';
  document.querySelectorAll('.life-manual-link').forEach(link=>{
    link.textContent=labels[language];
    link.href='/life-planner/manual/'+(language==='en'?'?lang=en':language+'/');
  });
})();
