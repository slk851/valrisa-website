(() => {
  const language = window.ValrisaI18n?.active || 'en';
  const main = document.getElementById('manual-content');
  const toc = document.getElementById('manual-toc');
  const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function render(data) {
    document.title = data.title + ' | Valrisa';
    document.querySelector('meta[name="description"]').content = data.intro;
    main.innerHTML = `<div class="meta">${escape(data.version)}</div><h1>${escape(data.title)}</h1><p class="intro">${escape(data.intro)}</p><p class="version-note">${escape(data.notice)}</p><div class="actions"><button class="print" type="button">${escape(data.print)}</button></div><p class="ui-note">${escape(data.ui)}</p>` + data.sections.map(([id,title,body]) => `<section class="manual-section" id="${escape(id)}"><h2>${escape(title)}</h2>${body}</section>`).join('');
    toc.setAttribute('aria-label', data.contents);
    toc.innerHTML = `<h2>${escape(data.contents)}</h2><ol>` + data.sections.map(([id,title]) => `<li><a href="#${escape(id)}">${escape(title)}</a></li>`).join('') + '</ol>';
    document.documentElement.lang = language;
    const skip = document.querySelector('.skip');
    const skips = {en:'Skip to manual',ja:'マニュアル本文へ',es:'Ir al manual',fr:'Aller au manuel',de:'Zum Handbuch',it:'Vai al manuale',zh:'跳转到手册'};
    skip.textContent = skips[language] || skips.en;
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }
  document.addEventListener('click', event => {
    if (event.target.closest('.print')) window.print();
  });
  if (language !== 'en') {
    fetch(`./${language}.json?v=20261007-manual`).then(response => {
      if (!response.ok) throw new Error('Manual translation unavailable');
      return response.json();
    }).then(render).catch(() => {document.documentElement.lang = 'en';});
  }
})();
