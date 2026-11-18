/**
 * PORTFOLIO QUEST — CONTEÚDO EDITÁVEL
 * Altere este arquivo para adicionar projetos, links e cursos.
 * Os projetos web abaixo são exemplos de projetos educacionais mencionados por Gustavo.
 * Não foram inventadas URLs de demonstrações / repositórios individuais.
 * URLs dos jogos vieram das páginas públicas em rlgustavo.itch.io.
 */
window.PORTFOLIO_CONTENT = {
  projetos: [
    {
      titulo: 'TravelTech',
      subtitulo: 'Projeto web de viagens com integração de dados',
      descricao: 'Site de viagens desenvolvido como projeto educacional, integrando React, Supabase e publicação na web.',
      tecnologias: ['React', 'Supabase', 'Vercel'],
      categoria: 'WEB APP',
      simbolo: '✈',
      url: '' // Coloque o link real do site ou repositório quando quiser.
    },
    {
      titulo: 'ClimaTech',
      subtitulo: 'Aplicação de previsão do tempo',
      descricao: 'Aplicação de clima com busca de cidades e dados meteorológicos, construída para praticar JavaScript, React e APIs.',
      tecnologias: ['React', 'JavaScript', 'API'],
      categoria: 'API / FRONT-END',
      simbolo: '☀',
      url: ''
    },
    {
      titulo: 'AvançaFlix',
      subtitulo: 'Interface de catálogo de filmes e séries',
      descricao: 'Projeto educacional de interface de streaming, trabalhando componentes, rotas, páginas e estilização.',
      tecnologias: ['React', 'Router', 'CSS'],
      categoria: 'FRONT-END / UI',
      simbolo: '▶',
      url: ''
    }
  ],
  jogos: [
    {
      titulo: 'Piloto de Fuga',
      subtitulo: 'Infinity runner · NoNeJam 8',
      descricao: 'Jogo de corrida infinita criado para uma game jam, com controles de movimento e interação.',
      tecnologias: ['GameMaker', 'Runner', 'Game Jam'],
      categoria: 'JOGO / GAME JAM',
      simbolo: '➤',
      url: 'https://rlgustavo.itch.io/piloto-de-fuga'
    },
    {
      titulo: 'Mansion of Rememberance',
      subtitulo: 'Puzzle RPG com elementos de horror · projeto em equipe',
      descricao: 'Aventura de mistério em uma mansão. Participei da programação e do projeto de quebra-cabeças junto à equipe.',
      tecnologias: ['Unity', 'Puzzle RPG', 'Equipe'],
      categoria: 'JOGO / PUZZLE RPG',
      simbolo: '◇',
      url: 'https://rlgustavo.itch.io/mansion-of-rememberance'
    },
    {
      titulo: 'Piñata Party',
      subtitulo: 'Aventura de ação e coleta',
      descricao: 'Jogo de ação em festa de aniversário, com movimentação, pinhatas e coleta de doces.',
      tecnologias: ['Ação', 'Game Jam', 'Indie'],
      categoria: 'JOGO / AÇÃO',
      simbolo: '✷',
      url: 'https://rlgustavo.itch.io/pinata-party'
    }
  ],
  cursos: [
    /*
    Para publicar um curso, remova este comentário e adicione:
    {
      titulo: 'Meu curso de React',
      formato: 'Online',
      descricao: 'Aprenda a criar interfaces com React do zero.',
      topicos: ['React', 'JavaScript', 'Projetos'],
      link: 'https://exemplo.com/meu-curso'
    }
    */
  ]
};

(function renderContent() {
  const { projetos, jogos, cursos } = window.PORTFOLIO_CONTENT;
  const element = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const validLink = (url) => {
    if (!url) return '';
    try {
      const u = new URL(url);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : '';
    } catch { return ''; }
  };
  function renderMini(data, target) {
    const dest = document.querySelector(target);
    if (!dest) return;
    const nodes = data.map(item => {
      const card = element('div', 'mini-project');
      const symbol = element('span', 'mini-symbol', item.simbolo || '★');
      const copy = element('div', 'mini-copy');
      copy.append(element('h3', '', item.titulo), element('p', '', item.subtitulo));
      const href = validLink(item.url);
      const action = href ? element('a', 'mini-cta', 'VER ↗') : element('span', 'mini-cta mini-cta--disabled', 'EM EVOLUÇÃO');
      if (href) { action.href = href; action.target = '_blank'; action.rel = 'noopener noreferrer'; action.setAttribute('aria-label', `Abrir ${item.titulo} em nova aba`); }
      card.append(symbol, copy, action);
      return card;
    });
    dest.replaceChildren(...nodes);
  }
  function renderReading(data, target) {
    const dest = document.querySelector(target);
    if (!dest) return;
    const nodes = data.map(item => {
      const card = element('article', 'reading-project');
      const cover = element('div', 'project-cover');
      cover.setAttribute('aria-hidden', 'true');
      cover.append(element('span', '', item.simbolo || '★'));
      const body = element('div', 'project-body');
      body.append(element('span', 'project-meta', item.categoria), element('h4', '', item.titulo), element('p', '', item.descricao));
      const tags = element('div', 'skill-tags');
      (item.tecnologias || []).forEach(t => tags.append(element('span', '', t)));
      body.append(tags);
      const href = validLink(item.url);
      if (href) {
        const link = element('a', '', 'Conhecer o projeto ↗');
        link.href = href;
        link.target = '_blank'; link.rel = 'noopener noreferrer';
        body.append(link);
      } else body.append(element('span', 'project-meta', 'LINK DO PROJETO EM BREVE'));
      card.append(cover, body);
      return card;
    });
    dest.replaceChildren(...nodes);
  }
  function renderCourses() {
    if (!cursos.length) return;
    const journey = document.querySelector('#journey-courses');
    const reading = document.querySelector('#reading-courses');
    document.querySelector('#courses-placeholder').hidden = true;
    journey.replaceChildren(...cursos.map(course => {
      const card = element('div', 'mini-project');
      const sym = element('span', 'mini-symbol', '⌘');
      const desc = element('div', 'mini-copy');
      desc.append(element('h3','', course.titulo), element('p','', course.formato || course.descricao || 'Curso'));
      const href = validLink(course.link);
      if (href) {
        const a = element('a','mini-cta','VER ↗'); a.href=href; a.target='_blank'; a.rel='noopener noreferrer'; card.append(sym,desc,a);
      } else card.append(sym,desc,element('span','mini-cta mini-cta--disabled','EM BREVE'));
      return card;
    }));
    reading.replaceChildren(...cursos.map(course => {
      const card=element('article','reading-course-card');
      card.append(element('span','project-meta',course.formato || 'CURSO'),element('h4','',course.titulo),element('p','',course.descricao || 'Mais informações em breve.'));
      const tags=element('div','skill-tags');
      (course.topicos || []).forEach(t=>tags.append(element('span','',t)));
      card.append(tags);
      const href=validLink(course.link);
      if(href){const a=element('a','text-link','Conhecer curso ↗');a.href=href;a.target='_blank';a.rel='noopener noreferrer';card.append(a);}
      else card.append(element('span','project-meta','INSCRIÇÕES EM BREVE'));
      return card;
    }));
  }
  renderMini(projetos, '#journey-projects');
  renderMini(jogos, '#journey-games');
  renderReading(projetos, '#reading-projects');
  renderReading(jogos, '#reading-games');
  renderCourses();
  document.querySelector('#current-year').textContent = String(new Date().getFullYear());
})();
