# Painel Interativo Talks

Portal interativo do Grupo Talks para usar em eventos: Preparatório TEME, Preparatório TEP,
Atualiza Talks e Revisões TEME, com portal, aula experimental, questões, flashcards e a roleta
"Ganhe seu Prêmio!".

- `index.html`: estrutura e visual
- `js/dados.js`: **todo o conteúdo editável** (textos, preços por lote, WhatsApp, vídeos, questões, flashcards, fotos e prêmios da roleta)
- `js/app.js`: navegação e componentes
- `js/roleta.js`: roleta de prêmios

## Roleta

- A chance de cada prêmio é igual ao tamanho da fatia (pesos em `PREMIOS`, ordem em `FATIAS`).
- 1 giro por aparelho. No tablet/TV do estande, abra com `?estande` no fim do link para giros
  ilimitados, botão "Próximo participante" e QR code de resgate no WhatsApp.
- Engrenagem no canto da tela da roleta: área da equipe (PIN em `ADMIN_PIN`) para ligar o modo
  estande, desligar prêmios esgotados, ajustar chances e baixar a lista de prêmios entregues.
