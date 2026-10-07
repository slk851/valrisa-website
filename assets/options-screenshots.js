(() => {
  const captions = {
    en: ['Brokerage dashboard','Open options','Ticker history search','Realized income','Dividends and reinvestment','Performance and assignments','Transaction costs','Option strategy selection','Imports and backups','Weekly income'],
    ja: ['券商別ダッシュボード','未決済オプション','ティッカーで履歴検索','実現収益','配当と再投資','成績と割当','取引コスト','オプション戦略の選択','取り込みとバックアップ','週次収益'],
    es: ['Panel por bróker','Opciones abiertas','Historial por ticker','Ingresos realizados','Dividendos y reinversión','Rendimiento y asignaciones','Costes de transacción','Selección de estrategia','Importaciones y copias','Ingresos semanales'],
    fr: ['Tableau de bord par courtier','Options ouvertes','Historique par symbole','Revenus réalisés','Dividendes et réinvestissement','Performance et assignations','Frais de transaction','Choix de stratégie','Importations et sauvegardes','Revenus hebdomadaires'],
    de: ['Broker-Dashboard','Offene Optionen','Historie nach Ticker','Realisierte Erträge','Dividenden und Wiederanlage','Performance und Zuteilungen','Transaktionskosten','Optionsstrategie wählen','Importe und Sicherungen','Wöchentliche Erträge'],
    it: ['Dashboard per broker','Opzioni aperte','Cronologia per ticker','Proventi realizzati','Dividendi e reinvestimento','Performance e assegnazioni','Costi di transazione','Selezione strategia','Importazioni e backup','Proventi settimanali'],
    zh: ['券商仪表板','未平仓期权','按代码搜索历史','已实现收入','股息与再投资','表现与指派','交易费用','期权策略选择','导入与备份','每周收入']
  };
  const actions = {en:'Open full-size image.',ja:'全サイズの画像を開く。',es:'Abrir imagen a tamaño completo.',fr:'Ouvrir l’image en taille réelle.',de:'Bild in voller Größe öffnen.',it:'Apri immagine a dimensione intera.',zh:'打开全尺寸图片。'};
  const lang = window.ValrisaI18n?.active || 'en';
  const labels = captions[lang] || captions.en;
  document.querySelectorAll('[data-gallery-index]').forEach(figure => {
    const index = Number(figure.dataset.galleryIndex);
    const image = figure.querySelector('img');
    image.alt = `Valrisa Options Tracker: ${labels[index]}`;
    image.setAttribute('aria-label', `${image.alt}. ${actions[lang] || actions.en}`);
    figure.querySelector('figcaption').textContent = labels[index];
  });
})();
