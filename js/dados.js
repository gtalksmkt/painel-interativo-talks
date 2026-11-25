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
  bigpocus: '5585998302705',
  atualiza: '5585998302705',
  revisoes: '5585998302705',
  premio:   '5585998302705',   // resgate dos prêmios da roleta
  cadastro: '5585998302705'    // faixa "Cadastre-se aqui e ganhe um curso + ecobag"
};

/* Faixa do topo "Cadastre-se aqui e ganhe um curso + ecobag".
   link: se preencher com o endereço de um formulário (ex.: RD Station, Google Forms),
         a faixa abre esse formulário em vez do cadastro pelo WhatsApp.
   foto: caminho da foto real da ecobag (ex.: 'img/ecobag.png'); vazio = desenho. */
var CADASTRO = {
  link: '',
  foto: ''
};

/* VÍDEOS DO VIMEO
   Para colocar um vídeo, cole o link do Vimeo entre as aspas de "vimeo".
   Vale o link comum (https://vimeo.com/123456789 ou https://vimeo.com/123456789/abc123)
   ou o do player (https://player.vimeo.com/video/123456789?h=abc123).
   Enquanto estiver vazio, o painel mostra o espaço "Vídeo em breve".
   vertical: true = vídeo em pé (reels, 9:16). */
var VIDEOS = {
  teme:           { vimeo: 'https://vimeo.com/1214813044/7917f77f1b', titulo: 'Conheça o TEME 2027', poster: 'img/galeria-2.jpg' },
  teme_portal:    { vimeo: 'https://vimeo.com/1249727444/dafb079e49', titulo: 'Por dentro do portal do aluno', ratio: 2028 / 1080 },
  teme_khalil:    { vimeo: 'https://vimeo.com/1249728279', titulo: 'Aula experimental · Dr. Khalil Feitosa' },
  teme_nicole:    { vimeo: 'https://vimeo.com/1249728484/3bfdef85ef', titulo: 'Aula experimental · Dra. Nicole Pinheiro' },
  teme_patricia:  { vimeo: 'https://vimeo.com/1249728948', titulo: 'Aula experimental · Dra. Patricia Lopes' },
  premium_video:  { vimeo: 'https://vimeo.com/1249729380', titulo: 'TEME Premium 2027', vertical: true },
  premium_khalil: { vimeo: 'https://vimeo.com/1249730469', titulo: 'Dr. Khalil apresenta o Premium', vertical: true },
  revisoes:       { vimeo: 'https://vimeo.com/1249730963', titulo: 'Revisões TEME em São Paulo', vertical: true },
  autotreino:     { vimeo: 'https://vimeo.com/1249732932', titulo: 'Autotreinamento na Revisão Prática', vertical: true },
  viaaerea:       { vimeo: 'https://vimeo.com/1249732624', titulo: 'Workshop Via Aérea', vertical: true },
  teorica:        { vimeo: 'https://vimeo.com/1249733326', titulo: 'Revisão Teórica 2026', vertical: true },
  bigpocus:       { vimeo: 'https://vimeo.com/1249733937', titulo: 'The Big Pocus', vertical: true },
  bigpocus_reels: { vimeo: 'https://vimeo.com/1249757640', titulo: 'Por dentro do The Big Pocus', vertical: true }
};
/* o formato (em pé ou deitado) é lido sozinho do Vimeo; "vertical"/"ratio" só valem enquanto ele não responde */
/* lista de arquivos numerados: lista('img/x-', 3, '.jpg') = x-01, x-02, x-03 */
function lista(pre, n, ext) { var r = []; for (var i = 1; i <= n; i++) r.push(pre + (i < 10 ? '0' : '') + i + ext); return r; }

/* Lotes de preço: o painel mostra sozinho o lote do dia (horário de Brasília).
   Mesmos valores da landing do TEME 2027. */
var LOTES_TEME = [
  { nome: 'Lançamento', inicio: '2026-08-01', intensivo: '1.164,63', master: '1.553,43' },
  { nome: '1º lote',    inicio: '2026-09-01', intensivo: '1.257,80', master: '1.677,71' },
  { nome: '2º lote',    inicio: '2026-10-01', intensivo: '1.358,43', master: '1.811,92' },
  { nome: '3º lote',    inicio: '2026-11-01', intensivo: '1.467,10', master: '1.956,88' }
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
    aulaVideos: ['teme_khalil', 'teme_nicole', 'teme_patricia'],
    portalVideo: 'teme_portal',

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
  }
};

/* ------------------------------------------------------------------
   TEME PREMIUM (textos da landing do Premium)
   Produto high ticket: sem preço no painel, todo CTA vai para a central.
   ------------------------------------------------------------------ */
var PREMIUM = {
  videos: ['premium_video', 'premium_khalil'],
  whatsMsg: 'Olá! Conheci o TEME Premium no Painel Interativo Talks e quero saber mais sobre a Turma 01.',
  lead: 'A jornada que te possibilita concluir uma <b>pós-graduação em Medicina de Emergência</b> enquanto se prepara para o <b>Título de Especialista (TEME)</b>. Um caminho, duas conquistas: o certificado e o título.',
  stats: [
    { n: '+100', t: 'aulas em 11 eixos temáticos' },
    { n: '10', t: 'encontros ao vivo de questões' },
    { n: '6', t: 'imersões presenciais em SP' },
    { n: '4', t: 'dias de revisões na fase final' }
  ],
  porque: 'Você não escolhe entre concluir a pós-graduação e conquistar o título. No TEME Premium, o mesmo percurso entrega os dois.',
  resultados: [
    { ic: 'award',  t: 'Certificado de Pós-graduação', p: 'Você conclui uma pós-graduação em Medicina de Emergência ao longo do percurso: um certificado que vai alavancar o seu currículo.' },
    { ic: 'target', t: 'Preparação completa para o TEME', p: 'Aulas, questões, simulados e imersões práticas com a metodologia do preparatório que mais aprova emergencistas no Brasil.' }
  ],
  inclui: [
    { ic: 'video', t: '+100 aulas', p: 'Divididas em 11 eixos temáticos, liberadas semanalmente: conteúdo direto e focado no que cai na prova.' },
    { ic: 'q',     t: 'Questões comentadas', p: 'Alinhadas à referência da ABRAMEDE, comentadas por professores titulados.' },
    { ic: 'cards', t: 'Flashcards', p: 'Revisão e memorização ativa dos temas mais cobrados, onde e quando quiser.' },
    { ic: 'headph', t: 'TEME Cast', p: 'Conteúdo em áudio para revisar no trânsito, no plantão ou em qualquer intervalo.' },
    { ic: 'live',  t: 'TEME Quest', p: 'Encontros virtuais ao vivo de discussão e resolução estratégica de questões.' },
    { ic: 'clip',  t: 'Simulados presenciais', p: 'Avalie seu desempenho em condições reais de prova e acompanhe sua evolução.' },
    { ic: 'chart', t: 'Painel de desempenho', p: 'Seus acertos, suas lacunas e onde focar, com a evolução ao longo do curso.' },
    { ic: 'gift',  t: 'Bônus: cursos online', p: 'Acesso a cursos online do Talks para complementar a sua formação em emergência.', bonus: true }
  ],
  certificado: 'O certificado de pós-graduação é exclusivo da modalidade TEME Premium. Fale com a nossa central para conhecer as condições da Turma 01.',
  fases: [
    { tag: 'Fase 1 · Virtual assíncrona', t: '+100 aulas · 11 eixos temáticos', p: 'Mais de 100 aulas divididas nos 11 eixos temáticos, liberadas semanalmente no ritmo da programação didático-pedagógica.',
      chips: ['Via aérea', 'Cardiovascular', 'Clínica', 'Neuro', 'Trauma e APH', 'POCUS', 'Reanimação', 'Pediatria', 'Toxicologia', 'GO', 'Gestão'] },
    { tag: 'Fase 2 · Virtual síncrona', t: 'Curso de Questões ao vivo', p: '10 encontros virtuais de 1 hora com foco em estratégia de prova e resolução de questões: o treino que transforma conhecimento em pontos.' },
    { tag: 'Fase 3 · Reta final', t: 'Revisões intensivas', p: 'Presenciais, para consolidar tudo antes da prova.',
      itens: ['1 dia · Revisão para a Prova Teórica', '3 dias · Revisão Prática com treinamento hands-on', 'Datas a definir'] }
  ],
  notaFases: 'A liberação semanal das aulas segue a programação didático-pedagógica do curso e pode não seguir a sequência cronológica dos módulos.',
  encontros: [
    { t: 'ResusTalks', d: '22 a 24 de janeiro' },
    { t: 'Trauma e APH', d: '26 a 28 de fevereiro' },
    { t: 'Mapa do Choque + POCUS Cardio', d: '26 a 28 de março' },
    { t: 'The Big POCUS', d: '23 a 25 de abril' },
    { t: 'MAVA + Procedimentos', d: '21 a 23 de maio' },
    { t: 'eMePed Talks', d: '25 a 27 de junho' }
  ],
  horarios: [['Sexta-feira', '08:30 às 18:00'], ['Sábado', '08:30 às 18:00'], ['Domingo', '09:00 às 14:00 · simulado da prova teórica TEME']],
  pratica: 'Simulação realística, uso de materiais e equipamentos, procedimentos e o dia a dia da emergência: a maior parte dos encontros é voltada para a prática real.'
};

/* ------------------------------------------------------------------
   THE BIG POCUS (textos da landing do curso, edição 2027)
   ------------------------------------------------------------------ */
var BIGPOCUS = {
  whatsMsg: 'Olá! Conheci o The Big Pocus 2027 no Painel Interativo Talks e quero me inscrever.',
  quando: 'São Paulo/SP · 05 e 06 de março de 2027',
  /* aba "Fotos e vídeos" */
  videos: ['bigpocus', 'bigpocus_reels'],
  foto: 'img/bp-foto-12.jpg',
  fotos: lista('img/bp-foto-', 28, '.jpg').map(function (f) { return { f: f, t: 'The Big Pocus', s: 'Última edição' }; }),
  lead: 'O curso presencial de <b>ultrassom à beira-leito (POCUS)</b> da Emergency Talks: a ferramenta que vai transformar sua tomada de decisão. Dois dias de hands-on em <b>São Paulo, 05 e 06 de março de 2027</b>.',
  stats: [
    { n: '2', t: 'dias de imersão presencial' },
    { n: '9', t: 'blocos de aula e prática' },
    { n: '4', t: 'professores emergencistas' },
    { n: 'VIP', t: 'grupo de discussão no WhatsApp' }
  ],
  sobre: 'Aulas e demonstrações com especialistas reconhecidos na Medicina de Emergência, prática em modelos realistas e técnicas atualizadas para aplicar no seu próximo plantão.',
  pilares: [
    { ic: 'users', t: 'Grupo de discussão exclusivo', p: 'Grupo VIP no WhatsApp para trocar experiências com instrutores e colegas antes, durante e depois do evento.' },
    { ic: 'steth', t: 'Capacitação na prática', p: 'Aprenda diretamente com emergencistas experientes que vivem o dia a dia do departamento de emergência.' },
    { ic: 'book',  t: 'Técnicas baseadas em evidências', p: 'As técnicas mais atualizadas, para aplicar com mais precisão no seu plantão.' }
  ],
  papeis: [
    { t: 'Instrutor', p: 'Ensina, demonstra e orienta a prática.' },
    { t: 'Monitor', p: 'Suporte individualizado nas atividades práticas.' },
    { t: 'Aluno', p: 'Envolvimento ativo com discussões e hands-on.' }
  ],
  aulas: [
    { ic: 'users',  t: 'Discussão tripla', p: 'Grupos de três alunos debatem cenários clínicos reais.' },
    { ic: 'zap',    t: 'Duelo de cenários', p: 'Competições de imagens para estimular o raciocínio rápido.' },
    { ic: 'target', t: 'Hands-on', p: 'Sessões práticas em modelos de simulação realistas.' }
  ],
  dias: [
    { t: 'Dia 1', s: 'Bases essenciais e POCUS na emergência', g: [
      ['8h – 10h45', 'Procedimentos guiados'], ['10h45 – 11h', 'Intervalo'], ['11h – 12h', 'Duelo de imagens'], ['12h – 13h30', 'Almoço'],
      ['13h30 – 15h15', 'POCUS na insuficiência respiratória'], ['15h15 – 15h30', 'Intervalo'], ['15h30 – 17h15', 'Avaliação de aorta e TVP'] ] },
    { t: 'Dia 2', s: 'Aprofundamento e simulações realistas', g: [
      ['8h – 9h45', 'USG cardíaco (habilidades básicas)'], ['9h45 – 10h', 'Intervalo'], ['10h – 12h', 'USG cardíaco (habilidades avançadas)'], ['12h – 13h30', 'Almoço'],
      ['13h30 – 15h15', 'Avaliação de abdome I (via biliar, apêndice)'], ['15h15 – 15h30', 'Intervalo'], ['15h30 – 17h15', 'Avaliação de abdome II (vias urinárias)'], ['17h15 – 18h15', 'Mesa: USG no choque'] ] }
  ],
  profs: [
    { n: 'Dra. Patrícia Lopes', f: 'img/bp-prof-patricia.jpg' },
    { n: 'Dr. Khalil Feitosa',  f: 'img/bp-prof-khalil.jpg' },
    { n: 'Dra. Nicole Pinheiro', f: 'img/bp-prof-nicole.jpg' },
    { n: 'Dr. Juan Valdivia',   f: 'img/bp-prof-juan.jpg' }
  ]
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
    depois: 'Depois, R$ 299,90/mês · residentes: R$ 199,90/mês',
    itens: [
      'Artigo comentado toda segunda-feira',
      'Comentário em áudio e flashcards de cada artigo',
      'Encontro ao vivo uma vez por mês, com gravação',
      'Teste mensal com gabarito',
      'Para médicos com ou sem título'
    ],
    nota: 'Valor promocional de Black Friday válido para o primeiro mês da assinatura.'
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
  /* vídeos da aba "Fotos e vídeos" (nomes da lista VIDEOS lá em cima) */
  videos: ['revisoes'],
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
    videos: ['autotreino', 'viaaerea'],
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
    video: 'teorica',
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
   Todas as fatias têm o mesmo tamanho e a mesma chance.
   porDia  = quantas vezes o prêmio pode sair por dia neste aparelho.
   estoque = quantas unidades existem; quando acabam, a roleta não para mais nele.
   (Os dois contam os giros guardados neste aparelho: "Zerar histórico" na engrenagem zera a contagem.)
   ------------------------------------------------------------------ */
var PREMIOS = {
  m6:     { nome: '6 meses de Atualiza Talks', curto: '6 MESES', sub: 'PRÊMIO MÁXIMO',  tipo: 'assinatura', cor: ['#FFE9A8', '#C8922F'], txt: '#1a1205', ico: 'cal', n: '6', max: true, porDia: 1 },
  copo:   { nome: 'Copo',                      curto: 'COPO',    sub: 'BRINDE TALKS',   tipo: 'brinde',     cor: ['#FFFFFF', '#CFD1D8'], txt: '#0a0a0c', ico: 'copo', estoque: 20 },
  m1:     { nome: '1 mês de Atualiza Talks',   curto: '1 MÊS',   sub: 'ATUALIZA TALKS', tipo: 'assinatura', cor: ['#FF3A49', '#B70412'], txt: '#FFFFFF', ico: 'cal', n: '1' },
  camisa: { nome: 'Camisa',                    curto: 'CAMISA',  sub: 'BRINDE TALKS',   tipo: 'brinde',     cor: ['#2a2a31', '#111115'], txt: '#FFFFFF', ico: 'camisa', estoque: 21 },
  m4:     { nome: '4 meses de Atualiza Talks', curto: '4 MESES', sub: 'ATUALIZA TALKS', tipo: 'assinatura', cor: ['#9E0A16', '#4f0309'], txt: '#FFFFFF', ico: 'cal', n: '4' },
  casaco: { nome: 'Casaco',                    curto: 'CASACO',  sub: 'BRINDE TALKS',   tipo: 'brinde',     cor: ['#FFFFFF', '#CFD1D8'], txt: '#0a0a0c', ico: 'casaco', estoque: 1 },
  m2:     { nome: '2 meses de Atualiza Talks', curto: '2 MESES', sub: 'ATUALIZA TALKS', tipo: 'assinatura', cor: ['#E8303F', '#8f0b16'], txt: '#FFFFFF', ico: 'cal', n: '2' },
  m3:     { nome: '3 meses de Atualiza Talks', curto: '3 MESES', sub: 'ATUALIZA TALKS', tipo: 'assinatura', cor: ['#141418', '#050506'], txt: '#F5C451', ico: 'cal', n: '3' }
};
/* ordem das fatias, no sentido horário a partir do ponteiro (uma fatia por prêmio) */
var FATIAS = ['m6', 'copo', 'm1', 'camisa', 'm4', 'casaco', 'm2', 'm3'];
/* PIN da área da equipe (engrenagem no canto da tela da roleta) */
var ADMIN_PIN = '2027';

/* PLANILHA DOS GIROS (Google Planilhas)
   Cada giro manda nome, WhatsApp e prêmio para esta planilha:
   https://docs.google.com/spreadsheets/d/1vfZLrC3t-si_9z26AvncPUrpkHN7xCYwWsilURh2foM
   url = endereço do App da Web do Apps Script (termina em /exec). Código em planilha-roleta.gs.
   Vazio = os giros ficam guardados no aparelho e são enviados quando o endereço for preenchido. */
var PLANILHA = {
  url: 'https://script.google.com/macros/s/AKfycbwcRpotMd7Dvg9n9JONIyn4glBXW5sHUq-oLctMT2ohZnpyc3PRp6tySwYKf2pCANIuFQ/exec'
};
