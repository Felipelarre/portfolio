/* Aviso de cookies da Larre.dev (skill privacidade-site).
   Copiar aviso-cookies.js E aviso-cookies.css pra mesma pasta de JS do site
   e carregar no fim do <body>, em todas as páginas:

     <script src="js/aviso-cookies.js?v=2" defer
             data-politica="politica-de-privacidade.html"
             data-analytics=""></script>

   - data-analytics vazio  → modo aviso: só informa, botão "Entendi"; o
     primeiro toque em qualquer lugar do site também fecha.
   - data-analytics="G-XXXX" → modo consentimento: "Aceitar" / "Recusar".
     O Google Analytics só carrega depois do "Aceitar". Não colocar o gtag
     direto no HTML quando usar este arquivo.
   - data-medicao="anonima" → site com contagem de visitas sem cookie e sem
     dado pessoal (ex.: medicao.js do PostHog): o modo aviso diz isso.
   - O rodapé pode ter <button data-abrir-cookies>Cookies</button> pra pessoa
     mudar a escolha depois.
   O visual fica no .css ao lado (funciona com CSP sem 'unsafe-inline').
   A escolha fica no localStorage (larre-cookies), sem cookie nosso. */
(function () {
  var script = document.currentScript;
  var politica = script.getAttribute('data-politica') || 'politica-de-privacidade.html';
  var gaId = (script.getAttribute('data-analytics') || '').trim();
  var medicaoAnonima = script.getAttribute('data-medicao') === 'anonima';
  var cssHref = script.src.replace(/\.js(\?.*)?$/, '.css$1');
  var CHAVE = 'larre-cookies';

  function ler() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function gravar(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }

  function carregarAnalytics() {
    if (!gaId || window.gtag) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId, { anonymize_ip: true });
  }

  function carregarCss(pronto) {
    if (document.getElementById('lc-css')) return pronto();
    var l = document.createElement('link');
    l.id = 'lc-css';
    l.rel = 'stylesheet';
    l.href = cssHref;
    l.onload = pronto;
    document.head.appendChild(l);
  }

  // Sobe o aviso acima de barra fixa no rodapé (carrinho, "fechar pedido",
  // WhatsApp em barra) pra nunca cobrir botão de ação. Olha só os 160 px de
  // baixo da tela, na largura do aviso (barra solta do rodapé também conta).
  function fixoDe(el, box) {
    for (; el && el !== document.body; el = el.parentElement) {
      if (box.contains(el)) return null;
      if (getComputedStyle(el).position === 'fixed') return el;
    }
    return null;
  }
  function desviar(box) {
    var r = box.getBoundingClientRect();
    var topoLivre = window.innerHeight;
    var vistos = [];
    for (var y = window.innerHeight - 2; y > window.innerHeight - 160; y -= 16) {
      [r.left + 8, (r.left + r.right) / 2, r.right - 8].forEach(function (x) {
        document.elementsFromPoint(x, y).forEach(function (el) {
          var f = fixoDe(el, box);
          if (!f || vistos.indexOf(f) !== -1) return;
          vistos.push(f);
          var t = f.getBoundingClientRect().top;
          // só barra de rodapé: elemento fixo que começa na metade de baixo da tela
          if (t > window.innerHeight / 2) topoLivre = Math.min(topoLivre, t);
        });
      });
    }
    box.style.bottom = topoLivre < window.innerHeight
      ? (window.innerHeight - topoLivre + 8) + 'px'
      : '';
  }

  function fechar(box, v) {
    gravar(v);
    if (v === 'aceito') carregarAnalytics();
    clearInterval(box._lcVigia);
    document.removeEventListener('click', box._lcFora, true);
    box.classList.remove('lc-on');
    setTimeout(function () { box.remove(); }, 250);
  }

  // Espera a tela de carregamento (preloader) sair: elemento fixo cobrindo a tela toda.
  function telaCoberta() {
    var el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    for (; el && el !== document.body; el = el.parentElement) {
      if (getComputedStyle(el).position !== 'fixed') continue;
      var b = el.getBoundingClientRect();
      if (b.width >= window.innerWidth * 0.9 && b.height >= window.innerHeight * 0.9) return true;
    }
    return false;
  }

  function mostrar(tentativa) {
    if (document.querySelector('.lc-aviso')) return;
    tentativa = tentativa || 0;
    // menu aberto ou preloader: tenta de novo, até ~10 s
    if (tentativa < 20 && telaCoberta()) { setTimeout(function () { mostrar(tentativa + 1); }, 500); return; }
    carregarCss(montar);
  }

  function montar() {
    if (document.querySelector('.lc-aviso')) return;
    var box = document.createElement('div');
    box.className = 'lc-aviso';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Aviso de cookies');
    var link = '<a href="' + politica + '">política de privacidade</a>';
    box.innerHTML = gaId
      ? '<p>Usamos cookies de estatística pra entender quantas pessoas visitam o site. Você escolhe. Saiba mais na ' + link + '.</p>' +
        '<div class="lc-botoes"><button type="button" class="lc-ok" data-v="aceito">Aceitar</button>' +
        '<button type="button" data-v="recusado">Recusar</button></div>'
      : '<p>Este site não usa cookies de propaganda. ' +
        (medicaoAnonima ? 'Só conta as visitas de forma anônima, sem guardar nada no seu aparelho. '
                        : 'Só guarda preferências técnicas no seu navegador. ') +
        'Saiba mais na ' + link + '.</p>' +
        '<div class="lc-botoes"><button type="button" class="lc-ok" data-v="ciente">Entendi</button></div>';
    box.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-v');
      if (v) fechar(box, v);
    });
    // Modo aviso só informa: o primeiro toque em qualquer outro lugar já vale
    // como "Entendi". No modo consentimento a pessoa precisa escolher.
    if (!gaId) {
      box._lcFora = function (e) {
        if (!box.contains(e.target) && !e.target.closest('[data-abrir-cookies]')) fechar(box, 'ciente');
      };
      document.addEventListener('click', box._lcFora, true);
    }
    document.body.appendChild(box);
    desviar(box);
    box._lcVigia = setInterval(function () { desviar(box); }, 400);
    setTimeout(function () { box.classList.add('lc-on'); }, 30);
  }

  var escolha = ler();
  if (escolha === 'aceito') carregarAnalytics();
  // Site sem rastreio: quem já viu o aviso não vê de novo.
  // Site com rastreio: pergunta de novo se a pessoa só tinha visto o modo aviso.
  if (!escolha || (gaId && escolha === 'ciente')) setTimeout(mostrar, 1200);

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[data-abrir-cookies]')) { e.preventDefault(); mostrar(20); }
  });
})();
