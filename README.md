# 🟣 Gustavo Lima — Links

Página de links (estilo Linktree) de **Gustavo Lima**, professor de Jogos Digitais, Programação e Tecnologia. É o ponto de partida único que ele compartilha com quem quer conhecer seu trabalho.

🔗 **Ver online:** _adicione aqui o link do GitHub Pages depois de publicar_

![preview](./img/Profile.png)

## ✨ Sobre o projeto

Site em HTML, CSS e JavaScript puros (sem frameworks e sem build), com:

- Tema roxo-tech dark, com efeito de "terminal" digitando os papéis do Gustavo (professor, dev, educador);
- Pilha de links estilo Linktree (GitHub, LinkedIn, itch.io + um card "em breve" para novos projetos);
- Faixa discreta com os logos das escolas onde leciona;
- Animações de entrada em cascata e layout 100% responsivo, do celular ao desktop.

## 🗂️ Estrutura

```
.
├── index.html      → estrutura e conteúdo do site
├── style.css       → todo o visual (cores, fontes, layout)
├── script.js       → interatividade (digitação, menu, scroll)
├── README.md
└── img/
    ├── Profile.png
    ├── MapleBear.png
    ├── Avenues.png
    └── Supergeeks.png
```

## 🎨 Como personalizar

Praticamente tudo pode ser ajustado sem tocar na lógica do site:

| Quero mudar...                  | Onde mexer                                              |
|----------------------------------|-----------------------------------------------------------|
| Cores do site                    | Bloco `:root` no topo de `style.css`                     |
| Fontes                           | Variáveis `--font-*` em `style.css` (+ link no `<head>`) |
| Textos que aparecem digitando    | Lista `ROLES` no topo de `script.js`                     |
| Adicionar/remover um link        | Copiar ou apagar um bloco `<a class="link-item">` dentro de `<nav class="links-stack">` no `index.html` |
| Fotos/logos                      | Substituir os arquivos em `img/` mantendo o mesmo nome    |

## 🚀 Publicando no GitHub Pages

1. Faça o commit de todos os arquivos (`index.html`, `style.css`, `script.js`, pasta `img/`);
2. No repositório, vá em **Settings → Pages**;
3. Em **Source**, selecione a branch `main` e a pasta `/root`;
4. Salve — em alguns minutos o site estará disponível em `https://rlgustavo.github.io/nome-do-repo/`.

## 🤝 Contato

- GitHub: [github.com/rlgustavo](https://github.com/rlgustavo)
- LinkedIn: [linkedin.com/in/rlgustavo](https://linkedin.com/in/rlgustavo)
- itch.io: [rlgustavo.itch.io](https://rlgustavo.itch.io)

---

🛠️ Site construído com apoio do [Claude](https://claude.com), assistente de IA da Anthropic.
