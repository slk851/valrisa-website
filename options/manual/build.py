"""Regenerate the accessible English HTML from the manual source content."""
import json
from html import escape
from pathlib import Path
root = Path(__file__).parent
data = json.loads((root / 'content.json').read_text())['en']
sections = ''.join(f'<section class="manual-section" id="{escape(i)}"><h2>{escape(t)}</h2>{b}</section>' for i,t,b in data['sections'])
toc = ''.join(f'<li><a href="#{escape(i)}">{escape(t)}</a></li>' for i,t,b in data['sections'])
html = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(data['title'])} | Valrisa</title><meta name="description" content="{escape(data['intro'])}">
<link rel="canonical" href="https://valrisa.com/options/manual/"><link rel="stylesheet" href="/assets/options-manual.css"><link rel="stylesheet" href="/assets/i18n.css">
</head><body><a class="skip" href="#manual-content">Skip to manual</a>
<header><div class="wrap"><nav><a class="brand" href="/" aria-label="SLK85-Labs home"><img src="/slk85-labs.png" alt="SLK85-Labs"></a><div class="links"><a href="/">Home</a><a href="/options/">Product</a><a href="/options/support/">Support</a><a href="/options/privacy/">Privacy</a></div></nav></div></header>
<div class="wrap manual-layout"><aside class="toc" id="manual-toc" aria-label="{escape(data['contents'])}"><h2>{escape(data['contents'])}</h2><ol>{toc}</ol></aside>
<main id="manual-content"><div class="meta">{escape(data['version'])}</div><h1>{escape(data['title'])}</h1><p class="intro">{escape(data['intro'])}</p><p class="version-note">{escape(data['notice'])}</p><div class="actions"><button class="print" type="button">{escape(data['print'])}</button></div><p class="ui-note">{escape(data['ui'])}</p>{sections}</main></div>
<footer><div class="wrap">© 2026 SLK85-Labs. · <a href="/options/support/">Support</a> · <a href="/options/privacy/">Privacy</a> · <a href="/terms/">Terms</a></div></footer>
<script src="/assets/i18n.js?v=20261006-product-pages"></script><script src="/assets/options-manual.js?v=20261007-manual"></script></body></html>'''
(root / 'index.html').write_text(html)
