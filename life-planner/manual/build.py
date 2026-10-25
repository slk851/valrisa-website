"""Generate the eight static Life Planner manuals. Run from any directory."""
from pathlib import Path
import json
from html import escape as e
root=Path(__file__).resolve().parent
content=json.loads((root/'content.json').read_text())
ids=['start','navigation','plans','reminders','times','archive','notifications','snooze','language','pro','troubleshooting','data']
base='/life-planner/manual/'
url=lambda lang: base if lang=='en' else base+lang+'/'
css=(root/'manual.css').read_text()
for lang,d in content.items():
    assert len(d['sections'])==len(ids),lang
    dest=root if lang=='en' else root/lang
    dest.mkdir(exist_ok=True)
    options=''.join(f'<option value="{code}"'+(' selected' if code==lang else '')+f'>{e(item["name"])}</option>' for code,item in content.items())
    langlinks=' · '.join(f'<a href="{url(code)}'+('?lang=en' if code=='en' else '')+f'" lang="{code}" hreflang="{code}">{e(item["name"])}</a>' for code,item in content.items())
    toc=''.join(f'<a href="#{id}">{n}. {e(s[0])}</a>' for n,(id,s) in enumerate(zip(ids,d['sections']),1))
    sections=''
    for n,(id,s) in enumerate(zip(ids,d['sections']),1):
        sections+=f'<section id="{id}" aria-labelledby="h-{id}"><h2 id="h-{id}">{n}. {e(s[0])}</h2>'
        sections+=''.join(f'<p>{e(p)}</p>' for p in s[1])
        if id=='start':
            shots=[('01-Explore-Plans-1242x2688.png',d['sections'][2][0]),('04-Plan-Reminders-1242x2688.png',d['sections'][3][0]),('05-Reminder-Time-Picker-1242x2688.png',d['sections'][4][0])]
            sections+='<div class="shots">'+''.join(f'<figure><a href="/life-planner/screenshots/{name}"><img src="/life-planner/screenshots/{name}" width="1242" height="2688" alt="{e(caption)}" loading="lazy"></a><figcaption>{e(caption)}</figcaption></figure>' for name,caption in shots)+'</div>'
        if id=='data':
            sections+=f'<p><a href="/life-planner/privacy/">{e(d["privacy"])}</a> · <a href="/life-planner/support/">{e(d["support"])}</a></p><p class="note">{e(d["help"]).replace("valrisa-support@slk85.com", "<a href=\"mailto:valrisa-support@slk85.com\">valrisa-support@slk85.com</a>")}</p>'
        sections+='</section>'
    alternates=''.join(f'<link rel="alternate" hreflang="{code}" href="https://valrisa.com{url(code)}">' for code in content)
    html=f'''<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Valrisa Life Planner — {e(d['title'])}</title><meta name="description" content="{e(d['lead'])}">
<link rel="canonical" href="https://valrisa.com{url(lang)}">{alternates}
<link rel="alternate" hreflang="x-default" href="https://valrisa.com{base}">
<link rel="stylesheet" href="{base}manual.css?v=20261025-17">
</head><body id="top"><a class="skip" href="#manual">{e(d['skip'])}</a>
<header><div class="wrap"><nav aria-label="{e(d['product'])}"><a class="brand" href="/"><img src="/slk85-labs.png" alt="SLK85-Labs" width="190" height="48"></a><div class="links"><a href="/">{e(d['home'])}</a><a href="/life-planner/">{e(d['product'])}</a><a href="/life-planner/support/">{e(d['support'])}</a><a href="/life-planner/privacy/">{e(d['privacy'])}</a></div><label class="language-picker" for="manual-language"><span>🌐 {e(d['language'])}</span><select id="manual-language">{options}</select></label></nav></div></header>
<main class="wrap" id="manual"><div class="manual-hero"><img class="app-icon" src="/assets/life-planner-icon-web.png" width="80" height="80" alt="Valrisa Life Planner"><div><div class="eyebrow">Valrisa Life Planner</div><h1>{e(d['title'])}</h1><span class="pill">{e(d['version'])}</span></div></div><p class="lead">{e(d['lead'])}</p><p class="note">{e(d['note'])}</p>
<noscript><p class="language-links">{langlinks}</p></noscript>
<div class="layout"><aside class="toc" aria-label="{e(d['contents'])}"><strong>{e(d['contents'])}</strong>{toc}</aside><article class="content">{sections}<p><a href="#top">↑ {e(d['top'])}</a></p></article></div></main>
<footer><div class="wrap"><p>© 2026 SLK85-Labs. {e(d['rights'])} · <a href="/life-planner/">{e(d['product'])}</a> · <a href="/life-planner/support/">{e(d['support'])}</a> · <a href="/life-planner/privacy/">{e(d['privacy'])}</a></p><div class="language-links">{langlinks}</div></div></footer>
<script src="{base}manual.js?v=20261025-17"></script></body></html>'''
    (dest/'index.html').write_text(html)
print('Generated',len(content),'complete manuals')
