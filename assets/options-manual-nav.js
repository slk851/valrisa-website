(() => {
  const labels = {en:'User manual',ja:'ユーザーマニュアル',es:'Manual de usuario',fr:'Manuel utilisateur',de:'Benutzerhandbuch',it:'Manuale utente',zh:'用户手册'};
  const lang = window.ValrisaI18n?.active || 'en';
  document.querySelectorAll('[data-manual-link]').forEach(a => {a.textContent = labels[lang] || labels.en;});
})();
