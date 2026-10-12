/* =========================================================
   medicao.js — conta visitas, cliques no WhatsApp e cliques em "Ver Site".
   Manda só o evento pro PostHog: sem cookie, sem nada guardado no
   aparelho e sem dado pessoal (o formulário de contato não passa por aqui).
   Sem a chave do projeto, não envia nada.
   ========================================================= */
(function () {
  'use strict';

  var CHAVE = 'phc_kMFjDnKFJGUkYsFwbae5H6jNuChhFMr4vrxWvvtvQeMq';   // chave pública do projeto no PostHog (começa com phc_)
  var HOST = 'https://us.i.posthog.com';

  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';
  if (!CHAVE || local || navigator.doNotTrack === '1') {
    window.medir = function () {};
    return;
  }

  /* Um número sorteado por visita, só na memória: some ao fechar a página */
  var visita = 'v-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);

  function medir(evento, dados) {
    var props = {
      $current_url: location.origin + location.pathname,
      $host: location.host,
      $pathname: location.pathname,
      $referrer: document.referrer || '$direct',
      $process_person_profile: false
    };
    Object.keys(dados || {}).forEach(function (k) { props[k] = dados[k]; });
    try {
      fetch(HOST + '/i/v0/e/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: CHAVE, event: evento, distinct_id: visita, properties: props }),
        keepalive: true
      }).catch(function () {});
    } catch (erro) { /* medição nunca pode travar o site */ }
  }
  window.medir = medir;

  medir('$pageview');

  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var whats = e.target.closest('a[href*="wa.me"]');
    if (whats) {
      var secao = whats.closest('section[id], footer, header');
      medir('clique_whatsapp', { onde: secao ? (secao.id || secao.tagName.toLowerCase()) : 'flutuante' });
      return;
    }
    var projeto = e.target.closest('a.project-link');
    if (projeto) {
      var cartao = projeto.closest('.project-content');
      var titulo = cartao && cartao.querySelector('.project-title');
      medir('clique_ver_site', { projeto: titulo ? titulo.textContent.trim() : projeto.href });
    }
  });
})();
