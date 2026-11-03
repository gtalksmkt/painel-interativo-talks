/* ==================================================================
   PAINEL INTERATIVO TALKS · conteúdo
   Tudo o que aparece no painel sai daqui: textos, números, links,
   questões, flashcards, fotos e os prêmios da roleta.
   Para mudar um texto, edite este arquivo e recarregue a página.
   ================================================================== */

/* WhatsApp de cada produto (só números, com DDI 55) */
var WHATS = {
  teme:     '5585998302705',
  premium:  '5585991364591',   // central do TEME Premium (venda high ticket)
  tep:      '5585997345004',
  atualiza: '5585998302705',
  revisoes: '5585998302705',
  premio:   '5585998302705'    // resgate dos prêmios da roleta
};

/* Vídeos (Vimeo). Para trocar, cole o número do vídeo e o hash (?h=...) */
var VIDEOS = {
  teme:     { id: '1214813044', h: '7917f77f1b', titulo: 'Conheça o TEME 2027', poster: 'img/galeria-2.jpg' },
  revisoes: { id: '1193338774', h: '03bbdbfa56', titulo: 'A revisão que vale o título', poster: 'img/pratica-3.jpg' }
};

/* Lotes de preço: o painel mostra sozinho o lote do dia (horário de Brasília).
   Mesmos valores das landings do TEME 2027 e do TEP. */
var LOTES_TEME = [
  { nome: 'Lançamento', inicio: '2026-08-01', intensivo: '1.164,63', master: '1.553,43' },
  { nome: '1º lote',    inicio: '2026-09-01', intensivo: '1.257,80', master: '1.677,71' },
  { nome: '2º lote',    inicio: '2026-10-01', intensivo: '1.358,43', master: '1.811,92' },
  { nome: '3º lote',    inicio: '2026-11-01', intensivo: '1.467,10', master: '1.956,88' }
];
var LOTES_TEP = [
  { nome: 'Lançamento', inicio: '2026-11-20', valor: 249990 },
  { nome: '1º lote',    inicio: '2026-12-01', valor: 279990 },
  { nome: '2º lote',    inicio: '2027-01-01', valor: 309990 },
  { nome: '3º lote',    inicio: '2027-02-01', valor: 339990 }
];

/* ------------------------------------------------------------------
   PREPARATÓRIOS
   ------------------------------------------------------------------ */
var PRODUTOS = {

  /* ======================= TEME ======================= */
  teme: {
    tema: 'red',
    nome: 'Preparatório TEME 2027',
    eyebrow: 'Emergency Talks · Turma 2027',
    titulo: 'Preparatório <span class="accent">TEME</span> 2027',
    lead: 'A preparação completa para o <b>Título de Especialista em Medicina de Emergência</b>: aulas objetivas e atualizadas, banco de questões comentadas, flashcards e simulados, com professores titulados na prova.',
    stats: [
      { n: '8/10', t: 'dos aprovados no TEME são alunos Talks*' },
      { n: '100%', t: 'dos professores titulados' },
      { n: '+100', t: 'aulas atualizadas' },
      { n: '+3.000', t: 'flashcards' }
    ],
    nota: '* Dados referentes ao ano de 2025.',
    foto: 'img/galeria-1.jpg',
    logo: 'img/logo-emergency.png',
    fotoCap: 'Por dentro do TEME',
    whatsKey: 'teme',
    whatsMsg: 'Olá! Conheci o Preparatório TEME 2027 no Painel Interativo Talks e quero saber mais.',
    abas: ['geral', 'portal', 'aula', 'questoes', 'flashcards'],
    video: 'teme',

    feats: [
      { ic: 'award',  t: 'Professores titulados', p: 'Você aprende com quem já enfrentou e passou exatamente pela prova que você vai fazer.' },
      { ic: 'zap',    t: 'Aulas objetivas', p: 'Direto ao ponto, pensadas para render na rotina de quem está na linha de frente.' },
      { ic: 'q',      t: 'Questões comentadas', p: 'Banco de questões com comentário de especialista em cada alternativa.' },
      { ic: 'cards',  t: '+3.000 flashcards', p: 'Memorização ativa dos pontos que mais caem, em sessões rápidas.' },
      { ic: 'clip',   t: 'Simulados', p: 'Simulados online e presencial no formato da prova, com nota e ranking.' },
      { ic: 'chart',  t: 'Painel de desempenho', p: 'Veja seu acerto por tema e saiba exatamente o que revisar.' }
    ],

    profs: [
      { n: 'Dr. Khalil Feitosa',  f: 'img/prof-khalil.png' },
      { n: 'Dra. Patricia Lopes', f: 'img/prof-patricia.png' },
      { n: 'Dra. Nicole Pinheiro', f: 'img/prof-nicole.png' },
      { n: 'Dr. Juan Valdivia',   f: 'img/prof-juan.png' },
      { n: 'Dra. Tayna Wandeur',  f: 'img/prof-tayna.png' },
      { n: 'Dr. Bruno Ribeiro',   f: 'img/prof-bruno.png' },
      { n: 'Dra. Thays Gomes',    f: 'img/prof-thays.png' },
      { n: 'Dra. Thaís Leão',     f: 'img/prof-thais.png' }
    ],
    profsSub: 'Medicina de Emergência · titulado(a)',

    /* Portal do aluno (demonstração com dados ilustrativos) */
    portal: {
      url: 'Portal do aluno · Preparatório TEME 2027',
      marca: 'TEME 2027',
      ola: 'Olá, doutor(a)!',
      progresso: 38,
      cards: [
        { n: '38%', t: 'do curso concluído', hl: true },
        { n: '412', t: 'questões resolvidas' },
        { n: '74%', t: 'de acerto geral' },
        { n: '1.260', t: 'flashcards revisados' }
      ],
      continuar: { t: 'Sepse e choque séptico', s: 'Eixo Choque e sepse · você parou em 18:20', pct: 44, img: 'img/galeria-5.jpg' },
      aulas: [
        { t: 'Via aérea: sequência rápida de intubação', s: 'Eixo Via aérea · aula + material de apoio', st: 'done', meta: 'Concluída' },
        { t: 'Sepse e choque séptico', s: 'Eixo Choque e sepse · aula + flashcards', st: 'now', meta: '44%' },
        { t: 'Síndromes coronarianas agudas', s: 'Eixo Cardiovascular · aula + questões', st: 'new', meta: 'Nova' },
        { t: 'Trauma: atendimento inicial', s: 'Eixo Trauma · aula + questões', st: 'new', meta: 'Nova' },
        { t: 'Intoxicações exógenas', s: 'Eixo Toxicologia', st: 'lock', meta: 'Em breve' }
      ],
      eixos: [
        { t: 'Via aérea', s: 'Intubação, via aérea difícil, ventilação' },
        { t: 'Ressuscitação', s: 'PCR, cuidados pós-parada' },
        { t: 'Choque e sepse', s: 'Reconhecimento, volume, vasopressores' },
        { t: 'Cardiovascular', s: 'SCA, arritmias, emergência hipertensiva' },
        { t: 'Trauma', s: 'XABCDE, choque hemorrágico, TCE' },
        { t: 'Neurológicas', s: 'AVC, crise convulsiva, rebaixamento' },
        { t: 'Respiratórias', s: 'Asma, DPOC, TEP, insuficiência respiratória' },
        { t: 'Toxicologia', s: 'Síndromes tóxicas e antídotos' },
        { t: 'Metabólicas', s: 'Distúrbios hidroeletrolíticos e ácido-base' },
        { t: 'Pediatria na emergência', s: 'Particularidades do atendimento pediátrico' },
        { t: 'Procedimentos e POCUS', s: 'Ultrassom à beira-leito e procedimentos' }
      ],
      simulados: [
        { t: 'Simulado 1 · online', s: 'Formato da prova, com cronômetro', st: 'done', meta: 'Nota 71%' },
        { t: 'Simulado 2 · online', s: 'Liberado após o eixo Cardiovascular', st: 'now', meta: 'Disponível' },
        { t: 'Simulado 3 · presencial', s: 'Ambiente de prova, com correção', st: 'lock', meta: 'Em breve' },
        { t: 'Simulado 4 · online', s: 'Reta final', st: 'lock', meta: 'Em breve' }
      ],
      decks: [
        { t: 'Ressuscitação', s: 'cards para hoje: 18' },
        { t: 'Choque e sepse', s: 'cards para hoje: 12' },
        { t: 'Toxicologia', s: 'cards para hoje: 9' },
        { t: 'Via aérea', s: 'cards para hoje: 15' }
      ],
      desempenho: [
        { t: 'Via aérea', v: 82 }, { t: 'Ressuscitação', v: 78 }, { t: 'Choque e sepse', v: 76 },
        { t: 'Cardiovascular', v: 71 }, { t: 'Trauma', v: 64 }, { t: 'Toxicologia', v: 55 }
      ],
      acerto: 74
    },

    /* Aula experimental (passo a passo) */
    aula: {
      titulo: 'Sepse e choque séptico: a primeira hora',
      slides: [
        { tipo: 'capa', tag: 'Aula experimental · Eixo Choque e sepse', titulo: 'Sepse: o que fazer na primeira hora', texto: 'Uma amostra do formato das aulas do TEME: objetiva, direto no que cai na prova e no que muda a conduta no plantão.', meta: ['6 telas', '3 minutos', 'Teste no final'] },
        { tipo: 'lista', tag: 'Definições · Sepse-3', titulo: 'Sepse e choque séptico', itens: [
          { b: 'Sepse:', t: 'disfunção orgânica com risco de vida causada por uma resposta desregulada do hospedeiro à infecção (aumento de 2 ou mais pontos no SOFA).' },
          { b: 'Choque séptico:', t: 'necessidade de vasopressor para manter PAM ≥ 65 mmHg e lactato > 2 mmol/L, apesar de reposição volêmica adequada.' }
        ], dica: 'qSOFA isolado não deve ser usado como ferramenta única de triagem para sepse: a diretriz de 2021 desaconselha.' },
        { tipo: 'lista', tag: 'Pacote da 1ª hora', titulo: 'Os 5 passos que não podem esperar', itens: [
          { b: 'Lactato:', t: 'dosar e repetir se o inicial vier acima de 2 mmol/L.' },
          { b: 'Hemoculturas:', t: 'colher antes do antibiótico, sem atrasá-lo.' },
          { b: 'Antibiótico:', t: 'amplo espectro, o mais cedo possível.' },
          { b: 'Cristaloide:', t: '30 mL/kg se hipotensão ou lactato ≥ 4 mmol/L.' },
          { b: 'Vasopressor:', t: 'se PAM < 65 mmHg durante ou após o volume.' }
        ] },
        { tipo: 'numero', tag: 'Alvo pressórico', titulo: 'O número que a banca adora', num: '65', legenda: 'mmHg de PAM é o alvo inicial no choque séptico.', texto: '<b>Noradrenalina</b> é o vasopressor de primeira escolha. Pode ser iniciada por acesso periférico para não atrasar o tratamento. Associe <b>vasopressina</b> se a dose de noradrenalina continuar subindo.' },
        { tipo: 'teste', tag: 'Teste rápido', titulo: 'Paciente com choque séptico e PAM de 58 mmHg após 30 mL/kg de cristaloide. Qual a melhor conduta?', opts: ['Repetir mais 30 mL/kg e reavaliar em 2 horas', 'Iniciar noradrenalina', 'Iniciar dobutamina', 'Aguardar resultado do lactato'], c: 1, com: 'Hipotensão persistente após o volume indica vasopressor. A noradrenalina é a primeira escolha e não deve esperar acesso central.' },
        { tipo: 'fim', titulo: 'Gostou do formato?', texto: 'No TEME 2027 são mais de 100 aulas assim, com questões comentadas, flashcards e simulados para cada eixo.' }
      ]
    },

    /* Questões (banco de questões, modo estudo) */
    questoes: [
      { tema: 'Choque e sepse', e: 'No choque séptico, qual é o vasopressor de primeira escolha?', o: ['Dopamina', 'Noradrenalina', 'Dobutamina', 'Vasopressina', 'Fenilefrina'], c: 1,
        com: 'A <b>noradrenalina</b> é o vasopressor de primeira linha recomendado pela Surviving Sepsis Campaign. A vasopressina entra como segundo agente quando a dose de noradrenalina sobe. A dopamina causa mais arritmias e não é preferida.' },
      { tema: 'Ressuscitação', e: 'Paciente em fibrilação ventricular segue no ritmo após o terceiro choque. Já recebeu adrenalina. Qual antiarrítmico e dose estão indicados?', o: ['Amiodarona 150 mg IV', 'Amiodarona 300 mg IV em bolus', 'Adenosina 6 mg IV rápido', 'Lidocaína 3 mg/kg IV', 'Sulfato de magnésio 2 g IV'], c: 1,
        com: 'Na FV/TV sem pulso refratária, a primeira dose de <b>amiodarona é 300 mg em bolus</b>, e a segunda, 150 mg. A lidocaína (1 a 1,5 mg/kg) é alternativa. Magnésio fica reservado para torsades de pointes.' },
      { tema: 'Neurológicas', e: 'No AVC isquêmico agudo, até quanto tempo após o último momento em que o paciente foi visto bem a trombólise endovenosa é classicamente indicada?', o: ['1 hora', '3 horas', '4,5 horas', '12 horas', '24 horas'], c: 2,
        com: 'A trombólise IV é indicada até <b>4,5 horas</b> do último momento visto bem, respeitados os critérios de inclusão e exclusão. A trombectomia mecânica tem janela própria e pode ir além em casos selecionados por imagem.' },
      { tema: 'Alergia e anafilaxia', e: 'Adulto com anafilaxia após picada de inseto: hipotensão, sibilância e urticária. Qual a medida inicial prioritária?', o: ['Hidrocortisona 200 mg IV', 'Prometazina 50 mg IM', 'Adrenalina 0,5 mg IM na face anterolateral da coxa', 'Adrenalina 1 mg IV em bolus', 'Salbutamol inalatório'], c: 2,
        com: '<b>Adrenalina IM</b> (0,01 mg/kg, máximo de 0,5 mg no adulto) na face anterolateral da coxa é o tratamento de primeira linha e pode ser repetida a cada 5 a 15 minutos. Bolus IV de 1 mg é dose de PCR. Corticoide e anti-histamínico são adjuvantes.' },
      { tema: 'Trauma', e: 'Politraumatizado com sangramento arterial ativo em coxa. Pela sequência XABCDE, qual é a primeira prioridade?', o: ['Via aérea com restrição de movimento da coluna cervical', 'Controle da hemorragia exsanguinante', 'Avaliação neurológica (Glasgow e pupilas)', 'Exposição e prevenção de hipotermia', 'FAST à beira-leito'], c: 1,
        com: 'O <b>X</b> do XABCDE é o controle da hemorragia externa exsanguinante, com compressão direta ou torniquete, antes mesmo da via aérea. Esse sangramento pode matar em poucos minutos.' }
    ],

    flashcards: [
      { tag: 'Ressuscitação', q: 'Dose de adrenalina na PCR do adulto?', a: '1 mg IV/IO a cada 3 a 5 min', x: 'Em ritmo chocável, após o 2º choque; em não chocável, assim que possível.' },
      { tag: 'Ressuscitação', q: 'Primeira dose de amiodarona na FV/TV sem pulso refratária?', a: '300 mg IV/IO em bolus', x: 'Segunda dose: 150 mg.' },
      { tag: 'Choque e sepse', q: 'Vasopressor de 1ª escolha no choque séptico?', a: 'Noradrenalina', x: 'Alvo inicial de PAM ≥ 65 mmHg.' },
      { tag: 'Choque e sepse', q: 'Volume inicial de cristaloide na sepse com hipotensão ou lactato ≥ 4?', a: '30 mL/kg', x: 'Nas primeiras 3 horas, com reavaliação frequente.' },
      { tag: 'Neurológicas', q: 'Janela da trombólise IV no AVC isquêmico?', a: 'Até 4,5 h', x: 'Contadas do último momento em que o paciente foi visto bem.' },
      { tag: 'Anafilaxia', q: 'Adrenalina na anafilaxia do adulto: dose e via?', a: '0,5 mg IM na coxa', x: '0,01 mg/kg, máximo de 0,5 mg. Repetir em 5 a 15 min se necessário.' },
      { tag: 'Toxicologia', q: 'Antídoto da intoxicação por paracetamol?', a: 'N-acetilcisteína', x: 'Indicação guiada pelo nível sérico e pelo tempo desde a ingestão.' },
      { tag: 'Metabólicas', q: 'Hipercalemia com alteração no ECG: primeira medida?', a: 'Gluconato de cálcio IV', x: 'Estabiliza a membrana do miocárdio. Depois, deslocar e remover o potássio.' }
    ]
  },

  /* ======================= TEP ======================= */
  tep: {
    tema: 'tep',
    nome: 'Preparatório TEP 2027',
    eyebrow: 'Ped Talks · Turma 2027',
    titulo: 'Preparatório <span class="accent">TEP</span> 2027',
    lead: 'A preparação completa para a prova de <b>Título de Especialista em Pediatria</b> da SBP: conteúdo guiado pela análise das provas anteriores, aulas novas toda segunda e professoras tituladas e atuantes em serviço.',
    stats: [
      { n: '95', t: 'aulas em vídeo' },
      { n: '950', t: 'questões no banco' },
      { n: '1.900', t: 'flashcards' },
      { n: '4', t: 'simulados' }
    ],
    nota: 'Aulas novas toda segunda, às 12h, de 04/01 a 14/06/2027. Acesso até o dia da prova.',
    foto: 'img/tep-professoras.jpg',
    logo: 'img/logo-pedtalks.png',
    fotoCap: 'Rebecca Azulay e Natália Dias',
    whatsKey: 'tep',
    whatsMsg: 'Olá! Conheci o Preparatório TEP 2027 no Painel Interativo Talks e quero saber mais.',
    abas: ['geral', 'portal', 'aula', 'questoes', 'flashcards'],

    feats: [
      { ic: 'layers', t: 'Trilha única', p: 'Toda a Pediatria do começo ao fim, sem você precisar montar cronograma.' },
      { ic: 'cal',    t: 'Aulas toda segunda', p: 'Aula nova toda segunda-feira, às 12h, liberada no portal.' },
      { ic: 'target', t: 'Guiado pelas provas', p: 'Conteúdo construído a partir da análise das provas anteriores da SBP.' },
      { ic: 'q',      t: '950 questões', p: 'Banco de questões comentadas para treinar no estilo da prova.' },
      { ic: 'cards',  t: '1.900 flashcards', p: 'Revisão ativa para fixar o que você estudou.' },
      { ic: 'clip',   t: '4 simulados', p: 'Para medir a evolução ao longo da preparação.' }
    ],

    profs: [
      { n: 'Rebecca Azulay', f: 'img/prof-rebecca.png', s: 'Pediatria' },
      { n: 'Natália Dias',   f: 'img/prof-natalia.png', s: 'Intensiva Pediátrica' }
    ],

    portal: {
      url: 'Portal do aluno · Preparatório TEP 2027',
      marca: 'TEP 2027',
      ola: 'Olá, doutor(a)!',
      progresso: 32,
      cards: [
        { n: '32%', t: 'do curso concluído', hl: true },
        { n: '286', t: 'questões resolvidas' },
        { n: '71%', t: 'de acerto geral' },
        { n: '640', t: 'flashcards revisados' }
      ],
      continuar: { t: 'Bronquiolite viral aguda', s: 'Pneumologia · você parou em 12:05', pct: 38, img: 'img/tep-professoras.jpg' },
      aulas: [
        { t: 'Imunizações: calendário da criança', s: 'Imunizações · aula + flashcards', st: 'done', meta: 'Concluída' },
        { t: 'Bronquiolite viral aguda', s: 'Pneumologia · aula + questões', st: 'now', meta: '38%' },
        { t: 'Crescimento e desenvolvimento', s: 'Puericultura · aula + questões', st: 'new', meta: 'Nova' },
        { t: 'Doença de Kawasaki', s: 'Reumatologia · aula + questões', st: 'new', meta: 'Nova' },
        { t: 'Icterícia neonatal', s: 'Neonatologia', st: 'lock', meta: 'Segunda, 12h' }
      ],
      eixos: [
        { t: 'Neonatologia', s: 'Sala de parto, icterícia, triagens' },
        { t: 'Puericultura', s: 'Crescimento, desenvolvimento, alimentação' },
        { t: 'Imunizações', s: 'Calendário e situações especiais' },
        { t: 'Infectologia', s: 'Febre, doenças exantemáticas' },
        { t: 'Pneumologia', s: 'Bronquiolite, asma, pneumonias' },
        { t: 'Gastroenterologia', s: 'Diarreia, desidratação, nutrição' },
        { t: 'Cardiologia', s: 'Cardiopatias congênitas, Kawasaki' },
        { t: 'Nefrologia', s: 'ITU, síndrome nefrótica e nefrítica' },
        { t: 'Neurologia', s: 'Convulsão febril, epilepsias' },
        { t: 'Emergências pediátricas', s: 'Reanimação, choque, intoxicações' },
        { t: 'Adolescência', s: 'Puberdade, saúde do adolescente' }
      ],
      simulados: [
        { t: 'Simulado 1', s: 'Formato da prova da SBP', st: 'done', meta: 'Nota 68%' },
        { t: 'Simulado 2', s: 'Libera após o próximo bloco de aulas', st: 'lock', meta: 'Em breve' },
        { t: 'Simulado 3', s: 'Ao longo da preparação', st: 'lock', meta: 'Em breve' },
        { t: 'Simulado 4', s: 'Reta final', st: 'lock', meta: 'Em breve' }
      ],
      decks: [
        { t: 'Imunizações', s: 'cards para hoje: 14' },
        { t: 'Neonatologia', s: 'cards para hoje: 11' },
        { t: 'Pneumologia', s: 'cards para hoje: 8' },
        { t: 'Puericultura', s: 'cards para hoje: 10' }
      ],
      desempenho: [
        { t: 'Imunizações', v: 85 }, { t: 'Puericultura', v: 79 }, { t: 'Neonatologia', v: 74 },
        { t: 'Pneumologia', v: 71 }, { t: 'Infectologia', v: 66 }, { t: 'Emergências', v: 58 }
      ],
      acerto: 71
    },

    aula: {
      titulo: 'Bronquiolite viral aguda: o que a prova cobra',
      slides: [
        { tipo: 'capa', tag: 'Aula experimental · Pneumologia', titulo: 'Bronquiolite viral aguda', texto: 'Uma amostra do formato das aulas do TEP: o que você precisa saber para a prova e para o plantão de pediatria.', meta: ['6 telas', '3 minutos', 'Teste no final'] },
        { tipo: 'lista', tag: 'Quem e como', titulo: 'Diagnóstico é clínico', itens: [
          { b: 'Quem:', t: 'lactentes, principalmente nos primeiros meses de vida.' },
          { b: 'Agente principal:', t: 'vírus sincicial respiratório (VSR).' },
          { b: 'Quadro:', t: 'coriza e tosse que evoluem com taquipneia, sibilos e/ou crepitações.' },
          { b: 'Exames:', t: 'raio X e pesquisa viral não são de rotina.' }
        ] },
        { tipo: 'lista', tag: 'Tratamento', titulo: 'O que funciona', estilo: 'yes', itens: [
          { b: 'Hidratação', t: 'e manutenção da alimentação.' },
          { b: 'Lavagem e aspiração nasal', t: 'para aliviar a obstrução.' },
          { b: 'Oxigênio', t: 'quando a saturação cai abaixo de 90 a 92%.' },
          { b: 'Cânula nasal de alto fluxo', t: 'nos casos que não respondem ao oxigênio convencional.' }
        ] },
        { tipo: 'lista', tag: 'Pegadinha de prova', titulo: 'O que NÃO usar de rotina', estilo: 'no', itens: [
          { b: 'Broncodilatador', t: '(salbutamol)' },
          { b: 'Corticoide', t: 'sistêmico ou inalatório' },
          { b: 'Antibiótico', t: 'sem infecção bacteriana associada' },
          { b: 'Fisioterapia respiratória', t: 'de rotina' }
        ], dica: 'Na prova, a alternativa com "suporte" costuma ser a correta. Medicação de rotina quase sempre é a distratora.' },
        { tipo: 'teste', tag: 'Teste rápido', titulo: 'Lactente de 4 meses com bronquiolite, SatO₂ de 95% em ar ambiente, mamando bem. Qual a conduta?', opts: ['Salbutamol inalatório de horário', 'Prednisolona por 5 dias', 'Amoxicilina por 7 dias', 'Suporte: lavagem nasal, hidratação e sinais de alarme'], c: 3, com: 'Sem hipoxemia e aceitando a dieta, o tratamento é de suporte, com orientação dos sinais de alarme aos pais.' },
        { tipo: 'fim', titulo: 'Gostou do formato?', texto: 'No TEP 2027 são 95 aulas, 950 questões e 1.900 flashcards, numa trilha única até a prova.' }
      ]
    },

    questoes: [
      { tema: 'Pneumologia', e: 'Lactente de 4 meses com bronquiolite viral aguda, SatO₂ de 95% em ar ambiente e aceitando o seio. Qual a conduta mais adequada?', o: ['Salbutamol inalatório de horário', 'Prednisolona por 5 dias', 'Amoxicilina por 7 dias', 'Suporte: lavagem nasal, hidratação e orientação de sinais de alarme', 'Nebulização com adrenalina de rotina'], c: 3,
        com: 'O tratamento da bronquiolite é de <b>suporte</b>. Broncodilatador, corticoide e antibiótico não são recomendados de rotina. Oxigênio entra quando a saturação cai abaixo de 90 a 92%.' },
      { tema: 'Imunizações', e: 'Em que momento a vacina BCG deve ser aplicada no calendário da criança?', o: ['Ao nascer', 'Aos 2 meses', 'Aos 4 meses', 'Aos 12 meses', 'Aos 15 meses'], c: 0,
        com: 'A <b>BCG</b> é aplicada em dose única <b>ao nascer</b>, de preferência ainda na maternidade, em recém-nascidos com peso a partir de 2 kg.' },
      { tema: 'Gastroenterologia', e: 'Criança com diarreia aguda e desidratação, sem sinais de gravidade (Plano B). Qual a conduta de reidratação?', o: ['Soro fisiológico IV 20 mL/kg em bolus', 'SRO 50 a 100 mL/kg em 4 a 6 horas, na unidade de saúde', 'Apenas aumentar a oferta de líquidos em casa', 'Suspender a alimentação por 24 horas', 'Soro glicosado 5% por via oral'], c: 1,
        com: 'No <b>Plano B</b>, a reidratação é oral, com <b>SRO 50 a 100 mL/kg em 4 a 6 horas</b>, na unidade de saúde e com reavaliação frequente. A hidratação venosa fica para o Plano C.' },
      { tema: 'Puericultura', e: 'Por volta de qual idade se espera o sorriso social no desenvolvimento típico?', o: ['15 dias', '2 meses', '6 meses', '9 meses', '12 meses'], c: 1,
        com: 'O <b>sorriso social</b> aparece por volta dos <b>2 meses</b>. É um dos marcos acompanhados na consulta de puericultura.' },
      { tema: 'Cardiologia', e: 'Qual é o critério obrigatório para o diagnóstico da doença de Kawasaki clássica?', o: ['Linfonodo cervical maior que 1,5 cm', 'Febre por 5 dias ou mais', 'Conjuntivite exsudativa', 'Trombocitose', 'Descamação periungueal'], c: 1,
        com: 'A forma clássica exige <b>febre por 5 dias ou mais</b> e pelo menos 4 dos 5 critérios principais. A conjuntivite é bilateral e <b>não</b> exsudativa. O tratamento é imunoglobulina IV 2 g/kg associada ao AAS.' }
    ],

    flashcards: [
      { tag: 'Imunizações', q: 'Quando aplicar a BCG?', a: 'Ao nascer, dose única', x: 'De preferência na maternidade, em RN com peso a partir de 2 kg.' },
      { tag: 'Pneumologia', q: 'Principal agente da bronquiolite viral aguda?', a: 'Vírus sincicial respiratório (VSR)', x: 'Tratamento de suporte; sem broncodilatador ou corticoide de rotina.' },
      { tag: 'Cardiologia', q: 'Tratamento da doença de Kawasaki?', a: 'Imunoglobulina IV 2 g/kg + AAS', x: 'Para reduzir o risco de aneurisma coronariano.' },
      { tag: 'Gastroenterologia', q: 'Plano B de hidratação?', a: 'SRO 50 a 100 mL/kg em 4 a 6 h', x: 'Na unidade de saúde, com reavaliação frequente.' },
      { tag: 'Puericultura', q: 'Sorriso social surge por volta de que idade?', a: '2 meses', x: 'Marco do desenvolvimento acompanhado na puericultura.' },
      { tag: 'Puericultura', q: 'Com que idade o lactente costuma dobrar o peso de nascimento?', a: 'Por volta de 4 a 5 meses', x: 'E costuma triplicar com 1 ano.' },
      { tag: 'Infectologia', q: 'Dose de amoxicilina na otite média aguda?', a: '80 a 90 mg/kg/dia', x: 'Divididos de 12 em 12 horas.' },
      { tag: 'Neonatologia', q: 'Icterícia nas primeiras 24 horas de vida é...', a: 'Patológica', x: 'Sempre investigar, principalmente hemólise.' }
    ]
  }
};

/* ------------------------------------------------------------------
   ATUALIZA TALKS
   ------------------------------------------------------------------ */
var ATUALIZA = {
  whatsMsg: 'Olá! Vi no Painel Interativo Talks a oferta de Black Friday do Atualiza Talks (1º mês por R$ 9,90) e quero assinar.',
  oferta: {
    tag: 'Black Friday',
    preco: '9', centavos: ',90',
    sub: 'no primeiro mês',
    itens: [
      'Artigo comentado toda segunda-feira',
      'Comentário em áudio e flashcards de cada artigo',
      'Encontro ao vivo uma vez por mês, com gravação',
      'Teste mensal com gabarito',
      'Para médicos com ou sem título'
    ],
    nota: 'Valor promocional de Black Friday para o primeiro mês. Confirme as condições dos meses seguintes com a nossa central.'
  },
  inicio: '2027-01-16T09:00:00-03:00',
  novidades: [
    { ic: 'book',   when: 'Toda segunda-feira', t: 'Artigo da semana', p: 'Um artigo relevante para a prática da Medicina de Emergência, publicado no portal.', novo: true },
    { ic: 'headph', when: 'Toda segunda-feira', t: 'Comentário em áudio', p: 'A análise do artigo para ouvir no carro, no intervalo do plantão ou em casa.', novo: true },
    { ic: 'cards',  when: 'Toda segunda-feira', t: 'Flashcards do artigo', p: 'Os pontos principais em cartões de pergunta e resposta para revisar em minutos.' },
    { ic: 'live',   when: '1 sábado por mês · 9h às 12h', t: 'Encontro ao vivo', p: 'Aula de revisão, Journal Club e mesa-redonda sobre o tema do mês.', novo: true },
    { ic: 'video',  when: 'Depois de cada encontro', t: 'Gravações no portal', p: 'Está de plantão no sábado? Assista depois, quando puder.' },
    { ic: 'clip',   when: 'Todo fim de mês', t: 'Teste do mês', p: '20 questões com gabarito sobre os artigos do mês.' }
  ],
  temas: [
    { d: '2027-01-16', t: 'AVC', s: 'AVC isquêmico, hemorrágico, trombólise' },
    { d: '2027-02-20', t: 'Via aérea', s: 'Intubação, oxigenação' },
    { d: '2027-03-13', t: 'Síndromes coronarianas agudas', s: 'Dor torácica, ECG' },
    { d: '2027-04-17', t: 'Reanimação', s: 'PCR, RCP, pós-parada' },
    { d: '2027-05-15', t: 'Trauma', s: 'Atendimento inicial, sala vermelha' },
    { d: '2027-06-12', t: 'Insuficiência respiratória', s: 'Ventilação' },
    { d: '2027-07-17', t: 'Emergências clínicas', s: 'Temas clínicos do plantão' },
    { d: '2027-08-14', t: 'Toxicologia', s: 'Intoxicações' },
    { d: '2027-09-18', t: 'Sepse', s: 'Choque séptico, ressuscitação' },
    { d: '2027-10-23', t: 'Analgesia, sedação e procedimentos', s: 'Procedimentos no PS' },
    { d: '2027-11-13', t: 'Emergências onco-hematológicas', s: 'Oncológicas e hematológicas' },
    { d: '2027-12-11', t: 'Melhores do ano', s: 'As principais evidências de 2027' }
  ],
  artigo: {
    tema: 'AVC',
    titulo: 'Trombólise no AVC isquêmico: o que levar para o plantão',
    resumo: 'Toda segunda, um artigo selecionado chega ao portal com um resumo objetivo, o comentário em áudio do professor e flashcards com os pontos principais.',
    pontos: ['Quem é candidato e quem não é', 'A janela de tempo e como contá-la', 'O que muda na conduta da sala de emergência'],
    audio: 'Comentário do artigo · 14 min'
  },
  flashcards: [
    { tag: 'AVC', q: 'AVC isquêmico: até quando a trombólise IV é classicamente indicada?', a: 'Até 4,5 horas', x: 'Do último momento em que o paciente foi visto bem.' },
    { tag: 'Reanimação', q: 'Frequência e profundidade das compressões no adulto?', a: '100 a 120/min · 5 a 6 cm', x: 'Permitindo retorno completo do tórax e minimizando pausas.' },
    { tag: 'SCA', q: 'IAM com supra de ST: tempo porta-balão ideal?', a: 'Até 90 minutos', x: 'Se a fibrinólise for a estratégia, porta-agulha de até 30 minutos.' },
    { tag: 'Trauma', q: 'Ácido tranexâmico no trauma com sangramento: até quando e como?', a: 'Até 3 h · 1 g em 10 min + 1 g em 8 h', x: 'Benefício maior quanto mais cedo for feito.' },
    { tag: 'Sepse', q: 'Lactato inicial acima de 2 mmol/L na sepse. E agora?', a: 'Remensurar', x: 'Usar a tendência do lactato para guiar a ressuscitação.' },
    { tag: 'Toxicologia', q: 'Antídoto da intoxicação por benzodiazepínico?', a: 'Flumazenil', x: 'Com cautela: risco de convulsão em usuários crônicos e coingestões.' }
  ],
  questoes: [
    { tema: 'Teste de setembro · Sepse', e: 'No choque séptico, qual é o vasopressor de primeira escolha?', o: ['Dopamina', 'Noradrenalina', 'Dobutamina', 'Fenilefrina'], c: 1,
      com: 'Gabarito: <b>B</b>. A noradrenalina é o vasopressor de primeira linha no choque séptico.' },
    { tema: 'Teste de abril · Reanimação', e: 'Qual a frequência recomendada de compressões torácicas na RCP do adulto?', o: ['60 a 80 por minuto', '80 a 100 por minuto', '100 a 120 por minuto', 'Acima de 140 por minuto'], c: 2,
      com: 'Gabarito: <b>C</b>. 100 a 120 compressões por minuto, com profundidade de 5 a 6 cm.' },
    { tema: 'Teste de maio · Trauma', e: 'No trauma com sangramento significativo, o ácido tranexâmico deve ser iniciado em até:', o: ['1 hora', '3 horas', '6 horas', '12 horas'], c: 1,
      com: 'Gabarito: <b>B</b>. Até 3 horas do trauma: 1 g em 10 minutos e mais 1 g em 8 horas.' }
  ]
};

/* ------------------------------------------------------------------
   REVISÕES TEME
   ------------------------------------------------------------------ */
var REVISOES = {
  whatsMsg: 'Olá! Conheci as Revisões TEME no Painel Interativo Talks e quero saber das próximas turmas.',
  fotos: [
    { f: 'img/pratica-1.jpg', t: 'Via aérea no manequim', s: 'Revisão Prática TEME' },
    { f: 'img/galeria-1.jpg', t: 'Treino com professor ao lado', s: 'Workshop de via aérea' },
    { f: 'img/pratica-2.jpg', t: 'Simulação realista', s: 'Revisão Prática TEME' },
    { f: 'img/galeria-2.jpg', t: 'Aulas com quem é titulado', s: 'Encontros Talks' },
    { f: 'img/pratica-3.jpg', t: 'Cenários no formato da prova', s: 'Revisão Prática TEME' },
    { f: 'img/galeria-3.jpg', t: 'Bastidores', s: 'Encontros Talks' },
    { f: 'img/pratica-4.jpg', t: 'Hands-on de verdade', s: 'Revisão Prática TEME' },
    { f: 'img/galeria-4.jpg', t: 'Turma reunida', s: 'Encontros Talks' },
    { f: 'img/pratica-5.jpg', t: 'Debriefing após cada estação', s: 'Revisão Prática TEME' },
    { f: 'img/galeria-5.jpg', t: 'Momentos da turma', s: 'Encontros Talks' },
    { f: 'img/galeria-6.jpg', t: 'Momentos da turma', s: 'Encontros Talks' },
    { f: 'img/galeria-7.jpg', t: 'Momentos da turma', s: 'Encontros Talks' },
    { f: 'img/galeria-8.jpg', t: 'Momentos da turma', s: 'Encontros Talks' },
    { f: 'img/galeria-9.jpg', t: 'Momentos da turma', s: 'Encontros Talks' }
  ],
  pratica: {
    stats: [
      { n: '4', t: 'dias de imersão presencial' },
      { n: '+30', t: 'cenários realistas' },
      { n: '6', t: 'estações no modelo da prova' },
      { n: '100%', t: 'de acerto nos cenários do TEME 2025*' }
    ],
    nota: '* Acertamos todos os cenários da prova prática do TEME 2025.',
    passos: [
      { t: 'Entra na estação', p: 'Você recebe o cenário no modelo da prova da ABRAMEDE, simulando o dia do exame.' },
      { t: 'Lidera o caso', p: 'Interpreta o caso, conduz a situação, organiza a equipe e comunica a conduta.' },
      { t: 'Recebe o debriefing', p: 'Feedback logo após cada estação: pontos fortes, ajustes de conduta, comunicação e postura.' }
    ],
    debrief: ['Pontos fortes da condução', 'Erros de conduta', 'Falhas de comunicação', 'Postura diante da estação', 'Tomada de decisão sob pressão', 'O que ajustar até a prova'],
    inclui: [
      'Simulações presenciais com manequins realistas',
      'Estações no modelo da prova da ABRAMEDE',
      'Workshops práticos de Via Aérea e POCUS',
      'Debriefing com professores titulados',
      'Espaço de autotreinamento',
      'Encontros online de preparação antes da etapa presencial'
    ]
  },
  teorica: {
    texto: 'A revisão da 1ª fase: um dia de aulas intensivas alinhadas ao edital da ABRAMEDE para consolidar o conteúdo antes da prova teórica.',
    inclui: [
      'Aulas intensivas com professores titulados',
      'Conteúdo alinhado ao edital da prova',
      'Material de apoio exclusivo',
      'Gravações para revisar até o dia da prova'
    ],
    stats: [
      { n: '10', t: 'aulas em um dia (edição 2026)' },
      { n: '08h–18h', t: 'de revisão direcionada' },
      { n: '8/10', t: 'dos aprovados no TEME 2025 são alunos Talks' }
    ]
  }
};

/* ------------------------------------------------------------------
   ROLETA · prêmios
   peso = tamanho da fatia (e a chance real de cair nela).
   A soma dos pesos das fatias abaixo dá 100, então peso = %.
   ------------------------------------------------------------------ */
var PREMIOS = {
  m1:     { nome: '1 mês de Atualiza Talks',   curto: '1 MÊS',   sub: 'ATUALIZA TALKS', tipo: 'assinatura', peso: 10, cor: ['#FF3A49', '#B70412'], txt: '#FFFFFF', ico: 'cal', n: '1' },
  caneta: { nome: 'Caneta Talks',              curto: 'CANETA',  sub: 'BRINDE TALKS',   tipo: 'brinde',     peso: 10, cor: ['#2a2a31', '#111115'], txt: '#FFFFFF', ico: 'caneta' },
  m2:     { nome: '2 meses de Atualiza Talks', curto: '2 MESES', sub: 'ATUALIZA TALKS', tipo: 'assinatura', peso: 9,  cor: ['#9E0A16', '#4f0309'], txt: '#FFFFFF', ico: 'cal', n: '2' },
  copo:   { nome: 'Copo Talks',                curto: 'COPO',    sub: 'BRINDE TALKS',   tipo: 'brinde',     peso: 10, cor: ['#FFFFFF', '#CFD1D8'], txt: '#0a0a0c', ico: 'copo' },
  m3:     { nome: '3 meses de Atualiza Talks', curto: '3 MESES', sub: 'ATUALIZA TALKS', tipo: 'assinatura', peso: 7,  cor: ['#141418', '#050506'], txt: '#F5C451', ico: 'cal', n: '3' },
  m6:     { nome: '6 meses de Atualiza Talks', curto: '6 MESES', sub: 'PRÊMIO MÁXIMO',  tipo: 'assinatura', peso: 4,  cor: ['#FFE9A8', '#C8922F'], txt: '#1a1205', ico: 'cal', n: '6', max: true }
};
/* ordem das fatias, no sentido horário a partir do ponteiro */
var FATIAS = ['m1', 'caneta', 'm2', 'copo', 'm3', 'm1', 'caneta', 'copo', 'm1', 'caneta', 'm6'];

/* PIN da área da equipe (engrenagem no canto da tela da roleta) */
var ADMIN_PIN = '2027';
