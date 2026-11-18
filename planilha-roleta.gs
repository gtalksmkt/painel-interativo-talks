/* ==================================================================
   PAINEL INTERATIVO TALKS · planilha da roleta (Google Apps Script) · versão 2

   Recebe do painel cada giro da roleta (nome, WhatsApp, o que a pessoa
   comprou e o prêmio) e grava uma linha na aba "Roleta" da planilha.
   O WhatsApp fica na coluna C para depois cruzar com o sistema de vendas.

   Como atualizar o script que já está no ar (mantém o mesmo endereço /exec):
   1. script.google.com > projeto "Roleta Painel Talks".
   2. Apague o código do editor, cole este arquivo inteiro e salve (disquete).
   3. Implantar > Gerenciar implantações > lápis (editar) > Versão: "Nova versão" > Implantar.
      Importante: é "Gerenciar implantações", e não "Nova implantação", para o endereço
      continuar o mesmo que está em js/dados.js (PLANILHA.url).
   4. Rode a função "configurar": atualiza os títulos e põe a aba Roleta como a primeira.
   Para conferir: abrir o endereço /exec no navegador deve mostrar "versao": 2.

   Como criar do zero:
   1. script.google.com > Novo projeto. Cole este arquivo e salve.
   2. Rode "configurar" e autorize (marque a caixinha das planilhas).
   3. Implantar > Nova implantação > App da Web. Executar como: Eu. Quem pode acessar: Qualquer pessoa.
   4. Copie o "URL do app da Web" (termina em /exec) para js/dados.js, em PLANILHA.url.
   ================================================================== */

var PLANILHA_ID = '1vfZLrC3t-si_9z26AvncPUrpkHN7xCYwWsilURh2foM';
var ABA = 'Roleta';
var COLUNAS = ['Data', 'Nome', 'WhatsApp', 'Compra', 'Prêmio', 'Aparelho', 'Entregue'];

function aba_() {
  var ss = SpreadsheetApp.openById(PLANILHA_ID);
  var sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA, 0);
    sh.setFrozenRows(1);
  }
  var tit = sh.getRange(1, 1, 1, COLUNAS.length);
  if (tit.getValues()[0].join('|') !== COLUNAS.join('|')) {
    tit.setValues([COLUNAS]).setFontWeight('bold');
  }
  return sh;
}

/* rode pelo editor: cria/atualiza a aba, deixa ela em primeiro e pede a autorização */
function configurar() {
  var ss = SpreadsheetApp.openById(PLANILHA_ID);
  var sh = aba_();
  ss.setActiveSheet(sh);
  ss.moveActiveSheet(1);
  [150, 220, 150, 260, 220, 90, 90].forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
  return 'ok';
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var premio = String(d.premio || '').slice(0, 80);
    if (!premio) return resposta_({ ok: false, erro: 'sem prêmio' });
    var data = d.data ? new Date(d.data) : new Date();
    if (isNaN(data.getTime())) data = new Date();
    var sh = aba_();
    sh.appendRow([
      data,
      String(d.nome || '').slice(0, 120),
      String(d.whatsapp || '').slice(0, 30),
      String(d.compra || '').slice(0, 120),
      premio,
      String(d.aparelho || '').slice(0, 20),
      false
    ]);
    /* "Entregue" vira caixinha para a equipe marcar quem já retirou o prêmio */
    sh.getRange(sh.getLastRow(), COLUNAS.length).insertCheckboxes();
    return resposta_({ ok: true });
  } catch (err) {
    return resposta_({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* abrir o endereço /exec no navegador mostra se está no ar e quantos giros já chegaram */
function doGet() {
  var sh = aba_();
  return resposta_({ ok: true, versao: 2, painel: 'Painel Interativo Talks', aba: ABA, planilha: SpreadsheetApp.openById(PLANILHA_ID).getName(), giros: Math.max(0, sh.getLastRow() - 1) });
}

function resposta_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
