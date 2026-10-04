(() => {
  const languages = {
    en: "English",
    ja: "日本語",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano"
  };
  const key = "valrisa-language";
  const supported = Object.keys(languages);
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  let active = localStorage.getItem(key) || (supported.includes(browser) ? browser : "en");
  if (!supported.includes(active)) active = "en";

  const selector = document.createElement("label");
  selector.className = "language-picker";
  selector.setAttribute("aria-label", "Choose language");
  selector.innerHTML = '<span aria-hidden="true">🌐</span><select aria-label="Choose language"></select>';
  const select = selector.querySelector("select");
  for (const [code, name] of Object.entries(languages)) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    option.selected = code === active;
    select.appendChild(option);
  }
  select.addEventListener("change", () => {
    localStorage.setItem(key, select.value);
    document.documentElement.lang = select.value;
    location.reload();
  });

  const nav = document.querySelector("header nav");
  if (nav) {
    const links = nav.querySelector(".links") || nav.querySelector("div:last-child");
    if (links && links !== nav.querySelector(".brand-group")) links.classList.add("site-links");
    nav.appendChild(selector);
  }

  window.ValrisaI18n = {
    active,
    apply(dictionary) {
      if (!dictionary) return;
      document.documentElement.lang = active;
      const translate = value => dictionary[value.trim()] || null;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const tag = node.parentElement?.tagName;
          return ["SCRIPT", "STYLE", "NOSCRIPT", "OPTION"].includes(tag)
            ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        }
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      for (const node of nodes) {
        const raw = node.nodeValue;
        const replacement = translate(raw);
        if (replacement) {
          const leading = raw.match(/^\s*/)?.[0] || "";
          const trailing = raw.match(/\s*$/)?.[0] || "";
          node.nodeValue = leading + replacement + trailing;
        }
      }
      document.querySelectorAll("[aria-label],[alt],[title]").forEach(el => {
        for (const attr of ["aria-label", "alt", "title"]) {
          if (el.hasAttribute(attr)) {
            const replacement = translate(el.getAttribute(attr));
            if (replacement) el.setAttribute(attr, replacement);
          }
        }
      });
      const titleReplacement = dictionary[document.title];
      if (titleReplacement) document.title = titleReplacement;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        const replacement = translate(meta.content);
        if (replacement) meta.content = replacement;
      }
      const picker = document.querySelector(".language-picker");
      if (picker) picker.setAttribute("aria-label", dictionary["Choose language"] || "Choose language");
      if (select) select.setAttribute("aria-label", dictionary["Choose language"] || "Choose language");
    }
  };

  if (active !== "en") {
    for (const suffix of ["", "-products", "-legal"]) {
      const script = document.createElement("script");
      script.src = "/assets/i18n/" + active + suffix + ".js";
      script.async = false;
      document.head.appendChild(script);
    }
  } else {
    document.documentElement.lang = "en";
  }
})();