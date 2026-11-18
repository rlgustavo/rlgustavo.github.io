# Gustavo Lima — Portfólio | InstaBio ☕🧡

Site responsivo feito somente com **HTML, CSS e JavaScript** para GitHub Pages.
Reúne apresentação profissional, projetos, redes sociais, contato para aulas particulares e uma área de cursos pronta para ser preenchida.

## Comece por aqui

1. Descompacte a pasta e abra no VS Code.
2. Abra o `index.html` no navegador ou com a extensão **Live Server**.
3. Personalize sua foto, textos, links de projetos e, quando quiser, os cursos.
4. Envie **os arquivos da pasta para a raiz** do repositório `rlgustavo.github.io`.
5. Em **Settings → Pages**, use `Deploy from a branch`, branch `main` e pasta `/(root)`.
6. Confira o site em **https://rlgustavo.github.io/**.

Nenhuma instalação, login, compilação ou biblioteca JavaScript é necessária.

## Estrutura de arquivos

- `index.html` — apresentação, links, navegação, seções, SEO e ícones SVG.
- `style.css` — estilos, responsividade e tema café + laranja.
- `script.js` — cartões dos projetos, filtros e futuros cursos.
- `assets/favicon.svg` — ícone da aba do navegador.
- `assets/foto.jpg` — **adicione sua foto** (opcional, não incluída).

## Links preenchidos

- LinkedIn: https://www.linkedin.com/in/rlgustavo/
- GitHub: https://github.com/rlgustavo
- Instagram: https://www.instagram.com/profgulima/
- YouTube: https://www.youtube.com/desenvolvegamesbrasil
- WhatsApp para aulas particulares: https://wa.me/5511975152235
- itch.io: https://rlgustavo.itch.io/ (mantido da versão anterior)

O link do YouTube foi reproduzido como informado. **Teste-o no navegador**; caso sua URL real use `@nomedocanal` ou `/channel/...`, substitua as duas ocorrências em `index.html` (cartão e dados de perfil).

O WhatsApp abre uma conversa com mensagem pré-preenchida. Para trocar o texto, edite a parte após `?text=` no endereço `https://wa.me/5511975152235?text=...`.

## Personalização da foto

Coloque uma foto quadrada em `assets/foto.jpg`. Em `index.html`, dentro de `.avatar-frame`, substitua:

```html
<span class="avatar-initials" aria-hidden="true">GL</span>
```

por:

```html
<img src="assets/foto.jpg" alt="Foto de Gustavo Lima" />
```

## Como adicionar seus projetos

No `script.js`, edite a lista `const projetos = [...]`.

- `titulo`: nome do projeto
- `categoria`: `Front-end` ou `Games` para os filtros funcionarem
- `descricao`: explique o problema resolvido e o que você fez
- `tecnologias`: lista de tags
- `codigo`: link exato do repositório
- `demo`: link do projeto publicado (use `''` se ainda não tiver)

Os quatro projetos existentes servem como exemplos e não têm links específicos inventados.

## Como adicionar cursos

No `script.js`, procure:

```js
const cursos = [];
```

Substitua por:

```js
const cursos = [
  {
    titulo: "Introdução ao desenvolvimento web",
    formato: "Online",
    descricao: "Aprenda os primeiros passos do HTML, CSS e JavaScript.",
    topicos: ["HTML", "CSS", "JavaScript"],
    link: "",
  },
];
```

Use seu curso real quando ele estiver pronto. Se `cursos` estiver vazio, o site exibe **Em breve** automaticamente. Se houver cursos, aparecem os cartões e um contador atualizado. `link: ''` exibe "Detalhes em breve" no cartão.

## Tema café + laranja

Os valores originais do marrom estão em `:root` no início do `style.css`; as novas cores ficam no bloco final `TEMA CAFÉ + LARANJA`:

```css
:root {
  --orange: #ff914d;
  --orange-soft: #ffd4ad;
  --orange-deep: #b34c1b;
}
```

## Recomendações de publicação

- Salve uma cópia do código antigo antes de substituí-lo.
- Teste cada link externo, especialmente o endereço personalizado do YouTube.
- Confirme se sua foto carrega no celular e se os botões funcionam.
- Acrescente links GitHub e demonstração aos projetos antes de divulgar a página como portfólio técnico.
- Atualize o texto da sua descrição e publique seu currículo PDF quando desejar.

---

Criado em HTML, CSS, JavaScript e café ☕
