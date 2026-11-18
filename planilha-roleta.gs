/* ==================================================================
   PAINEL INTERATIVO TALKS · planilha da roleta (Google Apps Script)

   Recebe do painel cada giro da roleta (nome, WhatsApp e prêmio) e
   grava uma linha na aba "Roleta" da planilha abaixo.

   Como colocar no ar:
   1. script.google.com > Novo projeto. Apague o que vier no editor e cole este arquivo.
   2. Salve e rode a função "configurar" (autorize e marque a caixinha das planilhas).
   3. Implantar > Nova implantação > tipo "App da Web".
      Executar como: Eu. Quem pode acessar: Qualquer pessoa.
   4. Copie o "URL do app da Web" (termina em /exec) para js/dados.js, em PLANILHA.url,
      e publique o painel.
   Para atualizar este código sem mudar o endereço: Implantar > Gerenciar implantações >
   lápis > Versão: "Nova versão" > Implantar.
   ================================================================== */

var PLANILHA_ID = '1vfZLrC3t-si_9z26AvncPUrpkHN7xCYwWsilURh2foM';
var ABA = 'Roleta';
var COLUNAS = ['Data', 'Nome', 'WhatsApp', 'Prêmio', 'Aparelho', 'Entregue'];

function aba_() {
  var ss = SpreadsheetApp.openById(PLANILHA_ID);
  var sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA);
    sh.setFrozenRows(1);
  }
  var tit = sh.getRange(1, 1, 1, COLUNAS.length);
  if (tit.getValues()[0].join('|') !== COLUNAS.join('|')) {
    tit.setValues([COLUNAS]).setFontWeight('bold');
  }
  return sh;
}

/* rode uma vez pelo editor: cria a aba e pede a autorização */
function configurar() {
  var sh = aba_();
  sh.setColumnWidth(1, 150);
  sh.setColumnWidth(2, 220);
  sh.setColumnWidth(3, 150);
  sh.setColumnWidth(4, 220);
  return 'ok';
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var nome = String(d.nome || '').slice(0, 120);
    var whats = String(d.whatsapp || '').slice(0, 30);
    var premio = String(d.premio || '').slice(0, 80);
    if (!premio) return resposta_({ ok: false, erro: 'sem prêmio' });
    var data = d.data ? new Date(d.data) : new Date();
    if (isNaN(data.getTime())) data = new Date();
    var sh = aba_();
    sh.appendRow([data, nome, whats, premio, String(d.aparelho || '').slice(0, 20), false]);
    /* "Entregue" vira caixinha para a equipe marcar quem já retirou o prêmio */
    sh.getRange(sh.getLastRow(), 6).insertCheckboxes();
    return resposta_({ ok: true });
  } catch (err) {
    return resposta_({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* abrir o endereço /exec no navegador mostra se está no ar */
function doGet() {
  return resposta_({ ok: true, painel: 'Painel Interativo Talks', aba: ABA });
}

function resposta_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
