/* ==================================================================
   PAINEL INTERATIVO TALKS · roleta de prêmios
   A roleta é "honesta": o ponto de parada é sorteado de forma uniforme
   em volta da roda, então a chance de cada prêmio é exatamente o
   tamanho da fatia que ele ocupa (pesos em js/dados.js).
   ================================================================== */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function ler(k, padrao) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : padrao; } catch (e) { return padrao; } }
  function gravar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var K_CFG = 'pit:roleta-cfg', K_HIST = 'pit:historico', K_SOM = 'pit:som';

  var canvas = $('#wheelCanvas'), hl = $('#wheelHL'), ctx = canvas.getContext('2d'), hctx = hl.getContext('2d');
  var stage = $('#wheelStage'), rim = $('#wheelRim'), pointer = $('#pointer');
  var spinBtn = $('#spinBtn'), hubBtn = $('#hubBtn');

  /* ---------------- configuração (pesos e prêmios ligados) ---------------- */
  var cfg = ler(K_CFG, {});
  function peso(k) { var c = cfg[k]; if (c && c.on === false) return 0; return c && c.peso != null ? c.peso : PREMIOS[k].peso; }
  var fatias = [], total = 0;
  function layout() {
    var ativas = FATIAS.filter(function (k) { return peso(k) > 0; });
    total = ativas.reduce(function (s, k) { return s + peso(k); }, 0);
    var a = 0;
    fatias = ativas.map(function (k) { var span = peso(k) / total * 360, f = { k: k, a0: a, a1: a + span }; a += span; return f; });
  }
  function chance(k) { if (!total) return 0; return FATIAS.filter(function (x) { return x === k; }).length * peso(k) / total * 100; }
  layout();

  /* ---------------- desenho da roda ---------------- */
  var rad = function (d) { return d * Math.PI / 180; };
  function cunha(c, R, f, r0) {
    c.beginPath();
    c.moveTo(Math.cos(rad(f.a0 - 90)) * (r0 || 0), Math.sin(rad(f.a0 - 90)) * (r0 || 0));
    c.arc(0, 0, R, rad(f.a0 - 90), rad(f.a1 - 90));
    if (r0) c.arc(0, 0, r0, rad(f.a1 - 90), rad(f.a0 - 90), true); else c.lineTo(0, 0);
    c.closePath();
  }
  function estrela(c, x, y, s) {
    c.beginPath();
    for (var i = 0; i < 8; i++) { var r = i % 2 ? s * .28 : s, a = i * Math.PI / 4; c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
    c.closePath(); c.fill();
  }
  var dpr = 1, R = 0;
  function desenhar() {
    var css = canvas.clientWidth; if (!css) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = hl.width = Math.round(css * dpr); canvas.height = hl.height = Math.round(css * dpr);
    R = canvas.width / 2;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.translate(R, R);
    if (!fatias.length) return;

    fatias.forEach(function (f) {
      var P = PREMIOS[f.k];
      cunha(ctx, R, f);
      var g = ctx.createRadialGradient(0, 0, R * .2, 0, 0, R);
      g.addColorStop(0, P.cor[1]); g.addColorStop(.72, P.cor[0]); g.addColorStop(1, P.cor[1]);
      ctx.fillStyle = g; ctx.fill();
      if (P.max) {
        /* fatia do prêmio máximo: brilho dourado e estrelinhas */
        ctx.save(); cunha(ctx, R, f); ctx.clip();
        var sh = ctx.createLinearGradient(-R, -R, R, R);
        sh.addColorStop(0, 'rgba(255,255,255,0)'); sh.addColorStop(.5, 'rgba(255,255,255,.35)'); sh.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = sh; ctx.fillRect(-R, -R, R * 2, R * 2);
        ctx.fillStyle = '#fff';
        var mid = rad((f.a0 + f.a1) / 2 - 90);
        [[.42, .0, .03], [.97, .0, .022]].forEach(function (s) { var rr = R * s[0]; estrela(ctx, Math.cos(mid + s[1]) * rr, Math.sin(mid + s[1]) * rr, R * s[2]); });
        ctx.restore();
      }
    });

    /* divisórias douradas + pinos */
    fatias.forEach(function (f) {
      var a = rad(f.a0 - 90);
      ctx.strokeStyle = 'rgba(245,196,81,.95)'; ctx.lineWidth = R * .013;
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * R * .24, Math.sin(a) * R * .24); ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R); ctx.stroke();
      var px = Math.cos(a) * R * .955, py = Math.sin(a) * R * .955;
      var pg = ctx.createRadialGradient(px - R * .006, py - R * .006, 0, px, py, R * .022);
      pg.addColorStop(0, '#fff'); pg.addColorStop(.5, '#F5C451'); pg.addColorStop(1, '#7a5520');
      ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, R * .02, 0, 6.29); ctx.fill();
    });

    /* textos */
    fatias.forEach(function (f) {
      var P = PREMIOS[f.k], span = rad(f.a1 - f.a0), mid = rad((f.a0 + f.a1) / 2 - 90);
      ctx.save(); ctx.rotate(mid);
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillStyle = P.txt;
      var xEnd = R * .885;
      var fs = Math.min(R * .118, R * .66 * span * .55);
      ctx.font = '900 ' + fs + 'px "Barlow Condensed", sans-serif';
      var w = ctx.measureText(P.curto).width, maxW = R * .5;
      if (w > maxW) { fs *= maxW / w; ctx.font = '900 ' + fs + 'px "Barlow Condensed", sans-serif'; w = maxW; }
      var sfs = Math.max(R * .036, fs * .36);
      /* cabe a 2ª linha? (altura total x largura da fatia no início do texto) */
      var corda = 2 * (xEnd - w) * Math.sin(span / 2);
      var duas = corda > fs * 1.55;
      ctx.shadowColor = P.txt === '#FFFFFF' ? 'rgba(0,0,0,.45)' : 'rgba(255,255,255,.25)'; ctx.shadowBlur = R * .012;
      ctx.fillText(P.curto, xEnd, duas ? -fs * .2 : 0);
      if (duas) {
        ctx.font = '700 ' + sfs + 'px "Barlow Condensed", sans-serif';
        ctx.globalAlpha = .85;
        if ('letterSpacing' in ctx) ctx.letterSpacing = (sfs * .12) + 'px';
        ctx.fillText(P.sub, xEnd, fs * .5);
        if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    });

    /* profundidade: sombra na borda e anel interno */
    var sd = ctx.createRadialGradient(0, 0, R * .78, 0, 0, R);
    sd.addColorStop(0, 'rgba(0,0,0,0)'); sd.addColorStop(1, 'rgba(0,0,0,.42)');
    ctx.fillStyle = sd; ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.29); ctx.fill();
    var inn = ctx.createRadialGradient(0, 0, R * .2, 0, 0, R * .34);
    inn.addColorStop(0, 'rgba(0,0,0,.55)'); inn.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = inn; ctx.beginPath(); ctx.arc(0, 0, R * .34, 0, 6.29); ctx.fill();
    ctx.strokeStyle = '#F5C451'; ctx.lineWidth = R * .012; ctx.beginPath(); ctx.arc(0, 0, R * .245, 0, 6.29); ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = R * .02; ctx.beginPath(); ctx.arc(0, 0, R - R * .01, 0, 6.29); ctx.stroke();
  }
  function destacar(f) {
    hctx.setTransform(1, 0, 0, 1, 0, 0); hctx.clearRect(0, 0, hl.width, hl.height);
    if (!f) { hl.classList.remove('on'); return; }
    hctx.translate(R, R);
    cunha(hctx, R * .995, f, R * .25);
    hctx.fillStyle = 'rgba(255,255,255,.22)'; hctx.fill();
    hctx.lineWidth = R * .03; hctx.strokeStyle = '#FFE08A'; hctx.shadowColor = '#F5C451'; hctx.shadowBlur = R * .08; hctx.stroke();
    hl.classList.add('on');
  }

  /* brilho fixo por cima (não gira com a roda) */
  var gloss = document.createElement('div');
  gloss.style.cssText = 'position:absolute;inset:6.2%;border-radius:50%;pointer-events:none;z-index:3;background:radial-gradient(120% 80% at 30% 10%,rgba(255,255,255,.16),rgba(255,255,255,0) 45%)';
  hl.after(gloss);

  /* ---------------- luzes da borda ---------------- */
  var N_LUZ = 28, luzes = [];
  for (var i = 0; i < N_LUZ; i++) {
    var b = document.createElement('span'), a = i / N_LUZ * Math.PI * 2;
    b.className = 'bulb';
    b.style.left = (50 + 47.6 * Math.sin(a)) + '%'; b.style.top = (50 - 47.6 * Math.cos(a)) + '%';
    rim.appendChild(b); luzes.push(b);
  }
  var luzT = null, luzPasso = 0;
  function luz(modo) {
    clearInterval(luzT); luzPasso = 0;
    var tic = { calmo: 650, gira: 55, ganhou: 110, max: 90 }[modo];
    function f() {
      luzPasso++;
      luzes.forEach(function (l, k) {
        var on, red = false;
        if (modo === 'calmo') on = (k + luzPasso) % 2 === 0;
        else if (modo === 'gira') on = (k - luzPasso % N_LUZ + N_LUZ) % 7 < 3;
        else if (modo === 'ganhou') on = luzPasso % 2 === 0;
        else { on = true; red = (k + luzPasso) % 2 === 0; }
        l.classList.toggle('off', !on); l.classList.toggle('red', !!red && on);
      });
    }
    f(); if (!reduz) luzT = setInterval(f, tic);
  }
  luz('calmo');

  /* ---------------- som (Web Audio, sem arquivos) ---------------- */
  var Som = {
    ac: null, on: ler(K_SOM, true),
    init: function () {
      if (!this.ac) { var AC = window.AudioContext || window.webkitAudioContext; if (AC) this.ac = new AC(); }
      if (this.ac && this.ac.state === 'suspended') this.ac.resume();
    },
    nota: function (freq, t, dur, tipo, vol) {
      var c = this.ac, o = c.createOscillator(), g = c.createGain();
      o.type = tipo || 'triangle'; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || .16, t + .015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + .02);
    },
    ultimo: 0,
    tick: function (vel) {
      if (!this.on || !this.ac) return;
      var t = this.ac.currentTime; if (t - this.ultimo < .03) return; this.ultimo = t;
      var c = this.ac, o = c.createOscillator(), g = c.createGain();
      o.type = 'square'; o.frequency.setValueAtTime(1500 + Math.random() * 400, t); o.frequency.exponentialRampToValueAtTime(420, t + .025);
      g.gain.setValueAtTime(.07 + Math.min(.06, (1 - vel) * .08), t); g.gain.exponentialRampToValueAtTime(0.0001, t + .045);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + .05);
    },
    whoosh: function () {
      if (!this.on || !this.ac) return;
      var c = this.ac, t = c.currentTime, n = c.sampleRate * .7, buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      s.buffer = buf; f.type = 'bandpass'; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(2400, t + .5); f.Q.value = 1.2;
      g.gain.setValueAtTime(.22, t); g.gain.exponentialRampToValueAtTime(0.0001, t + .7);
      s.connect(f); f.connect(g); g.connect(c.destination); s.start(t);
    },
    vitoria: function (max) {
      if (!this.on || !this.ac) return;
      var t = this.ac.currentTime + .02, self = this;
      var seq = max ? [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.5] : [523.25, 659.25, 783.99, 1046.5];
      seq.forEach(function (f, k) { self.nota(f, t + k * .11, .32, 'square', .07); self.nota(f * 2, t + k * .11, .25, 'triangle', .05); });
      var fim = t + seq.length * .11;
      (max ? [523.25, 659.25, 783.99, 1046.5, 1318.5] : [523.25, 659.25, 783.99]).forEach(function (f) { self.nota(f, fim, max ? 1.6 : 1, 'triangle', .09); });
      if (max) for (var k = 0; k < 14; k++) self.nota(2000 + Math.random() * 2500, fim + .1 + k * .07, .18, 'sine', .035);
    }
  };
  var soundBtn = $('#soundBtn');
  function pintaSom() { soundBtn.innerHTML = '<svg class="i"><use href="#i-' + (Som.on ? 'vol' : 'mute') + '"/></svg>'; soundBtn.setAttribute('aria-label', Som.on ? 'Som ligado' : 'Som desligado'); }
  soundBtn.addEventListener('click', function () { Som.on = !Som.on; gravar(K_SOM, Som.on); Som.init(); pintaSom(); toast(Som.on ? 'Som ligado' : 'Som desligado'); });
  pintaSom();

  /* ---------------- giro ---------------- */
  var rot = 0, girando = false;
  function aplicar(a) { var t = 'rotate(' + a + 'deg)'; canvas.style.transform = t; hl.style.transform = t; }
  function fatiaEm(ang) { var p = ((-ang % 360) + 360) % 360; for (var i = 0; i < fatias.length; i++) if (p >= fatias[i].a0 && p < fatias[i].a1) return i; return fatias.length - 1; }
  function chutar() { pointer.classList.remove('kick'); void pointer.offsetWidth; pointer.classList.add('kick'); }
  /* a roleta é só para quem fechou uma compra: a equipe libera um giro por vez com o PIN */
  var liberado = false;
  function podeGirar() { return liberado; }

  function girar() {
    if (girando || !fatias.length || $('#winModal').classList.contains('on')) return;
    if (!podeGirar()) { abrirLiberar(); return; }
    liberado = false;
    Som.init();
    girando = true; document.body.classList.add('spinning');
    spinBtn.disabled = true; spinBtn.innerHTML = '<svg class="i"><use href="#i-refresh"/></svg> Girando...';
    destacar(null); luz('gira'); Som.whoosh();

    /* sorteio uniforme do ponto de parada, longe das divisórias */
    var alvo = Math.random() * 360, f = fatias[fatiaEm(-alvo)];
    var m = Math.min(2.4, (f.a1 - f.a0) * .2);
    alvo = Math.max(f.a0 + m, Math.min(f.a1 - m, alvo));

    var voltas = 6 + Math.floor(Math.random() * 3);
    var atual = ((rot % 360) + 360) % 360, desejado = (360 - alvo) % 360, delta = desejado - atual;
    if (delta < 0) delta += 360;
    var de = rot, para = rot + voltas * 360 + delta;
    var RECUO = reduz ? 0 : 420, VOLTA = 9, DUR = reduz ? 1200 : 7200 + Math.random() * 1200;
    var t0 = performance.now(), ultima = fatiaEm(de);

    function quadro(agora) {
      var t = agora - t0, ang, vel = 1;
      if (t < RECUO) { ang = de - VOLTA * Math.sin(t / RECUO * Math.PI / 2); vel = .2; }
      else {
        var p = Math.min(1, (t - RECUO) / DUR);
        var e = 1 - Math.pow(1 - p, 4);
        ang = (de - VOLTA) + (para - de + VOLTA) * e;
        vel = Math.pow(1 - p, 3);
      }
      aplicar(ang);
      var fi = fatiaEm(ang);
      if (fi !== ultima) { ultima = fi; Som.tick(vel); if (vel < .5 || Math.random() < .35) chutar(); }
      if (t < RECUO + DUR) requestAnimationFrame(quadro);
      else { rot = para % 360; aplicar(rot); terminou(fatias[fatiaEm(rot)]); }
    }
    requestAnimationFrame(quadro);
  }

  /* quem vai girar: nome e WhatsApp do formulário */
  var pessoa = null;
  function terminou(f) {
    var P = PREMIOS[f.k], res = { k: f.k, ts: Date.now(), nome: pessoa ? pessoa.nome : '', whats: pessoa ? pessoa.whats : '', compra: pessoa ? pessoa.compra : '' };
    destacar(f); luz(P.max ? 'max' : 'ganhou'); Som.vitoria(P.max);
    var hist = ler(K_HIST, []); hist.unshift(res); gravar(K_HIST, hist.slice(0, 2000));
    Planilha.enviar(res);
    pessoa = null;
    setTimeout(function () {
      girando = false; document.body.classList.remove('spinning');
      abrirPremio(res, true);
      setTimeout(function () { luz('calmo'); }, 2600);
      atualizarEstado();
    }, 900);
  }

  /* ---------------- planilha (Google Apps Script) ----------------
     Cada giro entra numa fila no aparelho e é enviado para PLANILHA.url.
     Sem internet, a fila espera e tenta de novo; nada se perde ao recarregar. */
  var K_FILA = 'pit:fila-planilha';
  var Planilha = {
    ocupado: false,
    enviar: function (res) {
      var fila = ler(K_FILA, []);
      fila.push({ data: new Date(res.ts).toISOString(), nome: res.nome, whatsapp: res.whats, compra: res.compra || '', premio: PREMIOS[res.k].nome, aparelho: Estande.ativo() ? 'estande' : 'celular' });
      gravar(K_FILA, fila); this.esvaziar();
    },
    esvaziar: function () {
      var self = this, fila = ler(K_FILA, []);
      if (!PLANILHA.url || self.ocupado || !fila.length) return;
      self.ocupado = true;
      fetch(PLANILHA.url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(fila[0]) })
        .then(function () { var f = ler(K_FILA, []); f.shift(); gravar(K_FILA, f); self.ocupado = false; self.esvaziar(); })
        .catch(function () { self.ocupado = false; setTimeout(function () { self.esvaziar(); }, 30000); });
    }
  };
  addEventListener('online', function () { Planilha.esvaziar(); });
  Planilha.esvaziar();

  /* ---------------- cartão do prêmio ---------------- */  function icone(P) {
    if (P.ico === 'copo') return '<svg viewBox="0 0 72 72"><path d="M20 23h32l-4.2 39.4A4 4 0 0 1 43.8 66H28.2a4 4 0 0 1-4-3.6z" fill="#F6F6F7" stroke="#F5C451" stroke-width="2.5"/><rect x="16" y="16" width="40" height="8" rx="3" fill="#F51627" stroke="#F5C451" stroke-width="1.5"/><path d="M40 16l6-11h7" stroke="#F5C451" stroke-width="3" fill="none" stroke-linecap="round"/><text x="36" y="48" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="900" font-size="11" fill="#0a0a0c">TALKS</text></svg>';
    if (P.ico === 'caneta') return '<svg viewBox="0 0 72 72"><g transform="rotate(40 36 36)"><rect x="30" y="4" width="12" height="48" rx="5" fill="#1c1c22" stroke="#F5C451" stroke-width="2"/><rect x="30" y="4" width="12" height="11" rx="4" fill="#F51627"/><rect x="41" y="9" width="3.5" height="24" rx="1.7" fill="#F5C451"/><path d="M30.5 52h11L36 68z" fill="#F5C451"/><circle cx="36" cy="66" r="1.5" fill="#1c1c22"/></g></svg>';
    return '<svg viewBox="0 0 72 72"><rect x="8" y="13" width="56" height="52" rx="9" fill="#141418" stroke="#F5C451" stroke-width="3"/><path d="M8 22a9 9 0 0 1 9-9h38a9 9 0 0 1 9 9v6H8z" fill="#F51627"/><line x1="22" y1="6" x2="22" y2="19" stroke="#F5C451" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="6" x2="50" y2="19" stroke="#F5C451" stroke-width="4" stroke-linecap="round"/><text x="36" y="56" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="900" font-size="28" fill="#fff">' + P.n + '</text><text x="36" y="25.5" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="800" font-size="7" letter-spacing="1" fill="#fff">' + (P.n === '1' ? 'MÊS' : 'MESES') + '</text></svg>';
  }
  function abrirPremio(res, novo) {
    var P = PREMIOS[res.k], card = $('#winCard');
    card.classList.toggle('jackpot', !!P.max);
    card.style.animation = 'none'; void card.offsetWidth; card.style.animation = '';
    $('#winKicker').textContent = res.nome ? 'Olá, ' + res.nome.split(' ')[0] + '!' : 'Parabéns!';
    var wc = $('#winCompra'); wc.hidden = !res.compra;
    if (res.compra) { wc.innerHTML = 'Você adquiriu <b></b>'; $('b', wc).textContent = res.compra; }
    $('#winIco').innerHTML = icone(P);
    $('#winPrize').textContent = P.nome;
    $('#winModal').classList.add('on');
    if (novo) {
      if (P.max) { var fl = $('#flash'); fl.classList.remove('go'); void fl.offsetWidth; fl.classList.add('go'); }
      Confetti.celebrate(!!P.max);
    }
  }
  function fecharPremio() { $('#winModal').classList.remove('on'); }
  $('#winClose').addEventListener('click', fecharPremio);
  $('#winModal').addEventListener('click', function (e) { if (e.target.id === 'winModal' && !girando) fecharPremio(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { fecharPremio(); fecharAdmin(); fecharLiberar(); } });

  /* ---------------- estado da tela ---------------- */
  function atualizarEstado() {
    $('#already').hidden = true;
    if (!girando) {
      spinBtn.disabled = !fatias.length;
      spinBtn.innerHTML = '<svg class="i"><use href="#i-refresh"/></svg> Girar a roleta';
    }
    $('#spinNote').innerHTML = !fatias.length ? 'Roleta pausada pela equipe.' : liberado && pessoa ? 'Giro liberado para <b>' + pessoa.nome.split(' ')[0] + '</b> · todo giro dá prêmio' : 'Comprou com a gente? Coloque nome e WhatsApp e gire · <b>todo giro dá prêmio</b>';
  }

  /* formulário antes do giro: nome + WhatsApp */
  var lib = $('#libModal'), libForm = $('#libForm');
  COMPRAS.forEach(function (n) { var o = document.createElement('option'); o.textContent = n; libForm.compra.appendChild(o); });
  function soNumeros(s) { return String(s || '').replace(/\D/g, ''); }
  function abrirLiberar() {
    libForm.reset(); $('#libErr').textContent = '';
    $$('input,select', libForm).forEach(function (x) { x.classList.remove('invalid'); });
    lib.classList.add('on'); setTimeout(function () { libForm.nome.focus(); }, 60);
  }
  function fecharLiberar() { lib.classList.remove('on'); }
  libForm.whats.addEventListener('input', function () {
    var d = soNumeros(this.value).slice(0, 11);
    this.value = d.length > 6 ? '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4) : d.length > 2 ? '(' + d.slice(0, 2) + ') ' + d.slice(2) : d;
  });
  libForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = libForm.nome.value.trim().replace(/\s+/g, ' '), whats = libForm.whats.value, compra = libForm.compra.value, erro = '';
    $$('input,select', libForm).forEach(function (x) { x.classList.remove('invalid'); });
    if (nome.split(' ').length < 2) { erro = 'Escreva seu nome completo.'; libForm.nome.classList.add('invalid'); libForm.nome.focus(); }
    else if (soNumeros(whats).length < 10) { erro = 'Confira o WhatsApp com DDD.'; libForm.whats.classList.add('invalid'); libForm.whats.focus(); }
    else if (!compra) { erro = 'Selecione o curso que você comprou.'; libForm.compra.classList.add('invalid'); libForm.compra.focus(); }
    else if (ler(K_HIST, []).some(function (h) { return h.whats && soNumeros(h.whats) === soNumeros(whats); })) {
      erro = 'Este WhatsApp já girou a roleta.'; libForm.whats.classList.add('invalid');
    }
    $('#libErr').textContent = erro;
    if (erro) return;
    pessoa = { nome: nome, whats: whats, compra: compra };
    liberado = true; fecharLiberar(); destacar(null); atualizarEstado();
    toast('Pronto, ' + nome.split(' ')[0] + '! Agora é só girar.');
    spinBtn.scrollIntoView({ block: 'center', behavior: reduz ? 'auto' : 'smooth' });
  });
  $('#libCancel').addEventListener('click', fecharLiberar);
  lib.addEventListener('click', function (e) { if (e.target === lib) fecharLiberar(); });  spinBtn.addEventListener('click', girar);
  hubBtn.addEventListener('click', girar);
  $('#nextPlayer').addEventListener('click', function () {
    fecharPremio(); destacar(null); luz('calmo'); scrollTo({ top: 0, behavior: 'smooth' }); toast('Pronto para o próximo participante!');
  });
  document.addEventListener('estande', atualizarEstado);

  /* legenda dos prêmios */
  function legenda() {
    var vistos = {};
    $('#legend').innerHTML = FATIAS.filter(function (k) { if (vistos[k] || !peso(k)) return false; vistos[k] = 1; return true; })
      .sort(function (a, b) { return (PREMIOS[b].max ? 1 : 0) - (PREMIOS[a].max ? 1 : 0); })
      .map(function (k) { var P = PREMIOS[k]; return '<span class="' + (P.max ? 'top' : '') + '"><i style="background:linear-gradient(135deg,' + P.cor[0] + ',' + P.cor[1] + ')"></i>' + P.nome + (P.max ? ' · prêmio máximo' : '') + '</span>'; }).join('');
  }

  /* mini roleta da página inicial */
  function miniRoda() {
    var alvos = $$('#miniWheel, [data-mini-wheel]'); if (!alvos.length) return;
    var h = '';
    fatias.forEach(function (f) {
      var a0 = rad(f.a0 - 90), a1 = rad(f.a1 - 90), r = 46, large = f.a1 - f.a0 > 180 ? 1 : 0;
      h += '<path d="M0 0L' + (Math.cos(a0) * r).toFixed(2) + ' ' + (Math.sin(a0) * r).toFixed(2) + 'A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + (Math.cos(a1) * r).toFixed(2) + ' ' + (Math.sin(a1) * r).toFixed(2) + 'Z" fill="' + PREMIOS[f.k].cor[0] + '" stroke="#F5C451" stroke-width=".8"/>';
    });
    alvos.forEach(function (g) { g.innerHTML = h; });
  }

  function refazer() { layout(); desenhar(); legenda(); miniRoda(); atualizarEstado(); }

  /* ---------------- área da equipe ---------------- */
  var adm = $('#adminModal');
  function abrirAdmin() {
    adm.classList.add('on');
    var ok = false; try { ok = sessionStorage.getItem('pit:adm') === '1'; } catch (e) {}
    $('#admLogin').hidden = ok; $('#admBody').hidden = !ok;
    if (ok) pintarAdmin(); else setTimeout(function () { $('#admPin').focus(); }, 50);
  }
  function fecharAdmin() { adm.classList.remove('on'); $('#admPin').value = ''; $('#admErr').textContent = ''; }
  function entrar() {
    if ($('#admPin').value === ADMIN_PIN) {
      try { sessionStorage.setItem('pit:adm', '1'); } catch (e) {}
      $('#admLogin').hidden = true; $('#admBody').hidden = false; pintarAdmin();
    } else { $('#admErr').textContent = 'PIN incorreto.'; $('#admPin').select(); }
  }
  function pintarAdmin() {
    $('#admEstande').checked = Estande.ativo();
    $('#admSom').checked = Som.on;
    var vistos = {};
    $('#admPrizes').innerHTML = FATIAS.filter(function (k) { if (vistos[k]) return false; vistos[k] = 1; return true; }).map(function (k) {
      var P = PREMIOS[k], c = cfg[k] || {}, on = c.on !== false, pv = c.peso != null ? c.peso : P.peso, n = FATIAS.filter(function (x) { return x === k; }).length;
      return '<div class="adm-row" data-k="' + k + '"><div class="nm">' + P.nome + '<small>' + n + ' fatia' + (n > 1 ? 's' : '') + ' na roleta</small></div>' +
        '<input type="range" min="1" max="30" step="1" value="' + pv + '" aria-label="Tamanho da fatia de ' + P.nome + '"' + (on ? '' : ' disabled') + ' />' +
        '<span class="pct">' + chance(k).toFixed(1).replace('.', ',') + '%</span>' +
        '<label class="switch"><input type="checkbox"' + (on ? ' checked' : '') + ' aria-label="' + P.nome + ' disponível" /><i></i></label></div>';
    }).join('');
    var hist = ler(K_HIST, []), tot = {};
    hist.forEach(function (h) { tot[h.k] = (tot[h.k] || 0) + 1; });
    $('#admTotals').innerHTML = '<span><b>' + hist.length + '</b> giros</span>' + Object.keys(PREMIOS).map(function (k) { return tot[k] ? '<span>' + PREMIOS[k].nome + ': <b>' + tot[k] + '</b></span>' : ''; }).join('');
    $('#admHist').innerHTML = hist.slice(0, 60).map(function (h) { var d = new Date(h.ts); return '<div><span>' + d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + '</span><span>' + (h.nome || '—') + '</span><b>' + (PREMIOS[h.k] ? PREMIOS[h.k].nome : h.k) + '</b></div>'; }).join('') || '<div>Nenhum giro ainda.</div>';
  }
  $('#adminBtn').addEventListener('click', abrirAdmin);
  $('#admEnter').addEventListener('click', entrar);
  $('#admPin').addEventListener('keydown', function (e) { if (e.key === 'Enter') entrar(); });
  $('#admDone').addEventListener('click', fecharAdmin);
  adm.addEventListener('click', function (e) { if (e.target === adm) fecharAdmin(); });
  $('#admEstande').addEventListener('change', function () { Estande.set(this.checked); toast(this.checked ? 'Modo estande ligado' : 'Modo estande desligado'); });
  $('#admSom').addEventListener('change', function () { Som.on = this.checked; gravar(K_SOM, Som.on); pintaSom(); });
  $('#admPrizes').addEventListener('input', function (e) {
    var row = e.target.closest('[data-k]'); if (!row) return;
    var k = row.getAttribute('data-k'), c = cfg[k] = cfg[k] || {};
    if (e.target.type === 'range') c.peso = +e.target.value;
    if (e.target.type === 'checkbox') { c.on = e.target.checked; $('input[type=range]', row).disabled = !c.on; }
    gravar(K_CFG, cfg); refazer();
    $$('#admPrizes [data-k]').forEach(function (r) { $('.pct', r).textContent = chance(r.getAttribute('data-k')).toFixed(1).replace('.', ',') + '%'; });
  });
  $('#admUnlock').addEventListener('click', function () { liberado = true; atualizarEstado(); toast('Giro liberado'); });
  $('#admClear').addEventListener('click', function () {
    if (!confirm('Apagar o histórico de prêmios deste aparelho?')) return;
    gravar(K_HIST, []); pintarAdmin(); toast('Histórico zerado');
  });
  $('#admCsv').addEventListener('click', function () {
    var linhas = [['data', 'hora', 'nome', 'whatsapp', 'premio']];
    ler(K_HIST, []).forEach(function (h) { var d = new Date(h.ts); linhas.push([d.toLocaleDateString('pt-BR'), d.toLocaleTimeString('pt-BR'), h.nome || '', h.whats || '', PREMIOS[h.k] ? PREMIOS[h.k].nome : h.k]); });
    var csv = '﻿' + linhas.map(function (l) { return l.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(';'); }).join('\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'premios-roleta-talks.csv'; document.body.appendChild(a); a.click(); a.remove();
  });

  /* ---------------- início ---------------- */
  document.addEventListener('rota', function (e) {
    fecharPremio();
    if (e.detail === 'premio') requestAnimationFrame(function () { desenhar(); aplicar(rot); atualizarEstado(); });
  });
  var rT; addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(desenhar, 120); });
  refazer();
  if (document.fonts && document.fonts.load) document.fonts.load('900 40px "Barlow Condensed"').then(desenhar, function () {});
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(desenhar);
})();
