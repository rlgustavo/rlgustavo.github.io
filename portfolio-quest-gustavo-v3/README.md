# Gustavo.Quest — Portfólio que você explora como um jogo 🎮☕🧡

Portfólio-jogo **2D com scroll narrativo**, feito com **HTML, CSS e JavaScript puro + Canvas API**. Publicável gratuitamente no **GitHub Pages**, sem npm, sem bundler, sem backend e sem depender de nenhuma engine.

## O que existe nesta versão

- **Sete fases**: Início, Sobre, Habilidades, Projetos web, Jogos publicados, Cursos e Contato.
- Cenário **side-scroller** com pixel art criada em Canvas: personagem animado, cidade, paisagens em camadas, placas, terminais, luzes e portais.
- **Scroll** do mouse/trackpad ou deslizar a tela move o mundo e apresenta informações conforme a fase.
- **A/D ou setas** avançam/recuam, **Espaço/W/↑** faz o personagem pular; clique no cenário também pula.
- **Oito estrelas de café colecionáveis**: pule quando passar perto delas. Progresso salvo no navegador via `localStorage` (se disponível).
- **Sons opcionais** com sintetizador Web Audio, desligados por padrão.
- Botões de navegação e pulo em dispositivos móveis.
- **Modo leitura** para recrutadores e visitantes que não querem jogar. Não é necessário coletar itens para acessar nada.
- Projetos e cursos editáveis em um arquivo único: `content.js`.
- Cartões de **três jogos existentes** com URLs públicas verificadas no itch.io: Piloto de Fuga, Mansion of Rememberance e Piñata Party.
- WhatsApp comercial de aulas particulares e links profissionais.
- Metadados SEO, capa de compartilhamento, sitemap, favicon e compatibilidade com preferência por menos movimento.

## 1. Abra no VS Code

1. Extraia o ZIP.
2. Abra **a pasta dos arquivos extraídos** no VS Code (Arquivo → Abrir Pasta).
3. Rode com **Live Server** (extensão opcional) ou abra `index.html` no navegador.
4. Role a página para avançar e teste a tecla Espaço para pular.
5. Clique em **Modo leitura** para ver os links e projetos sem jogar.

> Não é preciso instalar Phaser, React ou Unity: o próprio Canvas do navegador desenha o jogo. Os links do Google Fonts são opcionais; se não carregarem, o site usa fontes locais de sistema.

## 2. Estrutura do projeto

```text
rlgustavo.github.io/
├── index.html               # Conteúdo, fases, navegação, links e SEO
├── style.css                # Layout responsivo, café + laranja, cartões
├── content.js               # Projetos, games publicados e cursos
├── game.js                  # Canvas 2D, scroll, física de pulo, sons e coleta
├── assets/
│   ├── favicon.svg
│   └── capa-portfolio.png   # Capa para WhatsApp/LinkedIn
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── README.md
```

## 3. Personalize seus projetos

Abra `content.js` e encontre `projetos`. Cada objeto pode ter:

```js
{
  titulo: 'Nome do projeto',
  subtitulo: 'Uma linha de apresentação',
  descricao: 'O que o projeto resolve e como foi feito.',
  tecnologias: ['HTML', 'CSS', 'JavaScript'],
  categoria: 'FRONT-END',
  simbolo: '⌘',
  url: 'https://github.com/rlgustavo/nome-do-repositorio'
}
```

Se `url: ''`, aparecerá **Em evolução** e não será inventado um endereço. Os mesmos itens surgem dentro do jogo e no modo leitura automaticamente. O campo `simbolo` aceita um caractere curto. Imagens reais podem ser adicionadas a uma versão posterior modificando `renderReading` no `content.js`.

### Os jogos atuais

- **Piloto de Fuga** — `https://rlgustavo.itch.io/piloto-de-fuga` (runner, NoNeJam 8, GameMaker).
- **Mansion of Rememberance** — `https://rlgustavo.itch.io/mansion-of-rememberance` (puzzle RPG com horror; contribuição em programação e quebra-cabeças junto à equipe).
- **Piñata Party** — `https://rlgustavo.itch.io/pinata-party` (ação e coleta).

As páginas do itch.io podem disponibilizar download em vez de execução diretamente no navegador. Os botões do site dizem **VER** e levam à página publicada.

## 4. Adicione seus cursos

Em `content.js`, altere a lista inicialmente vazia `cursos`:

```js
cursos: [
  {
    titulo: 'Curso de Desenvolvimento Web',
    formato: 'Online',
    descricao: 'Aprenda a desenvolver sites e aplicações.',
    topicos: ['HTML', 'CSS', 'JavaScript'],
    link: ''
  }
]
```

Quando existir ao menos um curso, o bloco **Em breve** é ocultado e os cartões surgem automaticamente nas duas versões do portfólio. O campo `link` pode ficar vazio.

## 5. Atualize sua apresentação

- `index.html`, seção `data-scene="0"` — título e mensagem inicial.
- `data-scene="1"` — apresentação profissional.
- `data-scene="2"` — habilidades técnicas.
- `data-scene="6"` — contato e redes.
- `#resumo` — apresentação completa, para recrutadores.
- `style.css`, `:root` — cores e fontes.

### Paleta de cores

```css
--espresso: #1b110e;
--coffee: #30201a;
--cocoa: #4c3125;
--orange: #ff9446;
--orange-bright: #ffb15d;
--cream: #fff0db;
```

### Links que já estão no site

- LinkedIn: https://www.linkedin.com/in/rlgustavo/
- GitHub: https://github.com/rlgustavo
- Instagram: https://www.instagram.com/profgulima/
- YouTube: https://www.youtube.com/desenvolvegamesbrasil
- itch.io: https://rlgustavo.itch.io/
- WhatsApp de aulas particulares: https://wa.me/5511975152235

**Confirme a URL exata do canal do YouTube:** ela foi usada conforme informada e pode precisar de um endereço no formato `youtube.com/@...` ou `/channel/...`.

## 6. Como funciona o jogo (para você estudar)

### HTML (estrutura)

A `section#jornada` tem uma altura equivalente a **7 telas** (`700svh`). O `.game-stage` usa `position: sticky`; fica fixo na tela enquanto o visitante rola por seis intervalos de rolagem, cada qual revelando um capítulo. As âncoras `#ponto-inicio`, `#ponto-sobre` etc. permitem navegar diretamente a uma fase.

### JavaScript (lógica)

Em `game.js`:

1. `updateScroll()` calcula o progresso entre `0` e `1` com base na rolagem real da página.
2. O progresso determina a posição horizontal da câmera no mundo 2D.
3. `chapter = Math.round(progress * 6)` escolhe qual cartão está visível.
4. `frame()` anima a câmera e a física do pulo com `requestAnimationFrame`.
5. `drawSky()`, `drawParallax()`, `drawGround()`, `drawProps()` e `drawPlayer()` desenham cada parte do jogo.
6. `checkBeanPickup()` verifica proximidade do jogador e altura do pulo antes de coletar uma estrela.
7. A animação é suspensa quando o cenário sai da tela, economizando processamento.

### A física de pulo

O personagem parte de `verticalSpeed = 500` (subida). A gravidade reduz sua velocidade `1180` unidades por segundo até ele pousar no solo. A coleta não é obrigatória para navegar.

### Customizar o personagem

Os sprites estão em `CHARACTER_FRAMES`, no `game.js`. Cada letra é um quadrado colorido (por exemplo, `J` = camisa laranja). Altere as matrizes de caracteres e a tabela `CHAR_COLORS` para desenhar outro avatar em pixel art.

### Customizar itens e placares

`const BEANS = [...]` contém as coordenadas horizontais das oito estrelas. Modifique essas posições com cuidado; os itens devem ficar perto do percurso da câmera. Atualize também a quantidade no HTML (`/ 08`) se mudar o número de estrelas.

## 7. Publicação no GitHub Pages

1. Acesse `https://github.com/rlgustavo/rlgustavo.github.io`.
2. Faça backup da versão anterior do portfólio (um commit ou branch é suficiente).
3. Envie todos os arquivos **para a raiz** desse repositório, mantendo `assets/`.
4. Confira se `index.html` está na raiz, e não dentro de uma subpasta extra.
5. Em **Settings → Pages**, selecione **Deploy from a branch**, branch **main**, pasta **/(root)**.
6. Salve e acesse `https://rlgustavo.github.io/` após a publicação ser concluída.
7. Teste desktop e celular, links dos projetos, YouTube, botões de WhatsApp e rolagem.

Dica: para GitHub Desktop, extraia o conteúdo na pasta local do repositório, confira as alterações, faça um commit e use **Push origin**. O Pages publicará automaticamente quando a configuração estiver correta.

**Não é necessário** contratar hospedagem nem executar `npm install` ou `npm run build`.

## 8. Boas práticas e limitações

- Os efeitos em Canvas não substituem texto HTML: o modo leitura mantém nomes de projetos e informações importantes pesquisáveis e acessíveis.
- Usuários com `prefers-reduced-motion` recebem animação reduzida.
- Sons não iniciam automaticamente, evitando surpresas e bloqueio por autoplay.
- O progresso das estrelas pode ser salvo localmente, sem login ou coleta de dados pessoais.
- O projeto usa Google Fonts para tipografia (opcionais); outros recursos são locais.
- **A história é livre para explorar**: não há armadilhas, mortes nem informações escondidas atrás de pontuações.
- Um leitor pode usar os links de navegação e o modo leitura sem interagir com o Canvas.
- O site é uma **experiência narrativa gamificada**; o scroll controla a movimentação horizontal e o salto é uma mecânica adicional. Não é uma engine de plataforma com colisões complexas, inimigos ou fases separadas.
- Para trocar a foto do perfil ou integrar um jogo Unity WebGL no futuro, recomenda-se criar um módulo ou rota específica. GitHub Pages aceita projetos estáticos, mas uma build Unity pode ficar pesada para ser carregada diretamente na página inicial.

## 9. Checklist de publicação

- [ ] Substituir textos pessoais que desejar.
- [ ] Informar URLs individuais dos projetos TravelTech, ClimaTech e AvançaFlix quando estiverem disponíveis.
- [ ] Conferir a URL do canal YouTube.
- [ ] Testar os três links de jogos no itch.io.
- [ ] Conferir botão de WhatsApp e mensagem pré-preenchida.
- [ ] Testar com mouse, teclado e toque no celular.
- [ ] Testar **Modo leitura**.
- [ ] Publicar no branch configurado do GitHub Pages.
- [ ] Adicionar o portfólio ao LinkedIn.

---

**Criado para Gustavo Lima — HTML, CSS, JavaScript, Canvas, café e laranja.**
