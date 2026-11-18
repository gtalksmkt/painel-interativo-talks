/* ==================================================================
   PAINEL INTERATIVO TALKS · navegação e componentes
   (conteúdo em js/dados.js · roleta em js/roleta.js)
   ================================================================== */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  /* altura do topo fixo (barra da marca + faixa de cadastro) */
  function alturaTopo() { return ($('#topbar') ? $('#topbar').offsetHeight : 0) + ($('#promo') ? $('#promo').offsetHeight : 0); }
  function ic(id, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '"><use href="#i-' + id + '"/></svg>'; }
  function wa(key, msg) { return 'https://wa.me/' + WHATS[key] + '?text=' + encodeURIComponent(msg); }
  var LETRAS = 'ABCDE';
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* data de Brasília (as datas dos lotes viram à meia-noite de Brasília) */
  function dataBR(iso) { return Date.parse(iso + 'T00:00:00-03:00'); }
  function brl(centavos) { return (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
  function diaMes(iso) { var p = iso.split('-'); return p[2] + '/' + p[1]; }
  function loteDoDia(lotes) {
    var agora = Date.now(), atual = null;
    lotes.forEach(function (l) { if (agora >= dataBR(l.inicio)) atual = l; });
    return atual;
  }

  /* ---------------- aviso rápido ---------------- */
  var toastT;
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('on'); }, 2600);
  }
  window.toast = toast;

  /* ==================================================================
     CONFETE (usado pela roleta e pelos acertos)
     ================================================================== */
  var Confetti = (function () {
    var cv = $('#confetti'), ctx = cv.getContext('2d'), parts = [], raf = 0, dpr = 1;
    var CORES = ['#F5C451', '#FFE08A', '#F51627', '#FF3A49', '#FFFFFF', '#C8922F'];
    function size() { dpr = Math.min(window.devicePixelRatio || 1, 2); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; }
    size(); addEventListener('resize', size);
    function add(x, y, n, o) {
      o = o || {};
      for (var i = 0; i < n; i++) {
        var a = (o.angle != null ? o.angle : -Math.PI / 2) + (Math.random() - .5) * (o.spread || Math.PI * 1.2);
        var v = (o.power || 13) * (.45 + Math.random() * .75);
        parts.push({
          x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
          w: 6 + Math.random() * 8, h: 4 + Math.random() * 6, r: Math.random() * 6.28, vr: (Math.random() - .5) * .35,
          c: (o.colors || CORES)[Math.floor(Math.random() * (o.colors || CORES).length)],
          life: 0, max: 160 + Math.random() * 90, shape: Math.random() < .25 ? 1 : 0, tilt: Math.random() * 6.28
        });
      }
      if (!raf) raf = requestAnimationFrame(loop);
    }
    function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        p.vy += .32; p.vx *= .985; p.vy *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.tilt += .12; p.life++;
        if (p.life > p.max || p.y > innerHeight + 40) { parts.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = Math.min(1, (p.max - p.life) / 40);
        ctx.translate(p.x * dpr, p.y * dpr); ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        if (p.shape) { ctx.beginPath(); ctx.arc(0, 0, p.h * .6 * dpr, 0, 6.28); ctx.fill(); }
        else ctx.fillRect(-p.w / 2 * dpr, -p.h / 2 * dpr * Math.abs(Math.cos(p.tilt)), p.w * dpr, p.h * dpr * Math.abs(Math.cos(p.tilt)));
        ctx.restore();
      }
      raf = parts.length ? requestAnimationFrame(loop) : 0;
      if (!raf) ctx.clearRect(0, 0, cv.width, cv.height);
    }
    return {
      burst: function (x, y, n, o) { if (!reduz) add(x, y, n || 90, o); },
      celebrate: function (big) {
        if (reduz) return;
        var w = innerWidth, h = innerHeight;
        add(w * .5, h * .45, big ? 220 : 120, { spread: Math.PI * 2, power: big ? 17 : 13 });
        add(0, h * .8, big ? 90 : 50, { angle: -Math.PI / 3, spread: .7, power: 22 });
        add(w, h * .8, big ? 90 : 50, { angle: -Math.PI * 2 / 3, spread: .7, power: 22 });
        if (big) {
          var k = 0, iv = setInterval(function () {
            add(Math.random() * w, -10, 40, { angle: Math.PI / 2, spread: 1.2, power: 4 });
            add(w * (.2 + Math.random() * .6), h * (.2 + Math.random() * .3), 60, { spread: Math.PI * 2, power: 11 });
            if (++k > 7) clearInterval(iv);
          }, 420);
        }
      }
    };
  })();
  window.Confetti = Confetti;

  /* ==================================================================
     ABAS
     ================================================================== */
  var ABAS = {
    geral: { l: 'Visão geral', i: 'layout' },
    portal: { l: 'Portal', i: 'grid' },
    aula: { l: 'Aula experimental', i: 'video' },
    questoes: { l: 'Questões', i: 'q' },
    flashcards: { l: 'Flashcards', i: 'cards' },
    novidades: { l: 'Novidades', i: 'star' },
    artigo: { l: 'Artigo + áudio', i: 'headph' },
    temas: { l: 'Temas 2027', i: 'cal' },
    teste: { l: 'Teste do mês', i: 'clip' },
    oferta: { l: 'R$ 9,90', i: 'tag' },
    video: { l: 'Vídeo', i: 'video' },
    fotos: { l: 'Fotos', i: 'image' },
    pratica: { l: 'Revisão Prática', i: 'target' },
    teorica: { l: 'Revisão Teórica', i: 'book' },
    midia: { l: 'Fotos e vídeos', i: 'image' },
    pgeral: { l: 'Visão geral', i: 'award' },
    jornada: { l: 'Jornada', i: 'layers' },
    presencial: { l: 'Encontros em SP', i: 'cal' },
    curso: { l: 'O curso', i: 'steth' },
    programacao: { l: 'Programação', i: 'clock' },
    bpvideo: { l: 'Vídeo', i: 'video' }
  };
  function tabsHtml(lista) {
    return '<div class="tabs-anchor"></div><div class="tabs-wrap"><div class="tabs" role="tablist">' + lista.map(function (k, n) {
      return '<button class="tab' + (n ? '' : ' on') + '" role="tab" data-tab="' + k + '" aria-selected="' + (n ? 'false' : 'true') + '">' + ic(ABAS[k].i) + ABAS[k].l + '</button>';
    }).join('') + '</div></div>';
  }
  /* liga as abas de uma tela; onShow[aba] roda na primeira vez que ela abre */
  function wireTabs(root, onShow) {
    var shown = {};
    function abrir(k, rolar) {
      $$('.tab', root).forEach(function (b) { var on = b.getAttribute('data-tab') === k; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); if (on && b.scrollIntoView && rolar !== false) b.parentNode.scrollTo({ left: b.offsetLeft - 40, behavior: 'smooth' }); });
      $$('.panel', root).forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-panel') === k); });
      if (rolar !== false) {
        /* a âncora fica no fluxo normal (a barra de abas é sticky e mente a posição) */
        var tw = $('.tabs-anchor', root);
        var y = tw.getBoundingClientRect().top + scrollY - alturaTopo() - 10;
        if (scrollY > y + 4) scrollTo({ top: y, behavior: reduz ? 'auto' : 'smooth' });
      }
      if (!shown[k] && onShow && onShow[k]) { shown[k] = 1; onShow[k](); }
      else if (onShow && onShow['_' + k]) onShow['_' + k]();
    }
    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-tab]'); if (t && root.contains(t)) { abrir(t.getAttribute('data-tab')); return; }
      var g = e.target.closest('[data-goto]'); if (g && root.contains(g)) { e.preventDefault(); abrir(g.getAttribute('data-goto')); }
    });
    root._abrir = abrir;
    var first = $('.tab', root); if (first) abrir(first.getAttribute('data-tab'), false);
  }

  /* ==================================================================
     PEDAÇOS COMUNS
     ================================================================== */
  function voltar() { return '<a class="back" href="#inicio">' + ic('back') + ' Voltar</a>'; }
  function heroHtml(o) {
    return '<div class="p-hero">' +
      '<div>' +
        '<span class="eyebrow">' + o.eyebrow + '</span>' +
        '<h1 class="p-title">' + o.titulo + '</h1>' +
        '<p class="p-lead">' + o.lead + '</p>' +
        (o.stats ? '<div class="p-stats">' + o.stats.map(function (s) { return '<div class="p-stat"><b>' + s.n + '</b><span>' + s.t + '</span></div>'; }).join('') + '</div>' : '') +
        '<div class="p-cta">' + o.cta + '</div>' +
        (o.nota ? '<p class="p-note">' + o.nota + '</p>' : '') +
      '</div>' +
      (o.aside || '<div class="p-media"><span class="live"><i></i> Grupo Talks</span><img src="' + o.foto + '" alt="" />' +
        '<div class="p-media-cap">' + (o.logo ? '<img src="' + o.logo + '" alt="" />' : '') + '<span>' + o.fotoCap + '</span></div></div>') +
    '</div>';
  }
  function btnWhats(key, msg, txt, cls) {
    return '<a class="btn ' + (cls || 'btn-whats') + '" href="' + wa(key, msg) + '" target="_blank" rel="noopener">' + ic('whats') + ' ' + (txt || 'Falar no WhatsApp') + '</a>';
  }
  function videoHtml(key) {
    var v = VIDEOS[key];
    /* vídeo hospedado no próprio painel (pasta media/) */
    if (v.arq) return '<figure class="vfile' + (v.vertical ? ' vert' : '') + '"><video src="' + v.arq + '#t=0.1" controls playsinline preload="metadata"></video><figcaption>' + ic('play') + v.titulo + '</figcaption></figure>';
    return '<div class="video-frame" data-video="' + key + '"><div class="video-poster" role="button" tabindex="0" aria-label="Assistir: ' + v.titulo + '">' +
      '<img src="' + v.poster + '" alt="" loading="lazy" /><span class="play-btn">' + ic('play') + '</span><b>' + v.titulo + '</b><small>Toque para assistir</small></div></div>';
  }
  function ligarVideos(root) {
    $$('[data-video]', root).forEach(function (fr) {
      var p = $('.video-poster', fr);
      if (!p || p._ligado) return;
      p._ligado = true;
      function play() {
        var v = VIDEOS[fr.getAttribute('data-video')];
        fr.innerHTML = '<iframe src="https://player.vimeo.com/video/' + v.id + '?h=' + v.h + '&autoplay=1&title=0&byline=0&portrait=0&dnt=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + v.titulo + '"></iframe>';
      }
      p.addEventListener('click', play);
      p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
    });
  }
  /* pausa vídeos ao sair da tela (recarrega o pôster) */
  function pararVideos(root) {
    $$('video', root).forEach(function (v) { try { v.pause(); } catch (e) {} });
    $$('[data-video]', root).forEach(function (fr) {
      if ($('iframe', fr)) { var k = fr.getAttribute('data-video'); var tmp = document.createElement('div'); tmp.innerHTML = videoHtml(k); fr.replaceWith(tmp.firstChild); }
    });
    ligarVideos(root);
  }
  /* clipes de bastidores: tocam sem som em loop só enquanto aparecem na tela; toque = tela cheia */
  function clipesHtml(lista) {
    return '<div class="clips">' + lista.map(function (src) {
      return '<button class="clip" type="button" aria-label="Ver clipe em tela cheia"><video src="' + src + '" muted loop playsinline preload="none"></video><span>' + ic('expand') + '</span></button>';
    }).join('') + '</div>';
  }
  var clipObs = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { var v = e.target; if (e.isIntersecting && !reduz) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
  }, { threshold: .35 }) : null;
  function ligarClipes(root) {
    $$('.clip video', root).forEach(function (v) {
      if (clipObs) clipObs.observe(v);
      /* clipes gravados deitados ganham moldura deitada */
      v.addEventListener('loadedmetadata', function () { if (v.videoWidth > v.videoHeight) v.parentNode.classList.add('land'); });
    });
    $$('.clip', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var v = $('video', b);
        v.muted = false; v.controls = true; v.currentTime = 0;
        var fs = v.requestFullscreen || v.webkitRequestFullscreen || v.webkitEnterFullscreen;
        if (fs) { try { fs.call(v); } catch (e) {} }
        v.play();
      });
    });
    document.addEventListener('fullscreenchange', function () {
      if (!document.fullscreenElement) $$('.clip video', root).forEach(function (v) { v.muted = true; v.controls = false; });
    });
  }
  function ringHtml(pct, label, val) {
    var C = 2 * Math.PI * 52;
    return '<div class="ring"><svg viewBox="0 0 120 120"><circle class="bgc" cx="60" cy="60" r="52"/><circle class="fgc" cx="60" cy="60" r="52" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + C.toFixed(1) + '" data-pct="' + pct + '"/></svg><div class="rv"><b>' + (val || pct + '%') + '</b><span>' + label + '</span></div></div>';
  }
  function animarRings(root) {
    $$('.fgc[data-pct]', root).forEach(function (c) {
      var C = parseFloat(c.getAttribute('stroke-dasharray'));
      c.style.strokeDashoffset = C;
      requestAnimationFrame(function () { requestAnimationFrame(function () { c.style.strokeDashoffset = C * (1 - c.getAttribute('data-pct') / 100); }); });
    });
  }

  /* ==================================================================
     PORTAL (demonstração)
     ================================================================== */
  function portalHtml(P) {
    var pt = P.portal;
    function row(a, btn) {
      var icone = { done: 'check', now: 'play', 'new': 'star', lock: 'lock' }[a.st];
      var tag = btn ? 'button' : 'div';
      return '<' + tag + ' class="pm-row"' + (btn ? ' data-goto="' + btn + '"' : '') + '><span class="st ' + a.st + '">' + ic(icone) + '</span><div class="tx"><b>' + a.t + '</b><small>' + a.s + '</small></div><span class="meta' + (a.st === 'now' ? ' ac' : '') + '">' + a.meta + '</span></' + tag + '>';
    }
    var side = [['inicio', 'home', 'Início'], ['aulas', 'video', 'Aulas'], ['eixos', 'layers', 'Eixos temáticos'], ['simulados', 'clip', 'Simulados'], ['questoes', 'q', 'Banco de questões'], ['flash', 'cards', 'Flashcards'], ['desemp', 'chart', 'Desempenho']];
    return '<div class="sec-head"><span class="eyebrow">Portal do aluno</span><h2>Tudo num só lugar</h2><p>Clique no menu do portal para navegar. É assim que o aluno estuda no dia a dia.</p></div>' +
      '<div class="portal" data-portal>' +
        '<div class="portal-bar"><span class="dots"><i></i><i></i><i></i></span><span class="url">' + pt.url + '</span></div>' +
        '<div class="portal-body">' +
          '<nav class="portal-side"><div class="ps-brand"><i>' + ic('ecg') + '</i>' + pt.marca + '</div>' +
            side.map(function (s, n) { return '<button class="ps-item' + (n ? '' : ' on') + '" data-pv="' + s[0] + '">' + ic(s[1]) + s[2] + '</button>'; }).join('') +
          '</nav>' +
          '<div class="portal-main">' +
            /* início */
            '<div class="pm-view on" data-view="inicio">' +
              '<div class="pm-h"><h4>' + pt.ola + '</h4><span>Seu progresso no curso</span></div>' +
              '<div class="pm-cards">' + pt.cards.map(function (c) { return '<div class="pm-card' + (c.hl ? ' hl' : '') + '"><b>' + c.n + '</b><span>' + c.t + '</span></div>'; }).join('') + '</div>' +
              '<div class="pm-continue" data-goto="aula"><div class="pm-thumb"><img src="' + pt.continuar.img + '" alt="" loading="lazy" />' + ic('play') + '</div><div style="flex:1;min-width:0"><small>Continue de onde parou</small><b>' + pt.continuar.t + '</b><small>' + pt.continuar.s + '</small><div class="pbar"><i style="width:' + pt.continuar.pct + '%"></i></div></div></div>' +
              '<div class="pm-list">' + pt.aulas.slice(2, 4).map(function (a) { return row(a); }).join('') + '</div>' +
            '</div>' +
            /* aulas */
            '<div class="pm-view" data-view="aulas"><div class="pm-h"><h4>Aulas</h4><span>Toque em uma aula para ver a aula experimental</span></div><div class="pm-list">' +
              pt.aulas.map(function (a) { return row(a, a.st === 'lock' ? null : 'aula'); }).join('') + '</div></div>' +
            /* eixos */
            '<div class="pm-view" data-view="eixos"><div class="pm-h"><h4>Eixos temáticos</h4><span>As aulas organizadas por tema</span></div><div class="pm-chips">' +
              pt.eixos.map(function (e) { return '<div class="pm-chip"><b>' + e.t + '</b><small>' + e.s + '</small></div>'; }).join('') + '</div></div>' +
            /* simulados */
            '<div class="pm-view" data-view="simulados"><div class="pm-h"><h4>Simulados</h4><span>No formato da prova, com cronômetro</span></div><div class="pm-list">' +
              pt.simulados.map(function (a) { return row(a); }).join('') + '</div></div>' +
            /* questões */
            '<div class="pm-view" data-view="questoes"><div class="pm-h"><h4>Banco de questões</h4><span>Monte sua lista e treine</span></div>' +
              '<div class="qcfg"><label>Tema<span class="fake-sel">Todos os eixos ' + ic('chev-r') + '</span></label><label>Quantidade<span class="fake-sel">5 questões ' + ic('chev-r') + '</span></label><label>Modo<span class="fake-sel">Estudo, com comentário ' + ic('chev-r') + '</span></label></div>' +
              '<button class="btn btn-primary" data-goto="questoes">' + ic('play') + ' Começar agora</button></div>' +
            /* flashcards */
            '<div class="pm-view" data-view="flash"><div class="pm-h"><h4>Flashcards</h4><span>Revisão espaçada: o portal sabe o que revisar hoje</span></div><div class="pm-chips">' +
              pt.decks.map(function (d) { return '<div class="pm-chip"><b>' + d.t + '</b><small>' + d.s + '</small></div>'; }).join('') + '</div>' +
              '<div class="pm-cta-row"><button class="btn btn-primary" data-goto="flashcards">' + ic('cards') + ' Revisar agora</button></div></div>' +
            /* desempenho */
            '<div class="pm-view" data-view="desemp"><div class="pm-h"><h4>Desempenho</h4><span>Seu acerto por tema</span></div>' +
              '<div class="pm-ring-row">' + ringHtml(pt.acerto, 'de acerto') + '<p style="flex:1;min-width:200px;color:var(--gray-light);font-size:.92rem">O painel mostra onde você está forte e o que precisa revisar antes da prova. Os temas em <b style="color:var(--gold-hot)">amarelo</b> pedem atenção.</p></div>' +
              '<div class="pm-bars">' + pt.desempenho.map(function (d) { return '<div class="pm-bar"><span>' + d.t + '</span><div class="bt"><i data-w="' + d.v + '"' + (d.v < 65 ? ' class="lo"' : '') + '></i></div><b>' + d.v + '%</b></div>'; }).join('') + '</div></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<p class="demo-tag">' + ic('image') + ' Demonstração ilustrativa do portal, com dados fictícios.</p>';
  }
  function ligarPortal(root) {
    var pr = $('[data-portal]', root); if (!pr) return;
    pr.addEventListener('click', function (e) {
      var b = e.target.closest('.ps-item'); if (!b) return;
      var v = b.getAttribute('data-pv');
      $$('.ps-item', pr).forEach(function (x) { x.classList.toggle('on', x === b); });
      $$('.pm-view', pr).forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-view') === v); });
      if (v === 'desemp') {
        var bars = $$('.bt i', pr); bars.forEach(function (i) { i.style.width = 0; });
        requestAnimationFrame(function () { requestAnimationFrame(function () { bars.forEach(function (i) { i.style.width = i.getAttribute('data-w') + '%'; }); }); });
        animarRings(pr);
      }
    });
  }

  /* ==================================================================
     AULA EXPERIMENTAL (passo a passo)
     ================================================================== */
  function aulaHtml(A, P) {
    var total = A.slides.length;
    var slides = A.slides.map(function (s, n) {
      var h = '<div class="slide' + (n ? '' : ' on') + '" data-i="' + n + '">';
      if (s.tipo === 'capa') {
        h += '<div class="sl-cover"><span class="sl-tag">' + s.tag + '</span><h3>' + s.titulo + '</h3><p>' + s.texto + '</p><div class="meta">' + s.meta.map(function (m) { return '<span>' + ic('check') + m + '</span>'; }).join('') + '</div>' +
          '<div style="margin-top:26px"><button class="btn btn-primary" data-aula="next">' + ic('play') + ' Começar a aula</button></div></div>';
      } else if (s.tipo === 'lista') {
        h += '<span class="sl-tag">' + s.tag + '</span><h3>' + s.titulo + '</h3><ul class="sl-list">' + s.itens.map(function (it, k) {
          var n = s.estilo === 'no' ? ic('x') : s.estilo === 'yes' ? ic('check') : (k + 1);
          return '<li class="' + (s.estilo || '') + '" style="animation-delay:' + (k * .09 + .1) + 's"><span class="n">' + n + '</span><span><b>' + it.b + '</b> ' + it.t + '</span></li>';
        }).join('') + '</ul>';
      } else if (s.tipo === 'numero') {
        h += '<span class="sl-tag">' + s.tag + '</span><h3>' + s.titulo + '</h3><div class="sl-big"><b>' + s.num + '</b><span>' + s.legenda + '</span></div><p>' + s.texto + '</p>';
      } else if (s.tipo === 'teste') {
        h += '<span class="sl-tag">' + s.tag + '</span><h3 style="font-size:clamp(1.3rem,2.8vw,2rem);text-transform:none;letter-spacing:.2px">' + s.titulo + '</h3><div class="mini-q" data-c="' + s.c + '">' +
          s.opts.map(function (o, k) { return '<button data-k="' + k + '"><span class="lt">' + LETRAS[k] + '</span>' + o + '</button>'; }).join('') + '</div><div class="mini-com" hidden></div>';
      } else if (s.tipo === 'fim') {
        h += '<div class="sl-cover"><span class="sl-tag">Fim da aula experimental</span><h3>' + s.titulo + '</h3><p>' + s.texto + '</p><div class="p-cta" style="margin-top:24px">' +
          '<button class="btn btn-primary" data-goto="questoes">' + ic('q') + ' Fazer questões</button><button class="btn btn-glass" data-goto="flashcards">' + ic('cards') + ' Revisar com flashcards</button>' +
          btnWhats(P.whatsKey, P.whatsMsg, 'Quero saber mais') + '</div></div>';
      }
      if (s.dica) h += '<div class="sl-tip">' + ic('bulb') + '<span><b>Dica de prova</b><br>' + s.dica + '</span></div>';
      return h + '</div>';
    }).join('');
    return '<div class="aula" data-aula-root>' +
      '<div class="aula-stage">' +
        '<div class="aula-top"><span class="rec"><i></i> Aula experimental</span><span class="ttl">' + A.titulo + '</span><span class="cnt"><b data-aula-n>1</b>/' + total + '</span></div>' +
        '<div class="aula-prog">' + A.slides.map(function () { return '<i></i>'; }).join('') + '</div>' +
        '<div class="slides">' + slides + '</div>' +
        '<div class="aula-nav"><button class="round-btn" data-aula="prev" aria-label="Tela anterior">' + ic('chev-l') + '</button>' +
          '<span class="fc-hint">' + ic('arrow') + ' Deslize ou use as setas</span>' +
          '<button class="round-btn" data-aula="next" aria-label="Próxima tela">' + ic('chev-r') + '</button></div>' +
      '</div></div>';
  }
  function ligarAula(root) {
    var ar = $('[data-aula-root]', root); if (!ar) return;
    var slides = $$('.slide', ar), bars = $$('.aula-prog i', ar), idx = 0;
    var prev = $('[data-aula="prev"]', ar.querySelector('.aula-nav')), next = $('.aula-nav [data-aula="next"]', ar);
    function show(n, back) {
      idx = Math.max(0, Math.min(slides.length - 1, n));
      slides.forEach(function (s, k) { s.classList.toggle('on', k === idx); s.classList.toggle('back-in', k === idx && !!back); });
      bars.forEach(function (b, k) { b.classList.toggle('done', k <= idx); });
      $('[data-aula-n]', ar).textContent = idx + 1;
      prev.disabled = idx === 0; next.disabled = idx === slides.length - 1;
      if (idx === slides.length - 1) Confetti.burst(innerWidth / 2, innerHeight * .55, 70);
    }
    ar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-aula]');
      if (b) { show(idx + (b.getAttribute('data-aula') === 'next' ? 1 : -1), b.getAttribute('data-aula') === 'prev'); return; }
      var o = e.target.closest('.mini-q button');
      if (o) {
        var box = o.parentNode, c = +box.getAttribute('data-c'), k = +o.getAttribute('data-k');
        box.classList.add('locked');
        $$('button', box).forEach(function (x, j) { if (j === c) x.classList.add('right'); });
        if (k !== c) o.classList.add('wrong'); else { var r = o.getBoundingClientRect(); Confetti.burst(r.left + r.width / 2, r.top, 60); }
        var s = A_of(box), com = box.nextElementSibling;
        com.hidden = false;
        com.innerHTML = '<div class="q-comment"><div class="qc-h ' + (k === c ? 'ok' : 'ko') + '">' + ic(k === c ? 'check' : 'x') + (k === c ? 'Resposta certa!' : 'Quase! A resposta é a ' + LETRAS[c]) + '</div><p>' + s + '</p></div>';
      }
    });
    function A_of(box) { return box.getAttribute('data-com') || box.closest('.slide')._com; }
    /* guarda o comentário de cada teste no próprio slide */
    var dados = root._aula;
    slides.forEach(function (s, k) { if (dados.slides[k].com) s._com = dados.slides[k].com; });
    /* deslizar no celular */
    var x0 = null;
    ar.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    ar.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1), dx > 0);
    });
    root._aulaKey = function (e) {
      if (!ar.offsetParent) return;
      if (e.key === 'ArrowRight') show(idx + 1); else if (e.key === 'ArrowLeft') show(idx - 1, true);
    };
    show(0);
  }

  /* ==================================================================
     QUESTÕES
     ================================================================== */
  function Quiz(box, lista, o) {
    var i = 0, acertos = 0, res = [];
    function dots() { return '<div class="q-dots">' + lista.map(function (q, k) { return '<i class="' + (res[k] === true ? 'ok' : res[k] === false ? 'ko' : k === i ? 'cur' : '') + '"></i>'; }).join('') + '</div>'; }
    function render() {
      var q = lista[i];
      box.innerHTML = '<div class="q-card glass">' +
        '<div class="q-head"><span class="q-num">Questão <b>' + (i + 1) + '</b> de ' + lista.length + '</span><span class="q-topic">' + q.tema + '</span></div>' + dots() +
        '<p class="q-stem">' + q.e + '</p>' +
        '<div class="q-opts">' + q.o.map(function (t, k) { return '<button class="q-opt" data-k="' + k + '"><span class="lt">' + LETRAS[k] + '</span><span>' + t + '</span><span class="mk"></span></button>'; }).join('') + '</div>' +
        '<div class="q-after"></div></div>';
    }
    function responder(k) {
      var q = lista[i], ok = k === q.c, opts = $('.q-opts', box);
      if (opts.classList.contains('locked')) return;
      opts.classList.add('locked');
      res[i] = ok; if (ok) acertos++;
      $$('.q-opt', box).forEach(function (b, j) {
        if (j === q.c) { b.classList.add('right'); $('.mk', b).innerHTML = ic('check'); }
        else if (j === k) { b.classList.add('wrong'); $('.mk', b).innerHTML = ic('x'); }
        else b.classList.add('dim');
      });
      if (ok) { var r = $$('.q-opt', box)[k].getBoundingClientRect(); Confetti.burst(r.left + 40, r.top + r.height / 2, 50, { power: 10 }); }
      $('.q-dots', box).outerHTML = dots();
      var ult = i === lista.length - 1;
      $('.q-after', box).innerHTML = '<div class="q-comment"><div class="qc-h ' + (ok ? 'ok' : 'ko') + '">' + ic(ok ? 'check' : 'x') + (ok ? 'Acertou!' : 'Resposta certa: ' + LETRAS[q.c]) + '</div><p><b>Comentário do professor:</b> ' + q.com + '</p></div>' +
        '<div class="q-foot"><button class="btn btn-primary" data-q="next">' + (ult ? 'Ver resultado' : 'Próxima questão') + ' ' + ic('arrow') + '</button></div>';
    }
    function fim() {
      var pct = Math.round(acertos / lista.length * 100);
      var msg = pct === 100 ? 'Gabaritou! Você está afiado(a).' : pct >= 60 ? 'Mandou bem! Com o método certo, esse número só sobe.' : 'Bom começo! É exatamente para isso que existe o banco de questões.';
      box.innerHTML = '<div class="q-result glass">' + ringHtml(pct, 'de acerto', acertos + '/' + lista.length) +
        '<h3>' + msg + '</h3><p>' + o.fim + '</p><div class="row">' +
        '<button class="btn btn-glass" data-q="again">' + ic('refresh') + ' Refazer</button>' +
        (o.proxima ? '<button class="btn btn-glass" data-goto="' + o.proxima + '">' + ic('cards') + ' Ir para os flashcards</button>' : '') +
        btnWhats(o.whatsKey, o.whatsMsg, o.ctaTx || 'Quero saber mais') + '</div></div>';
      animarRings(box);
      if (pct === 100) Confetti.celebrate(false);
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.q-opt'); if (b) { responder(+b.getAttribute('data-k')); return; }
      var a = e.target.closest('[data-q]'); if (!a) return;
      if (a.getAttribute('data-q') === 'next') { if (i < lista.length - 1) { i++; render(); box.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } else fim(); }
      else { i = 0; acertos = 0; res = []; render(); }
    });
    render();
  }

  /* ==================================================================
     FLASHCARDS
     ================================================================== */
  function Flash(box, cards, o) {
    var fila, i, cont;
    function reset(lista) { fila = lista.slice(); i = 0; cont = { e: [], d: 0, a: 0 }; render(true); }
    function render(entrada) {
      var c = fila[i];
      box.innerHTML = '<div class="fc-meta"><span>Cartão <b>' + (i + 1) + '</b> de ' + fila.length + '</span><span>' + ic('flip') + ' Toque para virar</span></div>' +
        '<div class="fc-stack"><div class="fc-card' + (entrada ? ' in' : '') + '" tabindex="0" role="button" aria-label="Virar cartão">' +
          '<div class="fc-face fc-front"><span class="fc-tag">' + c.tag + '</span><p class="fc-q">' + c.q + '</p><span class="fc-hint">' + ic('flip') + ' Pense na resposta e toque para conferir</span></div>' +
          '<div class="fc-face fc-back"><span class="fc-tag">Resposta</span><p class="fc-a">' + c.a + '</p><p class="fc-x">' + c.x + '</p><span class="fc-hint">Como foi? Marque abaixo</span></div>' +
        '</div></div>' +
        '<div class="fc-actions"><button class="fc-btn b1" data-r="e">Errei<small>revisar logo</small></button><button class="fc-btn b2" data-r="d">Difícil<small>revisar amanhã</small></button><button class="fc-btn b3" data-r="a">Acertei<small>revisar em 4 dias</small></button></div>';
    }
    function virar() { var c = $('.fc-card', box); c.classList.toggle('flip'); $('.fc-actions', box).classList.toggle('on', c.classList.contains('flip')); }
    function avaliar(r) {
      var card = $('.fc-card', box);
      if (r === 'e') cont.e.push(fila[i]); else cont[r]++;
      card.classList.add(r === 'a' ? 'out-r' : 'out-l');
      if (r === 'a') { var b = card.getBoundingClientRect(); Confetti.burst(b.right - 40, b.top + 40, 30, { power: 8 }); }
      setTimeout(function () { if (i < fila.length - 1) { i++; render(true); } else fim(); }, 340);
    }
    function fim() {
      box.innerHTML = '<div class="fc-end glass">' + ic('award', '') .replace('class="i"', 'class="i" style="width:54px;height:54px;color:var(--ac-l)"') +
        '<h3>Sessão concluída!</h3><p>No portal, o sistema agenda sozinho a próxima revisão de cada cartão de acordo com a sua resposta.</p>' +
        '<div class="fc-score"><div><b style="color:var(--ok)">' + cont.a + '</b><span>acertei</span></div><div><b style="color:var(--gold-hot)">' + cont.d + '</b><span>difícil</span></div><div><b style="color:var(--bad)">' + cont.e.length + '</b><span>errei</span></div></div>' +
        '<div class="row">' + (cont.e.length ? '<button class="btn btn-primary" data-f="erros">' + ic('refresh') + ' Revisar os que errei</button>' : '') +
        '<button class="btn btn-glass" data-f="todos">' + ic('cards') + ' Recomeçar</button>' + btnWhats(o.whatsKey, o.whatsMsg, o.ctaTx || 'Quero saber mais') + '</div></div>';
      if (!cont.e.length) Confetti.celebrate(false);
    }
    box.addEventListener('click', function (e) {
      if (e.target.closest('.fc-card')) { virar(); return; }
      var r = e.target.closest('[data-r]'); if (r) { avaliar(r.getAttribute('data-r')); return; }
      var f = e.target.closest('[data-f]'); if (f) reset(f.getAttribute('data-f') === 'erros' ? cont.e : cards);
    });
    box.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.fc-card')) { e.preventDefault(); virar(); } });
    reset(cards);
  }

  /* ==================================================================
     CARROSSEL + TELA CHEIA
     ================================================================== */
  var LB = { lista: [], i: 0 };
  function lbShow(n) { LB.i = (n + LB.lista.length) % LB.lista.length; var img = $('#lbImg'); img.style.animation = 'none'; img.offsetHeight; img.style.animation = ''; img.src = LB.lista[LB.i].f; img.alt = LB.lista[LB.i].t; }
  function lbOpen(lista, n) { LB.lista = lista; $('#lightbox').classList.add('on'); lbShow(n); }
  function lbClose() { $('#lightbox').classList.remove('on'); }
  $('#lbClose').addEventListener('click', lbClose);
  $('#lbPrev').addEventListener('click', function () { lbShow(LB.i - 1); });
  $('#lbNext').addEventListener('click', function () { lbShow(LB.i + 1); });
  $('#lightbox').addEventListener('click', function (e) { if (e.target.id === 'lightbox') lbClose(); });
  document.addEventListener('keydown', function (e) {
    if (!$('#lightbox').classList.contains('on')) return;
    if (e.key === 'Escape') lbClose(); else if (e.key === 'ArrowRight') lbShow(LB.i + 1); else if (e.key === 'ArrowLeft') lbShow(LB.i - 1);
  });

  function Carousel(box, fotos) {
    var i = 0, t, DUR = 4500, pausado = false;
    box.innerHTML = '<div class="carousel"><div class="car-bar"><i></i></div><div class="car-track">' +
      fotos.map(function (f, k) { return '<div class="car-slide' + (k ? '' : ' on') + '" data-k="' + k + '"><img class="bgblur" src="' + f.f + '" alt="" aria-hidden="true" loading="' + (k < 2 ? 'eager' : 'lazy') + '" /><img src="' + f.f + '" alt="' + f.t + '" loading="' + (k < 2 ? 'eager' : 'lazy') + '" /><div class="car-cap"><b>' + f.t + '</b><span>' + f.s + '</span></div></div>'; }).join('') +
      '</div><button class="car-arrow l" aria-label="Foto anterior">' + ic('chev-l') + '</button><button class="car-arrow r" aria-label="Próxima foto">' + ic('chev-r') + '</button><span class="car-count"><b>1</b>/' + fotos.length + '</span></div>' +
      '<div class="car-thumbs">' + fotos.map(function (f, k) { return '<button class="' + (k ? '' : 'on') + '" data-k="' + k + '" aria-label="Ver foto ' + (k + 1) + '"><img src="' + f.f + '" alt="" loading="lazy" /></button>'; }).join('') + '</div>';
    var slides = $$('.car-slide', box), thumbs = $$('.car-thumbs button', box), bar = $('.car-bar i', box);
    /* uma foto só: sem setas, miniaturas nem troca automática */
    if (fotos.length < 2) { box.classList.add('car-single'); pausado = true; }
    function go(n) {
      i = (n + fotos.length) % fotos.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      thumbs.forEach(function (b, k) { b.classList.toggle('on', k === i); });
      var tb = thumbs[i]; tb.parentNode.scrollTo({ left: tb.offsetLeft - tb.parentNode.clientWidth / 2 + tb.clientWidth / 2, behavior: 'smooth' });
      $('.car-count b', box).textContent = i + 1;
      tick();
    }
    function tick() {
      clearTimeout(t); bar.classList.remove('run'); bar.offsetWidth;
      if (pausado || !box.offsetParent) return;
      bar.style.setProperty('--dur', DUR + 'ms'); bar.classList.add('run');
      t = setTimeout(function () { go(i + 1); }, DUR);
    }
    $('.car-arrow.l', box).addEventListener('click', function () { go(i - 1); });
    $('.car-arrow.r', box).addEventListener('click', function () { go(i + 1); });
    thumbs.forEach(function (b) { b.addEventListener('click', function () { go(+b.getAttribute('data-k')); }); });
    slides.forEach(function (s) { s.addEventListener('click', function () { lbOpen(fotos, +s.getAttribute('data-k')); }); });
    var tr = $('.carousel', box);
    tr.addEventListener('mouseenter', function () { pausado = true; tick(); });
    tr.addEventListener('mouseleave', function () { pausado = false; tick(); });
    var x0 = null;
    tr.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    tr.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 45) go(i + (dx < 0 ? 1 : -1)); });
    box._tick = tick; box._stop = function () { clearTimeout(t); };
    tick();
  }

  /* ==================================================================
     TELA DO PREPARATÓRIO TEME
     ================================================================== */
  function renderPrep(key) {
    var P = PRODUTOS[key], el = $('#s-' + key);
    var painel = {};

    /* visão geral */
    var planos = '';
    if (key === 'teme') {
      var L = loteDoDia(LOTES_TEME) || LOTES_TEME[0];
      planos = '<div class="block"><h3>Escolha sua modalidade</h3><div class="plans">' +
        '<div class="plan glass"><span class="tagp">Essencial</span><h3>TEME <b>Intensivo</b></h3><ul>' +
          ['Aulas completas e atualizadas', 'Banco de questões comentadas', 'Flashcards', '4 simulados: 1 presencial + 3 online'].map(function (t) { return '<li>' + ic('check') + t + '</li>'; }).join('') +
          '</ul><div class="price">6x de R$ ' + L.intensivo + '<small>sem juros · ' + L.nome + '</small></div>' +
          btnWhats('teme', 'Olá! Conheci o TEME Intensivo no Painel Interativo Talks e quero garantir minha vaga.', 'Quero o Intensivo', 'btn-glass') + '</div>' +
        '<div class="plan glass featured"><span class="tagp">Mais escolhido</span><h3>TEME <b>MasterClass</b></h3><ul>' +
          ['Tudo do Intensivo', 'TEME Cast: conteúdo em áudio', 'TEME Quest: resolução estratégica de questões', 'Painel de desempenho individual', '+ 4 simulados online extras'].map(function (t) { return '<li>' + ic('check') + t + '</li>'; }).join('') +
          '</ul><div class="price">6x de R$ ' + L.master + '<small>sem juros · ' + L.nome + '</small></div>' +
          btnWhats('teme', 'Olá! Conheci o TEME MasterClass no Painel Interativo Talks e quero garantir minha vaga.', 'Quero o MasterClass', 'btn-primary') + '</div>' +
        '<div class="plan glass gold"><span class="tagp">Inclui pós-graduação</span><h3>TEME <b>Premium</b></h3><ul>' +
          ['Tudo do MasterClass', 'Revisão Teórica e Revisão Prática presenciais', '6 encontros presenciais em São Paulo', 'Certificado de pós-graduação'].map(function (t) { return '<li>' + ic('check') + t + '</li>'; }).join('') +
          '</ul><a class="btn btn-gold" href="#premium">' + ic('arrow') + ' Conhecer o Premium</a></div>' +
        '</div></div>';
    }
    painel.geral = '<div class="feat-grid">' + P.feats.map(function (f) { return '<div class="feat glass"><div class="ic">' + ic(f.ic) + '</div><h3>' + f.t + '</h3><p>' + f.p + '</p></div>'; }).join('') + '</div>' +
      (P.video ? '<div class="block"><h3>' + VIDEOS[P.video].titulo + '</h3>' + videoHtml(P.video) + '</div>' : '') +
      planos +
      '<div class="block"><h3>Professores</h3><div class="profs">' + P.profs.map(function (p) {
        return '<div class="prof"><div class="ph"><img src="' + p.f + '" alt="' + p.n + '" loading="lazy" /></div><b>' + p.n + '</b><span>' + (p.s || P.profsSub) + '</span></div>';
      }).join('') + '</div></div>';

    painel.portal = (P.portalVideo ? '<div class="block"><h3>Veja o portal de verdade</h3><div class="vids">' + videoHtml(P.portalVideo) + '</div></div>' : '') + portalHtml(P);
    painel.aula = (P.aulaVideos ? '<div class="sec-head"><span class="eyebrow">Aula experimental</span><h2>Assista a um trecho das aulas</h2><p>Cortes reais das aulas do Preparatório TEME, com professores titulados.</p></div><div class="vids block">' + P.aulaVideos.map(videoHtml).join('') + '</div>' +
      '<div class="sec-head"><span class="eyebrow">Mini-aula interativa</span><h2>Agora experimente você</h2></div>' : '') + aulaHtml(P.aula, P);
    painel.questoes = '<div class="sec-head"><span class="eyebrow">Banco de questões</span><h2>Teste seus conhecimentos</h2><p>5 questões no estilo da prova. Marque uma alternativa e veja o comentário do professor na hora.</p></div><div class="quiz" data-quiz></div>';
    painel.flashcards = '<div class="sec-head"><span class="eyebrow">Flashcards</span><h2>Memorização ativa</h2><p>Leia a pergunta, pense na resposta e toque no cartão para conferir.</p></div><div class="fc" data-fc></div>';

    el.innerHTML = '<div class="container">' + voltar() +
      heroHtml({ eyebrow: P.eyebrow, titulo: P.titulo, lead: P.lead, stats: P.stats, nota: P.nota, foto: P.foto, logo: P.logo, fotoCap: P.fotoCap,
        cta: btnWhats(P.whatsKey, P.whatsMsg, 'Quero saber mais', 'btn-primary') + '<button class="btn btn-glass" data-goto="aula">' + ic('play') + ' Ver aula experimental</button>' }) +
      tabsHtml(P.abas) +
      P.abas.map(function (k) { return '<div class="panel" data-panel="' + k + '">' + painel[k] + '</div>'; }).join('') +
      '</div>';

    el._aula = P.aula;
    ligarVideos(el);
    ligarPortal(el);
    ligarAula(el);
    var fim = 'No TEME 2027 você tem um banco completo de questões comentadas para treinar por tema, com o seu desempenho registrado no portal.';
    Quiz($('[data-quiz]', el), P.questoes, { fim: fim, proxima: 'flashcards', whatsKey: P.whatsKey, whatsMsg: P.whatsMsg });
    Flash($('[data-fc]', el), P.flashcards, { whatsKey: P.whatsKey, whatsMsg: P.whatsMsg });
    wireTabs(el, {});
  }

  /* ==================================================================
     TEME PREMIUM (venda só pela central no WhatsApp)
     ================================================================== */
  function renderPremium() {
    var M = PREMIUM, el = $('#s-premium');
    var painel = {};
    painel.pgeral = (M.videos ? '<div class="sec-head"><span class="eyebrow">Assista</span><h2>Conheça o TEME Premium</h2></div><div class="vids block">' + M.videos.map(videoHtml).join('') + '</div>' : '') +
      '<div class="sec-head"><span class="eyebrow">Por que o Premium</span><h2>Uma jornada, dois resultados</h2><p>' + M.porque + '</p></div>' +
      '<div class="two block">' + M.resultados.map(function (r) {
        return '<div class="feat glass"><div class="ic">' + ic(r.ic) + '</div><h3>' + r.t + '</h3><p>' + r.p + '</p></div>';
      }).join('') + '</div>' +
      '<div class="block"><h3>O que está incluído</h3><div class="feat-grid four">' + M.inclui.map(function (f) {
        return '<div class="feat glass' + (f.bonus ? ' bonus' : '') + '"><div class="ic">' + ic(f.ic) + '</div><h3>' + f.t + '</h3><p>' + f.p + '</p></div>';
      }).join('') + '</div></div>' +
      '<div class="diploma-row glass"><div class="diploma"><span class="dp-seal">' + ic('award') + '</span><span class="dp-t">Certificado de</span><b class="dp-h">Pós-graduação</b><span class="dp-line"></span><span class="dp-sm">Medicina de Emergência · Turma 01 · 2027</span></div>' +
        '<div><h3>Você termina com o título no horizonte e a pós no currículo</h3><p>' + M.certificado + '</p>' + btnWhats('premium', M.whatsMsg, 'Quero minha vaga no Premium', 'btn-gold') + '</div></div>';
    painel.jornada = '<div class="sec-head"><span class="eyebrow">Como funciona</span><h2>A sua jornada até o título</h2></div>' +
      '<div class="phases">' + M.fases.map(function (f, n) {
        return '<div class="phase glass"><span class="ph-n">0' + (n + 1) + '</span><span class="ph-tag">' + f.tag + '</span><h3>' + f.t + '</h3><p>' + f.p + '</p>' +
          (f.chips ? '<div class="chips">' + f.chips.map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div>' : '') +
          (f.itens ? '<ul class="check-list">' + f.itens.map(function (c) { return '<li>' + ic('check') + c + '</li>'; }).join('') + '</ul>' : '') + '</div>';
      }).join('') + '</div><p class="p-note">' + M.notaFases + '</p>';
    painel.presencial = '<div class="sec-head"><span class="eyebrow">Programação presencial · Calendário 2027</span><h2>6 encontros presenciais em São Paulo</h2><p>Imersões práticas com simulação realística, procedimentos e contato direto com professores titulados. Sempre em fins de semana, de sexta a domingo.</p></div>' +
      '<div class="meets">' + M.encontros.map(function (e, n) {
        return '<div class="meet glass"><span class="mt-n">' + (n + 1) + '</span><div><h4>' + e.t + '</h4><span>' + e.d + '</span></div></div>';
      }).join('') + '</div>' +
      '<div class="two block" style="margin-top:22px"><div class="glass" style="padding:22px"><h3 style="font-size:1.4rem;margin-bottom:12px">Horários padronizados</h3><ul class="check-list">' +
        M.horarios.map(function (h) { return '<li>' + ic('clock') + '<span><b style="color:#fff">' + h[0] + '</b> · ' + h[1] + '</span></li>'; }).join('') + '</ul></div>' +
        '<div class="glass" style="padding:22px"><h3 style="font-size:1.4rem;margin-bottom:10px">Prática de verdade</h3><p style="color:var(--gray-light);margin-bottom:18px">' + M.pratica + '</p>' +
        btnWhats('premium', M.whatsMsg, 'Falar com a central', 'btn-whats') + '</div></div>';

    var abas = ['pgeral', 'jornada', 'presencial'];
    el.innerHTML = '<div class="container">' + voltar() +
      heroHtml({ eyebrow: 'Emergency Talks · Turma 01 · 2027', titulo: 'TEME <span class="accent">Premium</span>',
        lead: M.lead, stats: M.stats,
        cta: btnWhats('premium', M.whatsMsg, 'Quero minha vaga', 'btn-gold') + '<button class="btn btn-glass" data-goto="presencial">' + ic('cal') + ' Ver encontros</button>',
        nota: 'Vagas limitadas pela capacidade dos encontros presenciais.',
        foto: 'img/premium.jpg', logo: 'img/logo-emergency.png', fotoCap: 'Preparação para o TEME + Pós-graduação' }) +
      tabsHtml(abas) +
      abas.map(function (k) { return '<div class="panel" data-panel="' + k + '">' + painel[k] + '</div>'; }).join('') +
      '</div>';
    wireTabs(el, {});
  }

  /* ==================================================================
     THE BIG POCUS (curso presencial)
     ================================================================== */
  function renderBigPocus() {
    var G = BIGPOCUS, el = $('#s-bigpocus');
    var painel = {};
    painel.curso = '<div class="sec-head"><span class="eyebrow">Aprenda, pratique e transforme</span><h2>Sua rotina na emergência, com POCUS</h2><p>' + G.sobre + '</p></div>' +
      '<div class="feat-grid">' + G.pilares.map(function (f) { return '<div class="feat glass"><div class="ic">' + ic(f.ic) + '</div><h3>' + f.t + '</h3><p>' + f.p + '</p></div>'; }).join('') + '</div>' +
      '<div class="block"><h3>Formato do curso</h3><div class="steps">' + G.papeis.map(function (p, n) { return '<div class="step glass"><span class="sn">0' + (n + 1) + '</span><h4>' + p.t + '</h4><p>' + p.p + '</p></div>'; }).join('') + '</div></div>' +
      '<div class="block"><h3>Formato das aulas</h3><div class="steps">' + G.aulas.map(function (p) { return '<div class="step glass"><div class="feat" style="padding:0"><div class="ic">' + ic(p.ic) + '</div></div><h4>' + p.t + '</h4><p>' + p.p + '</p></div>'; }).join('') + '</div></div>' +
      '<div class="block"><h3>Professores</h3><div class="profs">' + G.profs.map(function (p) {
        return '<div class="prof"><div class="ph"><img src="' + p.f + '" alt="' + p.n + '" loading="lazy" /></div><b>' + p.n + '</b><span>Medicina de Emergência</span></div>';
      }).join('') + '</div></div>';
    painel.programacao = '<div class="sec-head"><span class="eyebrow">' + G.quando + '</span><h2>Programação do evento</h2></div>' +
      '<div class="two">' + G.dias.map(function (d) {
        return '<div class="day glass"><div class="day-h"><b>' + d.t + '</b><span>' + d.s + '</span></div><ul>' + d.g.map(function (g) {
          var pausa = /Intervalo|Almoço/.test(g[1]);
          return '<li class="' + (pausa ? 'pause' : '') + '"><time>' + g[0] + '</time><span>' + g[1] + '</span></li>';
        }).join('') + '</ul></div>';
      }).join('') + '</div>';
    painel.midia = midiaHtml('Veja como é o The Big Pocus', 'Vídeos, fotos e bastidores da última edição. Toque numa foto para ampliar.', G.videos) +
      (G.clipes && G.clipes.length ? '<div class="block"><h3>Bastidores</h3><p class="clips-sub">Momentos gravados no curso. Toque num clipe para ver em tela cheia, com som.</p>' + clipesHtml(G.clipes) + '</div>' : '');

    var abas = ['midia', 'curso', 'programacao'];
    el.innerHTML = '<div class="container">' + voltar() +
      heroHtml({ eyebrow: 'Emergency Talks · Curso presencial · Edição 2027', titulo: 'The Big <span class="accent">Pocus</span>',
        lead: G.lead, stats: G.stats,
        cta: btnMidia() + btnWhats('bigpocus', G.whatsMsg, 'Quero me inscrever', 'btn-primary') + '<button class="btn btn-glass" data-goto="programacao">' + ic('cal') + ' Ver programação</button>',
        foto: G.foto || 'img/bp-pratica.jpg', logo: 'img/bp-logo.png', fotoCap: G.quando }) +
      tabsHtml(abas) +
      abas.map(function (k) { return '<div class="panel" data-panel="' + k + '">' + painel[k] + '</div>'; }).join('') +
      '</div>';
    ligarVideos(el);
    ligarClipes(el);
    var car = $('[data-car]', el);
    Carousel(car, G.fotos);
    wireTabs(el, { _midia: function () { car._tick(); }, midia: function () { car._tick(); } });
  }

  /* aba "Fotos e vídeos" (Revisões e The Big Pocus) */
  function btnMidia() { return '<button class="btn btn-gold" data-goto="midia">' + ic('image') + ' Ver fotos e vídeos</button>'; }
  function midiaHtml(titulo, sub, videos) {
    return '<div class="sec-head"><span class="eyebrow">Fotos e vídeos</span><h2>' + titulo + '</h2><p>' + sub + '</p></div>' +
      '<div class="block"><h3>' + (videos.length > 1 ? 'Vídeos' : 'Vídeo') + '</h3><div class="vids">' + videos.map(videoHtml).join('') + '</div></div>' +
      '<div class="block"><h3>Fotos</h3><div data-car></div></div>';
  }

  /* ==================================================================
     ATUALIZA TALKS
     ================================================================== */
  function renderAtualiza() {
    var A = ATUALIZA, el = $('#s-atualiza'), of = A.oferta;
    var ofertaCard = '<div class="bf"><span class="bf-tag">' + ic('tag') + ' ' + of.tag + '</span>' +
      '<p class="bf-from">Assine o Atualiza Talks por</p>' +
      '<div class="bf-price"><small>R$</small><b>' + of.preco + '</b><em>' + of.centavos + '</em></div>' +
      '<p class="bf-sub">' + of.sub + '</p>' +
      '<ul>' + of.itens.map(function (t) { return '<li>' + ic('check') + t + '</li>'; }).join('') + '</ul>' +
      btnWhats('atualiza', A.whatsMsg, 'Quero por R$ 9,90', 'btn-gold') +
      '<p class="bf-note">' + of.nota + '</p></div>';

    var MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    var painel = {};
    painel.novidades =
      '<div class="countdown glass"><div class="cd-n" data-cd><div><b>--</b><span>dias</span></div><div><b>--</b><span>horas</span></div><div><b>--</b><span>min</span></div></div>' +
        '<div class="cd-t"><b>Primeiro encontro ao vivo: AVC</b><span>Sábado, 16 de janeiro de 2027, às 9h (horário de Brasília)</span></div></div>' +
      '<div class="news-grid">' + A.novidades.map(function (n) {
        return '<div class="news glass' + (n.novo ? ' new' : '') + '"><div class="ic">' + ic(n.ic) + '</div><span class="when">' + n.when + '</span><h3>' + n.t + '</h3><p>' + n.p + '</p></div>';
      }).join('') + '</div>';

    var bars = ''; for (var b = 0; b < 56; b++) bars += '<i style="height:' + (18 + Math.abs(Math.sin(b * .7) * 60 + Math.sin(b * 2.3) * 22)).toFixed(0) + '%"></i>';
    painel.artigo = '<div class="sec-head"><span class="eyebrow">Toda segunda-feira</span><h2>Artigo + áudio + flashcards</h2><p>Assim chega o conteúdo da semana no portal.</p></div>' +
      '<div class="article">' +
        '<div class="art-card glass"><div class="lbl"><span>Artigo da semana</span><span class="g">Segunda-feira</span><span class="g">' + A.artigo.tema + '</span></div>' +
          '<h3>' + A.artigo.titulo + '</h3><p>' + A.artigo.resumo + '</p><ul class="art-points">' + A.artigo.pontos.map(function (p) { return '<li>' + ic('check') + p + '</li>'; }).join('') + '</ul>' +
          '<div class="p-cta"><button class="btn btn-primary btn-sm" data-goto="flashcards">' + ic('cards') + ' Flashcards do artigo</button><button class="btn btn-glass btn-sm" data-goto="teste">' + ic('clip') + ' Teste do mês</button></div></div>' +
        '<div class="player glass" data-player><div class="pl-top"><span class="pl-cover">' + ic('headph') + '</span><div><b>' + A.artigo.audio + '</b><small>Atualiza Talks ME · ' + A.artigo.tema + '</small></div></div>' +
          '<div class="wave">' + bars + '</div>' +
          '<div class="pl-ctrl"><button class="pl-play" aria-label="Tocar prévia">' + ic('play') + '</button><span class="pl-time"><span data-t>0:00</span> / 14:00</span><button class="pl-speed">1x</button></div>' +
          '<p class="demo-tag" style="margin:0">' + ic('headph') + ' Prévia ilustrativa do player (sem som)</p></div>' +
      '</div>';

    painel.temas = '<div class="sec-head"><span class="eyebrow">Programação 2027</span><h2>Um tema por mês</h2><p>Cada mês tem um tema central e um encontro ao vivo num sábado, das 9h às 12h. Datas sujeitas à confirmação final.</p></div>' +
      '<div class="months">' + A.temas.map(function (t, n) {
        var p = t.d.split('-');
        return '<div class="month' + (n ? '' : ' first') + '"><div class="mn"><b>' + String(n + 1).padStart(2, '0') + '</b><span>' + MESES[+p[1] - 1] + ' · sáb ' + p[2] + '</span></div><div><h4>' + t.t + '</h4><small>' + t.s + '</small></div></div>';
      }).join('') + '</div>';
    painel.flashcards = '<div class="sec-head"><span class="eyebrow">Flashcards</span><h2>Os pontos de cada artigo</h2><p>Toque no cartão para ver a resposta.</p></div><div class="fc" data-fc></div>';
    painel.teste = '<div class="sec-head"><span class="eyebrow">Teste do mês</span><h2>20 questões com gabarito</h2><p>Depois do último artigo de cada mês, um teste sobre o que você leu. Experimente 3 questões.</p></div><div class="quiz" data-quiz></div>';
    painel.oferta = '<div style="max-width:520px;margin:0 auto">' + ofertaCard + '</div>';

    var abas = ['novidades', 'artigo', 'temas', 'flashcards', 'teste', 'oferta'];
    el.innerHTML = '<div class="container">' + voltar() +
      heroHtml({ eyebrow: 'Emergency Talks · Atualização contínua', titulo: 'Atualiza <span class="accent">Talks</span>',
        lead: 'Atualização em <b>Medicina de Emergência</b> para médicos com ou sem título: artigo comentado com áudio e flashcards toda segunda e um encontro ao vivo por mês.',
        stats: [{ n: '52', t: 'artigos comentados no ano' }, { n: '12', t: 'encontros ao vivo' }, { n: '36h', t: 'de encontros ao vivo' }, { n: '240', t: 'questões com gabarito' }],
        cta: btnWhats('atualiza', A.whatsMsg, 'Quero por R$ 9,90', 'btn-gold') + '<button class="btn btn-glass" data-goto="novidades">' + ic('star') + ' Ver novidades</button>',
        aside: '<div class="p-hero-offer">' + ofertaCard + '</div>' }) +
      tabsHtml(abas) +
      abas.map(function (k) { return '<div class="panel" data-panel="' + k + '">' + painel[k] + '</div>'; }).join('') +
      '</div>';

    Flash($('[data-fc]', el), A.flashcards, { whatsKey: 'atualiza', whatsMsg: A.whatsMsg, ctaTx: 'Assinar por R$ 9,90' });
    Quiz($('[data-quiz]', el), A.questoes, { fim: 'No Atualiza Talks, todo mês tem um teste de 20 questões com gabarito sobre os artigos que você leu.', proxima: 'flashcards', whatsKey: 'atualiza', whatsMsg: A.whatsMsg, ctaTx: 'Assinar por R$ 9,90' });

    /* contagem regressiva até o 1º encontro */
    var alvo = Date.parse(A.inicio), cd = $('[data-cd]', el);
    function contar() {
      var s = Math.max(0, Math.floor((alvo - Date.now()) / 1000)), v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60)];
      $$('b', cd).forEach(function (b, k) { b.textContent = String(v[k]).padStart(2, '0'); });
    }
    contar(); setInterval(contar, 20000);

    /* player ilustrativo (sem som): só anima a onda e o tempo */
    var pl = $('[data-player]', el), wav = $$('.wave i', pl), seg = 0, tmr = null;
    function pinta() { var lim = Math.floor(seg / 840 * wav.length); wav.forEach(function (w, k) { w.classList.toggle('p', k < lim); }); var m = Math.floor(seg / 60); $('[data-t]', pl).textContent = m + ':' + String(seg % 60).padStart(2, '0'); }
    function parar() { clearInterval(tmr); tmr = null; pl.classList.remove('playing'); $('.pl-play', pl).innerHTML = ic('play'); }
    $('.pl-play', pl).addEventListener('click', function () {
      if (tmr) { parar(); return; }
      pl.classList.add('playing'); $('.pl-play', pl).innerHTML = ic('pause');
      tmr = setInterval(function () { seg = (seg + 6) % 840; pinta(); if (!pl.offsetParent) parar(); }, 100);
    });
    $('.pl-speed', pl).addEventListener('click', function () { var v = ['1x', '1.25x', '1.5x', '2x'], b = this; b.textContent = v[(v.indexOf(b.textContent) + 1) % v.length]; });

    wireTabs(el, {});
  }

  /* ==================================================================
     REVISÕES TEME
     ================================================================== */
  function renderRevisoes() {
    var R = REVISOES, el = $('#s-revisoes'), pr = R.pratica, te = R.teorica;
    var painel = {};
    painel.midia = midiaHtml('Veja como são as revisões', 'Vídeos e fotos das nossas turmas presenciais. Toque numa foto para ampliar.', R.videos);
    painel.pratica = '<div class="sec-head"><span class="eyebrow">2ª fase · prova prática</span><h2>Treine como se estivesse diante da banca</h2><p>Simulação presencial no formato real da prova prática da ABRAMEDE, com professores titulados avaliando cada estação.</p></div>' +
      '<div class="rv-stats">' + pr.stats.map(function (s) { return '<div class="p-stat"><b>' + s.n + '</b><span>' + s.t + '</span></div>'; }).join('') + '</div>' +
      '<div class="block"><h3>A dinâmica em 3 movimentos</h3><div class="steps">' + pr.passos.map(function (p, n) { return '<div class="step glass"><span class="sn">0' + (n + 1) + '</span><h4>' + p.t + '</h4><p>' + p.p + '</p></div>'; }).join('') + '</div></div>' +
      (pr.video ? '<div class="block"><h3>Veja um debriefing de verdade</h3><div class="vids">' + videoHtml(pr.video) + '</div></div>' : '') +
      '<div class="two block"><div><h3 style="font-size:1.5rem;margin-bottom:14px">O que está incluso</h3><ul class="check-list">' + pr.inclui.map(function (t) { return '<li>' + ic('check') + t + '</li>'; }).join('') + '</ul></div>' +
        '<div><h3 style="font-size:1.5rem;margin-bottom:14px">O que o debriefing aponta</h3><div class="chips" style="margin-bottom:18px">' + pr.debrief.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>' +
        '<div class="rv-mosaic"><img src="img/pratica-4.jpg" alt="Treino na Revisão Prática" loading="lazy" data-lb="8" /><img src="img/pratica-5.jpg" alt="Debriefing" loading="lazy" data-lb="8" /><img src="img/pratica-1.jpg" alt="Via aérea" loading="lazy" data-lb="0" /></div></div></div>' +
      '<p class="p-note">' + pr.nota + '</p>';
    painel.teorica = '<div class="sec-head"><span class="eyebrow">1ª fase · prova teórica</span><h2>Revise o que cai na teórica</h2><p>' + te.texto + '</p></div>' +
      '<div class="rv-stats" style="grid-template-columns:repeat(3,1fr)">' + te.stats.map(function (s) { return '<div class="p-stat"><b>' + s.n + '</b><span>' + s.t + '</span></div>'; }).join('') + '</div>' +
      (te.video ? '<div class="block"><h3>Como foi a Revisão Teórica 2026</h3><div class="vids">' + videoHtml(te.video) + '</div></div>' : '') +
      (te.clipes && te.clipes.length ? '<div class="block"><h3>Bastidores</h3><p class="clips-sub">Momentos da última edição. Toque num clipe para ver em tela cheia, com som.</p>' + clipesHtml(te.clipes) + '</div>' : '') +
      '<div class="two block"><ul class="check-list">' + te.inclui.map(function (t) { return '<li>' + ic('check') + t + '</li>'; }).join('') + '</ul>' +
        '<div class="glass" style="padding:24px"><h3 style="font-size:1.5rem;margin-bottom:8px">Edição 2027</h3><p style="color:var(--gray-light);margin-bottom:18px">Datas, local e formato da próxima turma serão divulgados em breve. Deixe seu contato com a nossa central para ser avisado(a) primeiro.</p>' +
        btnWhats('revisoes', R.whatsMsg, 'Quero ser avisado(a)') + '</div></div>';

    var abas = ['midia', 'pratica', 'teorica'];
    el.innerHTML = '<div class="container">' + voltar() +
      heroHtml({ eyebrow: 'Emergency Talks · Presencial', titulo: 'Revisões <span class="accent">TEME</span>',
        lead: 'As revisões para as duas fases da prova de título em Medicina de Emergência: a <b>Revisão Teórica</b> para a 1ª fase e a <b>Revisão Prática</b>, com simulação realista e debriefing, para a 2ª.',
        stats: [{ n: '+30', t: 'cenários realistas' }, { n: '6', t: 'estações no modelo da prova' }, { n: '2', t: 'workshops: Via Aérea e POCUS' }, { n: '100%', t: 'professores titulados' }],
        cta: btnMidia() + btnWhats('revisoes', R.whatsMsg, 'Quero saber das turmas', 'btn-glass'),
        foto: 'img/pratica-2.jpg', logo: 'img/logo-emergency.png', fotoCap: 'Revisão Prática TEME' }) +
      tabsHtml(abas) +
      abas.map(function (k) { return '<div class="panel" data-panel="' + k + '">' + painel[k] + '</div>'; }).join('') +
      '</div>';

    ligarVideos(el);
    ligarClipes(el);
    var car = $('[data-car]', el);
    Carousel(car, R.fotos);
    $$('[data-lb]', el).forEach(function (im) { im.addEventListener('click', function () { lbOpen(R.fotos, R.fotos.map(function (f) { return f.f; }).indexOf(im.getAttribute('src'))); }); });
    wireTabs(el, { _midia: function () { car._tick(); }, midia: function () { car._tick(); } });
  }

  /* ==================================================================
     ROTEADOR
     ================================================================== */
  var TEMAS = { inicio: 'red', teme: 'red', premium: 'gold', atualiza: 'red', revisoes: 'red', bigpocus: 'roxo', premio: 'gold' };
  var montado = {}, rotaAtual = null;
  var montar = { teme: function () { renderPrep('teme'); }, premium: renderPremium, atualiza: renderAtualiza, revisoes: renderRevisoes, bigpocus: renderBigPocus };

  function rota() {
    var h = (location.hash || '#inicio').slice(1).split('/'), r = h[0], aba = h[1];
    if (!TEMAS[r]) r = 'inicio';
    if (!montado[r] && montar[r]) { montar[r](); montado[r] = 1; }
    if (rotaAtual && rotaAtual !== r) {
      var antiga = $('#s-' + rotaAtual);
      if (antiga) { pararVideos(antiga); var c = $('[data-car]', antiga); if (c && c._stop) c._stop(); }
    }
    $$('.screen').forEach(function (s) { s.classList.toggle('active', s.id === 's-' + r); });
    document.body.setAttribute('data-route', r);
    document.body.setAttribute('data-theme', TEMAS[r]);
    if (rotaAtual !== r) scrollTo(0, 0);
    rotaAtual = r;
    var tela = $('#s-' + r);
    if (aba && tela._abrir) {
      tela._abrir(aba, false);
      /* link direto para uma aba (ex.: #revisoes/midia): já desce até ela */
      var an = $('.tabs-anchor', tela);
      if (an) setTimeout(function () { scrollTo({ top: an.getBoundingClientRect().top + scrollY - alturaTopo() - 10, behavior: reduz ? 'auto' : 'smooth' }); }, 60);
    }
    var car = tela && $('[data-car]', tela); if (car && car._tick) car._tick();
    document.dispatchEvent(new CustomEvent('rota', { detail: r }));
  }
  addEventListener('hashchange', rota);
  document.addEventListener('keydown', function (e) {
    var t = rotaAtual && $('#s-' + rotaAtual);
    if (t && t._aulaKey && !$('.modal.on') && !$('#lightbox').classList.contains('on')) t._aulaKey(e);
  });

  /* ==================================================================
     MODO ESTANDE (tablet/TV no estande)
     ?estande na URL ou ligado na engrenagem da roleta.
     Volta sozinho para o início depois de 2 min sem toque.
     ================================================================== */
  var Estande = {
    ativo: function () { return document.body.classList.contains('estande'); },
    set: function (on) {
      document.body.classList.toggle('estande', !!on);
      try { localStorage.setItem('pit:estande', on ? '1' : '0'); } catch (e) {}
      document.dispatchEvent(new Event('estande'));
    }
  };
  window.Estande = Estande;
  (function () {
    var on = /[?&]estande\b/.test(location.search);
    try { if (localStorage.getItem('pit:estande') === '1') on = true; } catch (e) {}
    if (on) document.body.classList.add('estande');
    var ociosoT;
    function mexeu() {
      clearTimeout(ociosoT);
      if (!Estande.ativo()) return;
      ociosoT = setTimeout(function () {
        if (document.body.getAttribute('data-route') === 'inicio') return;
        if (document.body.classList.contains('spinning')) { mexeu(); return; }
        $$('.modal.on').forEach(function (m) { m.classList.remove('on'); });
        lbClose();
        location.hash = '#inicio';
      }, 120000);
    }
    ['pointerdown', 'keydown', 'touchstart', 'wheel'].forEach(function (ev) { addEventListener(ev, mexeu, { passive: true }); });
    document.addEventListener('estande', mexeu);
    mexeu();
  })();

  /* ==================================================================
     CADASTRO: ganhe um curso + ecobag
     ================================================================== */
  /* ecobag preta com a logo da Emergency Talks (desenho; troque por foto em CADASTRO.foto) */
  var nBag = 0;
  function ecobagSvg() {
    var id = 'bag' + (++nBag);
    return '<svg class="ecobag" viewBox="0 0 120 140"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c2c33"/><stop offset=".55" stop-color="#141418"/><stop offset="1" stop-color="#060607"/></linearGradient></defs>' +
      '<path d="M36 44C36 6 84 6 84 44" fill="none" stroke="#0d0d10" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M36 44C36 6 84 6 84 44" fill="none" stroke="#3b3b44" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M12 40h96l7 92a5 5 0 0 1-5 5.4H10A5 5 0 0 1 5 132z" fill="url(#' + id + ')" stroke="#000" stroke-width="1.5"/>' +
      '<path d="M14 49h92" stroke="#3a3a42" stroke-width="1.2" stroke-dasharray="3 3"/>' +
      '<path d="M18 44l-2 88" stroke="rgba(255,255,255,.07)" stroke-width="6"/>' +
      '<image href="img/logo-emergency.png" x="27" y="78" width="66" height="24"/></svg>';
  }
  function pintarEcobags() {
    $$('[data-ecobag]').forEach(function (el) {
      el.innerHTML = CADASTRO.foto ? '<img src="' + CADASTRO.foto + '" alt="" style="width:100%;height:100%;object-fit:contain" />' : ecobagSvg();
    });
  }
  pintarEcobags();

  (function () {
    var modal = $('#cadModal'), form = $('#cadForm'), ok = $('#cadOk');
    function abrir() {
      if (CADASTRO.link) { window.open(CADASTRO.link, '_blank', 'noopener'); return; }
      form.hidden = false; ok.hidden = true; $('#cadErr').textContent = '';
      modal.classList.add('on');
      setTimeout(function () { form.nome.focus(); }, 80);
    }
    function fechar() { modal.classList.remove('on'); }
    $('#promo').addEventListener('click', abrir);
    $('#cadClose').addEventListener('click', fechar);
    $('#cadDone').addEventListener('click', function () { form.reset(); fechar(); });
    modal.addEventListener('click', function (e) { if (e.target === modal) fechar(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
    /* máscara simples de telefone */
    form.whats.addEventListener('input', function () {
      var d = this.value.replace(/\D/g, '').slice(0, 11);
      this.value = d.length > 6 ? '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4) : d.length > 2 ? '(' + d.slice(0, 2) + ') ' + d.slice(2) : d;
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form, erro = '';
      $$('input,select', f).forEach(function (x) { x.classList.remove('invalid'); });
      function marca(x, msg) { x.classList.add('invalid'); if (!erro) { erro = msg; x.focus(); } }
      if (f.nome.value.trim().split(/\s+/).length < 2) marca(f.nome, 'Escreva seu nome completo.');
      if (f.whats.value.replace(/\D/g, '').length < 10) marca(f.whats, 'Confira o número do WhatsApp com DDD.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())) marca(f.email, 'Confira o e-mail.');
      if (!f.perfil.value) marca(f.perfil, 'Selecione o seu perfil.');
      $('#cadErr').textContent = erro;
      if (erro) return;
      var msg = 'Olá! Fiz meu cadastro no Painel Interativo Talks e quero ganhar o curso + ecobag.\n\n' +
        '*Nome:* ' + f.nome.value.trim() + '\n*WhatsApp:* ' + f.whats.value + '\n*E-mail:* ' + f.email.value.trim() + '\n*Perfil:* ' + f.perfil.value;
      var link = wa('cadastro', msg);
      $('#cadWhats').href = link;
      var qr = $('#cadQr'); qr.innerHTML = ''; qr.hidden = true;
      if (Estande.ativo() && window.QRCode) {
        /* no tablet do estande, o envio sai do celular da pessoa */
        $('#cadOkTx').innerHTML = 'Aponte a câmera do <b>seu celular</b> para o código e envie a mensagem no WhatsApp. Depois, retire sua ecobag com a nossa equipe.';
        qr.hidden = false;
        try { new QRCode(qr, { text: link, width: 220, height: 220, colorDark: '#040405', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.L }); } catch (err) { qr.hidden = true; }
        $('#cadWhats').hidden = true;
      } else {
        $('#cadOkTx').innerHTML = 'Toque em <b>Enviar meu cadastro</b> e mande a mensagem no WhatsApp. Depois, mostre a conversa para a nossa equipe e retire sua ecobag.';
        $('#cadWhats').hidden = false;
      }
      form.hidden = true; ok.hidden = false;
      Confetti.burst(innerWidth / 2, innerHeight * .35, 80);
    });
  })();

  /* QR code para abrir no celular (aparece em telas grandes e no modo estande) */
  window.initQR = function () {
    if (!window.QRCode || !/^https?:$/.test(location.protocol) || $('#qrCode').childElementCount) return;
    try {
      new QRCode($('#qrCode'), { text: location.origin + location.pathname, width: 200, height: 200, colorDark: '#040405', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
      $('#qrBox').classList.add('ready');
    } catch (e) {}
  };
  if (window.QRCode) window.initQR();

  rota();
})();
