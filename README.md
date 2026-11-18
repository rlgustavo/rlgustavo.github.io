# Gustavo Lima — Portfólio Pessoal

Portfólio estático no estilo InstaBio, desenvolvido somente com **HTML, CSS e JavaScript**, sem frameworks e sem etapa de build.

## Arquivos

- `index.html`: estrutura, conteúdo, redes sociais, SEO e acessibilidade.
- `style.css`: aparência, cores, centralização e responsividade.
- `script.js`: projetos, links de demonstração e filtros por categoria.
- `assets/favicon.svg`: ícone exibido na aba do navegador.

## Como testar

Abra `index.html` no navegador ou use a extensão Live Server do VS Code. Não é preciso executar `npm install`.

## Personalização obrigatória

1. **LinkedIn:** substitua `https://www.linkedin.com/` nos DOIS lugares do `index.html` (cartão e contato) pelo endereço exato do seu perfil.
2. **Foto:** salve uma foto quadrada como `assets/foto.jpg`; no HTML, procure `avatar-frame`, substitua `<span class="avatar-initials" ...>GL</span>` por `<img src="assets/foto.jpg" alt="Foto de Gustavo Lima">`.
3. **Projetos:** abra `script.js` e edite a lista `projetos`. Preencha `codigo` e `demo` com URLs reais ou mantenha vazios para não criar links quebrados. Só apresente os projetos que deseja divulgar.
4. **Textos:** personalize a bio e as competências em `index.html`.
5. **Cores:** edite as variáveis no começo de `style.css`, em `:root`.

## GitHub Pages

1. No GitHub, abra o repositório chamado **`rlgustavo.github.io`** da conta **`rlgustavo`**.
2. Faça backup dos arquivos atuais se não quiser perdê-los.
3. Copie o conteúdo desta pasta para a **raiz** do repositório (não envie uma pasta `portfolio-gustavo` que contenha tudo dentro).
4. Faça commit, por exemplo `Atualiza portfólio pessoal`.
5. Acesse **Settings > Pages**.
6. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main`, pasta `/(root)` e clique **Save** (caso ainda não esteja configurado).
7. Acesse `https://rlgustavo.github.io/`. A publicação pode levar alguns minutos.

## Sugestões de evolução

- Adicionar imagens reais e capturas dos projetos.
- Criar e vincular um currículo PDF quando estiver revisado.
- Incluir o link exato do LinkedIn.
- Criar uma URL de demonstração para cada projeto publicado.
- Usar Lighthouse no navegador para verificar acessibilidade, SEO e desempenho.

> Nenhum login, API ou serviço de banco de dados é necessário para hospedar esta versão.
